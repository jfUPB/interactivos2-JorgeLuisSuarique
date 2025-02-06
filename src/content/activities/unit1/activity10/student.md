# Actividad 10.
http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_2_3_01
``` js
let maxDivisions = 5; // Máximo número de subdivisiones
let initialColor; // Color inicial único
let subdivisionColors = []; // Array para almacenar colores de subdivisiones

function setup() {
  createCanvas(800, 800); // Crear un lienzo de 800x800 píxeles
  initialColor = color(random(255), random(255), random(255)); // Color inicial único
  background(255); // Fondo blanco
  subdivisionColors.push(initialColor); // Inicializar con el color inicial
}

function draw() {
  background(255); // Limpiar el fondo en cada frame
  updateDivisions(); // Actualizar subdivisiones basado en la posición del mouse
  drawDivisions(); // Dibujar las divisiones
  checkReset(); // Verificar si el mouse está en la esquina superior izquierda
}

function updateDivisions() {
  // Calcular subdivisiones en X basado en la posición horizontal del mouse
  let divisionsX = floor(map(mouseX, 0, width, 0, maxDivisions));
  divisionsX = constrain(divisionsX, 0, maxDivisions); // Limitar al máximo

  // Calcular subdivisiones en Y basado en la posición vertical del mouse
  let divisionsY = floor(map(mouseY, 0, height, 0, maxDivisions));
  divisionsY = constrain(divisionsY, 0, maxDivisions); // Limitar al máximo

  // Añadir colores para las nuevas subdivisiones
  let totalSubdivisions = pow(2, divisionsX) * pow(2, divisionsY);
  while (subdivisionColors.length < totalSubdivisions) {
    subdivisionColors.push(color(random(255), random(255), random(255)));
  }

  // Dibujar las divisiones actuales
  drawDivisions(divisionsX, divisionsY);
}

function drawDivisions(divisionsX, divisionsY) {
  let widthDivision = width / pow(2, divisionsX); // Ancho de cada división en X
  let heightDivision = height / pow(2, divisionsY); // Alto de cada división en Y

  for (let x = 0; x < pow(2, divisionsX); x++) {
    for (let y = 0; y < pow(2, divisionsY); y++) {
      let posX = x * widthDivision; // Posición X del cuadro
      let posY = y * heightDivision; // Posición Y del cuadro

      // Usar el color correspondiente a la subdivisión actual
      let index = x + y * pow(2, divisionsX); // Índice único para cada cuadro
      fill(subdivisionColors[index]); // Usar el color almacenado

      noStroke(); // Sin bordes
      rect(posX, posY, widthDivision, heightDivision); // Dibujar el cuadro
    }
  }
}

function checkReset() {
  // Si el mouse está en la esquina superior izquierda, reiniciar
  if (mouseX === 0 && mouseY === 0) {
    initialColor = color(random(255), random(255), random(255)); // Nuevo color inicial
    subdivisionColors = [initialColor]; // Reiniciar colores de subdivisiones
  }
}
```
![imagen](https://github.com/user-attachments/assets/478fb7cc-ec73-4556-8fe3-23618a3e910e)
