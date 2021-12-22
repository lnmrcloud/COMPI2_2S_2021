import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import Continuar from "../SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";

export default class While implements Instruccion {

    public condicion: Expresion;
    public lista_instrucciones: Array<Instruccion>;
    public linea: number;
    public columna: number;

    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion: any) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        //Se verifica que la condicion sea un booleano
        if (typeof valor_condicion == 'boolean') {
            //Se coloca la condicion porque se necesita que el valor varie y no se quede atrapado en el valor
            siguiente:
            while (this.condicion.getValor(controlador, ts)) {
                let ts_local = new TablaSimbolos(ts, null);
                ts_local.ant.sig = ts_local;

                for (let instruc of this.lista_instrucciones) {
                    let res = instruc.ejecutar(controlador, ts_local, funcion);
                    //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                    if(instruc instanceof Detener || res instanceof Detener){
                        return res;
                    }
                    if (instruc instanceof Continuar || res instanceof Continuar) {
                        continue siguiente;
                    }
                }
            }
        } else {
            let error = new Errores('Semantico', `La condicion no es de tipo booleana`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: La condicion no es de tipo booleana, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("While", "");
        padre.agregarHijo(new Nodo("(", ""));
        padre.agregarHijo(this.condicion.recorrer());
        padre.agregarHijo(new Nodo(")", ""));

        padre.agregarHijo(new Nodo("{", ""));
        for (let instruc of this.lista_instrucciones) {
            padre.agregarHijo(instruc.recorrer());
        }
        padre.agregarHijo(new Nodo("}", ""));

        return padre;
    }

}