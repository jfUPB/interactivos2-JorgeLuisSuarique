# Actividad 2
## ¿Qué es p5LiveMedia?
p5LiveMedia es una biblioteca para p5.js que facilita la comunicación en tiempo real entre múltiples clientes utilizando WebRTC. Permite compartir audio, video, datos y el canvas en aplicaciones interactivas basadas en la web, lo que la hace ideal para proyectos colaborativos, performances en vivo y experimentación con medios digitales.

## ¿Qué posibilidades ofrece p5LiveMedia?
Streaming de video y audio en tiempo real entre diferentes dispositivos o navegadores.
Compartición de datos personalizados entre clientes, útil para sincronizar eventos, movimientos o información.
Envío y recepción del canvas en vivo, permitiendo la creación de performances visuales colaborativas.
Integración con WebRTC, lo que permite conexiones directas sin necesidad de un servidor intermediario para la transmisión de medios.
Uso en proyectos creativos como live coding, instalaciones interactivas y herramientas colaborativas en la web.

## Ejemplos de p5LiveMedia
### Compartir Video en Tiempo Real.
``` js
let myVideo;
let otherVideos = {};
let p5lm;

function setup() {
  createCanvas(600, 400);
  myVideo = createCapture(VIDEO);
  myVideo.size(200, 150);
  myVideo.hide();

  p5lm = new p5LiveMedia(this, "VIDEO", myVideo, "room1");
  p5lm.on('stream', gotStream);
}

function draw() {
  background(0);
  image(myVideo, 10, 10);

  for (let id in otherVideos) {
    let v = otherVideos[id];
    image(v, random(width), random(height), 100, 75);
  }
}

function gotStream(stream, id) {
  otherVideos[id] = stream;
}
```

### Compartir Datos Personalizados
``` js
let p5lm;

function setup() {
  createCanvas(400, 400);
  p5lm = new p5LiveMedia(this, "DATA", null, "room1");
  p5lm.on("data", gotData);
}

function draw() {
  background(220);
  ellipse(mouseX, mouseY, 20, 20);
  let dataToSend = { x: mouseX, y: mouseY };
  p5lm.send(JSON.stringify(dataToSend));
}

function gotData(data, id) {
  let received = JSON.parse(data);
  fill(255, 0, 0);
  ellipse(received.x, received.y, 20, 20);
}
```

### Compartir el Canvas.
``` js
let p5lm;

function setup() {
  createCanvas(400, 400);
  background(200);
  p5lm = new p5LiveMedia(this, "CANVAS", canvas, "room1");
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
    ellipse(mouseX, mouseY, 10, 10);
  }
}
```

## Hallazgos y Consideraciones para Implementar p5LiveMedia
### Requiere conexión segura (HTTPS)
WebRTC solo funciona en HTTPS o en localhost. Si se usa en un servidor público, debe ser sobre un dominio seguro.
### Sincronización de datos
Cuando se comparten datos personalizados, se recomienda serializarlos en JSON para garantizar compatibilidad entre clientes.
### Gestión de múltiples conexiones
Para evitar problemas con múltiples clientes, es clave administrar los IDs de conexión correctamente y limpiar conexiones cuando se desconectan usuarios.
### Optimización del rendimiento
En aplicaciones que manejan muchos streams, es importante optimizar la resolución de video y la tasa de datos para evitar lag o saturación.
