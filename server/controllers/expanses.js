var mongoose = require('mongoose'),
    Expanse = require('mongoose').model('Expanse'),
    StellarClass = require('mongoose').model('StellarClass'),
    Star = mongoose.model('Star'),
    starCtrl = require('../controllers/star'),
    Chance = require('chance'),
    _ = require("underscore");

exports.getExpanses = function(req, res){
    Expanse.find({}).exec(function(err, collection){
        res.send(collection);
    })
};

exports.generateExpanse = function(expanse) {
    var chance = new Chance();
    var stars = [Star];
    var starTypes = StellarClass.find({});
    var minGapBetweenStars = 8.0;

    do {
        var star = {
            'xCoord': chance.floating({min: 0, max: expanse.width}),
            'yCoord': chance.floating({min: 0, max: expanse.height}),
            'zCoord': chance.floating({min: 0, max: expanse.depth}),
            'chosenStarType': '',
            'designation': ''
        }

        if(stars.length === 0 || isValidStarPlacement(minGapBetweenStars, star, stars)){
            star.chosenStarType = getWeightedRandomStellarClass();
            star.designation = chosenStarType.code + "-" + chance.word({syllables: chance.integer({min: 1, max: 3})});
            starCtrl.generateStarSystem(star);
            stars.push(star);
        }

    } while (stars.length < expanse.starCount);
};

isValidStarPlacement = function(minGap, star, stars) {
    var isValid  = true;
    isValid = _.find(stars, function (o) {
        if (minGap > ((star.xCoord - o.xCoord) ^ 2 + (star.yCoord - o.yCoord) ^ 2 + (star.zCoord - o.zCoord) ^ 2) ^ 0.5)
            return false;
    })
    return isValid;
};

getWeightedRandomStellarClass = function() {
    var chance = new Chance();
    var starTypes = StellarClass.find({});
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
}

exports.createExpanse = function(req, res, next) {
    var expanseData = req.body;
    Expanse.create(expanseData, function(err, user){

   })
};
