import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Detener";

export default class Cases implements Instruccion {

    public condicion: Expresion;
    public lista_instrucciones: Array<Instruccion>;

    constructor(condicion, lista_instrucciones) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        if (this.condicion != null) {
            let ts_local = new TablaSimbolos(ts, null);
            ts_local.ant.sig = ts_local;
            for (let instruc of this.lista_instrucciones) {
                let res = instruc.ejecutar(controlador, ts_local, funcion);
                //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                if (instruc instanceof Detener || res instanceof Detener) {
                    return res;
                }
            }
        }
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Case", "");

        padre.agregarHijo(this.condicion.recorrer());
        padre.agregarHijo(new Nodo(":", ""));

        for (let instruc of this.lista_instrucciones) {
            padre.agregarHijo(instruc.recorrer());
        }

        return padre;
    }

}