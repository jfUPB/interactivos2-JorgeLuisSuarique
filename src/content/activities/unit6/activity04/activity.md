#### Plan de simulación de datos

:::note[🎯 Enunciado]
Si en tu diseño IPO (Actividad 02) identificaste que necesitarás simular algunos inputs para desarrollar y probar tu algoritmo en la Unidad 7, es momento de planificar cómo lo harás. Una buena simulación te permitirá probar tu lógica generativa eficazmente. *Si TODOS tus inputs provendrán de interacciones directas en el navegador (mouse, teclado) o controles que ya planeas implementar fácilmente, puedes indicarlo y omitir el detalle de la simulación.*
:::

:::tip[Recursos]
-   Tu lista de Inputs de la Actividad 02, especialmente la columna "Simulación?".
-   Conocimientos básicos de p5.js (funciones `random()`, `noise()`, manejo de sliders/botones si aplica).
:::

👣 **Pasos**:

*Si necesitas simulación:*

1.  **Identifica inputs a simular:** lista claramente cuáles inputs de tu diseño requieren simulación.
2.  **Define método de simulación:** para cada input a simular, describe *cómo* generarás datos artificiales en p5.js.
    *   ¿Usarás `random()`? ¿Dentro de qué rango?
    *   ¿Usarás `noise()` para cambios más suaves y orgánicos? ¿Con qué parámetros iniciales?
    *   ¿Crearás sliders o botones simples en pantalla para controlar manualmente el valor simulado durante las pruebas?
    *   ¿Seguirás alguna curva o patrón predefinido?
3.  **Comportamiento simulado:** describe brevemente el *tipo* de comportamiento que buscas en los datos simulados (ej: "cambios lentos y fluctuantes", "picos aleatorios ocasionales", "respuesta directa a un slider"). Intenta que la simulación sea útil para probar la respuesta de tu algoritmo.
4.  **(Opcional) Activación/Desactivación:** piensa brevemente si necesitarás una forma fácil de activar o desactivar la simulación en tu código (ej: una variable booleana `usarSimulacion`).

*Si NO necesitas simulación:*

1.  Indica brevemente por qué no necesitas simular datos externos (ej: "Todos los inputs provienen del mouse y un slider que implementaré directamente").

:::note[🧐🧪✍️ Reporta en tu bitácora]

-   Si necesitas simulación: documenta tu plan detallado (inputs a simular, método por input, comportamiento esperado, opcionalmente activación/desactivación).
-   Si NO necesitas simulación: escribe una breve justificación.
:::

:::caution[📤 Entrega]
Tu plan de simulación de datos (o la justificación de por qué no es necesario) documentado en tu bitácora.
:::
