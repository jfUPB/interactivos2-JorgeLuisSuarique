#### Implementando el núcleo del proceso y la simulación

:::note[🎯 Enunciado]
Es hora de codificar el corazón de tu pieza: la lógica del "proceso" definida en tu blueprint. 
Además, implementaremos la estrategia de simulación de datos que diseñaste para poder probar esta lógica inicial.
:::

:::tip[Recursos]
-   Tu Blueprint algorítmico (Unidad 6), sección "Proceso".
-   Tu Plan de simulación de datos (Unidad 6).
-   Tu código base de la Actividad 01 (especialmente `sketch.js`).
-   Documentación de p5.js (funciones matemáticas, `random()`, `noise()`, dibujo básico).
:::

👣 **Pasos**:

1.  **Codifica la lógica del Proceso:**
    *   Dentro de `sketch.js` (probablemente en la función `draw()` o en funciones auxiliares llamadas desde `draw()`), traduce las reglas, pasos y lógica descritos en la sección "Proceso" de tu blueprint a código p5.js.
    *   Enfócate primero en la transformación central, incluso si aún no usas los inputs/outputs finales. Define las variables clave que representarán el estado interno de tu sistema.
2.  **Implementa la simulación de Inputs:**
    *   Basándote en tu Plan de simulación (Unidad 6), escribe el código para generar los datos simulados.
    *   Usa `random()`, `noise()`, sliders en pantalla (requiere añadir elementos al HTML y usar `createSlider()` en p5.js), u otros métodos que hayas planeado.
    *   Almacena estos valores simulados en variables globales o pásalos a las funciones relevantes. Considera una variable booleana `usarSimulacion` para activarla/desactivarla fácilmente.
3.  **Conecta simulación al Proceso (inicial):** haz que la lógica del proceso que codificaste en el paso 1 utilice los *datos simulados* como si fueran los inputs reales.
4.  **Prueba inicial:** ejecuta tu sketch. Usa `print()` o `console.log()` para verificar que los datos simulados se generan como esperas y que la lógica del proceso los está utilizando y calculando valores intermedios correctamente. Aún no te preocupes demasiado por el output visual final.

:::note[🧐🧪✍️ Reporta en tu bitácora]

-   Muestra los fragmentos de código clave de `sketch.js` donde implementaste:
    *   La lógica principal del "Proceso".
    *   La generación de datos simulados.
    *   La conexión inicial entre simulación y proceso.
-   Incluye algunas salidas de `console.log` que demuestren que la simulación y el proceso están funcionando como esperabas en esta etapa inicial.
-   Describe brevemente cualquier desafío encontrado y cómo lo resolviste.
:::

:::caution[📤 Entrega]
La documentación en tu bitácora con el código del núcleo del proceso, la implementación de la simulación y las pruebas iniciales de su funcionamiento conjunto.
:::
