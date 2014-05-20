/**
 * Created by Joe on 4/29/2014.
 */
var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    expanses = require('../controllers/expanses'),
    Expanse = mongoose.model('Expanse');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), function(req, res){
        User.find({}).exec(function(err, collection){
            res.send(collection);
        })
    });

    app.get('/api/expanses', function(req, res) {
        if (res.req.query.action === 'candidate') {
            var candidate = res.req.query;
            expanses.generateExpanse(req, res, candidate);
            res.send(candidate);
        } else {
            Expanse.find({}).exec(function (err, collection) {
                res.send(collection);
            })
        }
    });

    app.get('/api/generateExpanse', expanses.generateExpanse);

    app.post('/api/expanses', expanses.createExpanse);

    app.get('/partials/*', function (req, res){
        console.log(req.params);
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

// Catch All Routea
    app.get('*', function (req, res){
        res.render('index', {
            bootStrappedUser: req.user
        });
    });

}