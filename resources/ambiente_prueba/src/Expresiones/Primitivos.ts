import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Primitivo implements Expresion {

    // Puede venir un [1, true, false, "cadena", 'a', ...]
    public primitivo: any;
    public linea: number;
    public columna: number;
    public cadena3D: string;

    constructor(primitivo: any, linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
        this.primitivo = primitivo;
        this.cadena3D = this.construir3D();
    }

    construir3D(): string {
        let cadena = String(this.primitivo);
        return cadena;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        let valor = this.getValor(controlador, ts);

        //typeof detecta automaticamente el tipo, ya sea int, string, boolean...
        if (typeof valor === 'number') { //int x = 2;
            return tipo.DOBLE;
        } else if (typeof valor === 'string') {
            return tipo.CADENA;
        } else if (typeof valor === 'boolean') {
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        //Sube el valor que venga
        return this.primitivo;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Primitivo", "");
        padre.agregarHijo(new Nodo(this.primitivo.toString(), ""));

        return padre;
    }

}