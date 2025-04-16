# Actividad 6.

### **1. Claridad y definición**  
Mi diseño es en general claro, especialmente en la parte de inputs y outputs. Sin embargo, todavía hay una parte que no está del todo definida: la lógica específica del cambio entre grupos de usuarios y cómo se verá reflejado eso visualmente en pantalla. Sé que cada grupo tendrá un turno, pero aún estoy ajustando cómo se representa esa transición y cómo se controla internamente ese cambio. Esa parte necesita más precisión.

### **2. Coherencia narrativa**  
Sí, el flujo IPO representa bien la historia que quiero contar: una experiencia inmersiva donde la música y la participación del público se mezclan en tiempo real. La idea de que el público influya visualmente según el turno que le toque encaja con el concepto de fusión colectiva entre arte, tecnología y naturaleza. No siento que haya desconexiones grandes, aunque sí podría reforzar algunos momentos narrativos visualmente.

### **3. Potencial generativo e interactivo**  
Sí, creo que el algoritmo tiene un buen potencial para producir visuales interesantes y variados. Los datos de amplitud del audio, combinados con la participación del público (que modifica parámetros visuales), permitirán una visualización rica y cambiante. Además, el cambio de grupo activo aporta una capa de dinamismo adicional que puede generar momentos únicos.

### **4. Viabilidad técnica (Preliminar)**  
Lo más desafiante será manejar correctamente la comunicación entre los distintos dispositivos usando `socket.io`, especialmente para controlar bien los turnos de participación y evitar interferencias. También puede ser complejo coordinar la lógica de grupo activo en tiempo real sin que se generen errores. Fuera de eso, la parte visual y de análisis de audio con p5.js me resulta alcanzable.

### **5. Fortalezas y debilidades**  
La fortaleza principal del diseño es que combina arte generativo con una narrativa compartida e interacción en vivo, lo cual lo hace único y atractivo. La debilidad principal es la gestión del turno entre grupos y cómo asegurar que esa lógica funcione bien en tiempo real sin confundir a los participantes. Es la parte que necesitará más pruebas y ajustes durante la implementación.
