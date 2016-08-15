var app = angular.module('mobileInterfaces', []);

  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../../../json/menu.json'}).success(function(json) {
		    	return json;
		    });
	    }
	    return this;
  });


  
  app.controller('SiteController', function($scope, $http, menufactory) {
	$scope.menuData = [];
	$scope.productData = [];
	
	
	$scope.getProductList = function (categoryId){   
		$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
    		console.log(json);
			$scope.productData = json;
	    });
    };
    
    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
    });
  
  });
  

		
  