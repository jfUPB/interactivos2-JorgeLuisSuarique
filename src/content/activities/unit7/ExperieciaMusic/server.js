const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});

const port = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log(`✅ Nuevo cliente conectado: ${socket.id}`);

    // Manejar recepción de imágenes
    socket.on('image', (data) => {
        console.log('📸 Imagen recibida. Reenviando a todos los clientes...');
        io.emit('image', data); // Enviar imagen a todos los clientes conectados
    });

    socket.on('disconnect', () => {
        console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
});
