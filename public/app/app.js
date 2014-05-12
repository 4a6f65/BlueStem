var blueStemApp = angular.module('app', ['ngResource','ngRoute', "ngQuickDate"]);

blueStemApp.config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', {templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
        });
});

blueStemApp.config(function(ngQuickDateDefaultsProvider) {
    // Configure with icons from font-awesome
    return ngQuickDateDefaultsProvider.set({
        closeButtonHtml: "<i class='fa fa-times'></i>",
        buttonIconHtml: "<i class='fa fa-calendar'></i>",
        nextLinkHtml: "<i class='fa fa-chevron-right'></i>",
        prevLinkHtml: "<i class='fa fa-chevron-left'></i>"
    });
});

blueStemApp.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});


blueStemApp.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                dateFormat:'dd/MM/yyyy hh:mm:ss',
                language: 'pt-BR'
            }).on('changeDate', function(e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});
