# Actividad 5
# Blueprint Algorítmico - Unidad 6

---

## 1. Resumen del Concepto y Narrativa

Una experiencia visual generativa inspirada en la música céltica, donde cada nota crea partículas animadas y el público puede interactuar en tiempo real desde sus dispositivos móviles, influyendo en la estética de la presentación en vivo.

---

## 2. Inputs Detallados

| Fuente                      | Tipo de dato         | Rango/Formato         | Simulación | Método de Simulación                                    |
|----------------------------|----------------------|------------------------|------------|--------------------------------------------------------|
| Audio en vivo (música)      | Frecuencia/Amplitud | 20Hz - 20kHz / 0-100dB | No         | N/A                                                    |
| Interacción del usuario    | Color/Selección     | "Rojo", "Azul", etc.  | No         | N/A                                                    |
| Movimiento del usuario     | Coordenadas X,Y,Z    | -10 a 10               | Sí         | `noise(t)` para X/Y/Z con t creciente suavemente       |
| Tiempo de la canción       | Segundos             | 0 a duración total    | No         | N/A                                                    |
| Intensidad del sonido      | Amplitud (dB)        | 0 - 100                | Sí         | `random(0, 100)` con picos ocasionales                |

**Nota:** Se usará una variable booleana `usarSimulacion` para activar o desactivar la simulación de datos.

---

## 3. Proceso (Algoritmo)

### Descripción Textual

1. Se analiza en tiempo real la frecuencia y amplitud del audio en vivo.
2. Se generan partículas animadas con tamaño y cantidad proporcional a la amplitud.
3. El color y forma de las partículas se adapta a la selección del usuario.
4. El movimiento del usuario (acelerómetro/giroscopio) altera la dirección y trayectoria de las partículas.
5. La intensidad del sonido también influye en la velocidad de las partículas.
6. El algoritmo sigue un flujo narrativo que evoluciona según las fases de la canción, inspirado en motivos naturales y célticos.

### Pseudocódigo

```
SI amplitud_sonido > umbral
   GENERAR particulas con tamaño proporcional a amplitud
   ASIGNAR color según selección de usuario
   SI usuario mueve el dispositivo
      MODIFICAR trayectoria de partículas
   SI tiempo_cancion > umbral
      ALTERAR patrones visuales según fase de la música
FIN SI
```

---

## 4. Outputs Detallados

| Tipo        | Elementos Generados | Propiedades Dinámicas                 | Relación Input -> Output                                             | Conexión con Storytelling                                            |
|-------------|---------------------|----------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------|
| Visual      | Partículas animadas | Tamaño, color, velocidad, dirección   | Audio e interacción del usuario modifican las partículas en tiempo real | Representación visual de la narrativa céltica, viva y orgánica        |
| Experiencia | Reacción en vivo    | Respuesta en milisegundos              | El input musical y del usuario generan una experiencia inmersiva      | El público moldea la experiencia, convirtiéndose en co-creador        |

---

## 5. Notas Clave

- El movimiento suave se simula con `noise()` para imitar un movimiento físico realista.
- La intensidad del sonido se simula con `random()` y eventos ocasionales de mayor valor para testear cambios bruscos.
- El uso de `usarSimulacion` permite alternar entre valores reales y simulados sin modificar la lógica principal.
- El storytelling visual se inspira en naturaleza y mitología celta, representado por patrones de crecimiento, espirales y formas tribales.

---
