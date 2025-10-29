"use strict";

// Importación de clase para manejar el JSON
import "./manageJSON.js";
import {Partido} from "./classes/Partido.js";

// Cargar los datos
window.onload = () => {
    console.log("Index cargado");
    todosPartidos.forEach(partido => {
        console.log(partido)
    });
}