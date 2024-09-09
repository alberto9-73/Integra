<?php
header('Access-Control-Allow-Origin: *'); // Permite solicitudes de cualquier origen
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Cabeceras permitidas

header('Content-Type: application/json');

// Manejo de solicitudes OPTIONS para permitir solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

$servername = "localhost";
$username = "root"; // Ajusta según tu configuración
$password = ""; // Ajusta según tu configuración
$dbname = "ejemplo_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Consultar los usuarios
    $sql = "SELECT id, nombre, email FROM usuarios";
    $result = $conn->query($sql);

    $usuarios = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
    }
    echo json_encode($usuarios);
    
} elseif ($method == 'POST') {
    // Insertar un nuevo usuario
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['nombre']) || !isset($data['email'])|| !isset($data['clave'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    $nombre = $conn->real_escape_string($data['nombre']);
    $email = $conn->real_escape_string($data['email']);
    $clave = $conn->real_escape_string($data['clave']);

    $sql = "INSERT INTO usuarios (nombre, email, clave) VALUES ('$nombre', '$email','$clave')";

    if ($conn->query($sql) === TRUE) {
        $newUser = [
            'id' => $conn->insert_id,
            'nombre' => $nombre,
            'email' => $email
           
        ];
        echo json_encode($newUser);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al insertar el usuario: ' . $conn->error]);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}

$conn->close();
?>