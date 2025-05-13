let socket;
let song;
let amplitude;
let usarSimulacion = true;
let simulatedValue = 0;

function preload() {
  song = loadSound('assets/tu_cancion.mp3'); // Asegúrate de poner bien la ruta
}

function setup() {
  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:3000');
  
  amplitude = new p5.Amplitude();

  // Reproducir canción automáticamente
  song.play();
}

function draw() {
  background(0);

  let level;
  if (usarSimulacion) {
    // Simulación con valores aleatorios suaves
    simulatedValue = noise(frameCount * 0.05) * 100;
    level = simulatedValue;
  } else {
    level = amplitude.getLevel() * 500; // escalar para mejor efecto
  }

  // Visual simple
  fill(255);
  ellipse(width / 2, height / 2, level, level);

  // Enviar valor al móvil
  socket.emit('audioLevel', level);

  // Verificación por consola
  console.log('🔊 Nivel de audio enviado:', level.toFixed(2));
}
