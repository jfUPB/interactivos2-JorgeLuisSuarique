#### Diseñando el flujo IPO de tu pieza generativa

:::note[🎯 Enunciado]
Este es el núcleo de la unidad. Vamos a detallar el flujo completo de tu algoritmo utilizando el método IPO. Definirás qué datos entran (Inputs), cómo se transforman (Process) y qué se genera (Outputs), asegurándote de que todo esté conectado por tu narrativa (Storytelling). ¡Sé específico!
:::

:::tip[Recursos]
-   Tu trabajo de la Actividad 01 (resumen y conexión IPO).
-   Tu documentación completa de la Unidad 5 (concepto, narrativa, diseño preliminar).
-   Herramientas opcionales para diagramas: [draw.io](https://draw.io) / [diagrams.net](https://app.diagrams.net/), papel y lápiz.
:::

👣 **Pasos**:

1.  **Detallar Inputs:**
    *   Lista *cada* fuente de datos (sensor, interacción, control remoto, API, etc.).
    *   Para cada input: especifica el *tipo* de dato (número, booleano, texto, coordenadas...), su *rango* o formato esperado (ej: 0.0-1.0, true/false, "rojo"/"azul"), y si necesitarás *simularlo* (y una idea inicial de cómo).
    *   Explica brevemente cómo cada input se conecta con tu **Storytelling**.
2.  **Diseñar el Proceso (algoritmo):**
    *   Describe la lógica central que transforma los inputs en outputs. Usa una combinación de:
        *   **Descripción textual clara:** paso a paso, cómo influyen los inputs y qué reglas se aplican.
        *   **(Opcional) Pseudocódigo:** lógica simplificada (ej: `SI input_movimiento > umbral ENTONCES aumentar_complejidad`).
        *   **(Opcional) Diagrama de flujo:** representación visual de la lógica.
    *   Enfatiza cómo el proceso introduce **generatividad** (variación, sorpresa controlada) y responde en **tiempo real**.
    *   Explica cómo el proceso refleja o impulsa el **Storytelling**.
3.  **Especificar Outputs:**
    *   Indica el tipo principal (visual, sonoro...).
    *   Describe los elementos generados (formas, colores, sonidos, etc.) y sus *propiedades dinámicas* (posición, tamaño, tono, volumen...).
    *   Explica claramente la relación **Input -> Process -> Output**: cómo un cambio en un input, procesado por tu algoritmo, afecta visible o audiblemente el output.
    *   Describe cómo los outputs manifiestan el **Storytelling**.

:::note[🧐🧪✍️ Reporta en tu bitácora]

Organiza tu diseño IPO en secciones claras:

-   **Inputs:** tabla o lista detallada (Fuente, Tipo, Rango/Formato, Simulación?, Conexión Storytelling).
-   **Process:** descripción textual detallada. Incluye pseudocódigo o un diagrama de flujo si te ayuda a clarificar la lógica. Explica la generatividad, respuesta en tiempo real y conexión al Storytelling.
-   **Outputs:** descripción detallada (Tipo, Elementos, Propiedades Dinámicas). Explica la relación Input->Process->Output y cómo manifiestan el Storytelling. Puedes incluir bocetos simples si es visual.
:::

:::caution[📤 Entrega]
La sección detallada en tu bitácora documentando el diseño Input-Process-Output-Storytelling de tu algoritmo.
:::
