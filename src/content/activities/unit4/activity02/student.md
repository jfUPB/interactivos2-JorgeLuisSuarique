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
### Funcionalidad principal.
p5LiveMedia es una biblioteca para compartir audio, video y datos en tiempo real entre múltiples clientes utilizando WebRTC.
Permite sincronizar y transmitir datos personalizados, lo que facilita la creación de experiencias interactivas colaborativas.
### Compatibilidad con p5.js.
Se integra con p5.js, lo que permite manejar elementos gráficos, datos y medios de manera sencilla.
Ideal para aplicaciones de arte generativo y sistemas interactivos en red.
### Requerimientos técnicos
WebRTC solo funciona en conexiones HTTPS o en localhost.
La biblioteca requiere una configuración de servidor para gestionar las conexiones.
### Capacidades exploradas
Transmisión de video: Se pueden compartir cámaras en tiempo real.
Intercambio de datos personalizados: Se pueden enviar y recibir datos JSON entre clientes.
Sincronización del canvas: Permite que los elementos gráficos de una aplicación sean visibles en múltiples dispositivos al mismo tiempo.
