# Actividad 3.
**Exploración Conceptual del Diseño IPO**

### 1. Inputs Extremos
**Escenario:** ¿Qué sucede si los inputs alcanzan sus valores máximos o mínimos?
- **Ejemplo:** El volumen de la música alcanza el nivel máximo, o el usuario elige el color más brillante y el tamaño más grande de las partículas.
- **Comportamiento esperado:** Las partículas se multiplicarán en la pantalla y crecerán hasta su tamaño límite. Si el volumen es máximo, podría haber una saturación visual.
- **Reflexión:** Para evitar saturación, se podría implementar un sistema de auto-regulación que evite la superposición excesiva de partículas o un umbral de control para evitar que los efectos sean demasiado intensos.

### 2. Cambio de Parámetro Interno
**Escenario:** ¿Qué pasa si se modifica drásticamente una regla o parámetro interno?
- **Ejemplo:** Se duplica la velocidad de generación de partículas.
- **Comportamiento esperado:** La pantalla se llenaría más rápido de partículas, lo que podría provocar caos visual o una experiencia sobrecargada.
- **Reflexión:** Podría ser interesante explorar un sistema adaptativo donde la velocidad de generación de partículas dependa del ritmo de la música o del nivel de interacción del usuario.

### 3. Combinación de Inputs
**Escenario:** ¿Cómo interactúan distintos inputs simultáneamente?
- **Ejemplo:** El usuario cambia el color de las partículas al máximo brillo mientras la velocidad de movimiento también es alta.
- **Comportamiento esperado:** Una combinación de colores extremadamente brillantes podría hacer que la pantalla luzca demasiado saturada o caótica.
- **Reflexión:** Se podría implementar un sistema que suavice transiciones de color o que limite la combinación de ciertos parámetros para mantener una experiencia equilibrada.

### 4. Falla de Input
**Escenario:** ¿Qué pasa si un input deja de enviar datos inesperadamente?
- **Ejemplo:** La conexión con los dispositivos móviles de los usuarios se interrumpe.
- **Comportamiento esperado:** Si no hay inputs de usuario, el sistema podría quedarse sin cambios visuales y perder interactividad.
- **Reflexión:** Se podría establecer un estado por defecto en el que, si no hay interacciones por un tiempo determinado, el sistema active un modo automático con visualizaciones predefinidas.
