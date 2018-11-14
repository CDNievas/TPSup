function normaInfinito(coeficientes) {
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

function normaUno(coeficientes) {
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

    return resultado
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

function normaDos(matriz) {
    const coeficientes = matriz.coeficientes;

    var matricesMult = multiplicaMatrizPorMatriz(transpuesta(coeficientes), coeficientes);

    var autovalorMaximo = new numeric(getMaxOfArray(numeric.eig(coeficientes)).lambda);

    var resultado = new Decimal.sqrt(new Decimal(autovalorMaximo).times(matricesMult));

    return resultado.valueOf();
}