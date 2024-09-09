<?php
header('Content-Type: text/html');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ejemplo_db";


// Configura la conexión a la base de datos
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($mysqli->connect_error) {
    die('Error de conexión: ' . $mysqli->connect_error);
}

// Obtiene los datos del POST
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$clave= $data['clave'];

// Prepara la consulta
$query = 'SELECT * FROM usuarios WHERE email = ? AND clave = ?';
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    die('Error al preparar la consulta: ' . $mysqli->error);
}

// Vuelve a intentar la llamada bind_param
$stmt->bind_param('ss', $email, $clave);

// Ejecuta la consulta
$stmt->execute();

// Obtén el resultado
$result = $stmt->get_result();

// Verifica si el usuario existe
if ($result->num_rows > 0) {
    $response = array('success' => true, 'message' => 'Inicio de sesión exitoso');
} else {
    $response = array('success' => false, 'message' => 'Credenciales incorrectas');
}

// Envía la respuesta
echo json_encode($response);

// Cierra la conexión
$stmt->close();
$mysqli->close();
?>