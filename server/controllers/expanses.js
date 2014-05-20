var mongoose = require('mongoose'),
    Expanse = require('mongoose').model('Expanse'),
    StellarClass = require('mongoose').model('StellarClass'),
    Star = require('mongoose').model('Star'),
    starCtrl = require('../controllers/star'),
    Chance = require('chance'),
    _ = require("underscore");

exports.getExpanses = function(req, res){
    Expanse.find({}).exec(function(err, collection){
        res.send(collection);
    })
};

exports.generateExpanse = function(req, res, expanse) {
    var chance = new Chance();
    var starTypes = [];

    StellarClass.find({}).exec(function(err, stellarClasses){
        if (err) { console.log(err) };
        if(!stellarClasses.length){}
        else {
            stellarClasses.forEach(function (sc) {
                starTypes.push({
                    code: sc.code,
                    name: sc.name,
                    color: sc.color,
                    size: sc.size,
                    abundance: sc.abundance
                });
                var minGapBetweenStars = 8.1;
                expanse.stars = [];

                do {
                    var star = {
                        'xCoord': chance.floating({min: 0, max: expanse.width}),
                        'yCoord': chance.floating({min: 0, max: expanse.height}),
                        'zCoord': chance.floating({min: 0, max: expanse.depth}),
                        'chosenStarType': '',
                        'designation': ''
                    }

                    if(expanse.stars.length === 0 | isValidStarPlacement(minGapBetweenStars, star, expanse.stars)){
                        star.chosenStarType = getWeightedRandomStellarClass(starTypes);
                        star.designation = star.chosenStarType.code + "-" + chance.word({syllables: chance.integer({min: 1, max: 3})});
                        starCtrl.generateStarSystem(star);
                        expanse.stars.push(star);
                    }

                } while (expanse.stars.length < expanse.numberOfStars);
            });
        }
    });
};

isValidStarPlacement = function(minGap, star, stars) {
    var isValid = true;
    _.find(stars, function (o) {
        var dist = Math.pow(star.xCoord - o.xCoord, 2) + Math.pow(star.yCoord - o.yCoord, 2) + Math.pow(star.zCoord - o.zCoord, 2);

        if (minGap > Math.pow(dist, 0.5)) {
            isValid = false;
            return false;
        }
    })
    return isValid;
};

getWeightedRandomStellarClass = function(starTypes) {
    var chance = new Chance();
    var chosenStellarClass = starTypes[0];
    var weightedSum = 0;

    for (var i = 0; i < starTypes.length; i++) {
        weightedSum += starTypes[i].abundance;
    }

    var pick = chance.floating({min: 0, max: weightedSum});
    var accumulator = 0;

    chosenStellarClass = _.find(starTypes, function (o) {
        accumulator += o.abundance;
        if (accumulator > pick) {
            return o;
        }
    });

    return chosenStellarClass;
};

exports.createExpanse = function(req, res, next) {
    var expanseData = req.body;
    Expanse.create(expanseData, function(err, user){

   })
};
