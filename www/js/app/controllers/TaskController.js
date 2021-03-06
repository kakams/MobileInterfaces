  app.controller('TaskController', ['$scope', '$location', 'userService', function($scope,$location, userService) {	
    	
	    $scope.user = {};
	    $scope.user = userService;
	    $scope.task = {};
	    if($scope.user.createDate !== ''){
		    $scope.user.curentTask = $scope.user.curentTask + 1;
		    if($scope.user.curentTask < $scope.user.tasks.length){
			    $scope.task = $scope.user.tasks[$scope.user.curentTask];
			    $scope.product = $scope.task.product;
		    }
		    else{
	    		$location.path( "/questions" );
		    }
	    }
	    else{
    		$location.path( "/" );
	    }
	    
	    
	    $scope.start = function(){
	    	$scope.task.startTime = new Date().getTime(); 
    		$location.path( "/"+$scope.task.taskInterface.name );
	    }
  }]);
  