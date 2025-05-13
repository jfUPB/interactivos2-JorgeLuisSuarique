# Actividad 9.
## p5.js
``` js
function setup() {
  createCanvas(800, 600); // Crear un lienzo de 800x600 píxeles
  noLoop(); // Detener el bucle de dibujo continuo
  background(30); // Fondo oscuro para contrastar las formas
}

function draw() {
  for (let i = 0; i < 50; i++) { // Generar 50 formas aleatorias
    let x = random(width); // Posición X aleatoria
    let y = random(height); // Posición Y aleatoria
    let size = random(20, 100); // Tamaño aleatorio entre 20 y 100
    let r = random(255); // Componente rojo aleatorio
    let g = random(255); // Componente verde aleatorio
    let b = random(255); // Componente azul aleatorio
    let alpha = random(100, 255); // Transparencia aleatoria

    fill(r, g, b, alpha); // Establecer el color de relleno
    noStroke(); // Sin bordes para las formas

    let shapeType = floor(random(3)); // Elegir aleatoriamente entre 0, 1 o 2

    if (shapeType === 0) {
      // Dibujar un círculo
      ellipse(x, y, size, size);
    } else if (shapeType === 1) {
      // Dibujar un cuadrado
      rectMode(CENTER); // Centrar el cuadrado en las coordenadas (x, y)
      rect(x, y, size, size);
    } else if (shapeType === 2) {
      // Dibujar un triángulo
      let x1 = x - size / 2;
      let y1 = y + size / 2;
      let x2 = x + size / 2;
      let y2 = y + size / 2;
      let x3 = x;
      let y3 = y - size / 2;
      triangle(x1, y1, x2, y2, x3, y3);
    }
  }
}

function mousePressed() {
  redraw(); // Redibujar las formas al hacer clic
}
```
![imagen](https://github.com/user-attachments/assets/5088b2da-774f-481c-99ba-60ffc92d6104)
![imagen](https://github.com/user-attachments/assets/c0e19e39-52a2-40f0-829a-0a8d8934ecce)

