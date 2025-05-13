# Actividad 11
## Codigo Poema.
```js
let palabras = ["montañas", "bosques", "ríos", "nubes", "niebla", "árboles", "raíces", "cumbres", "hojas", "piedras"];
let conectores = ["y", "de", "con", "en", "bajo", "sobre", "entre", "hacia"];
let fuentes = ["Georgia", "Courier", "Arial", "Times New Roman", "Verdana"];
let poemas = [];
let colores = [];
let tamanos = [];
let tiempoCambioColor = 0;

function setup() {
  createCanvas(800, 600);
  background(30);
  textAlign(CENTER, CENTER);
  generarPoema();
  generarColoresArmonicos();
  generarTamanos();
}

function draw() {
  background(30);
  tiempoCambioColor += 0.01;
  mostrarPoema();
}

function generarPoema() {
  poemas = [];
  for (let i = 0; i < 5; i++) {
    let frase = "";
    for (let j = 0; j < 4; j++) {
      if (j % 2 === 0) {
        frase += palabras[floor(random(palabras.length))] + " ";
      } else {
        frase += conectores[floor(random(conectores.length))] + " ";
      }
    }
    poemas.push(frase.trim());
  }
}

function generarColoresArmonicos() {
  colores = [];
  let tonoBase = random(255);
  for (let i = 0; i < 5; i++) {
    colores.push(color(
      (tonoBase + random(-50, 50)) % 255,
      (tonoBase + random(-50, 50)) % 255,
      (tonoBase + random(-50, 50)) % 255
    ));
  }
}

function generarTamanos() {
  tamanos = [];
  for (let i = 0; i < 5; i++) {
    tamanos.push(random(20, 40));
  }
}

function mostrarPoema() {
  let y = 100;
  for (let i = 0; i < poemas.length; i++) {
    let tamanoActual = lerp(tamanos[i], tamanos[(i + 1) % tamanos.length], sin(tiempoCambioColor) * 0.5 + 0.5);
    textSize(tamanoActual);

    textFont(fuentes[i % fuentes.length]);
    let colorActual = lerpColor(colores[i], colores[(i + 1) % colores.length], sin(tiempoCambioColor) * 0.5 + 0.5);
    fill(colorActual);
    textStyle(NORMAL);

    text(poemas[i], width / 2, y);
    y += 80;
  }
}

function mousePressed() {
  generarPoema();
  generarColoresArmonicos();
  generarTamanos();
}
```
![image](https://github.com/user-attachments/assets/18797b43-1d3a-46fd-a38c-294994851f89)
