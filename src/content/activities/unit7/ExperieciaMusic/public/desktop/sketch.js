let socket;
let imgElement;

function setup() {
    createCanvas(400, 400);
    background(220);

    // Intentar conectar con el servidor
    socket = io.connect('http://127.0.0.1:3000', { transports: ['websocket', 'polling'] });

    // Confirmar conexión en consola
    socket.on('connect', () => {
        console.log('✅ Conectado al servidor:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('❌ Desconectado del servidor');
    });

    socket.on('connect_error', (error) => {
        console.error('⚠️ Error de conexión:', error);
    });

    // Crear un elemento para mostrar la imagen recibida
    imgElement = createImg('', 'Imagen recibida');
    imgElement.position(10, 50);
    imgElement.size(300, 300);
    imgElement.hide();

    // Escuchar la imagen enviada desde Mobile
    socket.on('image', (data) => {
        console.log('📸 Imagen recibida');
        imgElement.elt.src = data;
        imgElement.show();
    });
}
