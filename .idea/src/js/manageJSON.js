"use strict";
// Importación de la clase
import {Partido, todosPartidos} from './classes/Partido.js'
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

// Escuchar el evento 'guardar' que se dispara desde index.js
document.addEventListener('guardar', async () => {
    await guardarDatos();
});

// Función para guardar los datos
async function guardarDatos() {
    try {
        // Convertir los partidos a un formato serializable
        const partidosParaGuardar = todosPartidos.map(partido => ({
            nombre: partido.nombre,
            siglas: partido.siglas,
            ideologia: partido.ideologia,
            descripcion: partido.descripcion,
            cantidadVotos: partido.cantidadVotos,
            imgLogo: partido.imgLogo,
            cantidadEscannoCongreso: partido.cantidadEscannoCongreso
        }));

        // Actualizar cada partido individualmente
        for (const partido of partidosParaGuardar) {
            // Obtener el ID del partido desde el servidor
            const response = await fetch(`${url}?siglas=${partido.siglas}`);
            const partidosExistentes = await response.json();

            if (partidosExistentes.length > 0) {
                const id = partidosExistentes[0].id;

                // Actualizar el partido con PUT
                await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(partido)
                });
            }
        }

        console.log('Datos guardados correctamente');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}