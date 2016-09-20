<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");



if (isset($_GET['taskId'])) {
    
	$taskId = $_GET['taskId'];
	
	$startTime = $_GET['startTime'];
    $endTime = $_GET['endTime'];
    $success = $_GET['success'];
    $bestRate = $_GET['bestRate'];
    $innovationRate = $_GET['innovationRate'];
    $comment = $_GET['comment'];
    
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	$sql = 
	"UPDATE Task SET startTime = '".$startTime."', endTime = '".$endTime."', success = '".$success."', bestRate = '".$bestRate."', innovationRate = '".$innovationRate."', comment = '".$comment."'  WHERE idTask='".$taskId."'";
	if ($conn->query($sql) === TRUE) {
		echo "1";
	} else {
	    echo "-2";
	    echo ($sql);
	}
	
	
	$conn->close();
	

}else{
	echo("-1");
}
?>