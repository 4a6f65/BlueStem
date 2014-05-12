angular.module('app').factory('Star', ['$resource', '$q', function($resource, $q) {
    var Resource = $resource('/api/star/:id', {id: '@id'}, {
        'get': {method: 'GET'},
        'query': {method: 'GET', isArray: true }
    });

    function Star(starData) {
        if (starData) {
            this.setData(starData);
        }
        // Some other initializations related to Expanse
    };

    Star.prototype = {
        setData: function(starData) {
            angular.extend(this, starData);
        },
        delete: function(starId) {
            successdb(Resource.delete({id: entryId}));
        },
        save: function(star) {
            var deferred = $q.defer();
            var p = new Resource(star)
            p.$save(null, function(star){
                deferred.resolve(star);
            });
            return deferred.promise;
        },
        containsReference: function(star) {
            if (!this.star.stores || this.star.stores.length === 0) {
                return false;
            }
            return this.star.stores.some(function(store) {
                return store.quantity > 0;
            });
        }
    };

    return Star;
}]);