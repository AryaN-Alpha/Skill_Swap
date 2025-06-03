<?php
// Start session to access session variables
session_start();

// Check if this is an AJAX request for login status
if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['page'])) {
    // Check if user is logged in and first name is set
    if (isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true && isset($_SESSION['user_firstname'])) {
        // Return the first name as JSON
        echo json_encode([
            'status' => 'success',
            'firstname' => $_SESSION['user_firstname']
        ]);
        exit; // Important: stop execution here
    } else {
        // User is not logged in
        echo json_encode([
            'status' => 'error',
            'message' => 'User not logged in'
        ]);
        exit; // Important: stop execution here
    }
}

// Rest of your existing index.php code goes here...
?>