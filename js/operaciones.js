function multiplicarMatrizPorMatriz(matriz1, matriz2) {
	var result = new Array(matriz1.length);
	
	for (let i = 0; i < matriz1.length; i++) {
        result[i] = new Array(matriz2[0].length);
        
		for (let j = 0; j < matriz2[0].length; j++) {
            var suma = new Decimal(0);
            
			for (let k = 0; k < matriz1[0].length; k++)	{
			    suma = suma.plus(new Decimal (matriz1[i][k]).times(new Decimal (matriz2[k][j])));
            }
            
			result[i][j] = suma;
		}
	}
	return result;
}

function multiplicarMatrizPorVector(matriz, vector) {
    var result = new Array(matriz.length);
	
    for (let i = 0; i < result.length; i++) {
        let suma = new Decimal(0);

        for(let j = 0; j < result.length; j++) {
            suma = suma.plus(new Decimal(matriz[i][j]).times(new Decimal(vector[j])));
		}
        result[i] = suma;
    }
    return result;
}

function transpuesta(matriz) {
    var result = new Array(matriz.length);

    for (let i = 0; i < matriz.length; i++) {
        result[i] = new Array(matriz[0].length);

        for (let j = 0; j < matriz[0].length; j++) {
            if (i === j) result[i][j] = new Decimal (matriz [i][j]);
            else result[i][j] = new Decimal(matriz [j][i]);
        }
    }
    return result;
}

function diagonalConTriangularInferior(matriz) {
    var resultado = new Array(matriz.length);
     for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);
         for(let j = 0; j < matriz[0].length; j++) {
            if (i >= j) resultado[i][j] = new Decimal(matriz[i][j]);
            else resultado[i][j] = new Decimal(0);
        }
    }
	return resultado;
}

function inversaDiagonal(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i === j) resultado[i][j] = new Decimal(1).div(new Decimal(matriz[i][j]));
            else resultado[i][j] = new Decimal(0);
        }
    }
	return resultado;
}

function triangularSuperior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i >= j) resultado[i][j] = new Decimal(0);
            else resultado[i][j] = new Decimal(matriz[i][j]);
        }
    }
	return resultado;
}

function menosTriangulares(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i === j) resultado[i][j] = new Decimal(0);
            else resultado[i][j] = new Decimal(matriz[i][j]).negated();
        }
    }
	return resultado;
}

function sumarMatrices(m1, m2) {
    var resultado = new Array(m1.length);

    for(let i = 0; i < m1.length; i++) {
        resultado[i] = new Array(m1[0].length);

        for(let j = 0; j < m1[0].length; j++) {
			resultado[i][j] = new Decimal(m1[i][j]).plus(new Decimal(m2[i][j]));
        }
    }
	return resultado;
}

function menosTriangularSuperior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i >= j) resultado[i][j] = new Decimal(0);
            else resultado[i][j] = new Decimal(matriz[i][j]).negated();
        }
    }
	return resultado;
}

function menosTriangularInferior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i <= j) resultado[i][j] = new Decimal(0);
            else resultado[i][j] = new Decimal(matriz[i][j]).negated();
        }
    }
	return resultado;
}

function triangularInferior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i <= j) resultado[i][j] = new Decimal(0);
            else resultado[i][j] = new Decimal(matriz[i][j]);
        }
    }
	return resultado;
}

function diferenciaVectorialDecimal(vector1,vector0){
    let resultado = [];

    if(vector0.length === vector1.length){
        for(let i = 0; i < vector1.length; i++) {
           resultado[i]= new Decimal(vector1[i]).minus(new Decimal(vector0[i]));
        }
    }
    return resultado;
}

function sumarVectores(vector1,vector0){
    let resultado = [];

    if(vector0.length === vector1.length){
        for(let i = 0; i < vector1.length; i++) {
           resultado[i]= new Decimal(vector1[i]).plus(new Decimal(vector0[i]));
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