# Actividad 3

## Muestra los fragmentos de código relevantes del servidor
``` js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Asegúrate de que el cliente esté aquí

io.on('connection', (socket) => {
    console.log('🟢 Un cliente se conectó:', socket.id);

    socket.on('disconnect', () => {
        console.log('🔴 Cliente desconectado:', socket.id);
    });

    socket.on('image', (data) => {
        console.log('📸 Imagen recibida');
        socket.broadcast.emit('image', data); // Enviar al otro cliente
    });

    socket.on('simData', (data) => {
        console.log('🔊 Datos simulados recibidos:', data);
        socket.broadcast.emit('simData', data); // Reenvía a Mobile
    });
});

http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

## cliente Reseptor
``` js
let socket;

function setup() {
    createCanvas(400, 400);
    background(220);

    socket = io.connect();

    socket.on('connect', () => {
        console.log('📲 Conectado al servidor');
    });

    socket.on('simData', (data) => {
        console.log('📡 Datos recibidos:', data);
        // Aquí iría la lógica visual generativa
    });

    socket.on('image', (data) => {
        console.log('🖼 Imagen recibida');
        // Mostrar la imagen en pantalla
    });
}
```

## Cliente emisor
``` js
let socket;
let usarSimulacion = true;

function setup() {
    createCanvas(400, 400);
    background(0);
    socket = io.connect();

    socket.on('connect', () => {
        console.log('🖥️ Conectado al servidor');
    });
}

function draw() {
    if (usarSimulacion) {
        let simulatedData = {
            volumen: random(0, 1),
            tono: random(100, 1000)
        };

        socket.emit('simData', simulatedData);
        console.log('📤 Datos enviados:', simulatedData);

        // Puedes hacer esto más lento con frameRate(1) o usando millis()
        noLoop(); // Temporal para no saturar
    }
}
```

## Capturas de pantalla o copias de las salidas de las consolas.
![image](https://github.com/user-attachments/assets/3cf09ba0-165b-4521-91d7-4992d0a31c00)

## Descripcion.
En esta fase del proyecto establecí una comunicación básica en red usando Node.js y Socket.IO. El servidor (server.js) se ejecuta correctamente en http://localhost:3000, aceptando conexiones de clientes. Desde el cliente (sketch.js), se establece la conexión al servidor, se envía un mensaje de prueba y se recibe una respuesta. Este intercambio demuestra que el canal bidireccional entre servidor y clientes está funcionando. Todo el flujo está validado con mensajes console.log() en ambas consolas (servidor y navegador), lo cual confirma que los eventos connect, disconnect y un mensaje personalizado se transmiten correctamente.
