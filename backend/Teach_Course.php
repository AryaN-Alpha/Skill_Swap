<?php
// Database credentials
$host = 'localhost';
$db   = 'skillswap';
$user = 'root';
$pass = '';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);





// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize form data
$category = $_POST['category'];
$title = $_POST['title'];
$description = $_POST['description'];
$image = !empty($_POST['image']) ? $_POST['image'] : 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80';
$id = $_POST['id'];

$result = mysqli_query ( $conn , "INSERT into courses VALUES ('$id','$title' , '$description' ,'$image','$category')");

if ($result) {
    header("Location: ../Courses_Section.html");
    exit;
} else {
    echo "Error";
}

$conn->close();
?>
