"use strict";

// Importación de clase para manejar el JSON
import "./manageJSON.js";
import {Partido, todosPartidos} from "./classes/Partido.js";

// Cargar los datos
window.onload = () => {
    document.addEventListener('cargados', () => {
        crearBotonGuardar();
        crearElementos();
    });
}

// Función para crear el botón de guardado
function crearBotonGuardar() {
    const contenedorBoton = document.createElement('div');
    contenedorBoton.id = 'contenedor-guardar';
    const botonGuardar = document.createElement('button');
    botonGuardar.id = 'btn-guardar';
    botonGuardar.innerText = 'Guardar Datos';
    // Evento click para guardar
    botonGuardar.addEventListener('click', () => {
        botonGuardar.disabled = true;
        botonGuardar.innerText = 'Guardando...';
        botonGuardar.style.backgroundColor = '#cccccc';

        // Disparar evento de guardado
        document.dispatchEvent(new Event('guardar'));

        // Resetear botón después de 2 segundos
        setTimeout(() => {
            botonGuardar.disabled = false;
            botonGuardar.innerText = 'Guardar Datos';
            botonGuardar.style.backgroundColor = '#4CAF50';
        }, 2000);
    });
    contenedorBoton.appendChild(botonGuardar);
    document.body.insertBefore(contenedorBoton, document.body.firstChild);
}
// Función para crear las imagenes
function crearLogo(partido) {
    const logo = document.createElement('img');
    logo.src = partido.imgLogo;
    logo.alt = `Logo de ${partido.nombre}`;
    return logo;
}

// Función para crear la info
function crearInfo(partido) {
    // Contenedor de texto
    const info = document.createElement('div');
    info.classList.add('infoPartido');

    // Título y siglas (en la misma línea)
    const titulo = document.createElement('h2');
    titulo.innerText = partido.nombre;

    const sigla = document.createElement('h3');
    sigla.innerText = partido.siglas;

    // Ideologia del partido
    const ideologia = crearIdeologia(partido);

    // Descripción debajo
    const desc = document.createElement('p');
    desc.innerText = partido.descripcion;

    // Votos
    const votos = crearVotos(partido);

    // Porcentaje de votos (CON ID)
    const porcentaje = document.createElement('p');
    porcentaje.id = `porcentaje-${partido.siglas}`;
    porcentaje.innerText = `Porcentaje de votos: ${partido.calcPorcentage().toFixed(2)}%`;

    // Escaños (CON ID)
    const escannos = document.createElement('p');
    escannos.id = `escanos-${partido.siglas}`;
    escannos.innerText = `Escaños en el congreso: ${partido.calcEscannos()}`;

    info.appendChild(titulo);
    info.appendChild(sigla);
    info.appendChild(ideologia);
    info.appendChild(desc);
    info.appendChild(votos);
    info.appendChild(porcentaje);
    info.appendChild(escannos);
    return info;
}

// Función para crear la ideologia
function crearIdeologia(partido) {

    // Creación de elemento titulo para declarar el nombre de la lista
    const tituloIdeo = document.createElement('h4');
    tituloIdeo.innerText = "Ideologia";

    // Creación de elemento para la creación de una lista
    const lista = document.createElement('ul');

    // Iteración de los objetos de la lista
    partido.ideologia.forEach(idea => {
        const elementoLista = document.createElement('li');
        elementoLista.innerText = idea;
        lista.appendChild(elementoLista);
    })
    tituloIdeo.appendChild(lista);
    return tituloIdeo;
}


// Función para crear cantidad de votos
function crearVotos(partido) {

    // Creación de div para almacenarlo
    const divVotos = document.createElement('div');

    // Creación de titulo
    const tituloVotos = document.createElement('h4');
    tituloVotos.innerText = 'Votos:'

    // Creación de input para ingresar la cantidad de votos
    const inputVotos = document.createElement('input');
    inputVotos.placeholder = "Votos"
    inputVotos.type = 'number'; // Cambiado a number
    inputVotos.value = partido.cantidadVotos;

    // Creación de boton para calcular el pocentage
    const boton = document.createElement('input');
    boton.type = 'button';
    boton.value = 'Actualizar';
    boton.addEventListener('click', () => {
        // Validar que sea un número
        const nuevosVotos = Number(inputVotos.value);

        if (isNaN(nuevosVotos) || nuevosVotos < 0) {
            alert('Por favor ingresa un número válido');
            return;
        }

        // Ingreso de nuevos datos en atributos
        partido.cantidadVotos = nuevosVotos;

        // Actualizar porcentaje
        const porcentaje = document.getElementById(`porcentaje-${partido.siglas}`);

        if (porcentaje) {
            const nuevoPorcentaje = partido.calcPorcentage().toFixed(2);
            porcentaje.innerText = `Porcentaje de votos: ${nuevoPorcentaje}%`;
        }

        // Recalcular escaños para TODOS los partidos
        todosPartidos.forEach(p => {
            p.calcEscannos();
        });

        // Actualizar escaños de TODOS los partidos en la interfaz
        todosPartidos.forEach(p => {
            const escannos = document.getElementById(`escanos-${p.siglas}`);
            if (escannos) {
                escannos.innerText = `Escaños en el congreso: ${p.cantidadEscannoCongreso}`;
            }
        });
    });

    // Agregar input al div
    divVotos.appendChild(tituloVotos);
    divVotos.appendChild(inputVotos);
    divVotos.appendChild(boton);

    // retorno
    return divVotos;
}

// Funcion para crear los elementos
export async function crearElementos() {

    const div = document.createElement('div');
    div.id = "divPrincipal";

    todosPartidos.forEach((partido) => {
        const divElemento = document.createElement('div');
        divElemento.id = partido.siglas;

        // Logo
        const logo = crearLogo(partido);

        // Info del partido
        const info = crearInfo(partido);

        // Ingreso de datos
        divElemento.appendChild(logo);
        divElemento.appendChild(info);
        div.appendChild(divElemento);
    });

    document.body.appendChild(div);
}