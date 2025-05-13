#### Preparación del entorno de desarrollo

:::note[🎯 Enunciado]
Vamos a iniciar la implementación preparando el terreno. Revisa tu blueprint final 
de la Unidad 6 y configura la estructura básica de carpetas y archivos para tu proyecto.
:::

:::tip[Recursos]
-   Tu **Blueprint algorítmico** finalizado (Actividad 05, Unidad 6).
-   Tu Plan de simulación de datos (Actividad 04, Unidad 6).
-   Tu entorno de desarrollo (editor de código como VS Code, terminal, Node.js si es necesario).
-   Conocimientos básicos de estructura de proyectos web (HTML, JS) y p5.js.
:::

👣 **Pasos**:

1.  **Revisa tu Blueprint:** lee de nuevo tu blueprint algorítmico de la Unidad 6. Asegúrate de tener claros los inputs, el proceso, los outputs y la posible necesidad de simulación y/o servidor.
2.  **Crea la estructura de carpetas:** en tu computador, crea una carpeta principal para tu proyecto de Unidad 7. Dentro de ella, organiza las subcarpetas necesarias.
3.  **Crea archivos iniciales:** dentro de las carpetas correspondientes, crea los archivos básicos:
    *   Cliente(s) p5.js: `index.html`, `sketch.js`, `style.css`. Si tienes múltiples clientes, replica esta estructura o planifica cómo gestionarlos.
    *   Servidor (basado en Unidad 3): `server.js`, `package.json`.
4.  **Configura el HTML Básico:** en `index.html`, incluye la estructura HTML mínima y enlaza las librerías necesarias (p5.js, p5.sound, y socket.io-client o p5livemedia si los usas).
5.  **Configura el `setup()` y `draw()` iniciales:** en `sketch.js`, escribe las funciones `setup()` y `draw()` vacías o con la configuración mínima del canvas.
6.  **(Servidor) configura `package.json` y `server.js` básico:** crea el `package.json` (puedes usar `npm init -y`) e instala dependencias (`npm install express socket.io` si aplica). Escribe la estructura básica del servidor en `server.js` para que pueda iniciarse (similar a lo visto en Unidad 3).

:::note[🧐🧪✍️ Reporta en tu bitácora]

-   Describe brevemente la estructura de carpetas que creaste y por qué la elegiste.
-   Muestra el código inicial de tu `index.html` (solo la sección `<head>` con los enlaces a librerías es suficiente).
-   Muestra el código inicial de tu `sketch.js` (con `setup()` y `draw()` básicos).
-   Si aplica, muestra el `package.json` y el código básico inicial de `server.js`.
-   Confirma que puedes abrir el `index.html` en el navegador (viendo un canvas vacío) y/o iniciar el servidor sin errores.
:::

:::caution[📤 Entrega]
La documentación en tu bitácora que muestre la estructura inicial del proyecto y los archivos básicos configurados.
:::
