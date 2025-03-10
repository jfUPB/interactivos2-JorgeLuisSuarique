# Actividad 3
## Descripción de la aplicación.
La aplicación propuesta se llama "Notas Interactivas en Vivo". Es una plataforma colaborativa donde varios usuarios pueden interactuar con un sistema de partículas que representa notas musicales en tiempo real.
Cuando un usuario toca una nota musical, se genera una partícula visible en la pantalla de todos los participantes. También permite que los usuarios cambien la posición y el color de las notas en tiempo real. Funciona en PC y móviles, y opcionalmente permite el uso de la cámara para transmitir la imagen del usuario junto con las notas musicales.
## Uso de p5LiveMedia en la aplicación.
p5LiveMedia se utilizará para compartir datos en tiempo real, enviando información sobre la nota musical que se está tocando, la posición y el color de la partícula a todos los clientes conectados. También permitirá sincronizar el canvas entre usuarios, reflejando los cambios en todos los clientes cuando alguien interactúe con una nota. Además, se podrá activar la cámara para compartir la imagen del usuario mientras participa en la interacción.
## Relación con el proyecto de curso.
Esta aplicación complementa el proyecto musical al permitir que varias personas interactúen con las notas en un mismo espacio virtual. Con p5LiveMedia, los cambios ocurren en tiempo real, generando una experiencia colaborativa y dinámica. Aporta a la experiencia interactiva, ya que ahora no solo se visualizan las notas, sino que los usuarios pueden modificarlas en conjunto. También posibilita presentaciones en vivo, siendo útil en eventos musicales o educativos donde varios participantes pueden interactuar con la música.
## Tutorial para replicar la aplicación
### Configurar el entorno
Es necesario contar con p5.js y p5LiveMedia en el entorno de trabajo. Se pueden cargar los archivos desde un servidor local o utilizar un editor en línea como p5.js Web Editor o Glitch. Si se desea alojarlo en un servidor propio, se puede usar Node.js y Express para manejar conexiones WebRTC.
``` js
npm install express socket.io
node server.js
```
### Código en p5.js
El código en p5.js inicia con la inclusión de la biblioteca p5LiveMedia.
``` js
let myp5lm;
function setup() {
  createCanvas(800, 600);
  myp5lm = new p5LiveMedia(this, "DATA", null, "NotasInteractivas");
  myp5lm.on("data", gotData);
}
```
### Enviar y recibir datos de notas musicales.
``` js
function sendNote(nota, color, x, y) {
  let data = {
    nota: nota,
    color: color,
    x: x,
    y: y
  };
  myp5lm.send(JSON.stringify(data));
}

function gotData(data) {
  let received = JSON.parse(data);
  drawNote(received.nota, received.color, received.x, received.y);
}
```
### Dibujar las notas en pantalla.
``` js
function drawNote(nota, color, x, y) {
  fill(color[0], color[1], color[2]);
  ellipse(x, y, 50, 50);
  textAlign(CENTER, CENTER);
  fill(0);
  text(nota, x, y);
}
```
### Capturar el clic del usuario y enviar una nota.
``` js
function mousePressed() {
  let nota = random(["C4", "D4", "E4", "F4", "G4"]);
  let color = [random(255), random(255), random(255)];
  sendNote(nota, color, mouseX, mouseY);
}
```
## Consideraciones finales.
Para probar y mejorar la aplicación, se recomienda ejecutarla en dos dispositivos diferentes para comprobar que las notas aparecen en ambos. Se puede añadir sonido con p5.sound para que cada nota tenga su correspondiente sonido y mejorar la interacción permitiendo que los usuarios arrastren las notas con el mouse o el dedo.
