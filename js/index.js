'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const elementoCargaArchivo = document.getElementById('archivo');

    elementoCargaArchivo.addEventListener('change', analizarArchivo);
});

function analizarArchivo(event) {
    reiniciarPantalla();

    procesarArchivo(event.target.files[0], function(datos) {      
        crearDisplay(datos);
        
        if (esDiagonalmenteDominante(datos)) {
            document.getElementById("seleccionar_metodo").disabled = false;
            document.getElementById("c_incognitas").value = datos.incognitas.length;
        } else {
            document.getElementById("matriz_no_diagonal").style.display = 'block';
            document.getElementById("seleccionar_metodo").disabled = true;
        }

        console.log(datos);
    })

}

function crearDisplay(datos) {
    let table = document.getElementById('table_matriz');

    if (table === null) {
        table = document.createElement('table');
        table.id = 'table_matriz';
    } else {
        table = document.getElementsByTagName('table')[0];
        table.innerHTML = '';
    }

    for (let i = 0; i < datos.coeficientes.length; i++) {
        const row = table.insertRow();
        const datosArray = datos.coeficientes[i].concat(datos.incognitas[i], datos.terminosIndependientes[i]);

        for (let j = 0; j < datosArray.length; j++) {
            const cell = row.insertCell();
            const contenido = document.createTextNode(datosArray[j]);
            cell.appendChild(contenido);
        }
    }

    const elementoElegirMetodo = document.getElementById('fieldset_metodo');
    const elementoPadre = document.getElementById('body');

    elementoPadre.insertBefore(table, elementoElegirMetodo);
}

function desplegarOpciones() {
    generarIniciales();
    document.getElementById("fieldset_opciones").style.display = 'block';
}

function reiniciarPantalla() {
    document.getElementById("matriz_no_diagonal").style.display = 'none';
    document.getElementById("fieldset_opciones").style.display = 'none';
}

function generarIniciales(){
    let father = document.getElementById("v_inicial");
    let incognitas = document.getElementById("c_incognitas").value;
    for (let i = 0; i < incognitas; i++) {
        let input = document.createElement('input');
        input.name = "position";
        input.type = "text";
        input.className = "cifra";
        father.appendChild(input);
    }
}
