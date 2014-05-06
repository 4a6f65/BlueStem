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

    var expanseSchema = mongoose.Schema({
        "name": String,
        "status": String,
        "beginDate": Date,
        "endDate": Date,
        "secondsPerRound": Number,
        "maxRounds": Number,
        "currentRound": Number,
        "width": Number,
        "height": Number,
        "depth": Number
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch)===this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema );
    var Expanse = mongoose.model('Expanse', expanseSchema );

    Expanse.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Expanse.create({
                "name": "Lloyd",
                "status": "pending",
                "beginDate": null,
                "endDate": null,
                "secondsPerRound": 3600,
                "maxRounds": 500,
                "currentRound": 0,
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