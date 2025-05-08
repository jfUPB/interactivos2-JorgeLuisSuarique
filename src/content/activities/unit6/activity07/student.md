# Actividad 7

## **Reflexión y Planificación para la Unidad 7**


### **1. Reflexión sobre el proceso de diseño**

- **Parte más fácil o intuitiva:**  
  Definir los **Inputs** fue lo más intuitivo, ya que desde el principio tenía claro qué tipo de interacciones quería capturar (movimiento del público, intensidad del sonido, control remoto). Eso me ayudó a estructurar el resto del flujo IPO con una base clara.

- **Parte más desafiante:**  
  Diseñar el **Proceso**, especialmente la lógica para alternar entre grupos de usuarios y que eso se vea reflejado visualmente. Me costó pensar cómo mantener esa dinámica sin romper la fluidez. Lo abordé iterando la narrativa varias veces hasta llegar a una estructura más flexible, usando la idea de una "ruleta de turnos".

### **2. Primeros pasos concretos para la implementación (Unidad 7)**

1. **Configurar el entorno básico de p5.js con socket.io.**  
   Crear el sketch principal, inicializar conexión entre cliente y servidor, y dejar lista la estructura para inputs remotos.

2. **Implementar la simulación de datos.**  
   Incluir la simulación de movimiento e intensidad de sonido con `noise()` y `random()`, usando la variable `usarSimulacion` para alternar entre simulación y datos reales.

3. **Codificar la visualización base de partículas.**  
   Crear las partículas básicas que responden a la intensidad del sonido y al movimiento, sin aún incorporar el sistema de turnos.

### **3. Preguntas pendientes**

- ¿Cuál es la mejor forma de manejar múltiples conexiones en socket.io para poder alternar el control entre grupos sin errores?
- ¿Cómo sincronizar correctamente el momento del cambio de grupo para que todos los clientes vean el cambio al mismo tiempo?
- ¿Puedo optimizar la visualización para que no se vuelva muy pesada cuando haya muchas partículas en pantalla?
- ¿Cómo integro la interacción móvil (sliders o botones) para que cada grupo pueda cambiar parámetros en su turno?

### **4. Estrategia de gestión del tiempo para Unidad 7**

Para la próxima unidad, aplicaré las siguientes estrategias:

- **Bloques de tiempo dedicados:** reservaré sesiones de 2 horas en días clave (ej. lunes, miércoles y sábado) para codificar sin interrupciones.
- **Empezar por lo más difícil:** atacaré primero la parte de comunicación con socket.io y la lógica de grupos, ya que será lo más complejo.
- **Documentar avances diarios:** llevaré una bitácora breve por día para registrar problemas/resoluciones.
- **Pedir ayuda temprana:** si me trabo con algo técnico (como sockets o sincronización), consultaré al docente o comunidad sin esperar al último momento.
