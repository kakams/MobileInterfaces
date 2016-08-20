(function(){
  var app = angular.module('mainApp', []);

  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../../../json/menu.json'}).success(function(json) {
		    	return json;
		    });
	    }
	    return this;
  });

  app.filter('price', function() {
	    return function(value) {
	        return parseFloat(value).toFixed(2);
	    }
  });
	
  app.controller('SiteController', function($scope,$http, menufactory) {
	$scope.menuData = [];
	$scope.menuItems = [];
	$scope.backID = 0;
	$scope.productData = [];
	
	
	function getProductList(categoryId){   
		$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
			$scope.productData = json;
	    });
    };
    $scope.getMenuItems = function(elementId){
    	var menuData = $scope.menuData;
        var singleItem = [];
		var tmpItems = [];
		var unity = 0;
		var decimal = 0;
		var hundreds = 0;
		$scope.backID = -1;
    	if(isNaN(elementId) || elementId < 0 || elementId > 999){
    		elementId = 0;
    	}
    	unity = elementId%10;
    	decimal = ((elementId-unity)%100)/10;
    	hundreds = (elementId-unity-10*decimal)/100;
    	
    	if(decimal === 0 && unity > 0 && unity <= menuData.length){
    		$scope.backID = 0;
        	tmpItems = menuData[unity-1].childrens;
    	}
    	else if(hundreds === 0 && unity > 0 && decimal > 0 && decimal <= menuData.length && unity <= menuData[decimal-1].childrens.length){
    		$scope.backID = menuData[decimal-1].id;
    		tmpItems = menuData[decimal-1].childrens[unity-1].childrens;
    	}
    	
    	if(hundreds !== 0){
    		getProductList(elementId);	
    	}
    	else if(tmpItems.length > 0){
    		menuData = tmpItems;
    	}
		$scope.menuItems = menuData;
    };
    

    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
       $scope.getMenuItems(0);
    });
  
  });
  
})();