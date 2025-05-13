# Actividad 5  
# Blueprint Algorítmico – Unidad 6  

## 1. Resumen del Concepto y Narrativa  

Una experiencia visual generativa e interactiva inspirada en la música celta, donde cada momento musical se transforma en partículas animadas con estética orgánica y tribal. El público, conectado desde sus dispositivos móviles, influye activamente en la visualización mediante su selección de color y el movimiento físico de sus teléfonos. La visual se adapta en tiempo real al ritmo, energía y estructura narrativa de la canción.


## 2. Inputs Detallados

| Fuente                     | Tipo de dato           | Rango/Formato          | ¿Simulado? | Método de Simulación (si aplica)                        |
|---------------------------|------------------------|------------------------|------------|---------------------------------------------------------|
| **Audio en vivo**         | Amplitud/Frecuencia    | 20Hz–20kHz / 0–1.0     | No         | Captura directa desde micrófono o archivo de audio     |
| **Selección de color**    | Color desde UI remota  | `"Rojo"`, `"Azul"`, etc.| No         | Interacción vía socket desde móvil                     |
| **Movimiento del usuario**| Coordenadas X, Y, Z    | -10 a 10               | Sí         | `noise(t)` para simular movimientos suaves y orgánicos |
| **Intensidad del sonido** | Amplitud (simulada)    | 0.0 – 1.0              | Sí         | `random(0.3, 0.8)` + picos ocasionales hasta 1.0       |
| **Grupo activo**          | Texto (identificador)  | `"Grupo 1"`, `"Grupo 2"`| Sí         | Alternancia automática o botón manual                  |
| **Tiempo de canción**     | Segundos               | 0 – duración total     | No         | Lectura de tiempo interno del audio                    |

**Simulación:** Se controlará con la variable booleana `usarSimulacion`. Permite conmutar entre valores reales y simulados fácilmente.

## 3. Proceso (Algoritmo)

### Descripción General  

El sistema analiza en tiempo real la música en vivo y las entradas del público. Según la amplitud y momento musical, se generan partículas que representan visualmente la energía y textura del sonido. Estas partículas responden al color elegido por cada grupo del público y se comportan con dinámicas afectadas por el movimiento físico del dispositivo. Durante distintos tramos de la canción, la visualización cambia para enfatizar una progresión narrativa natural: calma → crecimiento → clímax → cierre.

### Pseudocódigo  

```pseudocode
SI usarSimulacion = true:
    amplitud ← noise(t) + picos ocasionales
    movimiento ← noise(t) en X, Y, Z
    grupoActivo ← alterna cada 10s

PARA cada frame:
    analizar amplitud del audio
    generar partículas si amplitud > umbral
    ajustar tamaño/velocidad con amplitud

    obtener color según grupo activo y selección del usuario
    aplicar color y forma a partículas

    SI movimiento detectado:
        alterar dirección/velocidad de partículas

    SI tiempo_canción > marca_narrativa:
        cambiar estilo visual (forma, densidad, ritmo)

    renderizar partículas con sus propiedades dinámicas
```

---

## 4. Outputs Detallados

| Tipo de Output     | Elementos Visuales Generados | Propiedades Dinámicas                           | Relación con Inputs                                    | Conexión con Storytelling                            |
|--------------------|------------------------------|--------------------------------------------------|--------------------------------------------------------|------------------------------------------------------|
| **Visualización**  | Partículas animadas, formas tribales | Tamaño, velocidad, color, dispersión, dirección | Influenciadas por audio, color y movimiento del usuario | Cambian según fases musicales (crecimiento, clímax...) |
| **Interacción**    | Cambios en tiempo real         | Actualización cada frame (~60 fps)              | Socket remoto y sensores                              | El público se convierte en parte activa del relato   |
| **Narrativa visual**| Cambios de escena o ambiente  | Estilo visual cambia según tiempo de canción     | Sincronizado con estructura musical                   | Transición de estados emocionales                    |


## 5. Notas Clave

 **Robustez ante fallos**: Si un input deja de llegar (por error o desconexión), el sistema utiliza valores por defecto o simulados para no detener la visual.
 **Exploración conceptual útil**:
  - Inputs extremos (picos altos de audio) provocan efectos visuales dramáticos (es deseable).
  - El cambio de parámetro interno (por ejemplo, velocidad ×2) afecta el ritmo general y debe controlarse según narrativa.
  - Combinaciones de inputs (movimiento + color + pico sonoro) pueden crear momentos visuales únicos.
  **Simulación bien definida**:
  - `noise()` para simular movimiento natural (X, Y, Z).
  - `random()` con eventos de pico para amplitud musical.
  - Alternancia lógica de grupos cada 10 segundos o vía botón.
