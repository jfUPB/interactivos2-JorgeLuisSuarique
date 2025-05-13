# Actividad 4.
## Inputs modificando el proceso.
Si estás usando valores simulados como nivelAudio que se envían por red, este fragmento es ideal.
``` js
// Cliente receptor (sketch.js)
socket.on('nivelAudio', (nivel) => {
  volumen = nivel;
  console.log('Nivel recibido:', volumen);
});
```
Esto muestra cómo el input nivelAudio (simulado o real) se recibe por red y se guarda en una variable interna del proceso.

## Proceso controlando el output.
Tu función draw() en p5.js seguramente usa esa variable volumen para crear visualizaciones.
``` js
function draw() {
  background(0);
  fill(0, 255, 255);
  ellipse(width / 2, height / 2, volumen * 200);  // tamaño influido por el volumen
}
```
Aquí el output visual (tamaño del círculo) responde directamente al input de volumen.

## Interacción directa.
Si usas interacción con mouse o teclado.
``` js
function mousePressed() {
  socket.emit('interaccionUsuario', true);
}
```
Y en el servidor.
```
socket.on('interaccionUsuario', () => {
  console.log('El usuario hizo clic');
});
```
Esto evidencia que también estás capturando inputs directos del usuario.

## Descripción del flujo IPO
En mi prototipo, simulo un input de audio desde el PC y lo envío a través de Socket.IO a un cliente móvil. El input principal es el volumen, que se transforma en una variable interna del proceso llamada volumen. Esta variable controla el tamaño de una figura visual (un círculo) que se renderiza en p5.js. Además, implementé una interacción directa: cuando el usuario hace clic, se emite un evento por red. Todo esto demuestra el flujo IPO: inputs afectan el proceso, y el proceso genera un output visual dinámico.
