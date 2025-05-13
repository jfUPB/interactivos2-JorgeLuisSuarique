# Actividad 5.
## Ejemplo 1.
### Descripción.
Este código dibuja un círculo relleno con líneas que parten desde el centro. Los parámetros que controlan la generación son:
Posición X del mouse: Controla la longitud de las líneas (radio del círculo).
Posición Y del mouse: Controla el grosor de las líneas y la cantidad de líneas (resolución del círculo).
Tecla 's': Guarda la imagen generada como un archivo PNG.
``` js
function setup() {
  createCanvas(550, 550);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  var circleResolution = int(map(mouseY, 0, height, 2, 80));
  var radius = mouseX - width / 2;
  var angle = TAU / circleResolution;

  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
```
### Variacion 1.
``` js
for (var i = 0; i <= circleResolution; i++) {
  var x = cos(angle * i) * radius;
  var y = sin(angle * i) * radius;
  stroke(i * 10, 100, 255 - i * 10); // Colores dinámicos
  line(0, 0, x, y);
}
```
Cambio: Agregar colores dinámicos a las líneas en función de su posición angular.
Efecto: Las líneas ahora tienen un gradiente de colores que varía según su posición en el círculo, creando un efecto visual más vibrante.
### Variacion 2.
``` js
function draw() {
  background(255);
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01); // Rotación continua

  var circleResolution = int(map(mouseY, 0, height, 2, 80));
  var radius = mouseX - width / 2;
  var angle = TAU / circleResolution;

  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}
```
Cambio: Hacer que el círculo rote con el tiempo.
Efecto: El círculo ahora gira continuamente, creando una animación dinámica y atractiva.
### Aplicacion Potecial.
Diseño de interfaces de usuario: Como un elemento visual interactivo en aplicaciones o videojuegos, donde el usuario controle la forma y el tamaño del círculo con el mouse.
Visualizaciones musicales: Adaptar el código para que las líneas respondan al ritmo de la música, creando una experiencia visual sincronizada con el audio.
Arte generativo en videojuegos: Usar este patrón como un efecto visual para habilidades especiales o transiciones entre niveles.

## Ejemplo 2.
### Descripción.
Este código permite al usuario dibujar un camino con el mouse, y un sistema de péndulos sigue ese camino, dejando un rastro visual. Los parámetros que controlan la generación son:
Joints: Número de articulaciones en el péndulo.
Line length: Longitud de las líneas que conectan las articulaciones.
Gravity: Fuerza de gravedad que afecta al péndulo.
Resolution: Resolución del camino dibujado.
Teclas: Permiten alternar la visualización del camino, el péndulo, el rastro del péndulo y limpiar la pantalla.
``` js
var shapes = [];

var newShape;

var joints = 12;
var linelength = 64;
var resolution = 0.06;
var gravity = 0.094;
var damping = 0.998;

var showPath = true;
var showPendulum = true;
var showPendulumPath = true;
var clearScreen = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);
}

function draw() {
  if (clearScreen) background(0, 0, 100);

  shapes.forEach(function(shape) {
    shape.draw();
    shape.update();
  });

  if (newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }
}

function Shape(pendulumPathColor) {
  this.shapePath = [];
  this.pendulumPath = [];
  this.pendulumPathColor = pendulumPathColor;
  this.iterator = 0;
  this.linelength = linelength;
  this.resolution = resolution;
  this.pendulum = new Pendulum(this.linelength, joints);

  Shape.prototype.addPos = function(x, y) {
    var newPos = createVector(x, y);
    this.shapePath.push(newPos);
  };

  Shape.prototype.draw = function() {
    strokeWeight(0.8);
    stroke(0, 10);

    if (showPath) {
      beginShape();
      this.shapePath.forEach(function(pos) {
        vertex(pos.x, pos.y);
      });
      endShape();
    }

    if (this.iterator < this.shapePath.length) {
      var currentIndex = floor(this.iterator);

      var currentPos = this.shapePath[currentIndex];
      var previousPos = this.shapePath[currentIndex - 1];
      if (previousPos) {
        var offsetPos = p5.Vector.lerp(previousPos, currentPos, this.iterator - currentIndex);
        var heading = atan2(currentPos.y - previousPos.y, currentPos.x - previousPos.x) - HALF_PI;

        push();
        translate(offsetPos.x, offsetPos.y);
        this.pendulum.update(heading);
        if (showPendulum) {
          this.pendulum.draw();
        }
        pop();

        this.pendulumPath.push(this.pendulum.getTrail(offsetPos));
      }
    }

    if (showPendulumPath) {
      strokeWeight(1.6);
      stroke(this.pendulumPathColor);
      beginShape();
      this.pendulumPath.forEach(function(pos) {
        vertex(pos.x, pos.y);
      });
      endShape();
    }
  };

  Shape.prototype.update = function() {
    this.iterator += this.resolution;
    this.iterator = constrain(this.iterator, 0, this.shapePath.length);
  };
}

function Pendulum(size, hierarchy) {
  this.hierarchy = hierarchy - 1;
  this.pendulumArm;
  this.size = size;
  this.angle = random(TAU);
  this.origin = createVector(0, 0);
  this.end = createVector(0, 0);
  this.gravity = gravity;
  this.damping = damping;
  this.angularAcceleration = 0;
  this.angularVelocity = 0;

  if (this.hierarchy > 0) {
    this.pendulumArm = new Pendulum(this.size / 1.5, this.hierarchy);
  }

  Pendulum.prototype.update = function(heading) {
    this.end.set(this.origin.x + this.size * sin(this.angle), this.origin.y + this.size * cos(this.angle));

    this.angularAcceleration = (-this.gravity / this.size) * sin(this.angle + heading);
    this.angle += this.angularVelocity;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;

    if (this.pendulumArm) {
      this.pendulumArm.update(heading);
    }
  };

  Pendulum.prototype.getTrail = function(offset, end) {
    if (this.pendulumArm) {
      if (end) {
        end.add(this.end);
      } else {
        end = this.end.copy();
      }
      return this.pendulumArm.getTrail(offset, end);
    } else {
      return this.end.copy().add(end).add(offset);
    }
  };

  Pendulum.prototype.draw = function() {
    stroke(0, 40);
    beginShape();
    vertex(this.origin.x, this.origin.y);
    vertex(this.end.x, this.end.y);
    endShape();

    fill(0, 20);
    ellipse(this.end.x, this.end.y, 2, 2);
    noFill();

    if (this.pendulumArm) {
      push();
      translate(this.end.x, this.end.y);
      this.pendulumArm.draw();
      pop();
    }
  };

}

function mousePressed() {
  newShape = new Shape(color(random(360), 80, 60, 50));
  newShape.addPos(mouseX, mouseY);
}

function mouseReleased() {
  shapes.push(newShape);
  newShape = undefined;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode == DELETE || keyCode == BACKSPACE) {
    shapes = [];
    newShape = undefined;
    background(0, 0, 100);
  }

  if (keyCode == UP_ARROW) linelength += 2;
  if (keyCode == DOWN_ARROW) linelength -= 2;
  if (keyCode == LEFT_ARROW) {
    joints--;
    joints = max(1, joints);
  }
  if (keyCode == RIGHT_ARROW) {
    joints++;
    joints = max(1, joints);
  }

  if (key == '1') showPath = !showPath;
  if (key == '2') showPendulum = !showPendulum;
  if (key == '3') showPendulumPath = !showPendulumPath;
  if (key == '4') clearScreen = !clearScreen;

  if (key == '-') gravity -= 0.001;
  if (key == '+') gravity += 0.001;
}
```
### Variacion 1.
``` js
function mousePressed() {
  newShape = new Shape(color(random(360), 80, 60, 50)); // Color aleatorio inicial
}

function draw() {
  if (clearScreen) background(0, 0, 100);

  shapes.forEach(function(shape) {
    shape.draw();
    shape.update();
  });

  if (newShape) {
    newShape.addPos(mouseX, mouseY);
    newShape.draw();
    newShape.update();
  }

  // Cambiar el color del rastro dinámicamente
  if (newShape) {
    newShape.pendulumPathColor = color(frameCount % 360, 80, 60, 50);
  }
}
```
Cambio: Modificar el color del rastro del péndulo para que cambie dinámicamente.
Efecto: El rastro del péndulo cambia de color con el tiempo, creando un efecto visual más dinámico y atractivo.
### Variacion 2.
``` js
if (keyCode == RIGHT_ARROW) {
  joints += 2; // Aumentar más rápidamente el número de articulaciones
  joints = max(1, joints);
}
```
Cambio: Aumentar el número de articulaciones en el péndulo para crear un sistema más complejo.
Efecto: El péndulo tiene más articulaciones, lo que resulta en un movimiento más complejo y un rastro más intrincado.
### Aplicacion Potecial.
Herramientas de dibujo interactivo: Como una función en aplicaciones de arte digital, donde los usuarios puedan crear diseños únicos con efectos de péndulo.
Visualizaciones musicales: Adaptar el código para que el péndulo responda al ritmo de la música, creando una experiencia visual sincronizada con el audio.
Juegos educativos: Usar este sistema para enseñar conceptos de física, como la gravedad y el movimiento pendular, de una manera interactiva y visual.

## Ejemplo 3.
### Descripción.
Este código genera una paleta de colores y crea composiciones aleatorias de rectángulos basadas en esa paleta. Los parámetros que controlan la generación son:
Color Count: Número de colores en la paleta.
Hue Values: Valores de tono para los colores.
Saturation Values: Valores de saturación para los colores.
Brightness Values: Valores de brillo para los colores.
Row Count: Número de filas en la composición.
Row Height: Altura de cada fila.
Teclas: Permiten guardar la imagen generada como PNG y la paleta de colores como un archivo ASE.
``` js
var colorCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  noLoop();
  randomSeed(actRandomSeed);

  // ------ colors ------
  // create palette
  for (var i = 0; i < colorCount; i++) {
    if (i % 2 == 0) {
      hueValues[i] = random(130, 220);
      saturationValues[i] = 100;
      brightnessValues[i] = random(15, 100);
    } else {
      hueValues[i] = 195;
      saturationValues[i] = random(20, 100);
      brightnessValues[i] = 100;
    }
  }

  // ------ area tiling ------
  // count tiles
  var counter = 0;
  // row count and row height
  var rowCount = int(random(5, 30));
  var rowHeight = height / rowCount;

  // seperate each line in parts
  for (var i = rowCount; i >= 0; i--) {
    // how many fragments
    var partCount = i + 1;
    var parts = [];

    for (var ii = 0; ii < partCount; ii++) {
      // sub fragments or not?
      if (random() < 0.075) {
        // take care of big values
        var fragments = int(random(2, 20));
        partCount = partCount + fragments;
        for (var iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2, 20));
      }
    }

    // add all subparts
    var sumPartsTotal = 0;
    for (var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    // draw rects
    var sumPartsNow = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];

      var x = map(sumPartsNow, 0, sumPartsTotal, 0, width);
      var y = rowHeight * i;
      var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
      var h = rowHeight;

      var index = counter % colorCount;
      var col = color(hueValues[index], saturationValues[index], brightnessValues[index]);
      fill(col);
      rect(x, y, w, h);

      counter++;
    }
  }
}

function mouseReleased() {
  actRandomSeed = random(100000);
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
```
### Variacion 1.
``` js
for (var i = 0; i < colorCount; i++) {
  if (i % 2 == 0) {
    hueValues[i] = random(0, 360); // Ampliar el rango de tonos
    saturationValues[i] = random(50, 100); // Variar la saturación
    brightnessValues[i] = random(50, 100); // Variar el brillo
  } else {
    hueValues[i] = random(0, 360); // Ampliar el rango de tonos
    saturationValues[i] = random(50, 100); // Variar la saturación
    brightnessValues[i] = random(50, 100); // Variar el brillo
  }
}
```
Cambio: Modificar los valores de tono, saturación y brillo para crear una paleta de colores diferente.
Efecto: La paleta de colores ahora es más variada y vibrante, con un rango más amplio de tonos, saturaciones y brillos.
### Variacion 2.
``` js
var rowCount = int(random(10, 50)); // Aumentar el número de filas
var rowHeight = height / rowCount;

for (var i = rowCount; i >= 0; i--) {
  var partCount = i + 1;
  var parts = [];

  for (var ii = 0; ii < partCount; ii++) {
    if (random() < 0.1) { // Aumentar la probabilidad de sub-fragmentos
      var fragments = int(random(2, 30)); // Aumentar el número de fragmentos
      partCount = partCount + fragments;
      for (var iii = 0; iii < fragments; iii++) {
        parts.push(random(2));
      }
    } else {
      parts.push(random(2, 30)); // Aumentar el tamaño de los fragmentos
    }
  }
}
```
Cambio: Aumentar el número de filas y fragmentos para crear una composición más compleja.
Efecto: La composición ahora tiene más filas y fragmentos, lo que resulta en un diseño más denso y complejo.
### Aplicacion Potecial.
Diseño de interfaces de usuario: Como un generador de fondos dinámicos para aplicaciones o sitios web.
Arte generativo en videojuegos: Crear texturas o fondos únicos para niveles o menús.
Herramientas de diseño gráfico: Como una función en aplicaciones de diseño para generar paletas de colores y composiciones aleatorias.
