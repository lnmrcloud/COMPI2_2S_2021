/**
 * CLASE QUE SE ENCARGA DE LLEVAR EL CONTROL DE ERRORES
 */
 export default class Errores {

    public tipo: string;
    public descripcion: string;
    public linea: number;
    public columna: number;

    constructor(tipo, descripcion, linea, columna) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
}