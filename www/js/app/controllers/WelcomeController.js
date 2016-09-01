  app.controller('WelcomeController', ['$scope', '$location', '$http', 'userService', function($scope,$location, $http, userService) {	
    	
	    $scope.user = {};
	    $scope.hand = '';
	    $scope.device = '';
	    var interfaces = [{'name':'hamburger', 'id':0}, {'name':'bottom_bar', 'id':1}, {'name':'desktop', 'id':2}, {'name':'wachlarz', 'id':3}];
    	getRandProductList(interfaces.length);
    	
	    function getRandProductList(amount){   
			$http({method: 'GET', url: '../../../services/getRandProducts.php?amount='+amount}).success(function(json) {
				$scope.user = userService.createUser(getTaskList(interfaces, json));
		    });
		};

	    function getTaskList(interfaces, products){
	    	var tasks = [];
	    	var task = {};
	    	for(var i = 0; interfaces.length > i; i++){
	    		task = {};
	    		task.taskInterface = interfaces[i];
	    		task.product = products[i];
	    		task.succes = false;
	    		tasks.push(task);
	    	}
	    	return tasks;
	    }
	    
	    $scope.start = function(){
	    	if($scope.hand !== '' && $scope.device !== '' && $scope.user !== {}){
	    		$scope.user.device = $scope.device;
	    		$scope.user.hand = $scope.hand;
	    		$scope.user.addUserToDatabase();
	    		$location.path( "/task" );
	    	}
	    	else{
	    		
	    	}
	    }
	    $scope.setDevice = function(device){
	    	if(device !== 'tablet' && device !== 'smartphone'){
	    		$scope.device = '';
	    	}
	    	else{
	    		$scope.device = device;
	    	}
	    }
	    $scope.setHand = function(hand){
	    	if(hand !== 'right' && hand !== 'left'){
	    		$scope.hand = '';
	    	}
	    	else{
	    		$scope.hand = hand;
	    	}
	    }
	  

  }]);
  