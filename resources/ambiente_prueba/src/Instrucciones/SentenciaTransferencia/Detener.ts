import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";

export default class Detener implements Instruccion{

    constructor(){

    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        return this;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Break", "");
        padre.agregarHijo(new Nodo(";", ""));
        
        return padre;
    }
    
}