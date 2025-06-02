<?php
// Start the session
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Escape input to avoid SQL injection (better to use prepared statements in production)
    $email = mysqli_real_escape_string($conn, $email);
    $password = mysqli_real_escape_string($conn, $password);

    // Query to check credentials
    $sql = "SELECT * FROM login WHERE email='$email' AND password='$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // Get user data
        $user_data = mysqli_fetch_assoc($result);
        
        // Store user information in session
        $_SESSION['user_logged_in'] = true;
        $_SESSION['user_id'] = $user_data['id']; // Assuming you have an ID field
        $_SESSION['user_firstname'] = $user_data['firstname'];
        $_SESSION['user_permission'] = $user_data['permission'];
        $_SESSION['user_email'] = $email; // Store email for JavaScript
        
        // Redirect to homepage with success parameter
        header("Location: ../index.html?login=success");
        exit;
    } else {
        // Redirect back to login with error parameter
        header("Location: ../login_page.html?error=invalid");
        exit;
    }
}
?>