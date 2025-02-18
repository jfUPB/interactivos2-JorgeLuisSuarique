# Actividad 12
``` js
let img;

function preload() {
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png'); // Reemplaza con tu imagen
}

function setup() {
  createCanvas(800, 600);
  noLoop();
}

function draw() {
  background(0);
  img.loadPixels();

  for (let y = 0; y < img.height; y += 10) { // Salta cada 10 píxeles en vertical
    for (let x = 0; x < img.width; x += 10) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];

      // Ajuste dinámico del tamaño y desplazamiento
      let size = map(noise(x * 0.01, y * 0.01), 0, 1, 5, 15);
      let offsetX = map(sin(frameCount * 0.02 + y * 0.1), -1, 1, -5, 5);
      let offsetY = map(cos(frameCount * 0.02 + x * 0.1), -1, 1, -5, 5);

      fill(r, g, b, 200); // Color con transparencia controlada
      noStroke();
      ellipse(x + offsetX, y + offsetY, size, size); // Dibujar el píxel como un círculo
    }
  }
}

function mousePressed() {
  redraw(); // Redibuja para crear una nueva versión del efecto cada vez que presiones el mouse
}
```
![image](https://github.com/user-attachments/assets/3b21b0bf-63d9-41ac-8b37-94c9f0fb8f13)
