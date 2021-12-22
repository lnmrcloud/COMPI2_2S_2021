import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Detener";
import Cases from "./Case";

export default class Switchs implements Instruccion {

    public condicion: Expresion;
    public lista_cases: Array<Cases>;
    public lista_default: Array<Instruccion>;

    constructor(condicion, lista_cases, lista_default) {
        this.condicion = condicion;
        this.lista_cases = lista_cases;
        this.lista_default = lista_default;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        let ts_local = new TablaSimbolos(ts, null);
        ts_local.ant.sig = ts_local; //Se pasa el la Tabla de Simbolos padre ya que este es local
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (this.lista_cases != null) {
            let seguirCase = false;
            for (let caso of this.lista_cases) {
                if (caso.condicion.getValor(controlador, ts_local) == valor_condicion || seguirCase == true) {
                    let res = caso.ejecutar(controlador, ts_local);
                    seguirCase = true;
                    if (caso instanceof Detener || res instanceof Detener) {
                        seguirCase = false;
                        return res;
                    }
                }
            }
        }

        if (this.lista_default != null) {
            for (let instruccion of this.lista_default) {
                instruccion.ejecutar(controlador, ts_local, funcion);
            }
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Switch", "");

        padre.agregarHijo(new Nodo("(", ""));
        padre.agregarHijo(this.condicion.recorrer());
        padre.agregarHijo(new Nodo(")", ""));

        padre.agregarHijo(new Nodo("{", ""));
        for (let caso of this.lista_cases) {
            padre.agregarHijo(caso.recorrer());
        }
        if(this.lista_default != null){
            let padreDefault = new Nodo("Default", "");
            padreDefault.agregarHijo(new Nodo(":", ""));
            for (let instruccion of this.lista_default) {
                padreDefault.agregarHijo(instruccion.recorrer());
            }
            padre.agregarHijo(padreDefault);
        }
        padre.agregarHijo(new Nodo("}", ""));

        return padre;
    }

}