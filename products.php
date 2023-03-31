<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Set up database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mlion";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get products data from database
$sql = "SELECT id, name, description, price, category, images, created_at FROM products";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
  // Loop through products and add to array
  while($row = $result->fetch_assoc()) {
    $products[] = $row;
  }
}

// Serve products data as JSON response
header('Content-Type: application/json');
echo json_encode($products);

$conn->close();
?>