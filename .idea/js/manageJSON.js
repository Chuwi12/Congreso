"use strict";

// Importación de la clase
import {Partido} from './classes/Partido.js'

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
        console.log("manageJSON cargado")
        const partidos = data;
        partidos.forEach(partido => {
            new Partido(partido.nombre, partido.siglas, partido.idiologia, partido.descripcion, partido.cantidadVotos,
                partido.imgLogo);
        });
    })
    .catch(error => {
        console.error('Hubo un problema con la petición fetch:', error);
    });
