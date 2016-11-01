app.controller('StatisticsController', ['$scope','$http', function($scope,$http) {
	
	$scope.users = [];
	var debug = false;
	
	$scope.diagramOptions = [{id: 0, title: "Średni czas zadania"},
	                         {id: 1, title: "Ilość akcji zadania"},
	                         {id: 2, title: "Średni czas znalezienia menu"},
	                         {id: 3, title: "Ilość akcji do znalezienia menu"},
	                         {id: 4, title: "Ilość błędnych wyborów kategorii"},
	                         {id: 5, title: "Średni czas znalezienia właściwej kategorii"},
	                         {id: 6, title: "Ilość akcji do znalezienia właściwej kategorii"},
	                         {id: 7, title: "Ilość rezygnacji"},
	                         {id: 8, title: "Średni błąd MSD"}];
	
	$scope.diagramModel = $scope.diagramOptions[0];

	$scope.diagramSeries = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	$scope.diagramData = [];
	$scope.diagramLabels = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	$scope.diagramType = "bar";
	
	//all
	$scope.hamburgerTimes = [];
	$scope.barTimes = [];
	$scope.desktopTimes = [];
	$scope.wachlarzTimes = [];

	$scope.hamburgerActions = [];
	$scope.barActions = [];
	$scope.desktopActions = [];
	$scope.wachlarzActions = [];

	$scope.hamburgerActionsAmount = [];
	$scope.barActionsAmount = [];
	$scope.desktopActionsAmount = [];
	$scope.wachlarzActionsAmount = [];
	
	//menuFind
	
	$scope.hamburgerMenuFindTimes = [];
	$scope.barMenuFindTimes = [];
	$scope.desktopMenuFindTimes = [];
	$scope.wachlarzMenuFindTimes = [];
	
	$scope.hamburgerActionsToMenuFind = [];
	$scope.barActionsToMenuFind = [];
	$scope.desktopActionsToMenuFind = [];
	$scope.wachlarzActionsToMenuFind = [];
	
	
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
	
	//cancelCounter
	$scope.hamburgerCancelCounter = 0;
	$scope.barCancelCounter = 0;
	$scope.desktopCancelCounter = 0;
	$scope.wachlarzCancelCounter = 0;
	

	//errorRate
	$scope.hamburgerErrorRates= [];
	$scope.barErrorRates = [];
	$scope.desktopErrorRates = [];
	$scope.wachlarzErrorRates = [];

	
	function getErrorRate(actions, optimalString){
		
		var actionsString = "";

		var nextARemove = false;
		angular.forEach(actions, function (action, key) {
			if(action.type === "tap"){
				if(nextARemove !== true){
					actionsString = actionsString+"A";
				}
				else{
					nextARemove = false;
				}
			}
			else if(action.type === "menu_toggle"){
				if(actionsString.endsWith("A") === true){
					actionsString = actionsString.substring(0, actionsString.length-1);
				}
				else{
					nextARemove = true;
				}
				actionsString = actionsString+"B";
			}
			else if(action.type === "tap_menu_item"){
				if(actionsString.endsWith("A") === true){
					actionsString = actionsString.substring(0, actionsString.length-1);
				}
				else{
					nextARemove = true;
				}
				actionsString = actionsString+"C";
			}
			else if(action.type === "scroll"){
				actionsString = actionsString+"D";
			}
			else if(action.type === "wrong_category"){
				actionsString = actionsString+"E";
			}
			else if(action.type === "proper_category"){
				if(actionsString.endsWith("A") === true){
					actionsString = actionsString.substring(0, actionsString.length-1);
				}
				else{
					nextARemove = true;
				}
				actionsString = actionsString+"F";
			}
			else if(action.type === "wrong_product"){
				actionsString = actionsString+"G";
			}
		});
		
		actionsString = actionsString+"H";

		var result = [];
		var msdError = 0;
		result = compareTwoStrings(optimalString, actionsString);
		msdError = calculateMSD(result[0].length, result[1].length);
    	if(debug === true){
    		console.log("MSD Error: "+msdError+"%");
    	}
		return msdError;
	}
	
	function getUserList(){   
		$http({method: 'GET', url: '../../../services/getUserList.php'}).success(function(json) {
			$scope.users = json;
			getStats($scope.users);
	    });
    };
    
    function calculateMSD(correct, errors){
    	return Math.round((errors / (correct + errors))*10000)/100;
    }
    
    function compareTwoStrings(pattern, reuslt){
    	var actualChar ="";
    	var index = -1;
    	var resultTrimed = reuslt;
    	var indexNext = -1;
    	var mistake = "";
		var correct = "";
		
    	for(var i = 0; i < pattern.length; i++){
    		actualChar = pattern[i];
    		if(actualChar !== "!"){
    			index = resultTrimed.indexOf(actualChar);
    			if(index !== -1){
    				mistake += resultTrimed.substring(0, index);
    				correct += actualChar;
    				resultTrimed = resultTrimed.substring(index+1, resultTrimed.length);
    			}
    		}
    		else{
    			i++;
    			if(i < pattern.length){
	    			actualChar = pattern[i];
	    			index 		= resultTrimed.indexOf(actualChar);
	    			if((i+1) < pattern.length){
		    			indexNext 	= resultTrimed.indexOf(pattern[i+1]);
		    			if(index !== -1 && pattern[i+1] !== "!"){
		    				if(index < indexNext){
		    					mistake += resultTrimed.substring(0, index);
		        				correct += actualChar;
		        				resultTrimed = resultTrimed.substring(index+1, resultTrimed.length);
		    				}
		    				
		    			}
	    			}
	    			else if(index > 0){
	    				mistake += patternTrimed.substring(0, index);
        				correct += actualChar;
	    			}
    			}
    		}
    	}
    	if(debug === true){
			console.log("pattern: "+pattern);
			console.log("reuslt: "+reuslt);
			
			console.log("correct: "+correct);
			console.log("mistake: "+mistake);
    	}
		return [correct, mistake];
    }
    function sortActionsByTime(actions){
    	actions.sort(function(a, b) {
    	    return parseInt(a.time) - parseInt(b.time);
    	});
    }
    
    function getStats(users){
    	angular.forEach(users, function (user, key) {
    		//client

        	angular.forEach(user.tasks, function (task, key1) {
    			//task
	    		var actionCounter = 0; 
	    		var wrongCatCounter = 0;
	    		var actionCounterToMenuFind = 0;
	    		var menuActionFindTime = 0;
	    		var menuFind = false;
	    		var catFind = false;
	    		var action1Time = parseInt(task.actions[0].time);
	    		//console.log("--");
	    		//console.log(task.idInterface);
	    		//console.log(task.actions);
	    		
	    		angular.forEach(task.actions, function (action, key2) {
	    			//action
	    			//console.log(action.type);
	    			//console.log(parseInt(action.time) - action1Time);
	    			if(action.type === "tap" || action.type === "scroll" ){
	    				actionCounter += 1;
	    			}
	    			
	    			if(action.type === "wrong_category" ){
	    				wrongCatCounter +=1;
	    			}
	    			
	    			if(action.type === "proper_category" && catFind === false){
	    				catFind = true;
	    				switch(parseInt(task.idInterface)) {
			        	    case 0:
			        	    	$scope.hamburgerMenuProperCategoryFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.hamburgerActionsToProperCategoryFind.push(actionCounter);
			        	        break;
			        	    case 1:
			        	    	$scope.barMenuProperCategoryFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.barActionsToProperCategoryFind.push(actionCounter);
			        	        break;
			        	    case 2:
			        	    	$scope.desktopMenuProperCategoryFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.desktopActionsToProperCategoryFind.push(actionCounter);
			        	        break;
			        	    case 3:
			        	    	$scope.wachlarzMenuProperCategoryFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.wachlarzActionsToProperCategoryFind.push(actionCounter);
			        	        break;
			        	    default:
			        	        break;
	    				}
	        	    	
	    			}
	    			if((action.type === "tap_menu_item" || action.type === "menu_toggle") && menuFind === false){
	    				menuFind = true;
	    				switch(parseInt(task.idInterface)) {
			        	    case 0:
			        	    	$scope.hamburgerMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.hamburgerActionsToMenuFind.push(actionCounter);
			        	        break;
			        	    case 1:
			        	    	$scope.barMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.barActionsToMenuFind.push(actionCounter);
			        	        break;
			        	    case 2:
			        	    	$scope.desktopMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.desktopActionsToMenuFind.push(actionCounter);
			        	        break;
			        	    case 3:
			        	    	$scope.wachlarzMenuFindTimes.push((action.time-task.startTime)/1000);
			        	    	$scope.wachlarzActionsToMenuFind.push(actionCounter);
			        	        break;
			        	    default:
			        	        break;
	    				}
	        	    	
	    			}
	    		});
	    		
        		switch(parseInt(task.idInterface)) {
	        	    case 0:
	        	    	if(task.success === "0"){
	        	    		$scope.hamburgerCancelCounter += 1;
	    	    		}
	        	    	else{
		        	    	$scope.hamburgerTimes.push((task.endTime-task.startTime)/1000);
		        	    	$scope.hamburgerActions.push(actionCounter+1);
		        	    	$scope.hamburgerWrongCategory.push(wrongCatCounter);
		        	    	var hPattern =  "B!DCCF!DH";
		        	    	if(key ===  users.length-1 && debug === true){
			        	    	console.log("---------------------");
			        	    	console.log("Hamburger");
			        	    	var errorRate = getErrorRate(task.actions, hPattern);
			        	    	$scope.hamburgerErrorRates.push(errorRate);
			        	    	console.log("---------------------");
		        	    	}
		        	    	else{
			        	    	var errorRate = getErrorRate(task.actions, hPattern);
			        	    	$scope.hamburgerErrorRates.push(errorRate);
		        	    	}
		        	    }
	        	        break;
	        	    case 1:
	        	    	if(task.success === "0"){
	        	    		$scope.barCancelCounter += 1;
	    	    		}
	        	    	else{
		        	    	$scope.barTimes.push((task.endTime-task.startTime)/1000);
		        	    	$scope.barActions.push(actionCounter+1);
		        	    	$scope.barWrongCategory.push(wrongCatCounter);
		        	    	
		        	    	var bPattern = "CCCF!DH";
		        	    	if(key === users.length-1 && debug === true){
			        	    	console.log("Bar");
			        	    	var errorRate = getErrorRate(task.actions, bPattern);
			        	    	$scope.barErrorRates.push(errorRate);
			        	    	console.log("---------------------");
		        	    	}
		        	    	else{
			        	    	var errorRate = getErrorRate(task.actions, bPattern);
			        	    	$scope.barErrorRates.push(errorRate);
		        	    	}
	        	    	}
	        	        break;
	        	    case 2:
	        	    	if(task.success === "0"){
	        	    		$scope.desktopCancelCounter += 1;
	    	    		}
	        	    	else{
		        	    	$scope.desktopTimes.push((task.endTime-task.startTime)/1000);
		        	    	$scope.desktopActions.push(actionCounter+1);
		        	    	$scope.desktopWrongCategory.push(wrongCatCounter);

		        	    	var dPattern = "BCBF!DH";
		        	    	if(key === users.length-1 && debug === true){
			        	    	console.log("Desktop");
			        	    	var errorRate = getErrorRate(task.actions, dPattern);
			        	    	$scope.desktopErrorRates.push(errorRate);
			        	    	console.log("---------------------");
		        	    	}
		        	    	else{
			        	    	var errorRate = getErrorRate(task.actions, dPattern);
			        	    	$scope.desktopErrorRates.push(errorRate);
		        	    	}
	        	    	}
	        	        break;
	        	    case 3:
	        	    	if(task.success === "0"){
	        	    		$scope.wachlarzCancelCounter += 1;
	    	    		}
	        	    	else{
		        	    	$scope.wachlarzTimes.push((task.endTime-task.startTime)/1000);
		        	    	$scope.wachlarzActions.push(actionCounter+1);
		        	    	$scope.wachlarzWrongCategory.push(wrongCatCounter);
		        	    	
		        	    	var wPattern = "BCCCF!DH";
		        	    	if(key === users.length-1 && debug === true){
			        	    	console.log("Wachlarz");
			        	    	var errorRate = getErrorRate(task.actions, wPattern);
			        	    	$scope.wachlarzErrorRates.push(errorRate);
			        	    	console.log("---------------------");
		        	    	}
		        	    	else{
			        	    	var errorRate = getErrorRate(task.actions, wPattern);
			        	    	$scope.wachlarzErrorRates.push(errorRate);
		        	    	}
	        	    	}
	        	        break;
	        	    default:
	        	        break;
	        	}
        		
        	});
        	
        });  
    	$scope.getDiagramData(0);
    	
    }

	
	$scope.options = {
	    legend: { display: true },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
	};
	$scope.getDiagramData = function(value){
		switch(value) {
	    case 0:
	    	$scope.diagramData = [
                      getAvarage($scope.hamburgerTimes), 
                      getAvarage($scope.barTimes), 
                      getAvarage($scope.desktopTimes),
                      getAvarage($scope.wachlarzTimes)];
	    	$scope.diagramLabels = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	    	$scope.diagramType = "bar";
	        break;
	    case 1:
	    	$scope.diagramData = [
                      getAmountOfValues($scope.hamburgerActions), 
                      getAmountOfValues($scope.barActions), 
                      getAmountOfValues($scope.desktopActions), 
                      getAmountOfValues($scope.wachlarzActions)];
	    	
	    	var maxValue = getMaxTableValueFromTables([
                      $scope.hamburgerActions, 
                      $scope.barActions, 
                      $scope.desktopActions, 
                      $scope.wachlarzActions]);
	    	
	    	$scope.diagramLabels = getLabelsGauss(maxValue);
	    	$scope.diagramType = "line";
	        break;
	    case 2:
	    	$scope.diagramData = [
                      getAvarage($scope.hamburgerMenuFindTimes), 
                      getAvarage($scope.barMenuFindTimes), 
                      getAvarage($scope.desktopMenuFindTimes),
                      getAvarage($scope.wachlarzMenuFindTimes)];
	    	$scope.diagramLabels = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	    	$scope.diagramType = "bar";
	        break;
	    case 3:
	    	$scope.diagramData = [
                      getAmountOfValues($scope.hamburgerActionsToMenuFind), 
                      getAmountOfValues($scope.barActionsToMenuFind), 
                      getAmountOfValues($scope.desktopActionsToMenuFind), 
                      getAmountOfValues($scope.wachlarzActionsToMenuFind)
            ];
	    	
	    	var maxValue = getMaxTableValueFromTables([
                      $scope.hamburgerActionsToMenuFind, 
                      $scope.barActionsToMenuFind, 
                      $scope.desktopActionsToMenuFind, 
                      $scope.wachlarzActionsToMenuFind
            ]);
	    	
	    	$scope.diagramLabels = getLabelsGauss(maxValue);
	    	$scope.diagramType = "line";
	        break;
	    case 4:
	    	
	    	$scope.diagramData = [
	                  getAmountOfValues($scope.hamburgerWrongCategory), 
            		  getAmountOfValues($scope.barWrongCategory), 
    				  getAmountOfValues($scope.desktopWrongCategory), 
					  getAmountOfValues($scope.wachlarzWrongCategory)
	        ];
	    	var maxValue = getMaxTableValueFromTables([
                       $scope.hamburgerWrongCategory, 
                       $scope.barWrongCategory, 
                       $scope.desktopWrongCategory, 
                       $scope.wachlarzWrongCategory
             ]);
 	    	
 	    	$scope.diagramLabels = getLabelsGauss(maxValue);
 	    	$scope.diagramType = "line";
	        break;
	    case 5:
	    	$scope.diagramData = [
                      getAvarage($scope.hamburgerMenuProperCategoryFindTimes), 
                      getAvarage($scope.barMenuProperCategoryFindTimes), 
                      getAvarage($scope.desktopMenuProperCategoryFindTimes),
                      getAvarage($scope.wachlarzMenuProperCategoryFindTimes)];
	    	$scope.diagramLabels = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	    	$scope.diagramType = "bar";
	        break;
	    case 6:
	    	$scope.diagramData = [
                      getAmountOfValues($scope.hamburgerActionsToProperCategoryFind), 
                      getAmountOfValues($scope.barActionsToProperCategoryFind), 
                      getAmountOfValues($scope.desktopActionsToProperCategoryFind), 
                      getAmountOfValues($scope.wachlarzActionsToProperCategoryFind)
            ];
	    	
	    	var maxValue = getMaxTableValueFromTables([
                      $scope.hamburgerActionsToProperCategoryFind, 
                      $scope.barActionsToProperCategoryFind, 
                      $scope.desktopActionsToProperCategoryFind, 
                      $scope.wachlarzActionsToProperCategoryFind
            ]);
	    	
	    	$scope.diagramLabels = getLabelsGauss(maxValue);
	    	$scope.diagramType = "line";
	        break;
	    case 7:
	    	$scope.diagramData = [
	                  getAmountOfValues($scope.hamburgerCancelCounter), 
	                  getAmountOfValues($scope.barCancelCounter), 
            		  getAmountOfValues($scope.desktopCancelCounter), 
    				  getAmountOfValues($scope.wachlarzCancelCounter)
	        ];
	    	var maxValue = getMaxTableValueFromTables([
                       $scope.hamburgerCancelCounter, 
                       $scope.barCancelCounter, 
                       $scope.desktopCancelCounter, 
                       $scope.wachlarzCancelCounter
             ]);
 	    	
 	    	$scope.diagramLabels = getLabelsGauss(maxValue);
 	    	$scope.diagramType = "line";
	        break;
	    case 8:
	    	$scope.diagramData = [
                      getAvarage($scope.hamburgerErrorRates), 
                      getAvarage($scope.barErrorRates), 
                      getAvarage($scope.desktopErrorRates),
                      getAvarage($scope.wachlarzErrorRates)];
	    	$scope.diagramLabels = ['Hamburger', 'Bottom Bar', 'Desktop', 'Wachlarz'];
	    	$scope.diagramType = "bar";
	        break;
	    default:
	        break;
		}
	}
	
	
    getUserList();
    
    function getAvarage(table){
		var sum = 0;
		angular.forEach(table, function (value, key) {
			sum += parseFloat(value);
		});
		
		return sum/table.length;
	}
	function getMaxTableValueFromTables(tables){
		var maxValue = getMaxTableValue(tables[0]);
		for(var i = 1; i < tables.length; i++){
			var tableMax = getMaxTableValue(tables[i]);
			if(tableMax > maxValue){
				maxValue = tableMax;
			}
		}
		return maxValue;
	}
	function getAmountOfValues(table){
		var maxValue = getMaxTableValue(table);
		var gausTable = initializeTable(maxValue+1);
		for(var i = 0; i < table.length; i++){
			var valueInt = parseInt(table[i]);
			gausTable[valueInt] += 1;
		}
		return gausTable;
	}
	function getLabelsGauss(length){
		var labels = new Array(length+2);
		for(var i = 0; i < labels.length; i++){
			labels[i] = i;
		}
		return labels;
	}
	
	function initializeTable(len){
		var table = new Array(len);
		for(var i = 0; i < table.length; i++){
			table[i] = 0;
		}
		return table;
	}
	
	function getMaxTableValue(table){
		var minValue = 0;
		var maxValue = 0;
		if(table.length > 0){
			maxValue = parseInt(table[0]);
    		for(var i = 0; i < table.length; i++){
    			if(parseInt(table[i]) > maxValue){
    				maxValue = parseInt(table[i]);
    			}
    		}
		}
		return maxValue;
	}
    
    
}]);