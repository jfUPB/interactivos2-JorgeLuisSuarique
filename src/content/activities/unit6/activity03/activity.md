#### Exploración conceptual ("¿Qué Pasaría Si...?")

:::note[🎯 Enunciado]
Un diseño robusto anticipa diferentes escenarios. Vamos a "estresar" conceptualmente tu diseño IPO para entender mejor su comportamiento y posibles limitaciones antes de codificar. Exploraremos escenarios hipotéticos.
:::

:::tip[Recursos]
-   Tu diseño IPO detallado de la Actividad 02.
:::

👣 **Pasos**:

Considera tu diseño IPO y reflexiona sobre los siguientes escenarios "qué pasaría si":

1.  **Inputs extremos:** ¿Qué output esperarías si uno o más inputs alcanzan sus valores máximos o mínimos (ej: mucho ruido, nada de movimiento, valor máximo en control remoto)? ¿Es un comportamiento interesante o un problema?
2.  **Cambio de parámetro interno:** elige una regla o parámetro clave *dentro* de tu "Proceso" (algoritmo). ¿Cómo cambiaría drásticamente el output si modificaras ese parámetro (ej: duplicar una velocidad, invertir una condición)?
3.  **Combinación de Inputs:** Describe qué output esperarías bajo una combinación específica de inputs (ej: movimiento alto + control remoto en modo "calma"). ¿Hay interacciones interesantes o conflictivas?
4.  **Falla de Input:** ¿Qué sucedería si uno de tus dispositivos de input (real o simulado) dejara de enviar datos inesperadamente? ¿Tiene tu algoritmo un estado por defecto o se detendría? ¿Necesitas prever esto?

:::note[🧐🧪✍️ Reporta en tu bitácora]

-   Para cada uno de los 4 escenarios ("Inputs Extremos", "Cambio de Parámetro", "Combinación de Inputs", "Falla de Input"):
    -   Describe el escenario específico que estás considerando para tu proyecto.
    -   Explica el comportamiento que *esperas* de tu algoritmo y los outputs resultantes.
    -   Reflexiona brevemente si ese comportamiento es deseable o si revela algo que necesitas ajustar en tu diseño IPO.
:::

:::caution[📤 Entrega]
Tus reflexiones y análisis para cada uno de los escenarios "qué pasaría si" documentados en tu bitácora.
:::
