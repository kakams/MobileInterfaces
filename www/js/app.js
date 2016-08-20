

var app = angular.module('mobileInterfaces', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/desktop', {
        templateUrl: '../templates/desktop/index.html',
        controller: "DesktopController"
    }).
    when('/bottom_bar', {
        templateUrl: '../templates/bottom_bar/index.html',
        controller: 'BottomBarController'
    }).
    when('/hamburger', {
        templateUrl: '../templates/hamburger/index.html',
        controller: 'HamburgerController'
    }).
    when('/wachlarz', {
        templateUrl: '../templates/wachlarz/index.html',
        controller: 'WachlarzController'
    }).
    otherwise({
        templateUrl: '../welcome.html',
        controller: "DesktopController"
    });
}]);







  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../json/menu.json'}).success(function(json) {
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

  
  app.controller('DesktopController', function($scope, $http, menufactory) {
	$scope.menuData = [];
	$scope.productData = [];
	
	
	$scope.getProductList = function (categoryId){   
		$http({method: 'GET', url: '../services/getProductsList.php?catId='+categoryId}).success(function(json) {
			$scope.productData = json;
	    });
    };
    
    menufactory.getlist().then(function(json){
       $scope.menuData = json.data;
    });
  
  });
  
  app.controller('BottomBarController', function($scope,$http, menufactory) {
		$scope.menuData = [];
		$scope.menuItems = [];
		$scope.backID = 0;
		$scope.productData = [];
		
		
		function getProductList(categoryId){   
			$http({method: 'GET', url: '../services/getProductsList.php?catId='+categoryId}).success(function(json) {
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
  app.controller('HamburgerController', function($scope,$http, menufactory) {
		$scope.menuData = [];
		$scope.productData = [];
		
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
			$http({method: 'GET', url: '../services/getProductsList.php?catId='+categoryId}).success(function(json) {
				$scope.productData = json;
		    });
	    };
		
		

	    menufactory.getlist().then(function(json){
	       $scope.menuData = json.data;
	    });
	  
  });
  
  app.directive('resize', function ($window) {
	    return function (scope, element) {
	        var w = angular.element($window);
	        scope.getWindowDimensions = function () {
	            return {
	                'h': w.height(),
	                'w': w.width()
	            };
	        };
	        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
	            scope.windowHeight = newValue.h;
	            scope.windowWidth = newValue.w;
	            if(scope.windowHeight > scope.windowWidth){
	            	scope.menuSize = scope.windowWidth *0.9;
	            }
	            else{
	            	scope.menuSize = scope.windowHeight *0.9;
	            }
	            
	            scope.style = function () {
	                return {
	                    'height': (newValue.h - 100) + 'px',
	                        'width': (newValue.w - 100) + 'px'
	                };
	            };

	        }, true);

	        w.bind('resize', function () {
	            scope.$apply();
	        });
	    }
	});
		
	app.controller('WachlarzController', function($scope,$http, menufactory) {
		$scope.menuData = [];
		$scope.menuItems = ['','',''];
		$scope.productData = [];
		
		function getProductList(categoryId){   
			$http({method: 'GET', url: '../../../services/getProductsList.php?catId='+categoryId}).success(function(json) {
				$scope.productData = json;
		    });
		};
		
		$scope.$on('$routeChangeSuccess', function() {
			$(document).on('click', '.css_menu', function(e) {
			  	 if (e.target !== this){
			  	    return;
			  	  }
				  var menu = $(this);
				  $(menu).hide();
			  	  document.elementFromPoint(e.clientX, e.clientY).click();
				  $(menu).show();
			  	});

				$(document).on('click', '.css_menu li', function(e) {
			  	  if (e.target !== this){
			  	    return;
			  	  }
				  var menu = $(this).parent();
				  $(menu).hide();
			  	  document.elementFromPoint(e.clientX, e.clientY).click();
				  $(menu).show();
			  	});

				$(document).on('click','#menu_button_bg', function(e) {
				  if (e.target !== this){
				    return;
				  }
			  	  var menu = $(this).parent();
			  	  $(menu).hide();
			    	  document.elementFromPoint(e.clientX, e.clientY).click();
			  	  $(menu).show();
			    });
			  	$('#menu_button').on('click', function() {
			  		togleMenu();
			    });
			  	
			  	$('#menu_wachlarz #overlay').on('click', function() {
			  		hideMenu();
			  	});
		});
		
		$scope.getLiStyle = function(index, length, stepIndex, menuSize){
			var startAngle = 0;
			var maxAngle = 90;
			var angle = maxAngle / length;
			var rotate = startAngle+angle*index;
			var skew = 90-angle;
			var step = menuSize/4;
			var size = menuSize - stepIndex*step;
			return { 
				width: size+"px",
				height: size+"px",
				transform: "rotate("+rotate+"deg) skew("+skew+"deg)"
			}
		}
		$scope.getUlStyle = function(stepIndex){
			var step = $scope.menuSize/4;
			var size = $scope.menuSize - stepIndex*step;
	
			return { 
				width: size+"px",
				height: size+"px"
			}
		}
		$scope.getMenuItemStyle = function(stepIndex, menuLength){
			var step = $scope.menuSize/4;
			var size = $scope.menuSize - (stepIndex+1)*step;
			var width = ((Math.PI*size)/2) /(menuLength);
			
			return { 
				width: width+"px",
				height: step+"px"
			}
		}
		$scope.getMenuItemSpanStyle = function(){
			var step = $scope.menuSize/4;
			return {
				"padding-top":step*0.05+"px"
			}
		}
		$scope.getSpanStyle = function(index, length, stepIndex, menuSize){
			var startAngle = 0;
			var maxAngle = 90;
			var angle = maxAngle / length;
			var rotate = startAngle+angle*index;
			var skew = 90-angle;
			var minusSkew = (-1)*skew;
			var rotateSkew = (-1)*angle/2 - skew;
			var step = menuSize/4;
			var size = menuSize - stepIndex*step;
			return { 
				width: 2*size+"px",
				height: 2*size+"px",
				bottom: (-1)*size+"px",
				right: (-1)*size+"px",
				transform: "skew("+minusSkew+"deg) rotate("+rotateSkew+"deg) scale(1)"
			}
		}
		$scope.getMenuButtonBGStyle = function(menuSize){
			var size = menuSize/2;
			var halfSize = size/2;
			return { 
				width: size,
				height: size,
				bottom: "-"+halfSize+"px",
				right: "-"+halfSize+"px"
			}
		}
		$scope.getMenuButtonStyle = function(menuSize){
			var size = menuSize/2;
			var halfSize = size/2;
			var buttonSize = halfSize*0.6;
			var position = halfSize*0.1;
			return { 
				'width': buttonSize+"px",
				'height': buttonSize+"px",
				'line-height': buttonSize*0.67+"px",
				'bottom': position+"px",
				'right': position+"px"
			}
		}
		
	  $scope.getMenuItems = function(elementId){
	  	var menuData = $scope.menuData;
			var unity = 0;
			var decimal = 0;
			var hundreds = 0;
			
	  	if(isNaN(elementId) || elementId < 0 || elementId > 999){
	  		elementId = 0;
	  	}
	  	unity = elementId%10;
	  	decimal = ((elementId-unity)%100)/10;
	  	hundreds = (elementId-unity-10*decimal)/100;
	  	
	  	if(elementId === 0){
	  		$scope.menuItems[0] = menuData;
	  		$scope.menuItems[1] = [''];
	  		$scope.menuItems[2] = [''];
	  	}
	  	else if(decimal === 0 && unity > 0 && unity <= menuData.length){
	  		$scope.menuItems[1] = menuData[unity-1].childrens;
	  		$scope.menuItems[2] = [''];
	  	}
	  	else if(hundreds === 0 && unity > 0 && decimal > 0 && decimal <= menuData.length && unity <= menuData[decimal-1].childrens.length){
	  		$scope.menuItems[2] = menuData[decimal-1].childrens[unity-1].childrens;
	  	}
	  	else{
	  		getProductList(elementId);
	  	}
	  	
	  };
	
	  menufactory.getlist().then(function(json){
	     $scope.menuData = json.data;
	     $scope.getMenuItems(0, null);
	  });
	
	});
	  
