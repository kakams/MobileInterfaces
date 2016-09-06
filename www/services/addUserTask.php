<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");



if (isset($_GET['userId']) && isset($_GET['productId']) && isset($_GET['interfaceId'])){

	$userId = $_GET['userId'];
	$productId = $_GET['productId'];
	$interfaceId = $_GET['interfaceId'];
	$startTime = $_GET['startTime'];
	$endTime = $_GET['endTime'];
	$success = $_GET['success'];
    
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	
	$sql = "INSERT INTO Task (idProduct, idInterface, startTime, endTime, success) VALUES ('".$productId."', '".$interfaceId."', '".$startTime."', '".$endTime."', '".$success."')";
	
	if ($conn->query($sql) === TRUE) {
		$idTask = mysqli_insert_id($conn);
		$sql2 = "INSERT INTO Client_Task (idClient, idTask) VALUES ('".$userId."', '".$idTask."')";
		if ($conn->query($sql2) === TRUE) {
			echo ($idTask);
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