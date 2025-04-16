# Actividad 4  
¡Perfecto! Vamos con la **Actividad 4: Plan de Simulación de Datos** basada en tu flujo IPO:


## **Plan de Simulación de Datos**

### **1. Inputs a Simular**

De acuerdo con el diseño IPO, los siguientes inputs necesitarán simulación para pruebas y desarrollo:

- **Amplitud del audio** (dinámica de la canción en vivo)  
- **Selección de grupo activo** (ruleta para turnos de participación del público)

---

### **2. Método de Simulación**

| Input                        | Método | Detalles |
|-----------------------------|--------|----------|
| **Amplitud del audio**      | `noise()` + picos simulados | Se genera una señal suave entre 0.2 y 0.8 con `noise()` para simular variaciones musicales orgánicas. Se añaden picos ocasionales entre 0.8 y 1.0 para simular momentos de intensidad. |
| **Selección de grupo activo** | alternancia temporal o botón manual | Cada 10 segundos se alterna automáticamente entre "Grupo 1" y "Grupo 2", o se puede cambiar manualmente con un botón HTML. |

---

## **3. Comportamiento Simulado Esperado**

- **Amplitud del audio:**  
  Simula una canción con dinámica fluida: momentos suaves y picos marcados, como transiciones entre versos y coros. Ideal para probar reacciones visuales como aumento de cantidad o energía de partículas.

- **Grupo activo (ruleta):**  
  Cambios de grupo que permiten testear si las interacciones del público están correctamente limitadas o habilitadas en distintos momentos. Muy útil para validar la lógica condicional.

---

## **4. Activación/Desactivación de Simulación**

Se implementará una variable global `usarSimulacion` para facilitar el cambio entre simulación y uso de datos reales:

```js
let usarSimulacion = true;
```

Esto permitirá probar el algoritmo con datos artificiales al inicio y luego cambiar a los datos en vivo sin alterar la estructura principal del código.


## Código de ejemplo en p5.js

```js
let usarSimulacion = true;
let t = 0;
let amplitud = 0;
let grupoActivo = "Grupo 1";

function setup() {
  createCanvas(600, 400);
  textFont('monospace');
}

function draw() {
  background(10);

  if (usarSimulacion) {
    // Simular amplitud del audio
    amplitud = noise(t) * 0.6 + 0.2;
    if (frameCount % 120 === 0) {
      amplitud = random(0.8, 1.0); // pico de intensidad
    }
    t += 0.01;

    // Alternar grupo activo cada 10 segundos
    if (frameCount % 600 === 0) {
      grupoActivo = (grupoActivo === "Grupo 1") ? "Grupo 2" : "Grupo 1";
    }
  }

  // Mostrar valores simulados
  fill(255);
  textSize(16);
  text("Amplitud simulada: " + nf(amplitud, 1, 2), 20, 40);
  text("Grupo activo: " + grupoActivo, 20, 70);

  // Visualización básica (círculo pulsante según amplitud)
  noStroke();
  fill(100, 200, 255, 180);
  let tam = map(amplitud, 0.2, 1.0, 50, 250);
  ellipse(width / 2, height / 2, tam);

  // Mostrar grupo activo con color
  fill(grupoActivo === "Grupo 1" ? 'lime' : 'orange');
  ellipse(width / 2, height - 60, 40);
}
```
