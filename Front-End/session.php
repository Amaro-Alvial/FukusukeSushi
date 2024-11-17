<?php
session_start();

// Verificar si hay una sesión activa
if (!isset($_SESSION['usuario_id'])) {
    // Redirigir al login si no hay sesión
    header('Location: index.php');
    exit();
}
?>