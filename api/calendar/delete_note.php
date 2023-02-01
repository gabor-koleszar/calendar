<?php

require_once 'apiHeaders.php';
require_once 'mysql_connection.php';

$json = json_decode(file_get_contents("php://input"));

$date_string = $json->year."-".$json->month."-".$json->day;
$date = date_format(date_create($date_string), "Y-m-d");

$sql = "DELETE FROM note WHERE date = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $date);
$res = $stmt->execute();

echo json_encode(array(
    "result" => $res
    )
);

$stmt->close();
$conn->close();

?>