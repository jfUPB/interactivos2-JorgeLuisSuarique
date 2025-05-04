let socket;
let audioLevel = 0;

function setup() {
  createCanvas(400, 400);
  background(0);

  socket = io.connect('http://localhost:3000'); // Cambia si usas túnel remoto

  socket.on('audioLevel', (data) => {
    audioLevel = data;
    console.log('📲 Nivel recibido:', audioLevel.toFixed(2));
  });
}

function draw() {
  background(0);

  // Visualización basada en el nivel
  fill(255, 100, 150);
  noStroke();
  let radius = map(audioLevel, 0, 100, 10, 200);
  ellipse(width / 2, height / 2, radius, radius);
}