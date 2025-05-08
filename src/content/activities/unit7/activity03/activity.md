#### Estableciendo la comunicación

:::note[🎯 Enunciado]
Es el momento de establecer la comunicación entre las aplicaciones. 
:::

:::tip[Recursos]
-   Tu Blueprint algorítmico (Unidad 6), si indica comunicación en red.
-   Tu código de la Unidad 3 (Node.js/Socket.IO) o Unidad 4 (p5LiveMedia/WebRTC).
-   Tu código base de la Actividad 01 y 02.
-   Documentación de Socket.IO o p5LiveMedia.
:::

👣 **Pasos**:

1.  **Configura el servidor (Node.js/Socket.IO):**
    *   En `server.js`, configura Express y Socket.IO para escuchar conexiones.
    *   Implementa los manejadores de eventos básicos de Socket.IO (`connection`, `disconnect`).
    *   Define los nombres de los mensajes (`socket.on('nombreMensaje', ...)` y `socket.emit('nombreMensaje', ...)` o `io.emit(...)`) que planeas usar según tu diseño IPO, pero manten la lógica *dentro* de ellos muy simple por ahora (ej: solo imprimir en consola que se recibió/envió el mensaje).
2.  **Configura el cliente (p5.js/Socket.IO):**
    *   En `sketch.js` (o un archivo JS separado), inicializa la conexión de Socket.IO al servidor.
    *   Implementa los manejadores `socket.on('nombreMensaje', ...)` para recibir mensajes del servidor o de otros clientes. Por ahora, solo imprime en la consola del navegador que se recibió el mensaje.
    *   Implementa funciones básicas para enviar mensajes (`socket.emit('nombreMensaje', datos)`) desde el cliente (ej: al hacer clic con el mouse), enviando datos muy simples.
3.  **Prueba la conexión:** ejecuta el servidor y abre el/los cliente(s) en el navegador. Verifica en las consolas (servidor y navegador) que la conexión se establece y que los mensajes básicos se envían y reciben correctamente en ambas direcciones.

:::note[🧐🧪✍️ Reporta en tu bitácora]

* Muestra los fragmentos de código relevantes del servidor (`server.js`) y del cliente (`sketch.js` u otro) donde configuraste la comunicación y los manejadores de mensajes básicos.
* Muestra capturas de pantalla o copias de las salidas de las consolas (servidor y navegador) que demuestren que la conexión funciona y los mensajes de prueba se transmiten.
* Describe brevemente el flujo de comunicación básico que estableciste.
:::

:::caution[📤 Entrega]
La documentación en tu bitácora que muestre la configuración y prueba de la comunicación básica en red.
:::
