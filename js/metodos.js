function metodoJacobiConDecimal(matriz, inicial, cota, decimales) {
	const coeficientes = matriz.coeficientes;
	const termInd = matriz.termInd;
    const T_Jacobi = multiplicarMatrizPorMatriz(inversaDiagonal(coeficientes), menosTriangulares(coeficientes));
    const C_Jacobi = multiplicarMatrizPorVector(inversaDiagonal(coeficientes), termInd);

    iterarValores(inicial, cota, decimales, T_Jacobi, C_Jacobi);
}

function metodoGaussSeidelConDecimal(matriz, inicial, cota, decimales) {
    const coeficientes = matriz.coeficientes;
    const termInd = matriz.termInd;

    const inversaInferior = (numeric.inv(diagonalConTriangularInferior(coeficientes)));
     
    const T_GaussSeidel = multiplicarMatrizPorMatriz(inversaInferior, triangularSuperior(coeficientes));
    const C_GaussSeidel = multiplicarMatrizPorVector(inversaInferior, termInd);

    iterarValores(inicial, cota, decimales, T_GaussSeidel, C_GaussSeidel);
}

function iterarValores(inicial, cota, decimales, T_Metodo, C_Metodo)
{
    let siguiente_valor = siguienteValorDecimal(inicial, T_Metodo, C_Metodo);

    while(!alcanzaCotaDecimal(siguiente_valor, inicial, cota)) {
        inicial = siguiente_valor;
        siguiente_valor = siguienteValorDecimal(siguiente_valor, T_Metodo, C_Metodo);
        console.log(convertirVectorConDecimales(siguiente_valor, decimales));
    }
}

function siguienteValorDecimal(valor, T_Metodo, C_Metodo)
{
    return sumarVectores(multiplicarMatrizPorVector(T_Metodo, valor), C_Metodo);
}

function alcanzaCotaDecimal(sig, actual, cota){
    let d = diferenciaVectorialDecimal(sig, actual);
    return normaVectorialDecimal(d).lessThanOrEqualTo(new Decimal(cota));
}

function convertirVectorConDecimales(vector, decimales) {
	let resultado = new Array(vector.length);
	
	for (let i = 0; i < vector.length; i++) {
		resultado[i] = parseFloat(vector[i].toFixed(decimales));
	}
	return resultado;
}

function convertirMatriz(matriz) {
	var result = new Array(matriz.length);
	for(let i = 0; i < matriz.length; i++) {
		result[i] = new Array (matriz[0].length);
		for(let j = 0; j < matriz[0].length; j++) {
			result[i][j] = matriz[i][j].toNumber();
		}
	}
	return result;
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
        siguiente[i]=(suma + new Decimal(matriz.termInd[i]))/new Decimal(matriz.coeficientes[i][i]);
        suma=0;
    }
    return siguiente;
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