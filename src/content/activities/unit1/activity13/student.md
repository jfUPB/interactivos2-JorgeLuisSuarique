# Actividad 13
```js
let osc; // Oscilador
let waveform = 'sine'; // Tipo de onda inicial
let frequency = 70; // Frecuencia inicial (220 Hz)
let amplitude = 0.5; // Amplitud inicial (50%)

function setup() {
  createCanvas(800, 400);
  textSize(16);
  textAlign(CENTER, CENTER);
  
  osc = new p5.Oscillator(); // Crear el oscilador
  osc.setType(waveform); // Configurar tipo de onda
  osc.freq(frequency); // Configurar frecuencia
  osc.amp(amplitude); // Configurar amplitud
  osc.start(); // Iniciar el oscilador
}

function draw() {
  background(30);
  fill(255);
  
  text("Tipo de onda: " + waveform.toUpperCase(), width / 2, height / 2 - 50);
  text("Frecuencia: " + frequency + " Hz", width / 2, height / 2);
  text("Amplitud: " + nf(amplitude, 0, 2), width / 2, height / 2 + 50);
}

function keyPressed() {
  if (key === '1') waveform = 'sine';       // Onda senoidal
  else if (key === '2') waveform = 'triangle'; // Onda triangular
  else if (key === '3') waveform = 'square';   // Onda cuadrada
  else if (key === '4') waveform = 'sawtooth'; // Onda diente de sierra
  
  osc.setType(waveform); // Cambiar tipo de onda
}

function mouseDragged() {
  // Ajustar frecuencia y amplitud según la posición del mouse
  frequency = map(mouseX, 0, width, 100, 1000);
  amplitude = map(mouseY, 0, height, 1.0, 0.0);
  
  osc.freq(frequency);
  osc.amp(amplitude, 0.1); // Cambiar amplitud suavemente
}

function mouseReleased() {
  osc.amp(0, 0.5); // Reducir la amplitud lentamente al soltar el mouse
}
```
![image](https://github.com/user-attachments/assets/3dae884e-8cea-452c-ba40-06c99b4d3009)
