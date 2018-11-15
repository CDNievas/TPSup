let datosGlobales = null;

/*
{
    matrices,
    inicial,
    decimales,
    cota,
    norma
}
*/

function submit() {
    if (datosGlobales === null) return;

    const metodo = getMetodo();

    let iteraciones = [];
    if (metodo === 'jacobi') {
        iteraciones = jacobi(datosGlobales);
    } else if (metodo === 'gaussSeidel') {
        iteraciones = gaussSeidel(datosGlobales);
    }

    iteraciones =
        iteraciones.map(iteracion =>
            iteracion.map(numero =>
                numero.toDecimalPlaces(datosGlobales.decimales)));

    limpiarTabla('tablaResultados');
    crearTablaResultados(iteraciones);
}

function validar() {
    leerDatos(function (datos) {
        let matrices = datos.matrices;

        let normas = obtenerTodasLasNormas(matrices.coeficientes);

        limpiarTabla('tablaMatriz');
        limpiarTabla('tablaResultados');
        crearTablaMatrizIngresada(matrices);
        mostrarNormas(normas);
        setResolvedorVisibility(true);

        datosGlobales = Object.assign({}, datos, normas);
    });
}

function leerDatos(callback) {
    // let norma = document.querySelector('input[name="norma"]:checked').value;
    const archivo = document.getElementById("archivo").files;
    const vectInicial = document.getElementById("vectInicial").value;
    const cantDec = document.getElementById("cantDec").value;
    const cotaError = document.getElementById("cotaError").value;

    procesarArchivo(archivo[0], function (matrices) {
        const comp = comprobacionesAristocraticas(archivo, cantDec, cotaError);
        const inicial = vectInicial.split(',').map(Number);

        if (comp.codigo === -1) {
            printError(comp.msg);
            return;
        }

        if (!esDiagonalmenteDominante(matrices.coeficientes)) {
            printError('La matriz no es estrictamente diagonalmente dominante');
            return;
        }

        if (inicial.length !== matrices.coeficientes[0].length) {
            printError('El vector inicial no tiene la misma longitud que la matriz.');
            return;
        }

        // no puede ser un Decimal, tiene que ser Number.
        // igual es entero, no hay problemas de precision.
        const decimales = Number.parseInt(cantDec);

        const cota = new Decimal(cotaError).toDecimalPlaces(decimales);

        const datos = {
            matrices,
            inicial,
            decimales,
            cota
        };

        callback(datos);
    })
}

function comprobacionesAristocraticas(archivo, cantDec, cotaError) {
    if (cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null || cantDec.match(/^[+-]?\d+(\.\d+)?$/) == null) {
        return {
            codigo: -1,
            msg: "Un campo de texto contenia datos en un formato distinto al establecido"
        };
    }

    if (archivo.length !== 1) {
        return {codigo: -1, msg: "Error en la carga del archivo"};
    }

    return {codigo: 0, msg: ""};

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

function limpiarTabla(id) {
    // si no existe no hago nada
    if (document.getElementById(id) === null) return;

    // si existe borro lo que este en el parent
    let parent = document.getElementById(id).parentElement;
    parent.innerHTML = '';
}

function obtenerTabla(id, title, parent) {
    limpiarTabla(id);

    // titulo
    const titulo = document.createElement('h2');
    titulo.textContent = title;
    parent.append(titulo);

    tabla = document.createElement("table");
    tabla.id = id;
    parent.append(tabla);

    return tabla;
}

function crearTablaMatrizIngresada(datos) {
    const elemPadre = document.getElementById('wrapTabla');
    let tablaMatriz = obtenerTabla('tablaMatriz', 'Matriz Cargada', elemPadre);

    // header
    const head = tablaMatriz.createTHead();
    const row = head.insertRow();
    for (let i = 0; i < datos.coeficientes.length; i++) {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode('x' + i));
    }
    const cellNormaDos = row.insertCell();
    const cellNormaInfinito = row.insertCell();

    cellNormaDos.appendChild(document.createTextNode('variable'));
    cellNormaInfinito.appendChild(document.createTextNode('término independiente'));

    const body = tablaMatriz.createTBody();
    for (let i = 0; i < datos.coeficientes.length; i++) {
        const row = body.insertRow();
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
    let tablaResultados = obtenerTabla('tablaResultados', 'Iteraciones', elemPadre);

    // header
    const head = tablaResultados.createTHead();
    const row = head.insertRow();
    const cellNumeroIteracion = row.insertCell();
    cellNumeroIteracion.appendChild(document.createTextNode('i'));

    debugger;
    for (let i = 0; i < datosGlobales.matrices.incognitas.length; i++) {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode(datosGlobales.matrices.incognitas[i]));
    }

    const cellNormaDos = row.insertCell();
    const cellNormaInfinito = row.insertCell();

    cellNormaDos.appendChild(document.createTextNode('norma-2'));
    cellNormaInfinito.appendChild(document.createTextNode('norma-infinito'));

    // body
    const body = tablaResultados.createTBody();
    for (let i = 0; i < iteraciones.length; i++) {
        const row = body.insertRow();
        const datosConNormas = obtenerDatosConNormas(iteraciones, i, datosGlobales.decimales);

        row.insertCell().appendChild(document.createTextNode(i));
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
    function generarElemento(titulo, contenido) {
        const elementoTitulo = document.createElement('strong');
        const elementoContenido = document.createElement('p');

        elementoTitulo.textContent = titulo;
        elementoContenido.textContent = contenido;

        const contenedor = document.createElement('div');
        contenedor.appendChild(elementoTitulo);
        contenedor.appendChild(elementoContenido);

        return contenedor;
    }

    const elemPadre = document.getElementById('normas');
    elemPadre.innerHTML = '';

    const elemUno = generarElemento("Norma Uno: ", normas.uno);
    const elemDos = generarElemento("Norma Dos: ", normas.dos);
    const elemInf = generarElemento("Norma Infinito: ", normas.inf);

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

function getMetodo() {
    return document.querySelector('input[name="metodo"]:checked').value;
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

