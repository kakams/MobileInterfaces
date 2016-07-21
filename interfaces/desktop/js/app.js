var menuApp = angular.module('menuApp', []);

menuApp.controller("menuAppCtrl", function($scope) {
    $scope.menu ="";
    
    function getMenuFromJSON($scope, $http) {
        $http({method: 'POST', url: '../../json/menu.json'}).success(function(data) {
          $scope.menu = data; 
        });
    };
    
});
