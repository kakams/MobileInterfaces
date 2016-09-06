
  app.controller('HamburgerController', ['$scope','$http','$location', 'userService','menufactory', function($scope,$http, $location, userService, menufactory) {
		$scope.menuData = [];
		$scope.productData = [];
		$scope.taskProduct = {};
		$scope.taskActions = [];
		$scope.task = userService.tasks[userService.curentTask];
		if($scope.task !== undefined){
			$scope.taskProduct = userService.tasks[userService.curentTask].product;
		}
		
		$scope.$on('$routeChangeSuccess', function() {
			var drawer = $('.drawer').drawer({
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
			onAction($scope.taskActions);
		});
		
		$scope.getProductList = function (categoryId){  
			if(categoryId === parseInt($scope.taskProduct.categoryId)){
				$scope.taskActions.push(createAction('proper_category', null));
			}
			else{
				$scope.taskActions.push(createAction('wrong_category', null));
			}
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
  