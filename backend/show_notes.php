<?php
// Connect to the database
$host = "localhost";
$user = "root";
$password = "";
$dbname = "skillswap"; // Replace with your actual DB name

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
  session_start();
// Check if user is logged in
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    // User is not logged in, redirect to login page
    header("Location: login_page.html");
    exit;
}
// User is logged in, you can access their data:
$user_id = $_SESSION['user_id'];
// Fetch notes
$sql = "SELECT description FROM notes WHERE user_id=$user_id ";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Notes</title>
    <style>
        body {
            background-color: #f5f5dc; /* light beige */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 40px;
        }
        h1 {
            text-align: center;
            color: #4a3c27;
        }
        table {
            width: 80%;
            margin: auto;
            border-collapse: collapse;
            background-color: #fffaf0;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 16px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            color: #333;
        }
        tr:hover {
            background-color: #f0e6d6;
        }
    </style>
</head>
<body>
    <h1>User Notes</h1>

    <table>
        <tr><th>Description</th></tr>
        <?php
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . htmlspecialchars($row["description"]) . "</td></tr>";
            }
        } else {
            echo "<tr><td>No notes found.</td></tr>";
        }
        ?>
    </table>
</body>
</html>

<?php
$conn->close();
?>
