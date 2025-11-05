"use strict";
// Importación de la clase
import {Partido} from './classes/Partido.js'
import {crearElementos} from './index.js';

// URL de tu JSON en el servidor local
const url = 'http://localhost:3000/partidos';

// Usando fetch para obtener los datos
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el JSON: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const partidos = data;
        partidos.forEach(partido => {
            new Partido(partido.nombre, partido.siglas, partido.ideologia, partido.descripcion, partido.cantidadVotos,
                partido.imgLogo);
        });
        document.dispatchEvent(new Event('cargados'));
    })
    .catch(error => {
        console.error('Hubo un problema con la petición fetch:', error);
    });
