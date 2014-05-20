angular.module('app').factory('expanseManager', ['$resource', '$q', 'Expanse', function($resource, $q, Expanse) {
    var Resource = $resource('/api/expanses/:id', {id: '@id'}, {
        'get': {method: 'GET'},
        'query': {method: 'GET', isArray: true },
        'candidate': {params: {action: 'candidate'}, method: 'GET' }
    });

    var expanseManager = {
        _pool: {},
        _retrieveInstance: function(expanseId, expanseData) {
            var instance = this._pool[expanseId];

            if (instance) {
                instance.setData(expanseData);
            } else {
                instance = new Expanse(expanseData);
                this._pool[expanseId] = instance;
            }

            return instance;
        },
        _search: function(expanseId) {
            return this._pool[expanseId];
        },
        _load: function(expanseId, deferred) {
            var scope = this;

            Resource.get({id: expanseId},
                function(expanseData) {
                    var expanse = scope._retrieveInstance(expanseData.id, expanseData);
                    deferred.resolve(expanse);
                    console.log("_load--success");
                },function(){
                    deferred.reject();
                    console.log("_load--fail");
                });
        },
        /* Public Methods */
        /* generates a candidate expanse for consideration.*/
        getCandidateExpanse: function(expanseFrame) {
            var deferred = $q.defer();
            Resource.candidate( expanseFrame,
                function(expanseData) {
                    var expanse = new Expanse(expanseData);
                    deferred.resolve(expanse);
                    console.log("getCandidateExpanse--success");
                },function() {
                    deferred.reject();
                    console.log("getCandidateExpanse--fail");
                });
        },
        /* Public Methods */
        /* Use this function in order to get a expanse instance by it's id */
        getExpanse: function(expanseId) {
            var deferred = $q.defer();
            var expanse = this._search(expanseId);
            if (expanse) {
                deferred.resolve(expanse);
            } else {
                this._load(expanseId, deferred);
            }
            return deferred.promise;
        },
        /* Use this function in order to get instances of all the expanse */
        loadAllExpanses: function() {
            console.log("Load All Expanses");
            var deferred = $q.defer();
            var scope = this;
            Resource.query()
                .$promise.then(
                    function(expanses) {
                    var expanseList = [];
                    expanses.forEach(function(expanseData) {
                        var expanse = scope._retrieveInstance(expanseData.id, expanseData);
                        expanseList.push(expanse);
                    });
                    deferred.resolve(expanseList);
                },
                function(error) {
                    console.log("Load All Expanses--fail");
                    deferred.reject();
                });
            return deferred.promise;
        },
        /*  This function is useful when we got somehow the expanse data and we wish to store it or update the pool and get a expanse instance in return */
        setExpanse: function(expanseData) {
            var scope = this;
            var expanse = this._search(expanseData.id);
            if (expanse) {
                expanse.setData(expanseData);
            } else {
                expanse = scope._retrieveInstance(expanseData);
            }
            return expanse;
        }
    };
    return expanseManager;
}]);