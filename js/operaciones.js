function multiplicaMatrizPorMatriz(matriz1, matriz2) {
	var result = new Array(matriz1.length);
	
	for (let i = 0; i < matriz1.length; i++) {
        result[i] = new Array(matriz2[0].length);
        
		for (let j = 0; j < matriz2[0].length; j++) {
            var suma = new Decimal(0);
            
			for (let k = 0; k < matriz1[0].length; k++)	{
			    suma = suma.plus(new Decimal (matriz1[i][k]).times(new Decimal (matriz2[k][j])));
            }
            
			result[i][j] = suma.valueOf();
		}
	}
	return result;
}

function multiplicaMatrizPorVector(matriz, vector) {
    var result = new Array(matriz.length);
	
    for (let i = 0; i < result.length; i++) {
        let suma = new Decimal(0);

        for(let j = 0; j < result.length; j++) {
            suma = suma.plus(new Decimal(matriz[i][j]).times(new Decimal(vector[j])));
		}
        result[i] = suma.valueOf();
    }
    return result;
}

function transpuesta(matriz) {
    var result = new Array(matriz.length);

    for (let i = 0; i < matriz.length; i++) {
        result[i] = new Array(matriz1[0].length);

        for (let j = 0; j < matriz[0].length; j++) {
            if (i == j) result[i][j] = matriz [i][j];
            else result[i][j] = matriz [j][i];
        }
    }
    return result;
}

function inversa(matriz){
    var result = new Array(matriz.length);
    var a = new Decimal(1);

    for(let i = 0; i < matriz.length; i++) {
        result[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz.length[0]; j++) {
            if (matriz[i][j] !== 0) result[i][j] = (a.div(new decimal(matriz[i][j]))).valueOf();
            else result[i][j] = 0;
        }
    }
}

function inversa(matriz){
    var resultado = new Array(matriz.length);
    var a = new Decimal(1);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] !== 0) resultado[i][j] = new Decimal(a.div(new Decimal(matriz[i][j]))).valueOf();
            else resultado[i][j] = 0;
        }
    }
	return resultado;
}

function diagonal(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i !== j) resultado[i][j] = 0;
            else resultado[i][j] = matriz[i][j];
        }
    }
	return resultado;
}

function triangularInferior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i <= j) resultado[i][j] = 0;
            else resultado[i][j] = matriz[i][j];
        }
    }
	return resultado;
}

function menosTriangularInferior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i <= j) resultado[i][j] = 0;
            else resultado[i][j] = (new Decimal(matriz[i][j]).negated()).valueOf();
        }
    }
	return resultado;
}


function triangularSuperior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i >= j) resultado[i][j] = 0;
            else resultado[i][j] = matriz[i][j];
        }
    }
	return resultado;
}

function triangularSuperior(matriz) {
    var resultado = new Array(matriz.length);

    for(let i = 0; i < matriz.length; i++) {
        resultado[i] = new Array(matriz[0].length);

        for(let j = 0; j < matriz[0].length; j++) {
            if (i >= j) resultado[i][j] = 0;
            else resultado[i][j] = (new Decimal(matriz[i][j]).negated()).valueOf();
        }
    }
	return resultado;
}

function sumarMatrices(m1, m2) {
    var resultado = new Array(m1.length);

    for(let i = 0; i < m1.length; i++) {
        resultado[i] = new Array(m1[0].length);

        for(let j = 0; j < m1[0].length; j++) {
			resultado[i][j] = (new Decimal(new Decimal(m1[i][j]).plus(new Decimal(m2[i][j])))).valueOf();
        }
    }
	return resultado;
}