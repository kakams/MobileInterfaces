
  app.controller('HamburgerController', ['$scope','$http','$location', 'userService','menufactory', function($scope,$http, $location, userService, menufactory) {
		$scope.menuData = [];
		$scope.productData = [];
		$scope.taskProduct = {};
		if(userService.tasks[userService.curentTask] !== undefined){
			$scope.taskProduct = userService.tasks[userService.curentTask].product;
			console.log($scope.taskProduct);
		}
		
		$scope.$on('$routeChangeSuccess', function() {
			$('.drawer').drawer({
			  class: {
			    nav: 'drawer-nav',
			    toggle: 'drawer-toggle',
			    overlay: 'drawer-overlay',
			    open: 'drawer-open',
			    close: 'drawer-close',
			    dropdown: 'drawer-dropdown'
			  },
			  iscroll: {
			    mouseWheel: true,
			    preventDefault: false,
			    disableTouch: false
			  },
			  showOverlay: true
			});
		});
		
		$scope.getProductList = function (categoryId){   
			$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
				$scope.productData = json;
				$('.drawer').drawer('close');
		    });
	    };
		
		

	    menufactory.getlist().then(function(json){
	       $scope.menuData = json.data;
	    });
	    
	    $scope.checkProduct = function (productId){
	    	if($scope.taskProduct !== {}){
		    	if(productId === $scope.taskProduct.id){
		    		console.log("gratki!");
		    		$location.path( "/task" );
		    	}
		    	else{
		    		
		    		console.log('smuteczek: '+productId);
		    	}
	    	}
	    };
  }]);
  