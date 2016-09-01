<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");



if (isset($_GET['createdate'])) {
    
	$device = $_GET['device'];
    $browser = $_GET['browser'];
    $age = $_GET['age'];
    $system = $_GET['system'];
    $hand = $_GET['hand'];
    $sex = $_GET['sex'];
    $createdate = $_GET['createdate'];
    
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	$sql = "INSERT INTO Client (device, browser, age, sex, system, hand, createDate) VALUES ('".$device."', '".$browser."', '".$age."', '".$sex."', '".$system."', '".$hand."', '".$createdate."')";
	if ($conn->query($sql) === TRUE) {
		$id = mysqli_insert_id($conn);
		echo($id);
	} else {
	    echo "-2";
	}
	
	
	$conn->close();
	

}else{
	echo("-1");
}
?>