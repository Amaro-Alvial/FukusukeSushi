<?php
session_start();

// Destruir la sesión
session_unset();
session_destroy();

// Redirigir al login después de cerrar sesión
header('Location: index.php');
exit();
?>