


<?php
$connection=mysqli_connect('localhost', "root", "", "skillswap");

if(isset($_POST["submit"]))
{
   // mysqli_query($connection, "CREATE table assignments (assignment varchar(800))");

    $assignment1=$_POST["course"];

    $description=mysqli_query($connection, "INSERT into assignments values ('$assignment1')");
    
    if(!$description)
    {
        echo "ERROR";
    }
    else{
        header('location: ../assignments.html');
    }
    $result=mysqli_query($connection, "SELECT * from assignments");
    while($row=mysqli_fetch_assoc($result))
    {
        echo $row["assignment"]."<br>";
    }
}
?>