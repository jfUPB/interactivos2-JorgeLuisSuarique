# Actividad 6
## Realización de una aplicación que le permita a un cliente capturar una imagen de su cámara o del sistema de archivos y enviarla a otro cliente remoto.
Para esta activida se hizo una app que envia una imagen de manera remota de un cliente a otro.
## Desktop
``` js
let socket;
let imgElement;

function setup() {
    createCanvas(400, 400);
    background(220);

    // Intentar conectar con el servidor
    socket = io.connect('http://127.0.0.1:3000', { transports: ['websocket', 'polling'] });

    // Confirmar conexión en consola
    socket.on('connect', () => {
        console.log('✅ Conectado al servidor:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('❌ Desconectado del servidor');
    });

    socket.on('connect_error', (error) => {
        console.error('⚠️ Error de conexión:', error);
    });

    // Crear un elemento para mostrar la imagen recibida
    imgElement = createImg('', 'Imagen recibida');
    imgElement.position(10, 50);
    imgElement.size(300, 300);
    imgElement.hide();

    // Escuchar la imagen enviada desde Mobile
    socket.on('image', (data) => {
        console.log('📸 Imagen recibida');
        imgElement.elt.src = data;
        imgElement.show();
    });
}
```

## Mobile
``` js
let socket;
let imgElement, captureButton, fileButton, sendButton, clearButton;
let selectedImage = null; // Almacena la imagen seleccionada

function setup() {
    createCanvas(400, 400);
    background(220);

    let socketUrl = 'https://c8vf7gvm-3000.use2.devtunnels.ms/';
    socket = io(socketUrl);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });

    // Crear botón para capturar una foto con la cámara
    captureButton = createButton('Capturar Foto 📸');
    captureButton.position(10, 10);
    captureButton.mousePressed(openCamera);

    // Crear botón para seleccionar una imagen desde el almacenamiento
    fileButton = createFileInput(handleFile);
    fileButton.position(10, 50);
    
    // Crear un elemento para mostrar la imagen seleccionada
    imgElement = createImg('', 'Imagen capturada');
    imgElement.position(10, 100);
    imgElement.size(200, 200);
    imgElement.hide();

    // Botón para enviar la imagen
    sendButton = createButton('Enviar Imagen 📤');
    sendButton.position(10, 320);
    sendButton.mousePressed(sendImage);
    sendButton.hide();

    // Botón para limpiar la imagen
    clearButton = createButton('Limpiar ❌');
    clearButton.position(120, 320);
    clearButton.mousePressed(clearImage);
    clearButton.hide();
}

function openCamera() {
    let constraints = {
        video: {
            facingMode: "environment" // Usa la cámara trasera
        }
    };
    
    let video = createCapture(constraints, (stream) => {
        setTimeout(() => {
            video.loadPixels();
            let imgData = video.canvas.toDataURL(); // Captura la imagen como Base64
            imgElement.elt.src = imgData;
            imgElement.show();
            selectedImage = imgData;
            sendButton.show();
            clearButton.show();
            video.remove(); // Detiene la cámara después de la captura
        }, 2000); // Da tiempo para enfocar antes de capturar
    });
    
    video.hide();
}

function handleFile(file) {
    if (file.type === 'image') {
        selectedImage = file.data;
        imgElement.elt.src = selectedImage;
        imgElement.show();
        sendButton.show();
        clearButton.show();
    }
}

function sendImage() {
    if (selectedImage) {
        socket.emit('image', selectedImage);
        alert("Imagen enviada");
    }
}

function clearImage() {
    imgElement.hide();
    sendButton.hide();
    clearButton.hide();
    selectedImage = null;
}
```

## Server
``` js
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

```

https://github.com/user-attachments/assets/513a537d-9e23-4d7c-9382-93cab907af53

### ¿Cómo se comunican los clientes con el servidor?
Los clientes se comunican con el servidor a través de **Socket.IO**, una tecnología basada en WebSockets que permite el intercambio de datos en tiempo real. Al iniciar la aplicación, los clientes establecen una conexión con el servidor y pueden enviar o recibir información sin necesidad de recargar la página. Esta conexión bidireccional permite que el servidor actúe como un intermediario en la transmisión de datos, asegurando que los mensajes y archivos sean distribuidos correctamente.  

### ¿Cómo se comunican los clientes entre sí? 
La comunicación entre clientes no es directa, sino que se realiza a través del servidor. Cuando un cliente (en este caso, **Mobile**) captura o selecciona una imagen, la envía al servidor, y este se encarga de retransmitirla al otro cliente (**Desktop**). Esto garantiza que todos los dispositivos estén sincronizados sin necesidad de que los clientes conozcan la dirección o estado de los demás.  

### ¿Qué tipo de mensajes se envían?
Los mensajes enviados entre los clientes y el servidor incluyen información sobre el estado de la conexión y los datos de las imágenes. Se envían mensajes de **conexión** y **desconexión** para registrar la actividad de los clientes, así como mensajes que contienen la imagen en formato **Base64**, lo que permite transmitirlas de manera eficiente y sin pérdida de calidad.  

### ¿Qué tipo de datos se envían?
El tipo principal de datos que se envían son imágenes en formato **Base64**, que representan tanto capturas de la cámara como archivos seleccionados desde el almacenamiento del dispositivo. Además, se envían mensajes de texto que notifican eventos como la conexión o desconexión de un cliente, lo que ayuda a gestionar la sesión y la comunicación en tiempo real.  

### ¿Qué tipo de eventos se generan? 
Los eventos generados en la aplicación incluyen **'connect'** cuando un cliente se une al servidor, **'disconnect'** cuando se retira, y **'image'**, que se activa cuando se envía una imagen desde Mobile al servidor para que sea retransmitida a Desktop. Estos eventos permiten mantener una comunicación estructurada y garantizar que los datos lleguen correctamente.  

### ¿Cómo es el flujo de datos entre los clientes y el servidor?  
El flujo de datos sigue un proceso bien definido: cuando Mobile selecciona o captura una imagen, la convierte en formato **Base64** y la envía al servidor mediante **Socket.IO**. El servidor recibe la imagen y la reenvía automáticamente a Desktop, que la muestra en pantalla. Este intercambio ocurre de manera instantánea, lo que permite una experiencia fluida y en tiempo real.  

### ¿Cómo es el flujo de datos entre los clientes?  
Dado que los clientes no se comunican directamente entre sí, el flujo de datos siempre pasa por el servidor. Mobile actúa como **emisor**, enviando la imagen, mientras que Desktop es el **receptor**, mostrando el contenido recibido. La trayectoria de los datos sigue el esquema **Mobile → Servidor → Desktop**, asegurando que la información llegue correctamente sin que los clientes necesiten establecer una conexión directa.
