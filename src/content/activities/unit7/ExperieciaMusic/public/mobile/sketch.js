let socket;
let imgElement, captureButton, fileButton, sendButton, clearButton;
let selectedImage = null; // Almacena la imagen seleccionada

function setup() {
    createCanvas(400, 400);
    background(220);

    let socketUrl = 'https://c8vf7gvm-3000.use2.devtunnels.ms/';
    socket = io(socketUrl);

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });

    // Crear botón para capturar una foto con la cámara
    captureButton = createButton('Capturar Foto 📸');
    captureButton.position(10, 10);
    captureButton.mousePressed(openCamera);

    // Crear botón para seleccionar una imagen desde el almacenamiento
    fileButton = createFileInput(handleFile);
    fileButton.position(10, 50);
    
    // Crear un elemento para mostrar la imagen seleccionada
    imgElement = createImg('', 'Imagen capturada');
    imgElement.position(10, 100);
    imgElement.size(200, 200);
    imgElement.hide();

    // Botón para enviar la imagen
    sendButton = createButton('Enviar Imagen 📤');
    sendButton.position(10, 320);
    sendButton.mousePressed(sendImage);
    sendButton.hide();

    // Botón para limpiar la imagen
    clearButton = createButton('Limpiar ❌');
    clearButton.position(120, 320);
    clearButton.mousePressed(clearImage);
    clearButton.hide();
}

function openCamera() {
    let constraints = {
        video: {
            facingMode: "environment" // Usa la cámara trasera
        }
    };
    
    let video = createCapture(constraints, (stream) => {
        setTimeout(() => {
            video.loadPixels();
            let imgData = video.canvas.toDataURL(); // Captura la imagen como Base64
            imgElement.elt.src = imgData;
            imgElement.show();
            selectedImage = imgData;
            sendButton.show();
            clearButton.show();
            video.remove(); // Detiene la cámara después de la captura
        }, 2000); // Da tiempo para enfocar antes de capturar
    });
    
    video.hide();
}

function handleFile(file) {
    if (file.type === 'image') {
        selectedImage = file.data;
        imgElement.elt.src = selectedImage;
        imgElement.show();
        sendButton.show();
        clearButton.show();
    }
}

function sendImage() {
    if (selectedImage) {
        socket.emit('image', selectedImage);
        alert("Imagen enviada");
    }
}

function clearImage() {
    imgElement.hide();
    sendButton.hide();
    clearButton.hide();
    selectedImage = null;
}
