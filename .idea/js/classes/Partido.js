const escanosTotales = 350;
const votosTotales = 37469142;

// Array global para almacenar todos los partidos
export const todosPartidos = [];

// Clase para almacenar los objetos Partido
export class Partido {

    constructor(nombre, siglas, idiologia, descripcion, cantidadVotos, imgLogo) {
        this._cantidadEscannoCongreso = 0;

        // Agregar la instancia al array global
        todosPartidos.push(this);
        this._nombre = nombre;
        this._siglas = siglas;
        this._idiologia = idiologia;
        this._descripcion = descripcion;
        this._cantidadVotos = cantidadVotos;
        this._imgLogo = imgLogo;
    }

    // Metodos getters y setters
    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get siglas() {
        return this._siglas;
    }

    set siglas(value) {
        this._siglas = value;
    }

    get idiologia() {
        return this._idiologia;
    }

    set idiologia(value) {
        this._idiologia = value;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(value) {
        this._descripcion = value;
    }

    get cantidadVotos() {
        return this._cantidadVotos;
    }

    set cantidadVotos(value) {
        this._cantidadVotos = value;
    }

    get imgLogo() {
        return this._imgLogo;
    }

    set imgLogo(value) {
        this._imgLogo = value;
    }

    get cantidadEscannoCongreso() {
        return this._cantidadEscannoCongreso;
    }

    set cantidadEscannoCongreso(value) {
        this._cantidadEscannoCongreso = value;
    }

// Método para calcular el porcentaje de votos sobre el total
    calcPorcentage() {
        return (this.cantidadVotos * 100) / votosTotales;
    }

    // Método para calcular los escaños según D’Hondt
    calcEscannos() {
        let cocientes = [];

        // Generar cocientes para todos los partidos
        for (let partido of todosPartidos) {
            for (let divisor = 1; divisor <= escanosTotales; divisor++) {
                cocientes.push({ cociente: partido.cantidadVotos / divisor, partido: partido });
            }
        }

        // Ordenar cocientes de mayor a menor
        cocientes.sort((a, b) => b.cociente - a.cociente);

        // Contar cuántos cocientes corresponden a este partido
        let escanos = 0;
        for (let i = 0; i < escanosTotales; i++) {
            if (cocientes[i].partido === this) {
                escanos += 1;
            }
        }

        // Actualizar propiedad de la instancia
        this._cantidadEscannoCongreso = escanos;
        return escanos;
    }
}

