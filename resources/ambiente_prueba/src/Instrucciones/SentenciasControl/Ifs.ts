import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Continuar from "../../Instrucciones/SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";
import Retornar from "../SentenciaTransferencia/Retornar";

export default class Ifs implements Instruccion {

    public condicion: Expresion;
    public lista_ifs: Array<Instruccion>;
    public lista_elses: Array<Instruccion>;
    public linea: number;
    public columna: number;

    constructor(condicion, lista_ifs, lista_elses, linea, columna) {
        this.condicion = condicion;
        this.lista_ifs = lista_ifs;
        this.lista_elses = lista_elses;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        //throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        //Creamos la tabla de simbolos de nivel local
        let ts_local = new TablaSimbolos(ts, null);
        ts_local.ant.sig = ts_local; //Se pasa el la Tabla de Simbolos padre ya que este es local
        let valor_condicion = this.condicion.getValor(controlador, ts);

        //Se verifica que sea un valor booleanos el que va dentro de la condicion
        if (this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO) {
            if (valor_condicion) {
                //console.log(this.lista_ifs[0]);
                for (let ins of this.lista_ifs) {
                    //console.log("ESTOY DENTRO DEL IF");
                    let res;
                    if (ins instanceof Retornar) {
                        res = ins.ejecutar(controlador, ts_local, funcion);
                    } else {
                        res = ins.ejecutar(controlador, ts_local, funcion);
                    }
                    //console.log(res);
                    //console.log("ESTOY DENTRO DEL IF");
                    //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                    //BREAK
                    if (ins instanceof Detener || res instanceof Detener) {
                        return res;
                    }
                    if (ins instanceof Continuar || res instanceof Continuar) {
                        return res;
                    }
                    if (ins instanceof Retornar || res instanceof Retornar) {
                        return res;
                    }
                }
            } else {
                for (let ins of this.lista_elses) {
                    //console.log("ESTOY DENTRO DEL ELSE");
                    let res;
                    if (ins instanceof Retornar) {
                        res = ins.ejecutar(controlador, ts_local, funcion);
                    } else {
                        res = ins.ejecutar(controlador, ts_local, funcion);
                    }
                    //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                    //BREAK
                    if (ins instanceof Detener || res instanceof Detener) {
                        return res;
                    }
                    if (ins instanceof Continuar || res instanceof Continuar) {
                        return res;
                    }
                    if (ins instanceof Retornar || res instanceof Retornar) {
                        return res;
                    }
                }
            }
        }
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("If", "");
        padre.agregarHijo(new Nodo("(", ""));
        padre.agregarHijo(this.condicion.recorrer());
        padre.agregarHijo(new Nodo(")", ""));
        padre.agregarHijo(new Nodo("{", ""));
        for (let ins of this.lista_ifs) {
            padre.agregarHijo(ins.recorrer());
        }
        padre.agregarHijo(new Nodo("}", ""));
        if(this.lista_elses != null){
            for (let ins of this.lista_elses) {
                padre.agregarHijo(new Nodo("else", ""));
                padre.agregarHijo(new Nodo("{", ""));
                padre.agregarHijo(ins.recorrer());
            }
            padre.agregarHijo(new Nodo("}", ""));
        }


        return padre;
    }

}