app.controller('StatisticsController', ['$scope','$http', function($scope,$http) {
	
	$scope.users = [];
	

	//all
	$scope.hamburgerTimes = [];
	$scope.barTimes = [];
	$scope.desktopTimes = [];
	$scope.wachlarzTimes = [];

	$scope.hamburgerActions = [];
	$scope.barActions = [];
	$scope.desktopActions = [];
	$scope.wachlarzActions = [];
	
	//menuFind
	$scope.hamburgerActionsToMenuFind = [];
	$scope.barActionsToMenuFind = [];
	$scope.desktopActionsToMenuFind = [];
	$scope.wachlarzActionsToMenuFind = [];
	
	$scope.hamburgerMenuFindTimes = [];
	$scope.barMenuFindTimes = [];
	$scope.desktopMenuFindTimes = [];
	$scope.wachlarzMenuFindTimes = [];
	
	//wrongCategory
	$scope.hamburgerWrongCategory = [];
	$scope.barWrongCategory = [];
	$scope.desktopWrongCategory = [];
	$scope.wachlarzWrongCategory = [];
	

	//properCategoryFind
	$scope.hamburgerActionsToProperCategoryFind= [];
	$scope.barActionsToProperCategoryFind = [];
	$scope.desktopActionsToProperCategoryFind = [];
	$scope.wachlarzActionsToProperCategoryFind = [];
	
	$scope.hamburgerMenuProperCategoryFindTimes = [];
	$scope.barMenuProperCategoryFindTimes = [];
	$scope.desktopMenuProperCategoryFindTimes = [];
	$scope.wachlarzMenuProperCategoryFindTimes = [];
	
	
	function getUserList(){   
		$http({method: 'GET', url: '../../../services/getUserList.php'}).success(function(json) {
			$scope.users = json;
			getStats($scope.users);
	    });
    };
    
    function getStats(users){
    	angular.forEach(users, function (user, key) {
    		//client

        	angular.forEach(user.tasks, function (task, key) {var actionCounter = 0;
    			//task
	    		var actionCounter = 0;
	    		var actionCounterToMenuFind = 0;
	    		var menuActionFindTime = 0;
	    		var menuFind = false;
	    		
	    		angular.forEach(task.actions, function (action, key) {
	    			//action
	    			if((action.type === "tap_menu_item" || action.type === "menu_toggle") && menuFind === false){
	    				menuFind = true;
	    				switch(parseInt(task.idInterface)) {
			        	    case 0:
			        	    	$scope.hamburgerMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.hamburgerActionsToMenuFind.push(actionCounterToMenuFind);
			        	        break;
			        	    case 1:
			        	    	$scope.barMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.barActionsToMenuFind.push(actionCounterToMenuFind);
			        	        break;
			        	    case 2:
			        	    	$scope.desktopMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.desktopActionsToMenuFind.push(actionCounterToMenuFind);
			        	        break;
			        	    case 3:
			        	    	$scope.wachlarzMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.wachlarzActionsToMenuFind.push(actionCounterToMenuFind);
			        	        break;
			        	    default:
			        	        break;
	    				}
	        	    	
	    			}
	    			if(action.type === "tap" || action.type === "scroll" ){
	    				actionCounter += 1;
	    				if(menuFind === false){
	    					actionCounterToMenuFind +=1;
	    				}
	    			}
	    		});
	    		
        		switch(parseInt(task.idInterface)) {
	        	    case 0:
	        	    	$scope.hamburgerTimes.push((task.endTime-task.startTime)/1000);
	        	    	$scope.hamburgerActions.push(actionCounter);
	        	        break;
	        	    case 1:
	        	    	$scope.barTimes.push((task.endTime-task.startTime)/1000);
	        	    	$scope.barActions.push(actionCounter);
	        	        break;
	        	    case 2:
	        	    	$scope.desktopTimes.push((task.endTime-task.startTime)/1000);
	        	    	$scope.desktopActions.push(actionCounter);
	        	        break;
	        	    case 3:
	        	    	$scope.wachlarzTimes.push((task.endTime-task.startTime)/1000);
	        	    	$scope.wachlarzActions.push(actionCounter);
	        	        break;
	        	    default:
	        	        break;
	        	}
        		
        	});
        	
        });  
    	
    	$scope.options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
    	};
    	$scope.getAvarage = function(table){
    		var sum = 0;
    		angular.forEach(table, function (value, key) {
    			sum += parseFloat(value);
    		});
    		
    		return sum/table.length;
    	}
    }
    
    
    getUserList();
    
}]);