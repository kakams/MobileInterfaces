var app = angular.module('mobileInterfaces', []);

  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../../../json/menu.json'}).success(function(json) {
		    	return json;
		    });
	    }
	    return this;
  });
  
  
  app.controller('MenuController', function($scope, menufactory) {
	$scope.menuData = [];
	
	

    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
    });
  
  });
  