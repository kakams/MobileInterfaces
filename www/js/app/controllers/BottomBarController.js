
  app.controller('BottomBarController', ['$scope','$http','$location', 'userService','menufactory', function($scope,$http, $location, userService, menufactory) {
		$scope.menuData = [];
		$scope.menuItems = [];
		$scope.backID = 0;
		$scope.productData = [];
		$scope.taskActions = [];
		
		$scope.taskProduct = {};
		$scope.task = userService.tasks[userService.curentTask];
		if($scope.task !== undefined){
			$scope.taskProduct = userService.tasks[userService.curentTask].product;
		}
		
		function getProductList(categoryId){   
			if(categoryId === parseInt($scope.taskProduct.categoryId)){
				createAction('proper_category', null);
			}
			else{
				createAction('wrong_category', null);
			}
			$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
				$scope.productData = json;
		    });
	    };
	    $scope.$on('$routeChangeSuccess', function() {
			onAction($scope.taskActions);
		});
	    
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
	    
	    $scope.checkProduct = function (productId){
	    	if($scope.taskProduct !== {}){
		    	if(productId === $scope.taskProduct.id){

			    	$scope.task.endDate = new Date().getTime();
			    	$scope.task.succes = true;
		    		console.log($scope.taskActions);
			    	$scope.task.actions = angular.copy($scope.taskActions);
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
	    	$scope.task.endDate = new Date().getTime();
	    	$scope.task.succes = false;
	    	$(document).off();
	    	$location.path( "/task" );
	    }
	    $scope.continueSearch = function (){
	    	$.fancybox.close();
	    }
  }]);