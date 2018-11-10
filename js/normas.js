function normaInfinito(matriz) {
	const coeficientes = matriz.coeficientes;

    let resultado = new Decimal(0);
	
    for(let i = 0; i < coeficientes[0].length; i++) {
		let sumaFila = new Decimal(0);
        
		for(let j = 0; j < coeficientes.length; j++) {
			sumaFila = sumaFila.plus(new Decimal(coeficientes[i][j]).abs());
        }
		resultado = Decimal.max(resultado, sumaFila);
    }
	
    return resultado;
}

function normaUno(matriz) {
	const coeficientes = matriz.coeficientes;

    let resultado = new Decimal(0);
	
    for(let j = 0; j < coeficientes[0].length; j++) {
		let sumaColumna = new Decimal(0);
        
		for(let i = 0; i < coeficientes.length; i++) {
			sumaColumna = sumaColumna.plus(new Decimal(coeficientes[i][j]).abs());
        }
		resultado = Decimal.max(resultado, sumaColumna);
    }
	
    return resultado;
}