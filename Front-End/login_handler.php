<?php
session_start();

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos enviados desde el frontend
    $usuario_id = $_POST['usuario_id'];
    $nombre_usuario = $_POST['nombre_usuario'];
    $perfil = $_POST['perfil'];

    // Validar que los datos estén presentes
    if ($usuario_id && $nombre_usuario && $perfil) {
        // Crear variables de sesión
        $_SESSION['usuario_id'] = $usuario_id;
        $_SESSION['nombre_usuario'] = $nombre_usuario;
        $_SESSION['perfil'] = $perfil;

        // Responder con éxito
        echo json_encode(['success' => true, 'message' => 'Sesión iniciada correctamente.']);
    } else {
        // Responder con error si faltan datos
        echo json_encode(['success' => false, 'message' => 'Faltan datos para iniciar sesión.']);
    }
} else {
    // Método no permitido
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>