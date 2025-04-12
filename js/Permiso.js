// Variables globales
let permisoParaJugar = false;
let nombre = "";
let edad = 0;

// Elemento donde se mostrará el juego o los mensajes de validación
const contenedorJuego = document.getElementById("juego");

// Mostrar formulario inicial
contenedorJuego.innerHTML = `
    <div class="permiso">
        <h2>Bienvenido al juego 🪨📄✂️</h2>
        <label for="nombre">Ingresa tu nombre:</label>
        <input type="text" id="nombre" placeholder="Tu nombre aquí" required>
        <label for="fechaNacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fechaNacimiento" required>
        <button id="validar">Validar</button>
    </div>
`;

// Función para calcular la edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// Validación del permiso
document.getElementById("validar").addEventListener("click", () => {
    const inputNombre = document.getElementById("nombre").value.trim();
    const inputFechaNacimiento = document.getElementById("fechaNacimiento").value;

    if (!inputNombre) {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (!inputFechaNacimiento) {
        alert("Por favor, selecciona una fecha de nacimiento.");
        return;
    }

    // Calcular edad
    nombre = inputNombre;
    edad = calcularEdad(inputFechaNacimiento);

    if (edad > 18) {
        permisoParaJugar = true;
        contenedorJuego.innerHTML = `
            <h2>🎉 ¡Bienvenido, ${nombre}! Tienes ${edad} años. Puedes jugar. 🎉</h2>
            <button id="comenzar">Comenzar Juego</button>
        `;
        document.getElementById("comenzar").addEventListener("click", iniciarJuego);
        
    } else {
        permisoParaJugar = false;
        contenedorJuego.innerHTML = `
            <h2>Lo sentimos, ${nombre}. No tienes permiso para jugar. 💔</h2>
            <button id="reiniciar">Reintentar</button>
        `;
        document.getElementById("reiniciar").addEventListener("click", () => location.reload());
    }
});

// Función para iniciar el juego
function iniciarJuego() {
    // Aquí llamamos a la función que maneja el flujo del juego
    if (permisoParaJugar) {
        ejecutarJuego();
    } else {
        alert("No tienes permiso para jugar.");
    }
}
