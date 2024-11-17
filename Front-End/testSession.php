<?php
session_start();
if (!isset($_SESSION['visitas'])) {
    $_SESSION['visitas'] = 1;
} else {
    $_SESSION['visitas']++;
}
echo "Has visitado esta página " . $_SESSION['visitas'] . " veces.";
?>
