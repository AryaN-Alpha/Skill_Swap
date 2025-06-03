<?php
$connection=mysqli_connect('localhost', "root", "", "skillswap");

if (!$connection) {
    echo "Not Connected<br>";
} else {
    echo "Connected to database<br>";
}






if(isset($_POST["submit"]))
{
   session_start();

// Check if user is logged in
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    // User is not logged in, redirect to login page
    header("Location:../login_page.html");
    exit;
}
// User is logged in, you can access their data:
$user_id = $_SESSION['user_id'];

    // mysqli_query($connection, "CREATE table notes (description varchar(800))");
    $notes=$_POST["description"];
    $description=mysqli_query($connection, "INSERT into notes(user_id , description) values ('$user_id', '$notes')");
    
    if(!$description)
    {
        echo "ERROR";
    }
    else{
        header('location: ../notes.html');
    }
    
}

?>

<!-- CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(800),
    FOREIGN KEY (user_id) REFERENCES login(id)
); -->
