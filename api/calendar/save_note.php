<?php

require_once 'apiHeaders.php';
require_once 'mysql_connection.php';

$json = json_decode(file_get_contents("php://input"));

$date_string = $json->year."-".$json->month."-".$json->day;
$date = date_format(date_create($date_string), "Y-m-d");

$exist_note = false;

$sql = "SELECT * FROM note WHERE date = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $date);
$stmt->execute();
$result = $stmt->get_result();

$the_note = "";

if ($result->num_rows > 0) {
    $exist_note = true;
}

if ($exist_note) {
    $sql = "UPDATE note SET the_note = ? WHERE date = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $note, $date);

    $note = $json->note;

    echo json_encode(array(
            "result" => $stmt->execute()
        )
    );
    $stmt->close();
    $conn->close();
} else {
    $sql = "INSERT INTO note (date, the_note) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $date, $note);

    $note = $json->note;

    echo json_encode(array(
            "result" => $stmt->execute()
        )
    );
    $stmt->close();
    $conn->close();
}
?>