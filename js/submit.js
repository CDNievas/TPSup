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

    // DOM
    let metodo = document.querySelector('input[name="metodo"]:checked').value;
    let norma = document.querySelector('input[name="norma"]:checked').value;
    let archivo = document.getElementById("archivo").files;
    let vectInicial = document.getElementById("vectInicial").value;
    let cantDec = document.getElementById("cantDec").value;
    let cotaError = document.getElementById("cotaError").value;

    // convierto string con lista de valores a un vector
    vectInicial = vectInicial.split(',').map(Number);

    // Checkea muchas cosas xddd
    let comp = comprobacionesAristocraticas(metodo,norma,archivo,cantDec,cotaError);
    if (comp.codigo === -1){
        printError(comp.msg);
    } else {
        // Procesa el archivo
        procesarArchivo(archivo[0], function (matrices) {

            /* Acceso a matrices
            coeficientes -> matrices.coeficientes
            incognitas -> matrices.incognitas
            independientes -> matrices.termInd
            */

            // Checkea Diagonal Dominante
            esDiagonalmenteDominante(matrices);

            // Imprime tabla
            crearTabla(matrices);

            // Ejecuta calculo norma
            let rdoNorma;

            const coeficientes = matrices.coeficientes;
            if (norma === "norma_1"){
                rdoNorma = normaUnoMatriz(coeficientes);
            } else if (norma === "norma_2") {
                rdoNorma = normaDosMatriz(coeficientes);
            } else {
                rdoNorma = normaInfinitoMatriz(coeficientes);
            }

            // Ejecuta metodo/solucion
            if (metodo === "jacobi") {
                metodoJacobi(matrices, vectInicial, cotaError, cantDec);
            } else {
                metodoGaussSeidel(matrices);
            }

        });

    }

}


function comprobacionesAristocraticas(metodo, norma, archivo, cantDec, cotaError){

    if(metodo !== "jacobi" && metodo !== "gaussSeidel"){
        return {codigo: -1, msg: "No selecciono un metodo valido"};
    } else if (norma !== "norma_1" && norma !== "norma_2" && norma !== "norma_infinito"){
        return {codigo: -1, msg: "No selecciono una norma valida"};
    } else if (cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null || cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null){
        return {codigo: -1, msg: "Un campo de texto contenia datos en un formato distinto al establecido"};
    } else if (archivo.length !== 1){
        return {codigo: -1, msg: "Error en la carga del archivo"};
    } else {
        return {codigo: 0, msg:""};
    }

}


function procesarArchivo(archivo, callback) {

    var reader = new FileReader();
    reader.onloadend = function () {
        contenido = reader.result;
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
        termInd: vectInd
    };

}

// ARREGLAR TABLA
function crearTabla(datos) {

    //v2
    const elemPadre = document.getElementById('wrapTabla');
    let tablaMatriz = document.getElementById("tablaMatriz");

    if(tablaMatriz === null){
        tablaMatriz = document.createElement("table");
        tablaMatriz.id = "tablaMatriz";
        tablaMatriz.classList.add("tablaMatriz");
    } else {
        tablaMatriz.innerHTML = '';
    }

    const row = tablaMatriz.insertRow();
    for (let i = 0; i < datos.coeficientes.length; i++) {
        const row = tablaMatriz.insertRow();
        const datosArray = datos.coeficientes[i].concat(datos.incognitas[i], datos.termInd[i]);

        for (let j = 0; j < datosArray.length; j++) {
            const cell = row.insertCell();
            const contenido = document.createTextNode(datosArray[j]);
            cell.appendChild(contenido);
        }

    }

    elemPadre.appendChild(tablaMatriz);
    elemPadre.style.display = "block";

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

