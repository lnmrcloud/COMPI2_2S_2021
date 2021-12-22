import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";

export default class FuncionMain extends Simbolos implements Instruccion {

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

    traducir(controlador: Controlador, ts: TablaSimbolos, contador: number) {
        let traduccion = "void main() {\nP = 0; H = 0;"
        controlador.appendTraduccion(traduccion);

        let ts_local = new TablaSimbolos(ts, null);
        ts_local.ant.sig = ts_local;

        for (let ins of this.lista_instrucciones) {
            let res = ins.traducir(controlador, ts_local, null);

            if (res != null) {

                return res;
            }
        }
        controlador.appendTraduccion("return;");
        controlador.appendTraduccion("}");
        return null;
    }

    agregarSimboloFuncion(controlador: Controlador, ts: TablaSimbolos) {
        if (!(ts.existe(this.identificador))) {
            ts.agregar(this.identificador, this); //El this solo indica que se le esta enviando un simbolo con sus respectivos datos
        } else {
            //TODO: Error semantico porque no deberia existir el metodo que se intenta crear
        }
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        let ts_local = new TablaSimbolos(ts, null);
        ts_local.ant.sig = ts_local;

        for (let ins of this.lista_instrucciones) {
            let res = ins.ejecutar(controlador, ts_local, null);

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