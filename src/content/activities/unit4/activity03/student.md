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

<img src="https://github.com/user-attachments/assets/3239c4d3-d6a7-4262-9278-f6943bc29e38" width="350">

<details>
  
<summary> Codigo (Click Aqui) </summary>

```js
let myVideo;
let fft;
let mic;
let p5lm;
let particles = [];
let startButton;
let maxAmplitude = 0;

function setup() {
  createCanvas(800, 400); // Asegura el tamaño correcto del lienzo

  startButton = createButton("Iniciar Audio");
  startButton.position(10, 10);
  startButton.mousePressed(startAudioVideo);

  // Iniciar conexión con p5LiveMedia
  p5lm = new p5LiveMedia(this, "data", null, "NotasMusicales");
  p5lm.on("data", gotData);
}

function startAudioVideo() {
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    myVideo = createCapture(VIDEO);
    myVideo.size(width / 2, height);
    myVideo.hide();

    startButton.hide();
  });
}

function draw() {
  background(0);

  if (myVideo) {
    image(myVideo, 0, 0, width / 2, height);
  }

  if (fft) {
    let spectrum = fft.analyze();
    let maxFreq = 0;
    maxAmplitude = 0;

    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxAmplitude) {
        maxAmplitude = spectrum[i];
        maxFreq = i;
      }
    }

    if (maxAmplitude > 180) {
      let color = [random(255), random(255), random(255)];
      let startX = width * 3 / 4; // Centro de la mitad derecha
      let startY = height / 2;
      let newParticle = new Particle(startX, startY, maxFreq, color);
      particles.push(new Particle(startX, startY, maxFreq, color));

      // Enviar datos a otros usuarios a través de p5LiveMedia
      let data = {
        x: startX,
        y: startY,
        freq: maxFreq,
        color: color
      };
      p5lm.send(JSON.stringify(data));
    }
  }

  // Dibujar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

// Recibir datos de otros usuarios
function gotData(data) {
  let received = JSON.parse(data);
  particles.push(new Particle(received.x, received.y, received.freq, received.color));
}

// Clase de partículas
class Particle {
  constructor(x, y, freq, color) {
    this.x = x;
    this.y = y;
    this.freq = freq;
    this.size = map(freq, 10, 1024, 10, 50);
    this.color = color;
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


  
</details>




## Sistema de partículas basado en notas musicales.

![download](https://github.com/user-attachments/assets/2972208f-1a95-4fe5-b554-0344237b4c57)

<details>

<summary> Codigo (Click Aqui) </summary>
  
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

Index.HTML

``` HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notas Musicales</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/addons/p5.sound.min.js"></script>
    <script src="p5livemedia.js"></script> <!-- Cargando el script desde local -->
    <script src="sketch.js"></script>
  <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
</head>
<body>
    <button id="startButton">Iniciar Audio</button>
</body>
</html>

```

p5LiveMedia.js

```js
/**
 *
 * @class p5LiveMedia
 * @constructor
 * @param {p5.sketch} [something] blah blah blah.
 * @param {p5LiveMedia.MEDIA TYPE}
 * @param {WebRTC stream}
 * @example
 *  		
    function setup() {
        // Stream Audio/Video
        createCanvas(400, 300);
        // For A/V streams, we need to use the createCapture callback method to get the "stream" object
        video = createCapture(VIDEO, function(stream) {
            let p5lm = new p5LiveMedia(this,"CAPTURE",stream)
            p5lm.on('stream', gotStream);
            p5lm.on('data', gotData);
            p5lm.on('disconnect', gotDisconnect);
        });  
        video.muted = true;     
        video.hide();

        // OR //

        // Stream Canvas as Video
        let c = createCanvas(400, 300);
        video = createCapture(VIDEO);
        video.muted = true;     
        video.hide();				
        let p5lm = new p5LiveMedia(this,"CANVAS",c);
        p5lm.on('stream', gotStream);
        p5lm.on('data', gotData);
        p5lm.on('disconnect', gotDisconnect);


        // OR //

        // Just Data
        createCanvas(400, 300);
        let p5lm = new p5LiveMedia(this,"DATA");
        p5lm.on('data', gotData);
        p5lm.on('disconnect', gotDisconnect);
    }

    function draw() {
        image(video,0,0,width/2,height);
        ellipse(mouseX,mouseY,100,100);
        if (ovideo != null) {
            rect(10,10,10,10);
            image(ovideo,width/2,0,width/2,height);
        }
    }		
    
    // We got a new stream!
    function gotStream(stream, id) {
        print("New Stream from " + id);
        // This is just like a video/stream from createCapture(VIDEO)
        ovideo = stream;
        //ovideo.hide();
    }

    function gotData(data, id) {
        print("New Data from " + id);
        // Got some data from a peer
        print(data);
    }

    function gotDisconnect(id) {
        print(id + " disconnected");
    }
*/
class p5LiveMedia {

    constructor(sketch, type, elem, room, host, videoBitrate = null, audioBitrate = null) {

        this.sketch = sketch;
        //sketch.disableFriendlyErrors = true;

        this.simplepeers = [];
        this.mystream;
        this.onStreamCallback;
        this.onDataCallback;
        this.onDisconnectCallback;
        this.onConnectCallback;
        
        if (!host) {
            this.socket = io.connect("https://p5livemedia.itp.io/");
        } else {
            this.socket = io.connect(host);
        }

        this.videoBitrate = videoBitrate;
        this.audioBitrate = audioBitrate;
        
        //console.log(elem.elt);
    
        if (type == "CANVAS") {
            this.mystream = elem.elt.captureStream(30);
        } else if (type == "CAPTURE") {
            this.mystream = elem;
        } else {
            // Assume it is just "DATA" or just receiving a stream

        }

        this.socket.on('connect', () => {
            //console.log("Socket Connected");
            //console.log("My socket id: ", this.socket.id);

            //console.log("***"+window.location.href);

            // Sends back a list of users in the room
            if (!room) {
                this.socket.emit("room_connect", window.location.href);
            } else {
                this.socket.emit("room_connect", room);
            }

            this.callOnConnectCallback(this.socket.id);
        });

        this.socket.on('disconnect', (data) => {
           // console.log("Socket disconnected");
        });

        this.socket.on('peer_disconnect', (data) => {
            //console.log("simplepeer has disconnected " + data);
            for (let i = 0; i < this.simplepeers.length; i++) {
                if (this.simplepeers[i].socket_id == data) {
                    //console.log("Removed the DOM Element if it exits");
                    this.removeDomElement(this.simplepeers[i]);
                    //console.log("Removing simplepeer: " + i);
                    this.simplepeers.splice(i,1);
                    break;
                } 
            }	
            this.callOnDisconnectCallback(data);
        });			

        // Receive listresults from server
        this.socket.on('listresults', (data) => {
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                // Make sure it's not us
                if (data[i] != this.socket.id) {	

                    // create a new simplepeer and we'll be the "initiator"			
                    let simplepeer = new SimplePeerWrapper(this,
                        true, data[i], this.socket, this.mystream, this.videoBitrate, this.audioBitrate
                    );

                    // Push into our array
                    this.simplepeers.push(simplepeer);	
                }
            }
        });
            
        this.socket.on('signal', (to, from, data) => {

            //console.log("Got a signal from the server: ", to, from, data);

            // // to should be us
            // if (to != this.socket.id) {
            //     console.log("Socket IDs don't match");
            // }

            // Look for the right simplepeer in our array
            let found = false;
            for (let i = 0; i < this.simplepeers.length; i++)
            {
                
                if (this.simplepeers[i].socket_id == from) {
                    //console.log("Found right object");
                    // Give that simplepeer the signal
                    this.simplepeers[i].inputsignal(data);
                    found = true;
                    break;
                }
            
            }	
            if (!found) {
                //console.log("Never found right simplepeer object");
                // Let's create it then, we won't be the "initiator"
                let simplepeer = new SimplePeerWrapper(this,
                    false, from, this.socket, this.mystream, this.videoBitrate, this.audioBitrate
                );
                
                // Push into our array
                this.simplepeers.push(simplepeer);	
                    
                // Tell the new simplepeer that signal
                simplepeer.inputsignal(data);
            }
        });
    }

    // Add a stream
    addStream(elem, type) {
        let goodStream = false;
        if (type == "CANVAS") {
            this.mystream = elem.elt.captureStream(30);
            goodStream = true;
        } else if (type == "CAPTURE") {
            this.mystream = elem;
            goodStream = true;
        }

        if (goodStream) {
            for (let i = 0; i < this.simplepeers.length; i++) {
                if (this.simplepeers[i] != null) {
                    this.simplepeers[i].addStream(this.mystream);
                }
            }
        }
    }

    // Disconnect from a specific peer or all 
    // Currently untested
    disconnect(id=-1) {
        for (let i = 0; i < this.simplepeers.length; i++) {
            if (this.simplepeers[i] != null && (id == -1 || id == this.simplepeers[i].socket_id)) {
                this.simplepeers[i].destroy();
            }
        }
    }

    send(data) {
        for (let i = 0; i < this.simplepeers.length; i++) {
            if (this.simplepeers[i] != null) {
                this.simplepeers[i].send(data);
            }
        }
    }

    on(event, callback) {
        if (event == 'stream') {
            this.onStream(callback);
        } else if (event == 'data') {
            this.onData(callback);
        } else if (event == "disconnect") {
            this.onDisconnect(callback);
        } else if (event == "connect") {
            this.onConnect(callback);
        }
    }

    onDisconnect(callback) {
        this.onDisconnectCallback = callback;
    }

    onStream(callback) {
        this.onStreamCallback = callback;
    }

    onData(callback) {
        this.onDataCallback = callback;
    }

    onConnect(callback) {
        this.onConnectCallback = callback;
    }

    callOnConnectCallback(id) {
        if (this.onConnectCallback) {
            this.onConnectCallback(id);
        }
    }

    callOnDisconnectCallback(id) {
        if (this.onDisconnectCallback) {
            this.onDisconnectCallback(id);
        }
    }

    callOnDataCallback(data, id) {
        if (this.onDataCallback) {
            this.onDataCallback(data, id);
        }
    }

    removeDomElement(ssp) {
        if (ssp.domElement) {
            document.body.removeChild(ssp.domElement);
        }
    }

    callOnStreamCallback(domElement, id) {
        if (this.onStreamCallback) {

            //////////////////////
            // Copied from createCapture and addElement in p5.js source 10/12/2020
            //const videoEl = addElement(domElement, this.sketch, true);
            document.body.appendChild(domElement);
            let videoEl = new p5.MediaElement(domElement, this.sketch);
            this.sketch._elements.push(videoEl);

            videoEl.loadedmetadata = false;
            // set width and height onload metadata
            domElement.addEventListener('loadedmetadata', function() {
              domElement.play();
              if (domElement.width) {
                videoEl.width = domElement.width;
                videoEl.height = domElement.height;
              } else {
                videoEl.width = videoEl.elt.width = domElement.videoWidth;
                videoEl.height = videoEl.elt.height = domElement.videoHeight;
              }
              videoEl.loadedmetadata = true;
            });
            /////////////////////////////

            this.onStreamCallback(videoEl, id);
        }
        else {
            //console.log("no onStreamCallback set");
        }
    }
}

// A wrapper for simplepeer as we need a bit more than it provides
class SimplePeerWrapper {

    constructor(p5lm, initiator, socket_id, socket, stream, videoBitrate = null, audioBitrate = null) {
        if (!videoBitrate && !audioBitrate) {
            this.simplepeer = new SimplePeer({
                initiator: initiator,
                trickle: false       
            });
        } else {
            this.simplepeer = new SimplePeer({
                initiator: initiator,
                trickle: false,
                config: { iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' }, 
                    { urls: 'stun:stun2.l.google.com:19302' }] },
                sdpTransform: (sdp) => {
                    let newSDP = sdp;
                    if (videoBitrate) {
                        newSDP = this.setMediaBitrate(sdp, videoBitrate, 'video');
                    }
                    if (audioBitrate) {
                        newSDP = this.setMediaBitrate(newSDP, audioBitrate, 'audio');
                    }
                    console.log(newSDP);
                    return newSDP;   
                }         
            });
        }

        this.p5livemedia = p5lm;

        // Their socket id, our unique id for them
        this.socket_id = socket_id;

        // Socket.io Socket
        this.socket = socket;

        // Are we connected?
        this.connected = false;

        // Our video stream
        this.stream = stream;

        // Dom Element
        this.domElement = null;

        // simplepeer generates signals which need to be sent across socket
        this.simplepeer.on('signal', data => {						
            this.socket.emit('signal', this.socket_id, this.socket.id, data);
        });

        // When we have a connection, send our stream
        this.simplepeer.on('connect', () => {
            //console.log('simplepeer connection')
            //console.log(this.simplepeer);
            //p.send('whatever' + Math.random())

            // We are connected
            this.connected = true;

            // Let's give them our stream, if we have a stream that is
            if (stream != null) {
                this.simplepeer.addStream(stream);
                //console.log("Send our stream");
            }
        });

        // Stream coming in to us
        this.simplepeer.on('stream', stream => {
            //console.log('Incoming Stream');

            // This should really be a callback

            // Create a video object
            this.domElement = document.createElement("VIDEO");
            this.domElement.id = this.socket_id;
            this.domElement.srcObject = stream;
            this.domElement.muted = false;
            this.domElement.onloadedmetadata = function(e) {
                e.target.play();
            };					
            //document.body.appendChild(ovideo);
            //console.log(this.domElement);

            this.p5livemedia.callOnStreamCallback(this.domElement, this.socket_id);
        });		
        
        this.simplepeer.on('data', data => {
            let stringData = String(data);

            this.p5livemedia.callOnDataCallback(stringData, this.socket_id);
        });

        this.simplepeer.on('error', (err) => {
            // ERR_WEBRTC_SUPPORT
            // ERR_CREATE_OFFER
            // ERR_CREATE_ANSWER
            // ERR_SET_LOCAL_DESCRIPTION
            // ERR_SET_REMOTE_DESCRIPTION
            // ERR_ADD_ICE_CANDIDATE
            // ERR_ICE_CONNECTION_FAILURE
            // ERR_SIGNALING
            // ERR_DATA_CHANNEL
            // ERR_CONNECTION_FAILURE
            console.log(err);
        });
    }

    send(data) {
        if (this.connected) {
            this.simplepeer.send(data);
        } else {
            //console.log("Can't send, not connected");
        }
    }

    addStream(stream) {
        this.simplepeer.addStream(stream);
    }

    inputsignal(sig) {
        this.simplepeer.signal(sig);
    }

    // Borrowed from after https://webrtchacks.com/limit-webrtc-bandwidth-sdp/
    setMediaBitrate(sdp, bitrate, mediaType = 'video') {
        var lines = sdp.split("\n");
        var line = -1;
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].indexOf("m="+mediaType) === 0) {
            line = i;
            break;
          }
        }
        if (line === -1) {
          console.debug("Could not find the m line for", mediaType);
          return sdp;
        }
        console.debug("Found the m line for", mediaType, "at line", line);
       
        // Pass the m line
        line++;
       
        // Skip i and c lines
        while(lines[line].indexOf("i=") === 0 || lines[line].indexOf("c=") === 0) {
          line++;
        }
       
        // If we're on a b line, replace it
        if (lines[line].indexOf("b") === 0) {
          console.debug("Replaced b line at line", line);
          lines[line] = "b=AS:"+bitrate;
          return lines.join("\n");
        }
        
        // Add a new b line
        console.debug("Adding new b line before line", line);
        var newLines = lines.slice(0, line)
        newLines.push("b=AS:"+bitrate)
        newLines = newLines.concat(lines.slice(line, lines.length))
        return newLines.join("\n")        
    }
        
}		
```

 </details>



## Comunicación en red con WebRTC (p5LiveMedia).
```js
let myVideo;
let fft;
let mic;
let p5lm;
let particles = [];
let receivedParticles = []; // Se usa para almacenar partículas recibidas

function setup() {
  createCanvas(800, 400);
  background(0);

  startButton = createButton("Iniciar Audio/Video");
  startButton.position(10, 10);
  startButton.mousePressed(startAudioVideo);

  // Iniciar conexión con p5LiveMedia
  p5lm = new p5LiveMedia(this, "DATA", null, "NotasMusicales");
  p5lm.on("data", gotData);
}

function startAudioVideo() {
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    myVideo = createCapture(VIDEO);
    myVideo.size(width / 2, height);
    myVideo.hide();

    startButton.hide();

    // Crear la conexión p5LiveMedia después de iniciar el audio/video
    p5lm = new p5LiveMedia(this, "DATA", null, "NotasMusicales");
    p5lm.on("data", gotData);
    p5lm.on("stream", gotStream);
  });
}

function draw() {
  background(0);

  if (myVideo) {
    image(myVideo, 0, 0, width / 2, height);
  }

  if (fft) {
    let spectrum = fft.analyze();
    let maxFreq = 0;
    let maxAmplitude = 0;

    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxAmplitude) {
        maxAmplitude = spectrum[i];
        maxFreq = i;
      }
    }

    if (maxAmplitude > 180) {
      let color = [random(255), random(255), random(255)];
      let startX = width * 3 / 4; // Ahora las partículas inician en la mitad derecha
      let startY = height / 2;

      let particle = new Particle(startX, startY, maxFreq, color);
      particles.push(particle);

      let data = {
        x: startX,
        y: startY,
        freq: maxFreq,
        color: color
      };
      p5lm.send(JSON.stringify(data)); // Enviar la info a otros usuarios
    }
  }

  // Dibujar partículas propias
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Dibujar partículas recibidas de otros usuarios
  for (let i = receivedParticles.length - 1; i >= 0; i--) {
    receivedParticles[i].update();
    receivedParticles[i].display();
    if (receivedParticles[i].isDead()) {
      receivedParticles.splice(i, 1);
    }
  }
}

// Función para recibir datos de otros usuarios
function gotData(data, id) {
  let received = JSON.parse(data);
  let startX = received.x; // Recibimos la posición original
  let startY = received.y;

  let newParticle = new Particle(startX, startY, received.freq, received.color);
  receivedParticles.push(newParticle);
}

// Manejo del video remoto de otros usuarios
function gotStream(stream, id) {
  let otherVideo = createVideo();
  otherVideo.elt.srcObject = stream;
  otherVideo.elt.muted = true;
  otherVideo.size(width / 2, height);
  otherVideo.position(width / 2, 0);
  otherVideo.play();
}

// Clase de Partículas
class Particle {
  constructor(x, y, freq, color) {
    this.x = x;
    this.y = y;
    this.freq = freq;
    this.size = map(freq, 10, 1024, 10, 50);
    this.color = color;
    this.lifespan = 255;
  }

  update() {
    this.y -= 2; // Hace que la partícula suba
    this.lifespan -= 4;
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
