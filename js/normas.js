function obtenerTodasLasNormas(coeficientes) {
    return {
        uno: normaUnoMatriz(coeficientes),
        dos: normaDosMatriz(coeficientes),
        inf: normaInfinitoMatriz(coeficientes)
    };
}

function obtenerDatosConNormas(iteraciones, indice, decimales) {
    const a = iteraciones[indice];
    const b = indice === 0 ? [0, 0, 0] : iteraciones[indice - 1];

    let diferencia = diferenciaVectorialDecimal(a, b);
    const normas = {
        dos: normaDosVectorialDecimal(diferencia).toDecimalPlaces(decimales),
        inf: normaInfVectorialDecimal(diferencia).toDecimalPlaces(decimales)
    };

    return iteraciones[indice].concat([normas.dos, normas.inf])
}

function normaInfinitoMatriz(coeficientes) {
    let resultado = new Decimal(0);

    for (let i = 0; i < coeficientes[0].length; i++) {
        let sumaFila = new Decimal(0);

        for (let j = 0; j < coeficientes.length; j++) {
            sumaFila = sumaFila.plus(new Decimal(coeficientes[i][j]).abs());
        }
        resultado = Decimal.max(resultado, sumaFila);
    }

    return resultado;
}

function normaUnoMatriz(coeficientes) {
    let resultado = new Decimal(0);

    for (let j = 0; j < coeficientes[0].length; j++) {
        let sumaColumna = new Decimal(0);

        for (let i = 0; i < coeficientes.length; i++) {
            sumaColumna = sumaColumna.plus(new Decimal(coeficientes[i][j]).abs());
        }
        resultado = Decimal.max(resultado, sumaColumna);
    }

    return resultado;
}

function normaDosMatriz(coeficientes) {
    var matricesMult = multiplicarMatrizPorMatriz(transpuesta(coeficientes), coeficientes);

    var autovalorMaximo = maxDeVector((numeric.eig(convertirMatriz(matricesMult))).lambda.x);

    var resultado = Decimal.sqrt(autovalorMaximo);

    return resultado;
}

function normaDosVectorialDecimal(vector) {
    var suma = new Decimal(0);
    for (let i = 0; i < vector.length; i++) {
        suma = suma.plus(new Decimal(vector[i]).toPower(2))
    }

    return Decimal.sqrt(suma);
}

function normaInfVectorialDecimal(vector) {
    let result = new Decimal(0);
    for (let i = 0; i < vector.length; i++) {
        result = Decimal.max(result, new Decimal(vector[i]).abs());
    }
    return result;
}

// COSAS VIEJAS
// Ya no se usa. Se usa restarVectores()
function diferenciaVectorial(vector1, vector0) {
    let resultado = [];

    if (vector0.length === vector1.length) {
        for (let i = 0; i < vector1.length; i++) {
            resultado[i] = new Decimal(vector1[i]) - new Decimal(vector0[i]);
        }
    }

    return resultado;
}

// Esta en operaciones.js
function maxDeVector(vector) {
    let result = new Decimal(0);
    for (let i = 0; i < vector.length; i++) {
        result = Decimal.max(result, new Decimal(vector[i])).toNumber();
    }
    return result;
}