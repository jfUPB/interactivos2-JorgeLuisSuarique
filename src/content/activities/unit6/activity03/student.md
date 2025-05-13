# Actividad 3.

## 1. Inputs extremos

**Escenario:**  
El micrófono capta un pico extremo de amplitud (volumen muy alto y sostenido), mientras que el grupo activo en la ruleta está inactivo (no interactúa con su celular).

**Comportamiento esperado del algoritmo:**  
- Las partículas reaccionarían con una intensidad visual muy alta: mayor velocidad, dispersión y explosión de color.
- Sin datos del público, el sistema usaría los últimos valores registrados o un valor por defecto para los parámetros visuales (color y tamaño).

**¿Es deseable?:**  
- **Sí, parcialmente.** Visualmente puede ser interesante si el sistema responde con dramatismo al clímax musical.  
- **Pero:** Si no hay interacción del público en ese momento, se puede perder parte de la dimensión colaborativa de la experiencia.  
**Posible ajuste:** Implementar una reacción visual alternativa más abstracta si no hay inputs activos del público, para mantener el dinamismo.

## 2. Cambio de parámetro interno

**Escenario:**  
Duplicar la sensibilidad al volumen del audio en el proceso (por ejemplo, `visual_intensity = amplitude * 2`).

**Comportamiento esperado del algoritmo:**  
- El sistema respondería de forma mucho más agresiva a cualquier cambio de volumen: visuales más bruscos, partículas más caóticas, cambios de escena más abruptos.

**¿Es deseable?:**  
- **Depende del propósito narrativo.**  
  - Para momentos climáticos puede ser positivo.  
  - Pero durante partes suaves de la canción podría generar ruido visual innecesario.  
**Posible ajuste:** Aplicar una curva de respuesta no lineal (por ejemplo, exponencial o logarítmica) para dar más control y evitar sobresaturación.


## 3. Combinación de Inputs

**Escenario:**  
Grupo 1 activo con mucha interacción (cambio constante de color y tamaño), mientras el audio se encuentra en un pasaje suave y melódico.

**Comportamiento esperado del algoritmo:**  
- La visualización recibiría inputs visuales muy activos, pero los movimientos de partículas estarían controlados y lentos por la suavidad del audio.
- Esto generaría una paradoja visual: cambios intensos de color/tamaño pero con partículas que se mueven lentamente y forman patrones delicados.

**¿Es deseable?:**  
- **Sí, potencialmente muy interesante.** Puede dar lugar a contrastes expresivos: la energía del público rompe con la calma del audio, revelando una tensión narrativa.  
**Ajuste opcional:** Podría incorporarse una lógica que suavice o module los inputs del público en función del nivel de energía de la música para mantener coherencia (si se desea).

## 4. Falla de Input

**Escenario:**  
El dispositivo de audio deja de enviar datos (fallo de micrófono o desconexión).

**Comportamiento esperado del algoritmo:**  
- Las partículas dejarían de responder al sonido.  
- Si no se implementa un estado por defecto, podrían quedar inmóviles o congeladas, rompiendo la experiencia visual.

**¿Es deseable?:**  
- **No.** Una falla de audio no debe detener la experiencia visual completamente.  
**Ajuste necesario:**  
- Definir un **modo de respaldo** en el algoritmo:  
  - Si no se detecta audio por más de X segundos, el sistema entra en un “modo automático” donde se genera una progresión visual con base en una curva predefinida o usando el ritmo de las interacciones del público.


## Conclusión general

Estos escenarios revelan que tu diseño es flexible y con mucho potencial expresivo, pero también muestran la importancia de:
- Implementar **modos de respaldo** en caso de fallas.
- Usar curvas o filtros para suavizar inputs extremos.
- Explorar la riqueza narrativa de las **combinaciones inesperadas** de inputs.
