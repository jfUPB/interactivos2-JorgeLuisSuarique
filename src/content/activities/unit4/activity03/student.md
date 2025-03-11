# Actividad 3
## Descripción de la aplicación.
La aplicación propuesta, "Notas Musicales Interactivas", es un sistema en el que una persona toca un instrumento musical en un video, y en tiempo real se generan partículas en la pantalla que representan las notas musicales que está ejecutando. Estas notas visualizadas como partículas desaparecen cuando su sonido deja de percibirse, cuando se cambia de nota o cuando se repite la misma nota. Además, los espectadores que ven el video tienen la posibilidad de interactuar con estas notas, modificando el color y el tamaño de las partículas en tiempo real. En el futuro, esta aplicación podría implementarse en eventos en vivo para que los asistentes experimenten la música de una manera más inmersiva y visualmente atractiva.
## Uso de p5LiveMedia en la aplicación.
La biblioteca p5LiveMedia desempeña un papel fundamental en esta aplicación, ya que permite la comunicación en tiempo real entre el músico y los espectadores mediante WebRTC. Se utiliza en tres modos principales: en el modo CAPTURE, se transmite el video y audio del músico en vivo; en el modo CANVAS, se comparten las partículas generadas para que todos los usuarios puedan verlas sincronizadas; y en el modo DATA, se envían y reciben datos de interacción, permitiendo a los espectadores cambiar las propiedades de las partículas. Gracias a p5LiveMedia, esta aplicación logra una conexión fluida entre los participantes, garantizando una experiencia compartida en tiempo real.
## Relación con el proyecto de curso.
Esta aplicación se relaciona directamente con el proyecto del curso, ya que integra p5.js con herramientas avanzadas de interacción en red, como WebRTC. Permite explorar el uso de la música y el sonido como una fuente de visualización creativa, aplicando principios de diseño interactivo y sincronización en vivo. Además, refuerza el concepto de interactividad colaborativa, donde múltiples usuarios pueden modificar elementos visuales de manera simultánea. A través del uso de sistemas de partículas y transmisión de datos en tiempo real, la aplicación demuestra el potencial de la programación creativa en proyectos innovadores.
## Tutorial para replicar la aplicación
Para replicar la aplicación, se deben seguir algunos pasos clave:
Configurar el entorno: Se necesita un servidor local o una conexión HTTPS para evitar restricciones de seguridad en la transmisión de video y audio.
Incluir bibliotecas necesarias: En el archivo index.html, se deben incluir p5.js y p5LiveMedia, asegurando la correcta integración de WebRTC.
Configurar captura de video y audio: Utilizar la función createCapture() para obtener el stream del músico.
Implementar detección de notas: Aplicar Transformada de Fourier (FFT) para identificar las frecuencias y generar las partículas correspondientes.
Crear el sistema de partículas: Diseñar un conjunto de partículas dinámicas que aparezcan con cada nota musical detectada y desaparezcan cuando la nota termine.
Implementar comunicación en red: Usar p5LiveMedia para transmitir el video y los datos de interacción entre los espectadores y el músico.
Agregar interactividad para los espectadores: Permitir que los usuarios modifiquen el color y tamaño de las partículas en tiempo real.
Probar en varios navegadores: Ejecutar la aplicación en diferentes dispositivos y asegurarse de que la sincronización en tiempo real funcione correctamente.
## Código y enlaces necesarios
El código completo, incluyendo la transmisión del video, la detección de sonido, la creación de partículas y la interacción en red, está disponible en el tutorial presentado anteriormente. Para ejecutarlo, solo es necesario copiarlo en un editor compatible con p5.js, alojarlo en un servidor local y abrirlo en varios navegadores para probar la sincronización en tiempo real. De esta manera, los usuarios podrán experimentar cómo la música se transforma en una visualización interactiva y colaborativa, proporcionando una experiencia envolvente tanto para el músico como para los espectadores.
## Configurar el entorno y capturar video/audio.
```js
let myVideo;
let fft;
let mic;
let p5lm;

function setup() {
  createCanvas(600, 400);

  // Capturar video y audio
  let constraints = { video: true, audio: true };
  myVideo = createCapture(constraints, function (stream) {
    // Iniciar WebRTC
    p5lm = new p5LiveMedia(this, "CAPTURE", stream, "NotasMusicales");
    p5lm.on('stream', gotStream);
  });
  myVideo.elt.muted = true;
  myVideo.hide();

  // Iniciar micrófono y FFT para analizar sonido
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
```
## Sistema de partículas basado en notas musicales.
```js
let particles = [];

function draw() {
  background(0);
  image(myVideo, 0, 0, width / 2, height);

  // Obtener las frecuencias del micrófono
  let spectrum = fft.analyze();

  // Detectar si hay frecuencias dominantes
  let maxFreq = -1;
  let maxValue = 0;
  for (let i = 0; i < spectrum.length; i++) {
    if (spectrum[i] > maxValue) {
      maxValue = spectrum[i];
      maxFreq = i;
    }
  }

  // Si se detecta una frecuencia dominante, generar una partícula
  if (maxValue > 180) {
    particles.push(new Particle(width / 2 + random(-50, 50), height / 2, maxFreq));
    
    // Enviar la nota detectada a otros usuarios
    let dataToSend = { freq: maxFreq, color: [random(255), random(255), random(255)] };
    p5lm.send(JSON.stringify(dataToSend));
  }

  // Dibujar las partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

// Clase Partícula
class Particle {
  constructor(x, y, freq) {
    this.x = x;
    this.y = y;
    this.freq = freq;
    this.size = map(freq, 0, 1024, 10, 50);
    this.color = [random(255), random(255), random(255)];
    this.lifespan = 255;
  }

  update() {
    this.y -= 2;
    this.lifespan -= 3;
  }

  display() {
    fill(this.color[0], this.color[1], this.color[2], this.lifespan);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
```
## Comunicación en red con WebRTC (p5LiveMedia).
```js
let receivedParticles = [];

function gotStream(stream, id) {
  let otherVideo = createVideo();
  otherVideo.elt.srcObject = stream;
  otherVideo.elt.muted = true;
  otherVideo.size(width / 2, height);
  otherVideo.position(width / 2, 0);
  otherVideo.play();
}

p5lm.on('data', gotData);

function gotData(data, id) {
  let received = JSON.parse(data);
  receivedParticles.push(new Particle(width / 2 + random(-50, 50), height / 2, received.freq));
}
```
## Personalización del usuario.
```js
function keyPressed() {
  if (key === 'C') {
    let newColor = [random(255), random(255), random(255)];
    for (let p of particles) {
      p.color = newColor;
    }
  } else if (key === 'T') {
    for (let p of particles) {
      p.size = random(20, 60);
    }
  }
}
```

## Instrucciones para ejecutar la aplicación
Asegúrate de alojar el código en un servidor HTTPS para evitar restricciones de acceso a la cámara y el micrófono. Puedes usar Live Server en VS Code o subirlo a Glitch o GitHub Pages.
Copia los archivos en un proyecto de p5.js: Asegúrate de incluir en tu index.html las bibliotecas necesarias:
html
Copiar
Editar
```js
<script src="https://p5livemedia.itp.io/simplepeer.min.js"></script>
<script src="https://p5livemedia.itp.io/socket.io.js"></script>
<script src="https://p5livemedia.itp.io/p5livemedia.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
```
Abre la aplicación en varios dispositivos o navegadores: Conéctate con otro usuario y prueba la interacción en tiempo real.
