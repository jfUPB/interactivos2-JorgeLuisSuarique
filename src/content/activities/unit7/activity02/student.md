# Actividad 2

## Fragmentos clave del código (`sketch.js` del cliente Desktop)

### Lógica principal del "Proceso":

```javascript
particles.push(new Particle(random(width), random(height), size));

for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
        particles.splice(i, 1);
    }
}
```

- Esta lógica visualiza partículas que nacen en posiciones aleatorias.
- El tamaño de cada partícula está vinculado al nivel de volumen del sonido (real o simulado).
- Las partículas suben y se desvanecen, generando un efecto visual fluido.

---

### Generación de datos simulados:

```javascript
let usarSimulacion = true;
slider = createSlider(0, 1, 0.2, 0.01);
slider.position(10, 10);
```

```javascript
let level = usarSimulacion ? slider.value() : amp.getLevel();
let size = map(level, 0, 0.3, 10, 100);
```

- Se usó un `slider` de p5.js para simular el nivel de volumen.
- La variable `usarSimulacion` permite alternar entre la entrada simulada y real (cuando se cuente con micrófono).
- `map()` transforma el nivel de volumen en un rango de tamaños para las partículas.


### Conexión entre simulación y proceso:

```javascript
let level = usarSimulacion ? slider.value() : amp.getLevel();
let size = map(level, 0, 0.3, 10, 100);
particles.push(new Particle(random(width), random(height), size));
```

- La entrada simulada (`slider.value()`) se conecta directamente con la lógica visual del sistema.
- Permite ver resultados inmediatos sin necesidad de micrófono ni entrada de audio real.

---

## Salidas de `console.log()` (simulación en acción):

```javascript
console.log("Nivel de volumen simulado:", level);
```

**Ejemplo de salida esperada:**

```
Nivel de volumen simulado: 0.23
Nivel de volumen simulado: 0.27
Nivel de volumen simulado: 0.12
```

Esto confirma que el valor simulado se está leyendo correctamente y cambia con el slider, lo que también modifica el comportamiento visual.

---

## Desafío encontrado y solución

**Desafío:**  
- No se cuenta con micrófono ni entrada real de audio para probar cómo responde la visualización.

**Solución:**  
- Se implementó una **simulación de volumen** usando un `slider`, lo que permite probar y ajustar la visualización sin necesidad de hardware adicional.
- Se agregó la bandera `usarSimulacion` para facilitar futuras pruebas con audio real.
