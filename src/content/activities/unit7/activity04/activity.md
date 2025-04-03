#### Integrando Inputs y Outputs al flujo

:::note[🎯 Enunciado]
Con el núcleo del proceso, la simulación y la comunicación funcionando, es hora de integrar completamente 
el flujo IPO. Conectaremos los inputs (simulados o reales básicos) para que realmente afecten al proceso, 
y haremos que el proceso genere los outputs visuales/sonoros definidos en tu blueprint.
:::

:::tip[Recursos]
-   Tu Blueprint algorítmico (Unidad 6), secciones "Inputs" y "Outputs".
-   Todo tu código desarrollado hasta ahora en la Unidad 7.
-   Documentación de p5.js (dibujo, color, sonido, manipulación del DOM si es necesario).
:::

👣 **Pasos**:

1.  **Conectar Inputs al Proceso:**
    *   Modifica el código del "Proceso" (Actividad 02) para que ahora utilice *activamente* los valores de los inputs (sean los simulados de Actividad 02, o los recibidos por red de Actividad 03, o inputs directos del navegador como `mouseX`, `mouseY`).
    *   Asegúrate de que los cambios en los inputs provoquen cambios en las variables internas o en el flujo lógico del proceso, tal como lo diseñaste.
2.  **Generar Outputs desde el Proceso:**
    *   Basándote en la sección "Outputs" de tu blueprint, escribe el código (principalmente en `draw()` o funciones llamadas desde ahí) para generar los elementos visuales o sonoros.
    *   Utiliza las variables y resultados calculados por el "Proceso" para controlar las *propiedades dinámicas* de los outputs (posición, tamaño, color, tono, volumen, etc.). El objetivo es que el output *refleje* el estado interno del algoritmo, el cual es influenciado por los inputs.
3.  **Implementar interacción básica:** la interacción directa del usuario (clics, teclado, sliders), implementa los manejadores de eventos correspondientes (`mousePressed()`, `keyPressed()`, etc.) para que capturen esos inputs y los integren al flujo.
4.  **Prueba el flujo completo:** ejecuta tu prototipo. Interactúa con los inputs (o deja correr la simulación/comunicación). Observa si los outputs cambian dinámicamente como respuesta, siguiendo la lógica Input -> Process -> Output que diseñaste. Usa `console.log` para rastrear valores si algo no funciona como esperas.

:::note[🧐🧪✍️ Reporta en tu bitácora]

-   Muestra los fragmentos de código clave donde:
    *   Los inputs (simulados, de red o directos) modifican el comportamiento del proceso.
    *   El proceso controla las propiedades dinámicas de los outputs visuales/sonoros.
    *   Implementaste la interacción directa (si aplica).
-   Incluye capturas de pantalla o un GIF animado corto que muestre el prototipo en acción, evidenciando cómo los outputs responden a los inputs (aunque sea de forma básica).
-   Describe cómo el flujo IPO se manifiesta ahora en tu código funcional.
:::

:::caution[📤 Entrega]
La documentación en tu bitácora mostrando la integración del flujo IPO en el código y una demostración visual/descriptiva del prototipo respondiendo a los inputs.
:::
