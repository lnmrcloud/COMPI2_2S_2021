import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Retornar from "./SentenciaTransferencia/Retornar";
import Ifs from "./SentenciasControl/Ifs";

export default class Funcion extends Simbolos implements Instruccion {

    public lista_instrucciones: Array<Instruccion>;
    public linea: number;
    public columna: number;

    //metodo = boolean
    constructor(simbolo: number, tipo: Tipo, identificador: string, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo, tipo, identificador, null, lista_params, metodo);
        //Esto es propio de la Funcion
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    agregarSimboloFuncion(controlador: Controlador, ts: TablaSimbolos) {
        if (!(ts.existe(this.identificador))) {
            ts.agregar(this.identificador, this); //El this solo indica que se le esta enviando un simbolo con sus respectivos datos
        } else {
            //TODO: Error semantico porque no deberia existir el metodo que se intenta crear
        }
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        let ts_local = new TablaSimbolos(ts, null);
        ts_local.ant.sig = ts_local;
        //console.log("Estoy en ejecutar [Funcion.ts]");
        for (let ins of this.lista_instrucciones) {
            let res: any;
            if (ins instanceof Retornar) {
                res = ins.ejecutar(controlador, ts_local, this);
                //return;
            } else {
                res = ins.ejecutar(controlador, ts_local, this);
            }

            if (res != null) {
                return res;
            }
        }
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Funcion", "");
        padre.agregarHijo(new Nodo(this.tipo.stype, ""));
        padre.agregarHijo(new Nodo(this.identificador, ""));
        padre.agregarHijo(new Nodo("(", ""));

        //TODO: Agregar nodos hijos de parametros (si es que hay)

        padre.agregarHijo(new Nodo(")", ""));
        padre.agregarHijo(new Nodo("{", ""));

        let hijoInstrucciones = new Nodo("Instrucciones", "");
        for (let ins of this.lista_instrucciones) {
            hijoInstrucciones.agregarHijo(ins.recorrer());
        }

        padre.agregarHijo(hijoInstrucciones);
        padre.agregarHijo(new Nodo("}", ""));

        return padre;
    }
}