function submit() {
    // Checkeo API Support y ejecuto
    if (window.FileReader) {
        console.log("Soporta FileReader");
        procesarSubmit();
    } else {
        console.log("No soporta FileReader");
        alert('La APP no soporta este navegador por favor pruebe con otro que soporte HTML5');
    }
}

function procesarSubmit() {

    // Checkeo
    var metodo = document.querySelector('input[name="metodo"]:checked').value;
    var archivo = document.getElementById("archivo").files;

    if (metodo !== "jacobi" && metodo !== "gaussSeidel") {
        printError("No selecciono un metodo valido");
    } else if (archivo.length !== 1) {
        printError("Error en la carga del archivo");
    } else {

        // Procesa el archivo
        procesarArchivo(archivo[0], function (matriz) {
            esDiagonalmenteDominante(matriz);

            // Ejecuta metodo/solucion
            if (metodo === "jacobi") {
                metodoJacobi(matrices);
            } else {
                metodoGaussSeidel(matrices);
            }

        });

    }

}

function procesarArchivo(archivo, callback) {

    var reader = new FileReader();
    reader.onloadend = function () {
        contenido = reader.result;
        console.log("Contenido leido: \n" + contenido);
        var structs = parserCSV(contenido);
        callback(structs)

    };
    reader.readAsText(archivo);
}

function parserCSV(csv) {

    csv = csv.split("\n").map(function (row) {
        return row.split(",");
    });

    let matCoef = [];
    for (i = 0; i < csv.length; i++) {
        matCoef[i] = []
    }
    let vectIncog = [];
    let vectInd = [];

    for (i = 0; i < csv.length; i++) {
        let row = csv[i];

        for (j = 0; j < row.length; j++) {
            let campo = row[j];

            // Es incognita
            if (j + 1 === row.length - 1) {
                vectIncog[i] = campo;

                // Es termino independiente
            } else if (j + 1 === row.length) {

                let num = parseFloat(campo);
                if (isNaN(num)) {
                    exit("El CSV contiene letras en los coeficientes");
                } else {
                    vectInd[i] = num;
                }

                // Es coeficiente
            } else {

                let num = parseFloat(campo);

                if (isNaN(num)) {
                    exit("El CSV contiene letras en los coeficientes");
                } else {
                    matCoef[i][j] = num;
                }

            }

        }

    }

    return {
        coeficientes: matCoef,
        incognitas: vectIncog,
        terminosIndependientes: vectInd
    };

}


function metodoGaussSeidel(matrices) {
    //TODO: Algoritmo
}

function metodoJacobi(matrices) {
    //TODO: Algoritmo
}

function printError(msg) {
    console.log(msg);
    alert(msg);
}

function exit(status) {
    if (typeof status === 'string') {
        printError(status);
    }
    throw '';
}
