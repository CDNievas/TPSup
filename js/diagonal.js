function esDiagonalmenteDominante(coeficientes) {
    let esDominante = true;

    // recorre matriz por filas
    for (let i = 0; i < coeficientes[0].length; i++) {
        let suma = new Decimal(0);
        let elementoDiagonal = new Decimal(coeficientes[i][i]).abs();

        for(let j = 0; j < coeficientes.length; j++) {
            if (i !== j) suma = suma.plus(new Decimal(coeficientes[i][j]).abs());
        }

        // no es diagonalmente dominante
        if (suma.greaterThan(elementoDiagonal)) {
            esDominante = false;
            break;
        }
    }

    return esDominante;

}