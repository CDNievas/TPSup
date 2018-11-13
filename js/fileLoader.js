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
    // No se si usar 'var' o 'let', uso let por costumbre
    let inicial = document.getElementsByName("position");
    let cota = document.getElementById("cota_error").value;
    let decimales = document.getElementById("decimales").value;


    if (metodo !== "jacobi" && metodo !== "gaussSeidel") {
        printError("No selecciono un metodo valido");
    } else if (archivo.length !== 1) {
        printError("Error en la carga del archivo");
    } else {

        // Procesa el archivo
        procesarArchivo(archivo[0], function (matriz) {
            // Ejecuta metodo/solucion
            if (metodo === "jacobi") {
                metodoJacobi(matriz,getVectorInicial(inicial),cota,decimales);
            } else {
                metodoGaussSeidel(matriz,inicial,cota,decimales);
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


function metodoGaussSeidel(matriz, inicial, cota, decimales) {

    let siguiente_valor = siguienteValorGaussSeidel(matriz,inicial);

    while(!alcanzaCota(siguiente_valor,inicial,cota)){
        inicial = siguiente_valor;
        siguiente_valor = siguienteValorGaussSeidel(matriz,siguiente_valor);
        console.log(siguiente_valor);
    }

    }

function siguienteValorGaussSeidel(matriz, inicial) {

    let iterativo = new Array(inicial);
    let suma = 0;

    for (let i=0 ; i<matriz.length ; i++) {
        iterativo[i] = inicial[i];
        for (let j=0 ; j<matriz.length ; j++) {
            if (j !== i) iterativo[i] -= (matriz[i][j] * iterativo[j]);
        }
        iterativo[i] /= matriz[i][i];
    }
    return iterativo;
}

function metodoJacobi(matriz,inicial,cota,decimales) {

    let siguiente_valor = siguientevalor(matriz,inicial);

    while(!alcanzaCota(siguiente_valor,inicial,cota)){
        inicial = siguiente_valor;
        siguiente_valor = siguientevalor(matriz,siguiente_valor);
        console.log(siguiente_valor);
    }

}

function siguientevalor(matriz,valor){
    let siguiente = new Array(valor);
    let suma = 0;
    for (let i = 0 ; i < matriz.coeficientes.length ; i++){
        for(let j = 0 ; j < matriz.coeficientes.length ; j++){
           if(i!=j){suma -= new Decimal(matriz.coeficientes[i][j])*valor[j];}
        }
        siguiente[i]=(suma + new Decimal(matriz.terminosIndependientes[i]))/new Decimal(matriz.coeficientes[i][i]);
        suma=0;
    }
    return siguiente;
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

function getVectorInicial(value){
    let result = new Array();
    for (let i = 0 ; i < value.length ; i++){
        result[i]=value[i].value;
    }
    return result;
}

function alcanzaCota(a,b,c){
    let d = diferenciaVectorial(a,b);
    var y = 0, i = d.length;
    while (i--) y += d[i] * d[i];
    return Math.sqrt(y) < new Decimal(c);

}