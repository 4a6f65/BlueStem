angular.module('app').factory('Expanse', ['$resource', '$q', function($resource, $q) {
    var Resource = $resource('/api/expanses/:id', {id: '@id'}, {
        'get': {method: 'GET'},
        'query': {method: 'GET', isArray: true }
    });

    function Expanse(expanseData) {
        if (expanseData) {
            this.setData(expanseData);
        }
        // Some other initializations related to Expanse
    };

    Expanse.prototype = {
        setData: function(expanseData) {
            angular.extend(this, expanseData);
        },
        delete: function(expanseId) {
           successdb(Resource.delete({id: entryId}));
        },
        save: function(expanse) {
            var deferred = $q.defer();
            var p = new Resource(expanse)
            p.$save(null, function(expanse){
                deferred.resolve(expanse);
            });
            return deferred.promise;
        },
        containsReference: function(expanse) {
            if (!this.expanse.stores || this.expanse.stores.length === 0) {
                return false;
            }
            return this.expanse.stores.some(function(store) {
                return store.quantity > 0;
            });
        }
    };

    return Expanse;
}]);