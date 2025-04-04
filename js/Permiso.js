// Variable global que controla si el jugador tiene permiso para jugar
let permisoParaJugar = false;
// Variables para almacenar la fecha de nacimiento y la edad del jugador
let fechaNacimiento;
let edad;
let nombre;

// Función que calcula la edad a partir de una fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    let hoy = new Date();                        // Fecha actual
    let nacimiento = new Date(fechaNacimiento);  // Fecha de nacimiento convertida a formato Date
    let edad = hoy.getFullYear() - nacimiento.getFullYear();  // Diferencia en años

    // Determinar si el cumpleaños ya ocurrió este año
    let mes = hoy.getMonth() - nacimiento.getMonth();
    let dia = hoy.getDate() - nacimiento.getDate();

    // Si el mes actual es anterior al mes de nacimiento, o si es el mismo mes pero aún no ha pasado el día del cumpleaños, restar un año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }

    return edad;  // Se retorna la edad calculada
}

// Solicitar el nombre del jugador
nombre = prompt("Ingresa tu nombre:");

// Validar que el nombre no esté vacío o contenga solo espacios
while (!nombre || nombre.trim() === "") {
    nombre = prompt("Por favor, ingresa un nombre válido:");
}

// Bucle para solicitar y validar la fecha de nacimiento
do {
    fechaNacimiento = prompt("Ingresa tu fecha de nacimiento (DD/MM/AAAA):");

    // Expresión regular para verificar el formato correcto de la fecha (DD/MM/AAAA)
    let formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!formatoFecha.test(fechaNacimiento)) {
        alert("Formato incorrecto. Usa el formato DD/MM/AAAA.");
        continue;  // Volver a solicitar la fecha si el formato es incorrecto
    }

    // Dividir la fecha en partes (día, mes y año)
    let partes = fechaNacimiento.split("/");
    let dia = parseInt(partes[0]);
    let mes = parseInt(partes[1]);
    let año = parseInt(partes[2]);

    // Validar que las partes sean números válidos
    if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
        alert("La fecha contiene valores no válidos. Inténtalo de nuevo.");
        continue;  // Volver a solicitar la fecha si alguna parte no es válida
    }

    // Crear la fecha en formato Date (los meses en JavaScript van del 0 al 11)
    let fechaValida = new Date(año, mes - 1, dia);

    // Verificar que la fecha ingresada sea una fecha real (por ejemplo, evitar el 30 de febrero)
    if (
        fechaValida.getFullYear() !== año ||
        fechaValida.getMonth() !== mes - 1 ||
        fechaValida.getDate() !== dia
    ) {
        alert("La fecha ingresada no es válida. Inténtalo de nuevo.");
        continue;  // Volver a solicitar la fecha si no es válida
    }

    // Calcular la edad del jugador
    edad = calcularEdad(`${año}-${mes}-${dia}`);

    // Evaluar si el jugador tiene permiso para jugar según su edad
    if (edad < 18) {
        permisoParaJugar = false;  // Denegar permiso
    } else {
        alert("Bienvenido, " + nombre + ". Tienes " + edad + "años. ¡Puedes jugar! 🎉");
        permisoParaJugar = true;  // Conceder permiso
    }

    break;  // Salir del bucle si se completó correctamente el proceso
} while (true);