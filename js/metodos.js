function jacobi(datos) {
    return metodoJacobiConDecimal(datos.matrices, datos.inicial, datos.cota, datos.decimales);
}

function gaussSeidel(datos) {
    return metodoGaussSeidelConDecimal(datos.matrices, datos.inicial, datos.cota, datos.decimales);
}

function metodoJacobiConDecimal(matriz, inicial, cota, decimales) {
    const coeficientes = matriz.coeficientes;
    const termInd = matriz.termInd;
    const T_Jacobi = multiplicarMatrizPorMatriz(inversaDiagonal(coeficientes), menosTriangulares(coeficientes));
    const C_Jacobi = multiplicarMatrizPorVector(inversaDiagonal(coeficientes), termInd);

    return iterarValores(inicial, cota, decimales, T_Jacobi, C_Jacobi);
}

function metodoGaussSeidelConDecimal(matriz, inicial, cota, decimales) {
    const coeficientes = matriz.coeficientes;
	const termInd = matriz.termInd;

    const inversaInferior = numeric.inv(convertirMatriz(diagonalConTriangularInferior(coeficientes)));
     
    const T_GaussSeidel = multiplicarMatrizPorMatriz(inversaInferior, menosTriangularSuperior(coeficientes));
    const C_GaussSeidel = multiplicarMatrizPorVector(inversaInferior, termInd);

    return iterarValores(inicial, cota, decimales, T_GaussSeidel, C_GaussSeidel);
}

function iterarValores(inicial, cota, decimales, T_Metodo, C_Metodo) {
    const iteraciones = [];

    let siguiente_valor = siguienteValorDecimal(inicial, T_Metodo, C_Metodo);
    iteraciones.push(siguiente_valor);

    while (!alcanzaCotaDos(siguiente_valor, inicial, cota) || !alcanzaCotaInf(siguiente_valor, inicial, cota)) {
        inicial = siguiente_valor;
        siguiente_valor = siguienteValorDecimal(siguiente_valor, T_Metodo, C_Metodo);
        iteraciones.push(siguiente_valor);
    }

    return iteraciones;
}

function siguienteValorDecimal(valor, T_Metodo, C_Metodo) {
    return sumarVectores(multiplicarMatrizPorVector(T_Metodo, valor), C_Metodo);
}

function alcanzaCotaDos(sig, actual, cota) {
    let d = restarVectores(sig, actual);
    return normaDosVectorialDecimal(d).lessThanOrEqualTo(new Decimal(cota));
}

function alcanzaCotaInf(sig, actual, cota) {
    let d = restarVectores(sig, actual);
    return normaInfVectorialDecimal(d).lessThanOrEqualTo(new Decimal(cota));
}

function convertirVectorConDecimales(vector, decimales) {
    let resultado = [];

    for (let i = 0; i < vector.length; i++) {
        resultado[i] = vector[i].toNumber();
    }
    return resultado;
}

function convertirMatriz(matriz) {
    var result = new Array(matriz.length);
    for (let i = 0; i < matriz.length; i++) {
        result[i] = new Array(matriz[0].length);
        for (let j = 0; j < matriz[0].length; j++) {
            result[i][j] = matriz[i][j].toNumber();
        }
    }
    return result;
}