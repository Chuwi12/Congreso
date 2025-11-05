"use strict";

// Importación de clase para manejar el JSON
import "./manageJSON.js";
import {Partido, todosPartidos} from "./classes/Partido.js";

// Cargar los datos
window.onload = () => {
    console.log("Index cargado");

    document.addEventListener('cargados', () => {
        crearElementos();
    });
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

    info.appendChild(titulo);
    info.appendChild(sigla);
    info.appendChild(ideologia);
    info.appendChild(desc);
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

    // Creación de input para ingresar la cantidad de votos
    const inputVotos = document.createElement('input');
    inputVotos.placeholder = "Votos"
    inputVotos.type = 'text';
    inputVotos.addEventListener('input', () => {
        partido.cantidadVotos(inputVotos.value);
    })

    // Agregar input al div
    divVotos.appendChild(tituloVotos);
    divVotos.appendChild(inputVotos);

    // retorno
    return divVotos;
}

// Funcion para crear los elementos
export function crearElementos() {
    const div = document.createElement('div');
    div.id = "divPrincipal";

    todosPartidos.forEach((partido) => {
        const divElemento = document.createElement('div');
        divElemento.id = partido.siglas;

        // Logo
        const logo = crearLogo(partido);

        // Info del partido
        const info = crearInfo(partido);

        // Votos del partido
        const votos = crearVotos(partido);

        // Ingreso de datos
        divElemento.appendChild(logo);
        divElemento.appendChild(info);
        divElemento.appendChild(votos)
        div.appendChild(divElemento);
    });

    document.body.appendChild(div);
}
