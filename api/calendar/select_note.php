<?php

require_once 'apiHeaders.php';
require_once 'mysql_connection.php';

$json = json_decode(file_get_contents("php://input"));

$date_string = $json->year."-".$json->month."-".$json->day;
$date = date_format(date_create($date_string), "Y-m-d");

$sql = "SELECT * FROM note WHERE date = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $date);
$stmt->execute();
$result = $stmt->get_result();

$the_note = "";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $the_note = $row['the_note'];
    }
}

$stmt->close();
$conn->close();

echo json_encode(array(
        "result" => $the_note
    )
);

?>