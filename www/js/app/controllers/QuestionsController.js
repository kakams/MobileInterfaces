  app.controller('QuestionsController', ['$scope', '$window','$location', '$http', 'userService', function($scope,$window,$location, $http, userService) {	

		$scope.user = userService;
		$scope.tasks = userService.tasks;
			
		$scope.bestError = false;
		$scope.innovationError = false;
		
		$scope.educationOptions = [
			{value: 'none', text: 'brak'},
			{value: 'basic', text: 'podstwowe / gimnazjalne'},
			{value: 'techniacal', text: 'zawodowe'},
			{value: 'middle', text: 'średnie'},
			{value: 'high', text: 'wyższe'}
		];
		$scope.education = $scope.user.education;
		$scope.interfaces = [
		    {text: 'Hamburger menu (#1)', value: 'hamburger', imgOpen: '../../../img/interfaces/hamburger_open.png', imgClose: '../../../img/interfaces/hamburger_close.png', coment: ""},
			{text: 'Bottom bar menu (#2)', value: 'bottom_bar', imgOpen: '../../../img/interfaces/bottom_bar_open.png', imgClose: '../../../img/interfaces/bottom_bar_close.png', coment: ""},
			{text: 'Interfejs desktopowy (#3)', value: 'desktop', imgOpen: '../../../img/interfaces/desktop_open.png', imgClose: '../../../img/interfaces/desktop_close.png', coment: ""},
			{text: 'Menu \"Wachlarz\" (#4)', value: 'wachlarz', imgOpen: '../../../img/interfaces/wachlarz_open.png', imgClose: '../../../img/interfaces/wachlarz_close.png', coment: ""},
		];
	    $scope.ratedInterfaces = [{},{},{},{}];
	  
	  
	    $scope.bestInterfaces = angular.copy($scope.interfaces);
	    $scope.bestRatedInterfaces = angular.copy($scope.ratedInterfaces);
	  
	    $scope.innovationInterfaces = angular.copy($scope.interfaces);
	    $scope.innovationRatedInterfaces = angular.copy($scope.ratedInterfaces);
	  
	    $scope.resetInnovation = function(){
		    $scope.innovationInterfaces = angular.copy($scope.interfaces);
		    $scope.innovationRatedInterfaces = angular.copy($scope.ratedInterfaces);
	    }

	    $scope.resetBest = function(){
		    $scope.bestInterfaces = angular.copy($scope.interfaces);
		    $scope.bestRatedInterfaces = angular.copy($scope.ratedInterfaces);
	    }
	    
	  
	  $scope.onDropInnovationInterfaceComplete=function(index, data, evt){
		  var indexFirst = $scope.innovationRatedInterfaces.indexOf(data);
		  
    	  if(typeof $scope.innovationRatedInterfaces[index].value === 'undefined'){
    		  if(indexFirst !== -1){
    			  $scope.innovationRatedInterfaces[indexFirst] = {};
    		  }
    		  else{
            	  $scope.innovationInterfaces.splice($scope.innovationInterfaces.indexOf(data), 1);
    		  }
    		  $scope.innovationRatedInterfaces[index] = data; 
    	  }
    	  else{
    		  if($scope.innovationRatedInterfaces[index] !== {} && $scope.innovationInterfaces.length > 0){
    			  for(var i = $scope.innovationRatedInterfaces.length - 1; i >= 0 ; i-- ){
    				  if(typeof $scope.innovationRatedInterfaces[i].value === 'undefined'){
    					  $scope.innovationRatedInterfaces.splice(i, 1);
    					  break;
    				  }
    			  }
            	  $scope.innovationInterfaces.splice($scope.innovationInterfaces.indexOf(data), 1);
	    		  $scope.innovationRatedInterfaces.splice(index, 0, data);
    		  }
    		  else{
				  $scope.innovationRatedInterfaces.splice(indexFirst, 1);
	    		  $scope.innovationRatedInterfaces.splice(index, 0, data);
    		  }
    	  }
    	  
      }
	  
	  $scope.onDropBestInterfaceComplete=function(index, data, evt){
		  var indexFirst = $scope.bestRatedInterfaces.indexOf(data);
		  
    	  if(typeof $scope.bestRatedInterfaces[index].value === 'undefined'){
    		  if(indexFirst !== -1){
    			  $scope.bestRatedInterfaces[indexFirst] = {};
    		  }
    		  else{
            	  $scope.bestInterfaces.splice($scope.bestInterfaces.indexOf(data), 1);
    		  }
    		  $scope.bestRatedInterfaces[index] = data; 
    	  }
    	  else{
    		  if($scope.bestRatedInterfaces[index] !== {} && $scope.bestInterfaces.length > 0){
    			  for(var i = $scope.bestRatedInterfaces.length - 1; i >= 0 ; i-- ){
    				  if(typeof $scope.bestRatedInterfaces[i].value === 'undefined'){
    					  console.log(i);
    					  $scope.bestRatedInterfaces.splice(i, 1);
    					  break;
    				  }
    			  }
            	  $scope.bestInterfaces.splice($scope.bestInterfaces.indexOf(data), 1);
	    		  $scope.bestRatedInterfaces.splice(index, 0, data);
    		  }
    		  else{
				  $scope.bestRatedInterfaces.splice(indexFirst, 1);
	    		  $scope.bestRatedInterfaces.splice(index, 0, data);
    		  }
    	  }
      }
	  
	  
	    
	    $scope.setSex = function(sex){
	    	if(sex !== 'man' && sex !== 'woman'){
	    		$scope.user.sex = '';
	    	}
	    	else{
	    		$scope.user.sex = sex;
	    	}
	    }
	    
	    $scope.setAge = function(age){
	    	if(age < 0 || age > 200 || isNaN(parseInt(age))){
	    		$scope.user.age = 0;
	    	}
	    	else{
	    		$scope.user.age = age;
	    	}
	    	
	    } 
	    $scope.setEducation = function(education){
	    	if(education !== 'basic' && education !== 'middle' && education !== 'high'){
		    	$scope.user.education = '';
	    	}
	    	else{
		    	$scope.user.education = education;
	    	}
	    	
	    }
	    
	    $scope.reload = function(){
	    	$window.location.href = '/';
	    }
	    
	    $scope.sendForm = function(){
			$scope.innovationError = false;
			$scope.bestError = false;
	    	angular.forEach($scope.bestRatedInterfaces, function(objInterface, key) {
		      if(typeof objInterface.value !== 'undefined'){
	    		  var task = getTaskByInterfaceName(objInterface.value);
	    		  if(task !== null){
	    			  task.bestRate = 4-key;
	    		  }
	    		  else{
	    			  //$scope.bestError = true;
	    		  }
		      }
		      else{
    			  //$scope.bestError = true;
		      }
    		});
	    	
	    	angular.forEach($scope.innovationRatedInterfaces , function(objInterface, key) {
			      if(typeof objInterface.value !== 'undefined'){
		    		  var task = getTaskByInterfaceName(objInterface.value);
		    		  if(task !== null){
		    			  task.innovationRate = 4-key;
		    		  }
		    		  else{
		    			  //$scope.innovationError = true;
		    		  }
			      }
			      else{
	    			  //$scope.innovationError = true;
			      }
	    		});
	    	if($scope.bestError === false && $scope.innovationError === false && $scope.user.sex !== '' && $scope.user.education !== '' && $scope.user.age !== null){
	    		angular.forEach($scope.tasks, function(task, key) {
	    			$scope.user.updateTaskInDatabase(task);
	      		});
    			$scope.user.updateUserInDatabase();
	    		$location.path( "/end" );
	    	}
	    }
	    
	    function getTaskByInterfaceName(name){
	    	var returnTask = null;
	    	angular.forEach($scope.tasks, function(task, key) {
    		  if(task.taskInterface.name === name){
    			  returnTask = task;
    		  }
    		});
	    	return returnTask;
	    }
  }]);
  