<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "20454239_1", "981235ka", "20454239_1");
$catId = 0;
if (isset($_GET['catId'])) {
    $catId = $_GET['catId'];
	$conn -> query ('SET NAMES utf8');
	$conn -> query ('SET CHARACTER_SET utf8_unicode_ci');
	$result = $conn->query("SELECT * FROM  `Product` WHERE  `idCategory` = ".$catId." ORDER BY  `Product`.`idProdukt` ASC");

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($outp != "") {$outp .= ",";}
		$outp .= '{"id":"'  . $rs["idProdukt"] . '",';
		$outp .= '"name":"'   . $rs["name"]        . '",';
		$outp .= '"description":"'   . $rs["description"]        . '",';
		$outp .= '"price":"'   . $rs["price"]        . '",';
		$outp .= '"categoryId":"'   . $rs["idCategory"]        . '",';
		$outp .= '"isPromotion":"'   . $rs["isPromotion"]        . '",';
		$outp .= '"imageId":"'. $rs["imageId"]     . '"}'; 
	}
	$outp ='['.$outp.']';
	$conn->close();

	echo($outp);
}else{
	echo("[]");
}
?>