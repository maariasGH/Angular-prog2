<?php
// HABILITAR CORS - AGREGAR ESTO AL INICIO DE TODOS TUS ARCHIVOS PHP (Get_Meses.php, Get_Sucus.php, etc.)
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// EJEMPLO: Get_Meses.php
require_once 'conexion.php'; // Tu archivo de conexión a la BD

try {
    $stmt = $pdo->query("SELECT * FROM meses ORDER BY Nro");
    $meses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($meses);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>