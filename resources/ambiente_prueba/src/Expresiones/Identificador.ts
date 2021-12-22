import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Identificador implements Expresion {

    public identificador: string;
    public linea: number;
    public columna: number;

    constructor(identificador, linea, columna) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let existe_id = ts.getSimbolo(this.identificador);

        if (existe_id != null) {
            return existe_id.tipo.type; //RETORNA: ENTERO, DECIMAL, BOOLEANO, CHAR, STRING SEGUN SEA EL TIPO
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador);

        if (existe_id != null) {
            return existe_id.valor;
        } else {
            let error = new Errores('Semantico', `La variable ${this.identificador} no existe en la tabla de simbolos`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: La variable ${this.identificador} no existe en la tabla de simbolos, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo('ID', '');
        padre.agregarHijo(new Nodo(this.identificador, ''));

        return padre;
    }

}