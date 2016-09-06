<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");



if (isset($_GET['taskId']) && isset($_GET['type']) && isset($_GET['time']) && isset($_GET['screenWidth']) && isset($_GET['screenHeight']) && isset($_GET['xPosition']) && isset($_GET['yPosition'])){

	$taskId = $_GET['taskId'];
	$type = $_GET['type'];
	$time = $_GET['time'];
	$screenWidth = $_GET['screenWidth'];
	$screenHeight = $_GET['screenHeight'];
	$xPosition = $_GET['xPosition'];
	$yPosition = $_GET['yPosition'];
	$xPositionFinish = $_GET['xPositionFinish'];
	$yPositionFinish = $_GET['yPositionFinish'];
    
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	
	$sql = "INSERT INTO Action (type, time, screenWidth, screenHeight, xPosition, yPosition, xPositionFinish, yPositionFinish) 
			VALUES ('".$type."', '".$time."', '".$screenWidth."', '".$screenHeight."', '".$xPosition."', '".$yPosition."', '".$xPositionFinish."', '".$yPositionFinish."')";
	
	if ($conn->query($sql) === TRUE) {
		$idTAction = mysqli_insert_id($conn);
		$sql2 = "INSERT INTO Task_Action (idTask, idAction) VALUES ('".$taskId."', '".$idTAction."')";
		if ($conn->query($sql2) === TRUE) {
			echo ($idTAction);
		}
		else{
			echo ("-3");
		}
	} else {
	    echo ("-2");
	}
	$conn->close();

}else{
	echo("-1");
}
?>