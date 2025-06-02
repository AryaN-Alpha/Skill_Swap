<?php
// Database credentials
$host = "localhost";
$user = "root";
$password = "";
$dbname = "skillswap";

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Query to fetch all courses
$sql = "SELECT * FROM courses";
$result = $conn->query($sql);

// Initialize array
$courses = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

// Close connection
$conn->close();

// Set response type to JSON and return data
header('Content-Type: application/json');
echo json_encode($courses);
?>
