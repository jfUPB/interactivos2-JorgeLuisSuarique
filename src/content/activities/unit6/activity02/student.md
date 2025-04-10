# Actividad 2

**Diseño del Flujo IPO de la Experiencia Generativa**

---

## **1. Inputs (Entradas)**

| Fuente                | Tipo de dato   | Rango/Formato | Simulación? | Conexión con Storytelling |
|----------------------|---------------|--------------|-------------|-------------------------|
| Audio en vivo (música) | Frecuencia/Amplitud | 20Hz - 20kHz | No | Representa la base de la experiencia visual. |
| Interacción del usuario | Color/Selección | "Rojo", "Azul"... | No | Permite personalización visual de la experiencia. |
| Movimiento del usuario (acelerómetro/giroscopio) | Coordenadas | X, Y, Z (-10 a 10) | Opcional | Influye en el desplazamiento de las partículas. |
| Tiempo de la canción | Número (segundos) | 0 - Duración total | No | Controla la evolución de la experiencia en el tiempo. |
| Intensidad del sonido | Amplitud (dB) | 0 - 100 | No | Afecta el tamaño y la velocidad de las partículas. |

---

## **2. Process (Proceso/Algoritmo)**

### **Descripción Textual**
1. Se recibe el audio en vivo y se analiza su frecuencia y amplitud en tiempo real.
2. Se generan partículas visuales que responden a los datos del sonido.
3. El usuario puede modificar la paleta de colores y el tamaño de las partículas desde su dispositivo.
4. Si el usuario mueve su dispositivo, las partículas responden con desplazamiento en pantalla.
5. La intensidad del sonido cambia la velocidad y la cantidad de partículas generadas.
6. Durante la canción, la evolución de los elementos visuales sigue un flujo narrativo inspirado en el ritmo y la temática céltica.

### **Pseudocódigo Simple**
```
SI amplitud_sonido > umbral
   GENERAR particulas con tamaño proporcional a amplitud
   ASIGNAR color según selección de usuario
   SI usuario mueve el dispositivo
      MODIFICAR trayectoria de partículas
   SI tiempo_canción > umbral
      ALTERAR patrones visuales según fase de la música
FIN SI
```

---

## **3. Outputs (Salidas)**

| Tipo        | Elementos Generados | Propiedades Dinámicas | Relación Input -> Output | Conexión Storytelling |
|------------|--------------------|----------------------|-------------------------|-------------------------|
| Visual     | Partículas animadas | Tamaño, color, velocidad, dirección | Sonido y usuario modifican partículas en tiempo real | La visualización se adapta a la canción y a la interacción del público. |
| Experiencia | Reacción en vivo | Respuesta en milisegundos | Input musical genera respuestas visuales | La interacción hace sentir a los asistentes parte del espectáculo. |

---

## **4. Storytelling (Conexión con la Narrativa)**
La experiencia transporta al espectador a un universo visual inspirado en la música céltica, donde cada nota genera un rastro de energía vibrante en pantalla. La audiencia no solo observa, sino que moldea activamente la atmósfera con sus interacciones, convirtiendo cada presentación en un evento único e irrepetible. Este flujo generativo refuerza la conexión entre los músicos, el público y la propia esencia de la canción.

