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
	  		hideMenu();
	  	}
	  	
	  };
	
	  menufactory.getlist().then(function(json){
	     $scope.menuData = json.data;
	     $scope.getMenuItems(0, null);
	  });
	
	});
	  
