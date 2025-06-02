<?php
session_start();

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

if(isset($_POST['submit'])){
    $name = $_POST['fname'];
    $lastname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['pass'];

    // Escape inputs
    $name = mysqli_real_escape_string($conn, $name);
    $lastname = mysqli_real_escape_string($conn, $lastname);
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Check if email already exists
    $checkQuery = "SELECT * FROM login WHERE email = '$email'";
    $result = mysqli_query($conn, $checkQuery);

    if(mysqli_num_rows($result) > 0){
        echo "<script>alert('Email already exists. Please use a different email.'); window.history.back();</script>";
        exit;
    }

    // Insert new user
    $sql = "INSERT INTO login (firstname, lastname, email, password) 
            VALUES ('$name', '$lastname', '$email', '$password')";

    if(mysqli_query($conn, $sql)){
        // Get the inserted user ID
        $user_id = mysqli_insert_id($conn);

        // Set session variables to simulate login
        $_SESSION['user_logged_in'] = true;
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_firstname'] = $name;
        $_SESSION['user_lastname'] = $lastname;
        $_SESSION['user_email'] = $email;

        // Redirect to homepage
        header("Location: ../index.html?login=success");
        exit;
    } else {
        echo "Record not inserted successfully: " . mysqli_error($conn);
    }
}
?>
