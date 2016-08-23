  app.controller('DesktopController', function($scope, $http, menufactory) {
	$scope.menuData = [];
	$scope.productData = [];

	
	$scope.getProductList = function (categoryId){   
		$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
			$scope.productData = json;
	    });
		
    };
    
    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
       
       desktopMenuHover();
    });
  
  });