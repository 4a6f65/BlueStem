var path= require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://bouquet:bouquet@ds037518.mongolab.com:37518/bluestem',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://bouquet:bouquet@ds037518.mongolab.com:37518/bluestem',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}