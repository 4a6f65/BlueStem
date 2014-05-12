angular.module('app').factory('starManager', ['$resource', '$q', 'Star', function($resource, $q, Star) {
    var Resource = $resource('/api/stars/:id', {id: '@id'}, {
        'get': {method: 'GET'},
        'query': {method: 'GET', isArray: true }
    });

    var starManager = {
        _pool: {},
        _retrieveInstance: function(starId, starData) {
            var instance = this._pool[starId];

            if (instance) {
                instance.setData(starData);
            } else {
                instance = new Star(starData);
                this._pool[starId] = instance;
            }

            return instance;
        },
        _search: function(starId) {
            return this._pool[starId];
        },
        _load: function(starId, deferred) {
            var scope = this;

            Resource.get({id: starId},
                function(starData) {
                    var star = scope._retrieveInstance(starData.id, starData);
                    deferred.resolve(star);
                },function(){
                    deferred.reject();
                });
        },
        /* Public Methods */
        /* Use this function in order to get a star instance by it's id */
        getStar: function(starId) {
            var deferred = $q.defer();
            var star = this._search(starId);
            if (star) {
                deferred.resolve(star);
            } else {
                this._load(starId, deferred);
            }
            return deferred.promise;
        },
        /* Use this function in order to get instances of all the star */
        loadAllStars: function() {
            console.log("Load All Stars");
            var deferred = $q.defer();
            var scope = this;
            Resource.query()
                .$promise.then(
                function(stars) {
                    var starList = [];
                    stars.forEach(function(starData) {
                        var star = scope._retrieveInstance(starData.id, starData);
                        starList.push(star);
                    });
                    deferred.resolve(starList);
                },
                function(error) {
                    console.log("Load All Stars--fail");
                    deferred.reject();
                });
            return deferred.promise;
        },
        /*  This function is useful when we got somehow the star data and we wish to store it or update the pool and get a star instance in return */
        setStar: function(starData) {
            var scope = this;
            var star = this._search(starData.id);
            if (star) {
                star.setData(starData);
            } else {
                star = scope._retrieveInstance(starData);
            }
            return star;
        }
    };
    return starManager;
}]);