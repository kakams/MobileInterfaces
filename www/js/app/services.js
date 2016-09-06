  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../../json/menu.json'}).success(function(json) {
		    	return json;
		    });
	    }
	    return this;
  });
  app.factory('userService', ['$window', '$http', function($window, $http) {
	  
	    var user = {
	    		browser: '',
	    		device: '',
	    		system: '',
	    		hand: '', 
	    		sex: '', 
	    		createDate: '',
	    		curentTask: -1,
	    		tasks: []
	    };
	    
	    
	    user.createUser = function (tasks){
	    	user.id = -2;
	    	user.browser = getBrowserName();
	    	user.system = getSystemName();
	    	user.createDate = new Date().getTime();
	    	user.tasks = tasks;
	    	user.device = '';
	    	user.sex = '';
	    	user.age = 0;
	    	user.curentTask = -1;
	    	user.hand = '';
	    	return user;
	    };
	    user.updateUserInDatabase = function(){
	    	$http({method: 'POST', url: '../../services/updateUser.php?userId='+user.id+'&device='+user.device+'&age='+user.age+'&hand='+user.hand+'&sex='+user.sex}).success(function(data, status, headers, config){
	    		
	        });
	    };

	    user.addUserTasksToDatabase = function(){
			angular.forEach(user.tasks, function(task, key) {
				  $http({method: 'POST', url: '../../services/addUserTask.php?userId='+user.id+'&productId='+task.product.id+'&interfaceId='+task.taskInterface.id}).success(function(data){
		    			task.taskId = data;
		    	  });
			});
	    	
	    };
	    user.addTaskActionsToDatabase = function(){
	    	if(user.curentTask >= 0 && user.curentTask < user.tasks.length){
	    		
		    	var actions = user.tasks[user.curentTask].actions;
		    	
		    	if(typeof actions !== 'undefined'){
			    	for(var i = 0; i < actions.length; i++){
			    		$http({method: 'POST', url: '../../services/addActionTask.php?taskId='+user.tasks[user.curentTask].taskId+'&type='+actions[i].type+'&time='+actions[i].time+'&screenWidth='+actions[i].screenWidth+'&screenHeight='+actions[i].screenHeight+'&xPosition='+actions[i].xPosition+'&yPosition='+actions[i].yPosition+'&xPositionFinish='+actions[i].xPositionFinish+'&yPositionFinish='+actions[i].yPositionFinish}).success(function(){
			    			
			    		});
			    	}
		    	}
		    	user.updateTaskInDatabase(user.tasks[user.curentTask]);
	    	}
	    };
	    
	    user.addUserToDatabase = function(){
	    	$http({method: 'POST', url: '../../services/addUser.php?device='+user.device+'&browser='+user.browser+'&age='+user.age+'&system='+user.system+'&hand='+user.hand+'&sex='+user.sex+'&createdate='+user.createDate}).success(function(data, status, headers, config){
	    		user.id = data;
	    		user.addUserTasksToDatabase();
	        });
	    };
	    
	    user.updateTaskInDatabase = function(task){
	    	$http({method: 'POST', url: '../../services/updateTask.php?taskId='+task.taskId+'&startTime='+task.startTime+'&endTime='+task.endTime+'&success='+task.success}).success(function(data, status, headers, config){

	        });
	    };
	    
	    function getSystemName(){
	    	 var os = 'unknown';
	         var nAgt = $window.navigator.userAgent;
	         var clientStrings = [
	             {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
	             {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
	             {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
	             {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
	             {s:'Windows Vista', r:/Windows NT 6.0/},
	             {s:'Windows Server 2003', r:/Windows NT 5.2/},
	             {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
	             {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
	             {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
	             {s:'Windows 98', r:/(Windows 98|Win98)/},
	             {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
	             {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
	             {s:'Windows CE', r:/Windows CE/},
	             {s:'Windows 3.11', r:/Win16/},
	             {s:'Android', r:/Android/},
	             {s:'Open BSD', r:/OpenBSD/},
	             {s:'Sun OS', r:/SunOS/},
	             {s:'Linux', r:/(Linux|X11)/},
	             {s:'iOS', r:/(iPhone|iPad|iPod)/},
	             {s:'Mac OS X', r:/Mac OS X/},
	             {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
	             {s:'QNX', r:/QNX/},
	             {s:'UNIX', r:/UNIX/},
	             {s:'BeOS', r:/BeOS/},
	             {s:'OS/2', r:/OS\/2/},
	             {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
	         ];
	         for (var id in clientStrings) {
	             var cs = clientStrings[id];
	             if (cs.r.test(nAgt)) {
	                 os = cs.s;
	                 break;
	             }
	         }
	         return os;
	    }
	    
	    function getBrowserName(){
	    	var userAgent = $window.navigator.userAgent;

	        var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

	        for(var key in browsers) {
	            if (browsers[key].test(userAgent)) {
	                return key;
	            }
	       };

	       return 'unknown';
	    }
	    
	    
	    return user;
  }]);
  
  app.filter('price', function() {
	    return function(value) {
	        return parseFloat(value).toFixed(2);
	    }
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