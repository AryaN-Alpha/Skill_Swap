<?php 

$connection=mysqli_connect('localhost', "root", "", "skillswap");

if (!$connection) {
    echo "Not Connected<br>";
} else {
    echo "Connected to database<br>";
}


?>