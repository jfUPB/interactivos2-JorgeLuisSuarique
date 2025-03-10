# Actividad 4.
## ¿Qué es WebRTC?
WebRTC (Web Real-Time Communication) es una tecnología que permite la comunicación en tiempo real de audio, video y datos entre navegadores sin necesidad de plugins o software adicional. Se usa en aplicaciones como videollamadas, transmisiones en vivo y herramientas de colaboración.
## ¿Cómo funciona WebRTC?
WebRTC establece una conexión directa entre dos o más dispositivos mediante un proceso llamado peer-to-peer (P2P). Sin embargo, para que los dispositivos se encuentren y se conecten, necesitan intercambiar información a través de un servidor de señalización.
## El proceso general es:
Señalización: Los clientes intercambian información sobre cómo conectarse.
Descubrimiento y conexión: Se usa ICE (Interactive Connectivity Establishment) para encontrar la mejor ruta entre los clientes.
Intercambio de medios y datos: Una vez conectados, los clientes pueden compartir audio, video y otros datos en tiempo real.
## ¿Qué es un Peer Connection?
Un Peer Connection es la conexión directa entre dos dispositivos a través de WebRTC. Esta conexión permite la transmisión de video, audio y datos entre los usuarios sin pasar por un servidor intermedio.
En mi aplicación, la Peer Connection se usa para conectar los usuarios que interactúan con las notas musicales generadas en tiempo real.
## ¿Qué es un Data Channel?
El Data Channel es un canal de comunicación en WebRTC que permite enviar y recibir datos arbitrarios entre clientes, como mensajes, coordenadas o información sobre eventos en la aplicación.
En mi aplicación, el Data Channel permite compartir la posición y el color de las notas musicales entre los participantes.
## ¿Qué es un Media Stream?
Un Media Stream es una colección de pistas de audio y video que pueden capturarse (por ejemplo, desde una cámara o micrófono) y enviarse a través de WebRTC.
En mi aplicación, un Media Stream podría ser usado para compartir una visualización en vivo de las notas musicales generadas por el usuario.
¿Qué es un ICE Server?
Un ICE Server ayuda a WebRTC a encontrar la mejor ruta para establecer una conexión P2P entre los clientes. Puede incluir servidores STUN y TURN.
## ¿Qué es un STUN Server?
Un STUN Server (Session Traversal Utilities for NAT) ayuda a los clientes a descubrir su dirección IP pública y el tipo de NAT que usan. Esto es necesario para que los dispositivos puedan conectarse a través de redes diferentes.
¿Qué es un TURN Server?
Un TURN Server (Traversal Using Relays around NAT) es un servidor que retransmite la comunicación cuando los clientes no pueden conectarse directamente debido a restricciones de red o firewalls estrictos.
## ¿Qué es un Signaling Server?
El Signaling Server es el servidor que facilita el intercambio inicial de información entre los clientes para que puedan establecer una conexión P2P. No forma parte de WebRTC en sí, pero es esencial para iniciar la comunicación.
En mi aplicación, el Signaling Server se usa para que los usuarios se descubran y comiencen a compartir datos sobre las notas musicales.
