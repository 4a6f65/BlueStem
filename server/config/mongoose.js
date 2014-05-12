/**
 * Created by Joe on 4/29/2014.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('BlueStem DB Opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    var stellarClassSchema = mongoose.Schema({
        code: String,
        name: String,
        color: String,
        size: String,
        abundance: Number
    });

    var expanseSchema = mongoose.Schema({
        "name": String,
        "status": String,
        "beginDate": Date,
        "endDate": Date,
        "secondsPerRound": Number,
        "maxRounds": Number,
        "currentRound": Number,
        "numberOfStars": Number,
        "width": Number,
        "height": Number,
        "depth": Number
    });

    var starSchema = mongoose.Schema({
        designation: String,
        stellarClass: Object,
        expanseName: String,
        xCoord: Number,
        yCoord: Number,
        zCoord: Number
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch)===this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema );
    var Expanse = mongoose.model('Expanse', expanseSchema );
    var Star = mongoose.model('Star', starSchema );
    var StellarClass = mongoose.model('StellarClass', stellarClassSchema );


    StellarClass.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            StellarClass.create({
                code: "L",
                name: "Brown Dwarf",
                size: 2,
                color: "#FBAF00",
                abundance: 100
            });
            StellarClass.create({
                code: "M",
                name: "Red Dwarf",
                size: 2,
                color: "#FF0000",
                abundance: 80
            });
            StellarClass.create({
                code: "G",
                name: "Yellow Dwarf",
                size: 3,
                color: "#FFFF00",
                abundance: 40
            });
            StellarClass.create({
                code: "B",
                name: "Blue Giant",
                size: 5,
                color: "#1F75FE",
                abundance: 10
            });
            StellarClass.create({
                code: "V",
                name: "Singularity",
                size: 7,
                color: "#8F00FF",
                abundance: 2
            });
        }
        console.log("StellarClass Count: " + collection.length);
    })

    Star.find({}).exec(function(err, collection) {
        if (collection.length === 0) {

        }
        console.log("Star Count: " + collection.length);
    })

    Expanse.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Expanse.create({
                "name": "Yolanda Burwell",
                "status": "pending",
                "beginDate": null,
                "endDate": null,
                "secondsPerRound": 3600,
                "maxRounds": 500,
                "currentRound": 0,
                "numberOfStars": 1000,
                "width": 1200,
                "height": 1200,
                "depth": 25
            });
        }
        console.log("Expanse Count: " + collection.length);
    })

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var  salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'White', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = createSalt();
            hash = hashPwd(salt, 'larry');
            User.create({firstName: 'Larry', lastName: 'Tate', username: 'larry', salt: salt, hashed_pwd: hash, roles: []});
            salt = createSalt();
            hash = hashPwd(salt, 'nyota');
            User.create({firstName: 'Nyota', lastName: 'Uhura', username: 'nyota', salt: salt, hashed_pwd: hash});
        }
    })

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPwd(salt, pwd){
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
}