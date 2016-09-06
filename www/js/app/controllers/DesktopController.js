  app.controller('DesktopController', ['$scope','$http','$location', 'userService','menufactory', function($scope,$http, $location, userService, menufactory) {
	$scope.menuData = [];
	$scope.productData = [];
	$scope.taskProduct = {};
	$scope.taskActions = [];
	$scope.task = userService.tasks[userService.curentTask];
	if($scope.task !== undefined){
		$scope.taskProduct = userService.tasks[userService.curentTask].product;
	}
	
	$scope.getProductList = function (categoryId){   
		if(categoryId === parseInt($scope.taskProduct.categoryId)){
			$scope.taskActions.push(createAction('proper_category', null));
		}
		else{
			$scope.taskActions.push(createAction('wrong_category', null));
		}
		$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
			$scope.productData = json;
	    });
    };

    $scope.$on('$routeChangeSuccess', function() {
		onAction($scope.taskActions);
	});
    
    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
       desktopMenuHover();
    });
    $scope.onProductBarLoaded = function (){
    	desktopInfoBar();
    }
    $scope.checkProduct = function (productId){
    	if($scope.taskProduct !== {}){
	    	if(productId === $scope.taskProduct.id){
	        	$scope.task.endTime = new Date().getTime();
	        	$scope.task.success = 1;
		    	$scope.task.actions = angular.copy($scope.taskActions);
		    	userService.addTaskActionsToDatabase();
	    		var popup = $("#popup_succes");
				$.fancybox.open([{
		            type: 'inline',
		            href: popup,
		            closeClick  : false,
		            closeBtn : false,
			        helpers     : { 
			          overlay : {closeClick: false}
			        }
		        }], {});
	    	}
	    	else{
	    		$scope.taskActions.push(createAction('wrong_product', null));
		    	var popup = $("#popup_bad");
				$.fancybox.open([{
		            type: 'inline',
		            href: popup,
		            closeClick  : false,
		            closeBtn : false,
			        helpers     : { 
			          overlay : {closeClick: false}
			        }
		        }], {});
	    	}
    	}
    };

    $scope.completeTask = function (){
    	$.fancybox.close();
    	$(document).off();
    	$location.path( "/task" );
    }
    $scope.abortCurrentTask = function (){
    	$.fancybox.close();
    	$scope.task.endTime = new Date().getTime();
    	userService.addTaskActionsToDatabase();
    	$(document).off();
    	$location.path( "/task" );
    }
    $scope.continueSearch = function (){
    	$.fancybox.close();
    }
  }]);