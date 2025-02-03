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
### Modificacion.
``` js
function draw() {
  background(220);

  // Inicialización de posiciones (solo en la primera ejecución)
  if (x.length === 0) {
    for (let i = 0; i < 50; i++) {
      x[i] = random(width);
      y[i] = random(height);
    }
  }

  // Dibujamos y movemos las formas
  for (let i = 0; i < 50; i++) {
    // Movemos las formas aleatoriamente
    x[i] += random(-1, 1); // Movimiento aleatorio en X
    y[i] += random(-1, 1); // Movimiento aleatorio en Y

    // Definimos el tamaño y color de la forma
    let size = random(20, 100); // Tamaño aleatorio
    let r = random(255); // Componente rojo del color
    let g = random(255); // Componente verde del color
    let b = random(255); // Componente azul del color
    fill(r, g, b); // Establecemos el color de relleno
    noStroke(); // Sin borde

    // Elegimos un tipo de forma aleatoria
    let shapeType = floor(random(3)); // 0, 1 o 2
    if (shapeType === 0) {
      ellipse(x[i], y[i], size, size); // Círculo
    } else if (shapeType === 1) {
      rect(x[i], y[i], size, size); // Cuadrado
    } else {
      triangle(x[i], y[i], x[i] + size, y[i], x[i] + size / 2, y[i] - size); // Triángulo
    }
  }
}
```
Eliminación de noLoop():

Esto permite que la función draw() se ejecute continuamente, creando una animación.

Inicialización de posiciones:

Usamos if (x.length === 0) para asegurarnos de que las posiciones solo se inicialicen una vez, en la primera ejecución de draw().

Movimiento aleatorio:

Con x[i] += random(-1, 1) y y[i] += random(-1, 1), las formas se mueven suavemente en cada fotograma.

Dibujo de formas:

Las formas se dibujan en sus nuevas posiciones en cada fotograma, creando una animación dinámica.

## Ejemplo 2:
``` js
function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(0);
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let noiseVal = noise(x * 0.01, y * 0.01, frameCount * 0.01);
      let size = map(noiseVal, 0, 1, 5, 20);
      let brightness = map(noiseVal, 0, 1, 100, 255);
      fill(brightness);
      ellipse(x, y, size, size);
    }
  }
}
```
### Descripcion.
Este código utiliza el ruido Perlin para generar un patrón orgánico y fluido. El ruido Perlin es una técnica que produce valores suaves y naturales, lo que lo hace ideal para crear texturas y formas que imitan fenómenos naturales.
### Modificacion.
``` js
function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(0);
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let noiseVal = noise(x * 0.05, y * 0.05, frameCount * 0.01); // Escala de ruido modificada
      let size = map(noiseVal, 0, 1, 5, 20);
      let brightness = map(noiseVal, 0, 1, 100, 255);
      fill(brightness, brightness * 0.5, brightness * 0.2); // Colores cálidos
      ellipse(x, y, size, size);
    }
  }
}
```
Escala de ruido modificada: Los círculos tienen variaciones más abruptas en tamaño y brillo, creando un efecto más "ruidoso" y menos suave.

Colores cálidos: El patrón ahora tiene un tono naranja/amarillo, lo que lo hace visualmente más atractivo y dinámico.

Combinación: El patrón resultante es más granular y vibrante, con un aspecto que combina la "rugosidad" del ruido modificado con la calidez de los colores añadidos.
