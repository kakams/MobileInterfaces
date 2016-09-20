var app = angular.module('mobileInterfaces', ['ngDraggable', 'ngRoute']).config(
['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/desktop', {
        templateUrl: '../../templates/desktop/index.html',
        controller: "DesktopController"
    }).
    when('/bottom_bar', {
        templateUrl: '../../templates/bottom_bar/index.html',
        controller: 'BottomBarController'
    }).
    when('/hamburger', {
        templateUrl: '../../templates/hamburger/index.html',
        controller: 'HamburgerController'
    }).
    when('/wachlarz', {
        templateUrl: '../../templates/wachlarz/index.html',
        controller: 'WachlarzController'
    }).
    when('/task', {
        templateUrl: '../../templates/task/index.html',
        controller: 'TaskController'
    }).
    when('/questions', {
        templateUrl: '../../templates/questions/index.html',
        controller: 'QuestionsController'
    }).
    when('/end', {
        templateUrl: '../../templates/end/index.html',
        controller: 'QuestionsController'
    }).
    otherwise({
        templateUrl: '../../templates/welcome_page/index.html',
        controller: "WelcomeController"
    });
}]);
