'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const elementoCargaArchivo = document.getElementById('archivo');

    elementoCargaArchivo.addEventListener('change', analizarArchivo);
});

function analizarArchivo(event) {
    procesarArchivo(event.target.files[0], function(datos) {
        crearDisplay(datos);

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
