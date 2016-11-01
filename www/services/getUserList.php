<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");

	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	$results = $conn->query("
		SELECT * FROM `Client` 
		INNER JOIN `Client_Task` ON `Client`.`idClient`=`Client_Task`.`idClient`
		INNER JOIN `Task` ON `Client_Task`.`idTask`=`Task`.`idTask`
		INNER JOIN `Task_Action` ON `Task`.`idTask`=`Task_Action`.`idTask` 
		INNER JOIN `Action` ON `Task_Action`.`idAction`=`Action`.`idAction` 
		ORDER BY  `Action`.`time` ASC
	");
	
	
	
	
	/*while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		
		if ($outp != "") {$outp .= ",";}
		$outp .= '{"id":"'  . $rs["idClient"] . '",';
		$outp .= '"device":"'   . $rs["device"]        . '",';
		$outp .= '"browser":"'   . $rs["browser"]        . '",';
		$outp .= '"age":"'   . $rs["age"]        . '",';
		$outp .= '"sex":"'   . $rs["sex"]        . '",';
		$outp .= '"system":"'   . $rs["system"]        . '",';
		$outp .= '"education":"'   . $rs["education"]        . '",';
		$outp .= '"createDate":"'   . $rs["createDate"]        . '",';
		$outp .= '"tasks":"'. $rs["createDate"]     
		
		
		. '"}'; 
	}
	$outp ='['.$outp.']';

	echo($outp);
*/
	$data = [];
	while($row = $results->fetch_array(MYSQLI_ASSOC)) {
		$idClient = $row['idClient'];
		$idTask = $row['idTask'];
		$idAction = $row['idAction'];
		if(!isset($data[$idClient])) {
			$data[$idClient] = [
					'idClient' => $idClient,
					'device'=>$row['device'],
					'browser'=>$row['browser'],
					'age'=>$row['age'],
					'sex'=>$row['sex'],
					'system'=>$row['system'],
					'hand'=>$row['hand'],
					'createDate'=>$row['createDate'],
					'education'=>$row['education'],
					'tasks'=>[]
			];
		}
		if(!isset($data[$idClient]['tasks'][$idTask])) {
			$data[$idClient]['tasks'][$idTask] = [
					'idInterface'=>$row['idInterface'],
					'startTime'=>$row['startTime'],
					'endTime'=>$row['endTime'],
					'success'=>$row['success'],
					'bestRate'=>$row['bestRate'],
					'innovationRate'=>$row['innovationRate'],
					'actions'=>[]
			];
		}if(!isset($data[$idClient]['tasks'][$idTask]['actions'][$idAction])) {
			$data[$idClient]['tasks'][$idTask]['actions'][] = [
					'type'=>$row['type'],
					'time'=>$row['time'],
					'screenWidth'=>$row['screenWidth'],
					'screenHeight'=>$row['screenHeight'],
					'xPosition'=>$row['xPosition'],
					'yPosition'=>$row['yPosition'],
					'xPositionFinish'=>$row['xPositionFinish'],
					'yPositionFinish'=>$row['yPositionFinish']
			];
		}
	}
	
	echo(json_encode(array_values($data)));
	
	$conn->close();
?>