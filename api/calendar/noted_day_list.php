<?php

require_once 'apiHeaders.php';
require_once 'mysql_connection.php';

$json = json_decode(file_get_contents("php://input"));

$year = $json->year;
$month = $json->month + 1;

$date_string_first = $year."-".$month."-1";
$date_first = date_format(date_create($date_string_first), "Y-m-d");
$days_in_month = cal_days_in_month(CAL_GREGORIAN, $month, $year);
$date_string_last = $year."-".$month."-".$days_in_month;
$date_last = date_format(date_create($date_string_last), "Y-m-d");

$sql = "SELECT date FROM note WHERE date BETWEEN ? AND  ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $date_first, $date_last);
$stmt->execute();
$result = $stmt->get_result();

$days = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($days, $row['date']);
    }
}

$conn->close();

echo json_encode(array(
        "result" => $days
    )
);

?>