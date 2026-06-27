<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];
    
    // Tu correo destino (donde quieres recibir los mensajes)
    $destinatario = "recordveryclean@gmail.com";
    
    // Construir el contenido del correo
    $contenido = "Nuevo mensaje desde el sitio web de RVC Studio\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Correo: $email\n";
    $contenido .= "Asunto: $asunto\n";
    $contenido .= "Mensaje:\n$mensaje\n";
    
    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Enviar el correo
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Si se envió correctamente
        echo "<script>
            alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
            window.location.href = 'contacto.html';
        </script>";
    } else {
        // Si hubo error
        echo "<script>
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            window.history.back();
        </script>";
    }
}
?>
