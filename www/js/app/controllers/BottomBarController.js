
  app.controller('BottomBarController', function($scope,$http, menufactory) {
		$scope.menuData = [];
		$scope.menuItems = [];
		$scope.backID = 0;
		$scope.productData = [];
		
		
		function getProductList(categoryId){   
			$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
				$scope.productData = json;
		    });
	    };
	    
	    $scope.getMenuItems = function(elementId,back){
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
	    		$scope.backID = hundreds;
	    	}
	    	else if(tmpItems.length > 0){
	    		menuData = tmpItems;
				$scope.menuItems = menuData;
	    	}
	    	else{
	    		if($scope.productData.length > 0){
	    			$scope.productData = [];
	    		}
				$scope.menuItems = menuData;
	    	}
	    };
	    

	    menufactory.getlist().then(function(json){
	       $scope.menuData = json.data;
	       $scope.getMenuItems(0, false);
	    });
	  
  });