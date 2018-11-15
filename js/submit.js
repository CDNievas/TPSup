let datosGlobales = null;

/*
{
    metodo,
    matrices,
    inicial,
    decimales,
    cota,
    norma
}
*/

function submit() {
    if (datosGlobales === null) return;

    let iteraciones = [];
    if (datosGlobales.metodo === 'jacobi') {
        iteraciones = jacobi(datosGlobales);
    } else if (datosGlobales.metodo === 'gaussSeidel') {
        iteraciones = gaussSeidel(datosGlobales);
        // HACK
        iteraciones = iteraciones.map(iteracion =>
            iteracion.map(numero =>
                new Decimal(numero)
        ))
    }

    debugger;

    iteraciones =
        iteraciones.map(iteracion =>
            iteracion.map(numero =>
                numero.toDecimalPlaces(datosGlobales.decimales)));

    crearTablaResultados(iteraciones);
}

function validar() {
    leerDatos(function (datos) {
        let matrices = datos.matrices;

        let normas = obtenerTodasLasNormas(matrices.coeficientes);

        crearTablaMatrizIngresada(matrices);
        mostrarNormas(normas);
        setResolvedorVisibility(true);

        datosGlobales = Object.assign({}, datos, normas);
    });
}

function leerDatos(callback) {
    // let norma = document.querySelector('input[name="norma"]:checked').value;
    const metodo = document.querySelector('input[name="metodo"]:checked').value;
    const archivo = document.getElementById("archivo").files;
    const vectInicial = document.getElementById("vectInicial").value;
    const cantDec = document.getElementById("cantDec").value;
    const cotaError = document.getElementById("cotaError").value;

    procesarArchivo(archivo[0], function (matrices) {
        const comp = comprobacionesAristocraticas(metodo, archivo, cantDec, cotaError);

        if (comp.codigo === -1) {
            printError(comp.msg);
            return;
        }

        if (!esDiagonalmenteDominante(matrices.coeficientes)) {
            printError('La matriz no es estrictamente diagonalmente dominante');
            return;
        }

        const inicial = vectInicial.split(',').map(Number);

        // no puede ser un Decimal, tiene que ser Number.
        // igual es entero, no hay problemas de precision.
        const decimales = Number.parseInt(cantDec);

        const cota = new Decimal(cotaError).toDecimalPlaces(decimales);

        const datos = {
            metodo,
            matrices,
            inicial,
            decimales,
            cota
        };

        callback(datos);
    })
}

function comprobacionesAristocraticas(metodo, norma, archivo, cantDec, cotaError) {
    // HACK
    norma = 'norma_1';

    if (metodo !== "jacobi" && metodo !== "gaussSeidel") {
        return {codigo: -1, msg: "No selecciono un metodo valido"};
    } else if (norma !== "norma_1" && norma !== "norma_2" && norma !== "norma_infinito") {
        return {codigo: -1, msg: "No selecciono una norma valida"};
    } else if (cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null || cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null) {
        return {
            codigo: -1,
            msg: "Un campo de texto contenia datos en un formato distinto al establecido"
        };
    } else if (archivo.length !== 1) {
        return {codigo: -1, msg: "Error en la carga del archivo"};
    } else {
        return {codigo: 0, msg: ""};
    }

}

function procesarArchivo(archivo, callback) {
    if (!window.FileReader) {
        alert("Este navegador no soporta la API de FileReader. Por favor," +
            " probar en un navegador mas moderno.");

        return;
    }

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

function crearTablaMatrizIngresada(datos) {
    const elemPadre = document.getElementById('wrapTabla');
    let tablaMatriz = document.getElementById("tablaMatriz");

    if (tablaMatriz === null) {
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

function crearTablaResultados(iteraciones, decimales) {
    const elemPadre = document.getElementById('resultado');
    let tablaResultados = document.getElementById('tablaResultados');

    if (tablaResultados === null) {
        tablaResultados = document.createElement('table');
        tablaResultados.id = 'tablaResultados';
        tablaResultados.classList.add('tablaMatriz');
    } else {
        tablaResultados.innerHTML = '';
    }

    // header
    const head = tablaResultados.createTHead();
    const row = head.insertRow();
    for (let i = 0; i < iteraciones[0].length; i++) {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode('x' + i));
    }
    const cellNormaDos = row.insertCell();
    const cellNormaInfinito = row.insertCell();

    cellNormaDos.appendChild(document.createTextNode('norma-2'));
    cellNormaInfinito.appendChild(document.createTextNode('norma-infinito'));

    // body
    for (let i = 0; i < iteraciones.length; i++) {
        const row = tablaResultados.insertRow();
        const datosConNormas = obtenerDatosConNormas(iteraciones, i, datosGlobales.decimales);

        for (let j = 0; j < datosConNormas.length; j++) {
            const cell = row.insertCell();
            const numero = datosConNormas[j].toDecimalPlaces(decimales).toString();
            const contenido = document.createTextNode(numero);
            cell.appendChild(contenido);
        }
    }

    elemPadre.appendChild(tablaResultados);
    elemPadre.style.display = "block";

}

function mostrarNormas(normas) {
    const elemPadre = document.getElementById('normas');
    elemPadre.innerHTML = '';

    const elemUno = document.createElement('p');
    const elemDos = document.createElement('p');
    const elemInf = document.createElement('p');

    elemUno.textContent = "Norma Uno: " + normas.uno;
    elemDos.textContent = "Norma Dos: " + normas.dos;
    elemInf.textContent = "Norma Infinito: " + normas.inf;

    elemPadre.appendChild(elemUno);
    elemPadre.appendChild(elemDos);
    elemPadre.appendChild(elemInf);
}

function setResolvedorVisibility(visible) {
    const resolvedor = document.getElementById('resolvedor');

    if (visible) {
        resolvedor.style.display = 'block';
    } else {
        resolvedor.style.display = 'none';
    }
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

