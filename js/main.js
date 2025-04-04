// Verifica si el jugador tiene permiso para jugar
if (!permisoParaJugar) {
    // Si no tiene permiso, se muestra una alerta y se detiene el juego
    alert("No tienes permiso para jugar.");
} else {
    // Inicialización de variables
    let pc = 0;         // Elección aleatoria de la computadora
    let jugador = 0;    // Elección del jugador
    let opcion = 0;     // Control para continuar o finalizar el juego
    let triunfos = 0;   // Contador de victorias del jugador
    let derrotas = 0;   // Contador de derrotas del jugador

    // Función que genera un número aleatorio dentro de un rango dado (incluye ambos extremos)
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Función que convierte la elección numérica en texto con emojis
    function eleccion(jugada) {
        if (jugada == 1) return "Piedra 🪨";
        if (jugada == 2) return "Papel 🧻";
        if (jugada == 3) return "Tijera ✂️";
        return "Opción inválida 💩"; // Esta opción solo ocurre si hay un error inesperado
    }

    // Función que determina el resultado de la ronda
    function verificar(jugador, pc) {
        if (jugador == pc) {
            alert("¡Empate! 🖖");
        } else if (
            (jugador == 1 && pc == 3) ||  // Piedra vence a Tijera
            (jugador == 2 && pc == 1) ||  // Papel vence a Piedra
            (jugador == 3 && pc == 2)     // Tijera vence a Papel
        ) {
            alert("¡Ganaste! 🍻");
            triunfos++;  // Suma una victoria
        } else {
            alert("¡Perdiste! 💊");
            derrotas++;  // Suma una derrota
        }
    }

    // Bucle principal del juego
    do {
        // Solicitar al jugador que elija una opción válida
        do {
            jugador = parseInt(prompt("Elige: \n1 = Piedra 🪨\n2 = Papel 🧻\n3 = Tijera ✂️"));

            // Validación de la elección del jugador
            if (jugador < 1 || jugador > 3 || isNaN(jugador)) {
                alert("Has DESHONRADO A TU FAMILIA 💩. Ingresa una opción válida.");
            }
        } while (jugador < 1 || jugador > 3 || isNaN(jugador));

        // Elección aleatoria de la PC
        pc = aleatorio(1, 3);

        // Mostrar las elecciones de cada jugador
        alert("Tú elegiste: " + eleccion(jugador));
        alert("PC eligió: " + eleccion(pc));

        // Determinar quién gana en la ronda actual
        verificar(jugador, pc);

        // Mostrar el marcador actual
        alert(`Resultados actuales:\n✅ Triunfos: ${triunfos}\n❌ Derrotas: ${derrotas}`);

        // Verificar si el juego debe finalizar por alcanzar 3 triunfos o 3 derrotas
        if (triunfos === 3 || derrotas === 3) {
            alert("¡El juego ha terminado!");
            break;  // Salir del bucle principal
        }

        // Preguntar si el jugador desea continuar jugando
        do {
            opcion = parseInt(prompt("¿Deseas jugar piedra, papel o tijeras? \n1 = Sí \n2 = No"));

            // Validación de la opción ingresada
            if (opcion !== 1 && opcion !== 2 || isNaN(opcion)) {
                alert("Debes elegir una opción válida: 1 para Sí o 2 para No.");
            }
        } while (opcion !== 1 && opcion !== 2 || isNaN(opcion));

    } while (opcion == 1);  // Continuar jugando si elige "Sí"
}
