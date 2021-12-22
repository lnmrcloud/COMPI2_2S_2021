import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Ternario implements Expresion {

    public condicion: Expresion;
    public verdadero: Expresion;
    public falso: Expresion;
    public linea: number;
    public columna: number;

    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if (typeof valor_condicion == 'boolean') {
            return valor_condicion ? this.verdadero.getTipo(controlador, ts) : this.falso.getTipo(controlador, ts);
        } else {
            //TODO: Reportar error semantico si la condicion no es booleana
            let error = new Errores('Semantico', `La condicion no es de tipo booleana`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: La condicion no es de tipo booleana, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if (typeof valor_condicion == 'boolean') {
            return valor_condicion ? this.verdadero.getValor(controlador, ts) : this.falso.getValor(controlador, ts);
        } else {
            //TODO: Reportar error semantico si la condicion no es booleana
            let error = new Errores('Semantico', `La condicion no es de tipo booleana`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: La condicion no es de tipo booleana, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Ternario", "");

        return padre;
    }

}