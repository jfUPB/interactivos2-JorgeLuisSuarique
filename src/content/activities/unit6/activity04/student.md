# Actividad 4.
¡Perfecto! Vamos con la **Actividad 4: Plan de Simulación de Datos** basada en tu flujo IPO anterior:

---

## 🧪 **Plan de Simulación de Datos**

### **1. Inputs a Simular**

De acuerdo con el flujo IPO, los siguientes inputs requerirán simulación:

- Movimiento del usuario (acelerómetro/giroscopio)
- Intensidad del sonido

---

### **2. Método de Simulación**

| Input                        | Método | Detalles |
|-----------------------------|--------|----------|
| **Movimiento del usuario**  | `noise()` | Generar valores suaves y fluctuantes para X, Y, Z entre -10 y 10. Usaré un incremento (`t += 0.01`) para mantener la continuidad del movimiento. Ejemplo: `let x = noise(t) * 20 - 10` |
| **Intensidad del sonido**   | `random()` + picos esporádicos | Rango entre 30 y 80 dB como base, con picos simulados ocasionales entre 80 y 100. Ejemplo: `let intensidad = random(30, 80); if (frameCount % 60 === 0) intensidad = random(80, 100);` |

---

### **3. Comportamiento Simulado Esperado**

- **Movimiento del usuario:** Cambios suaves y naturales, como si el dispositivo se moviera lentamente en el espacio (ideal para probar efectos en partículas que reaccionan al movimiento).
- **Intensidad del sonido:** Fluctuaciones comunes con picos ocasionales que simulan golpes fuertes o acentos musicales (útil para validar el aumento/disminución de partículas, velocidad o tamaño).

---

### **4. Activación/Desactivación de Simulación**

Se usará una variable booleana `usarSimulacion` para poder activar o desactivar fácilmente la simulación durante pruebas o presentaciones en vivo. Ejemplo:

```js
if (usarSimulacion) {
  // Simular datos
} else {
  // Usar datos reales
}
```
```js
// Variables para simulación
let usarSimulacion = true;
let t = 0; // Tiempo para noise
let movimiento = { x: 0, y: 0, z: 0 };
let intensidadSonido = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(30);

  if (usarSimulacion) {
    // Simulación de movimiento con noise
    movimiento.x = noise(t) * 20 - 10;
    movimiento.y = noise(t + 100) * 20 - 10;
    movimiento.z = noise(t + 200) * 20 - 10;
    t += 0.01;

    // Simulación de intensidad de sonido con random + picos
    intensidadSonido = random(30, 80);
    if (frameCount % 60 === 0) {
      intensidadSonido = random(80, 100); // Pico cada 60 frames
    }
  } else {
    // Aquí podrías insertar los datos reales si los tuvieras
  }

  // Mostrar los valores simulados en pantalla
  fill(255);
  textSize(16);
  text("Movimiento simulado:", 20, 30);
  text("X: " + nf(movimiento.x, 1, 2), 40, 60);
  text("Y: " + nf(movimiento.y, 1, 2), 40, 80);
  text("Z: " + nf(movimiento.z, 1, 2), 40, 100);

  text("Intensidad de sonido sim.: " + nf(intensidadSonido, 1, 2) + " dB", 20, 140);

  // Visualización simple de intensidad (círculo)
  noStroke();
  fill(0, 150, 255, 180);
  let size = map(intensidadSonido, 30, 100, 20, 200);
  ellipse(width / 2, height / 2, size);
}
```
