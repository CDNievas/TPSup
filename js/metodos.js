function metodoJacobi(matrices) {
	
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