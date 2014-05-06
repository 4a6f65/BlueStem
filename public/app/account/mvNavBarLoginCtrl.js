angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $location, mvIdentity, mvAuth, mvHerald) {
    $scope.identity = mvIdentity;
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password)
            .then(function(success){
                if(success){
                    mvHerald.notify('Welcome!');
                }else{
                    mvHerald.notify('You shall not pass!');
                }
            })
    }
    $scope.signout = function() {
        mvAuth.logoutUser()
            .then(function() {
                $scope.username = "";
                $scope.password = "";
                mvHerald.notify('You have logged out.');
                $location.path('/');
            })
    }
});