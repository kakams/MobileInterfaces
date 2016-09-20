<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");



if (isset($_GET['userId'])) {
    
	$userId = $_GET['userId'];
	
	$device = $_GET['device'];
    $age = $_GET['age'];
    $hand = $_GET['hand'];
    $sex = $_GET['sex'];
    $education = $_GET['education'];
    
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	$sql = "UPDATE Client SET device = '".$device."', age = '".$age."', sex = '".$sex."', education = '".$education."', hand = '".$hand."'  WHERE idClient='".$userId."'";
	if ($conn->query($sql) === TRUE) {
		echo "1";
	} else {
	    echo "-2";
	}
	
	
	$conn->close();
	

}else{
	echo("-1");
}
?>