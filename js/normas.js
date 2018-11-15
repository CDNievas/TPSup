function normaInfinitoMatriz(coeficientes) {
	const coeficientes = matriz.coeficientes;

    let resultado = new Decimal(0);
	
    for(let i = 0; i < coeficientes[0].length; i++) {
		let sumaFila = new Decimal(0);
        
		for(let j = 0; j < coeficientes.length; j++) {
			sumaFila = sumaFila.plus(new Decimal(coeficientes[i][j]).abs());
        }
		resultado = Decimal.max(resultado, sumaFila);
    }
	
    return resultado.valueOf();
}

function normaUnoMatriz(coeficientes) {
	const coeficientes = matriz.coeficientes;

    let resultado = new Decimal(0);
	
    for(let j = 0; j < coeficientes[0].length; j++) {
		let sumaColumna = new Decimal(0);
        
		for(let i = 0; i < coeficientes.length; i++) {
			sumaColumna = sumaColumna.plus(new Decimal(coeficientes[i][j]).abs());
        }
		resultado = Decimal.max(resultado, sumaColumna);
    }
	
    return resultado.valueOf();
}

function normaDosMatriz(coeficientes) {
    var matricesMult = multiplicarMatrizPorMatriz(transpuesta(coeficientes), coeficientes);

    var autovalorMaximo = maxDeVector((numeric.eig(convertirMatriz(matricesMult))).lambda.x);

    var resultado = Math.sqrt(autovalorMaximo);
	
	return resultado;
}

function normaVectorial(vector){
    return Math.hypot(vector);
}

function diferenciaVectorial(vector1,vector0){
    let resultado = new Array();

    if(vector0.length===vector1.length){
        for(let i = 0; i < vector1.length; i++) {
           resultado[i]=new Decimal(vector1[i])-new Decimal(vector0[i]);
        }
    }

    return resultado;
}

function maxDeVector(vector) {
	let result = new Decimal(0);
	for(let i = 0; i < vector.length; i++) {
		result = Decimal.max(result, new Decimal(vector[i])).toNumber();
	}
	return result;
}

function normaDosVectorialDecimal(vector) {
	var suma = new Decimal(0);
	for(let i = 0; i < vector.length; i++) {
		suma = suma.plus(new Decimal(vector[i]).toPower(2))
	}
	
	return Decimal.sqrt(suma);
}

function normaInfVectorialDecimal(vector) {
	let result = new Decimal(0);
	for(let i = 0; i < vector.length; i++) {
		result = Decimal.max(result, new Decimal(vector[i]).abs());
	}
	return result;
}