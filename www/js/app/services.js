  app.factory('menufactory', function ($http, $q){   
	    this.getlist = function(){            
	        return $http({method: 'GET', url: '../../json/menu.json'}).success(function(json) {
		    	return json;
		    });
	    }
	    return this;
  });
  app.factory('userService', ['$window', function($window) {
	  
	    var user = {
	    		browser: '',
	    		device: '',
	    		system: '',
	    		hand: '', 
	    		createDate: '',
	    		curentTask: '',
	    		tasks: []
	    };
	    /*
	    
	    var task = {
	    		taskInterface: '', //hamburger, bottom_bar, desktop, wachlarz
	    		product: '',
	    		startTime: '',
	    		endTime: '',
	    		actions: []
	    }
	    
	    var action ={
	    	type: '', //tap, first_tap, menu_tap, slide, first_menu_tap, buy_wrong_tap, succes_tap	
	    	time: '',
	    	screenWidth: '',
	    	screenheight: '',
	    	xPosition: '',
	    	yPosition: '',
	    	xFinishPosition: '',
	    	yFinishPosition: ''
	    };*/
	    
	    user.createUser = function (tasks){
	    	user.browser = getBrowserName();
	    	user.system = getSystemName();
	    	user.createDate = new Date().getTime();
	    	user.tasks = tasks;
	    	user.curentTask = -1;
	    	return user;
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