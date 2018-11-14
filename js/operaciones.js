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