function ejecutarJuego() {
    // Verifica si el jugador tiene permiso para jugar
    if (!permisoParaJugar) {
        document.body.innerHTML = `
            <div class="contenedor flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
                <h1 class="text-white text-3xl font-bold bg-purple-700 p-4 rounded-xl shadow-lg">No tienes permiso para jugar.</h1>
                <button class="mt-4 text-white bg-blue-700 hover:bg-blue-600 p-2 rounded-lg shadow-md" onclick="location.reload()">Reint entar</button>
            </div>
        `;
        return;
    }

    // Inicialización de variables
    let pc = 0; // Elección aleatoria de la computadora
    let jugador = 0; // Elección del jugador
    let triunfos = 0; // Contador de victorias del jugador
    let derrotas = 0; // Contador de derrotas del jugador

    // Generar el contenido del juego dinámicamente
    document.body.innerHTML = `
        <div class="contenedor flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-400">
            <h1 class="text-white text-3xl font-bold mb-4">Piedra, Papel o Tijera</h1>
            <div id="resultado" class="text-white text-lg mb-6"></div>
            <div class="botones flex space-x-4">
                <button class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg" id="btnPiedra">Piedra 🪨</button>
                <button class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg" id="btnPapel">Papel 🧻</button>
                <button class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg" id="btnTijera">Tijera ✂️</button>
            </div>
        </div>
    `;

    const resultadoDiv = document.getElementById("resultado");

    // Función que genera un número aleatorio
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Función que convierte la elección numérica en texto con emojis
    function eleccion(jugada) {
        if (jugada == 1) return "Piedra 🪨";
        if (jugada == 2) return "Papel 🧻";
        if (jugada == 3) return "Tijera ✂️";
        return "Opción inválida 💩";
    }

    // Función que determina el resultado de la ronda
    function verificar(jugador, pc) {
        if (jugador === pc) {
            return "¡Empate! 🖖";
        } else if (
            (jugador === 1 && pc === 3) || // Piedra vence a Tijera
            (jugador === 2 && pc === 1) || // Papel vence a Piedra
            (jugador === 3 && pc === 2) // Tijera vence a Papel
        ) {
            triunfos++; // Suma una victoria
            return "¡Ganaste! 🎉";
        } else {
            derrotas++; // Suma una derrota
            return "¡Perdiste! 💔";
        }
    }

    // Función principal que maneja el flujo del juego
    function jugar(jugadaJugador) {
        pc = aleatorio(1, 3);

        const resultado = verificar(jugadaJugador, pc);

        resultadoDiv.innerHTML = `
            <p>Tú elegiste: ${eleccion(jugadaJugador)}</p>
            <p>PC eligió: ${eleccion(pc)}</p>
            <p>${resultado}</p>
            <p>✅ Triunfos: ${triunfos} | ❌ Derrotas: ${derrotas}</p>
        `;

        // Verificar si el juego debe finalizar
        if (triunfos === 3) {
            resultadoDiv.innerHTML += "<p>🎉 ¡Ganaste el juego! 🎉</p>";
            desactivarBotones();
        } else if (derrotas === 3) {
            resultadoDiv.innerHTML += "<p>💀 Perdiste el juego. 💀</p>";
            desactivarBotones();
        }
    }

    // Función para desactivar los botones cuando el juego termina
    function desactivarBotones() {
        document.querySelectorAll("button").forEach((boton) => {
            boton.disabled = true;
        });
    }

    // Asignar eventos a los botones
    document.getElementById("btnPiedra").addEventListener("click", () => jugar(1));
    document.getElementById("btnPapel").addEventListener("click", () => jugar(2));
    document.getElementById("btnTijera").addEventListener("click", () => jugar(3));
}
