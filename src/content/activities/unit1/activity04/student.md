# Actividad 4
## Ejemplo 1:
``` js
function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(20, 100);
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b);
    noStroke();
    let shapeType = floor(random(3));
    if (shapeType === 0) {
      ellipse(x, y, size, size);
    } else if (shapeType === 1) {
      rect(x, y, size, size);
    } else {
      triangle(x, y, x + size, y, x + size / 2, y - size);
    }
  }
}
```
### Descripcion.
Este código genera formas geométricas aleatorias (círculos, cuadrados, triángulos) en posiciones aleatorias dentro del lienzo. Los colores y tamaños de las formas también se generan de manera aleatoria, creando una composición visual dinámica y única cada vez que se ejecuta el código.
### Modificacion
## Ejemplo 2:
