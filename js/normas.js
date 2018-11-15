function obtenerTodasLasNormas(coeficientes) {
    return {
        uno: normaUnoMatriz(coeficientes),
        dos: normaDosMatriz(coeficientes),
        inf: normaInfinitoMatriz(coeficientes)
    };
}

function obtenerDatosConNormas(iteraciones, indice, decimales, inicial) {
    debugger;
    const a = iteraciones[indice];
    const b = indice === 0 ? inicial : iteraciones[indice - 1];

    let diferencia = restarVectores(b, a);
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