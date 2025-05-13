# Actividad 1.
## Breve descriocion.
Usando el trabajo de la unidad 3 re utilice su componente para que pueda realizar una carpeta en donde haga mi proyecto, por ahora, aunque no pueda hacer todo el trabajo que quería podre simular bien el trabajo con la canción y los elementos escogidos para la realización de esta actividad.
## Index Desktop.
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js"></script>
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <script src="sketch.js"></script>
    <title>Desktop p5.js Application</title>
</head>
<body></body>
</html>
```
## Index Movile.
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js"></script>
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <script src="sketch.js"></script>
    <title>Mobile p5.js Application</title>
</head>
<body></body>
</html>
```

## sketch de Desktop
``` js
let socket;
let song;
let amplitude;
let level = 0;

function preload() {
  // Carga tu archivo de audio localmente (debe estar en la carpeta del proyecto)
  song = loadSound('assets/tuCancion.mp3'); // Asegúrate de poner la ruta correcta
}

function setup() {
  createCanvas(400, 400);
  background(30);

  // Inicia conexión con el servidor
  socket = io.connect('http://127.0.0.1:3000', { transports: ['websocket', 'polling'] });

  socket.on('connect', () => {
    console.log('✅ Conectado al servidor:', socket.id);
  });

  // Configura el objeto de amplitud
  amplitude = new p5.Amplitude();
  
  // Reproduce la canción cuando el usuario hace clic (necesario por políticas del navegador)
  let btn = createButton('🎵 Iniciar canción');
  btn.position(10, 10);
  btn.mousePressed(() => {
    if (!song.isPlaying()) {
      song.play();
    }
  });
}

function draw() {
  background(30);

  // Obtener nivel de volumen actual
  level = amplitude.getLevel(); // Valor entre 0 y ~0.3 típicamente

  // Visualización simple: círculo que cambia de tamaño
  let size = map(level, 0, 0.3, 20, 300);
  fill(0, 150, 255, 200);
  noStroke();
  ellipse(width / 2, height / 2, size);

  // Enviar nivel de volumen al celular (opcional: puedes limitar la frecuencia de envío)
  if (frameCount % 10 === 0 && socket.connected) {
    socket.emit('nivelSonido', level);
  }

  // Mostrar valor de nivel en pantalla
  fill(255);
  textSize(16);
  text('Nivel de sonido: ' + nf(level, 1, 3), 10, height - 20);
}
```

## sketch de Mobile.
``` js
let socket;
let currentLevel = 0;
let imgElement;

function preload() {
  // Puedes precargar imágenes asociadas a distintos niveles de volumen
  imgBajo = loadImage('assets/bajo.png');
  imgMedio = loadImage('assets/medio.png');
  imgAlto = loadImage('assets/alto.png');
}

function setup() {
  createCanvas(400, 400);
  background(0);

  let socketUrl = 'http://127.0.0.1:3000'; // Ajusta si usas devtunnel o IP externa
  socket = io(socketUrl);

  socket.on('connect', () => {
    console.log('📶 Conectado al servidor');
  });

  socket.on('disconnect', () => {
    console.log('🔌 Desconectado del servidor');
  });

  socket.on('volume', (vol) => {
    currentLevel = vol; // volumen normalizado entre 0 y 1
    console.log('🔊 Volumen recibido:', currentLevel);
  });
}

function draw() {
  background(0);

  // Mostrar imágenes distintas según el nivel de volumen
  if (currentLevel < 0.2) {
    image(imgBajo, 100, 100, 200, 200);
  } else if (currentLevel < 0.6) {
    image(imgMedio, 100, 100, 200, 200);
  } else {
    image(imgAlto, 100, 100, 200, 200);
  }
}
```

``` json
{
  "name": "sfinteractivesocketiodesktopmobile",
  "version": "1.0.0",
  "description": "![codespaces](https://github.com/user-attachments/assets/97d7b532-42c4-4a97-a0d3-b8ff335b0ebe)",
  "main": "server.js",
  "dependencies": {
    "accepts": "^1.3.8",
    "array-flatten": "^1.1.1",
    "body-parser": "^1.20.3",
    "bytes": "^3.1.2",
    "call-bind": "^1.0.7",
    "content-disposition": "^0.5.4",
    "content-type": "^1.0.5",
    "cookie": "^1.0.2",
    "cookie-signature": "^1.0.6",
    "debug": "^2.6.9",
    "define-data-property": "^1.1.4",
    "depd": "^2.0.0",
    "destroy": "^1.2.0",
    "ee-first": "^1.1.1",
    "encodeurl": "^2.0.0",
    "es-define-property": "^1.0.0",
    "es-errors": "^1.3.0",
    "escape-html": "^1.0.3",
    "etag": "^1.8.1",
    "express": "^4.21.0",
    "finalhandler": "^1.3.1",
    "forwarded": "^0.2.0",
    "fresh": "^0.5.2",
    "function-bind": "^1.1.2",
    "get-intrinsic": "^1.2.4",
    "gopd": "^1.0.1",
    "has-property-descriptors": "^1.0.2",
    "has-proto": "^1.0.3",
    "has-symbols": "^1.0.3",
    "hasown": "^2.0.2",
    "http-errors": "^2.0.0",
    "iconv-lite": "^0.4.24",
    "inherits": "^2.0.4",
    "ipaddr.js": "^1.9.1",
    "media-typer": "^0.3.0",
    "merge-descriptors": "^1.0.3",
    "methods": "^1.1.2",
    "mime": "^1.6.0",
    "mime-db": "^1.52.0",
    "mime-types": "^2.1.35",
    "ms": "^2.0.0",
    "negotiator": "^0.6.3",
    "object-inspect": "^1.13.2",
    "on-finished": "^2.4.1",
    "parseurl": "^1.3.3",
    "path-to-regexp": "^0.1.10",
    "proxy-addr": "^2.0.7",
    "qs": "^6.13.0",
    "range-parser": "^1.2.1",
    "raw-body": "^2.5.2",
    "safe-buffer": "^5.2.1",
    "safer-buffer": "^2.1.2",
    "send": "^0.19.0",
    "serve-static": "^1.16.2",
    "set-function-length": "^1.2.2",
    "setprototypeof": "^1.2.0",
    "side-channel": "^1.0.6",
    "statuses": "^2.0.1",
    "toidentifier": "^1.0.1",
    "type-is": "^1.6.18",
    "unpipe": "^1.0.0",
    "utils-merge": "^1.0.1",
    "vary": "^1.1.2",
    "ws": "^8.18.0"
  },
  "devDependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC"
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
