import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Funcion from "./Funcion";

export default class Llamada implements Instruccion, Expresion {

    public identificador: string;
    public parametros: Array<Expresion>;
    public linea: number;
    public columna: number;

    constructor(identificador, parametros, linea, columna, InsExp?) {
        this.identificador = identificador;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion;
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
        console.log(this.identificador);
        console.log(simbolo_funcion.tipo.stype);
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");

        return simbolo_funcion.tipo.type;
    }

    getIdentificador(controlador: Controlador, ts: TablaSimbolos) {
        return this.identificador;
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        //console.log("Estoy en getValor [Llamada.ts]");
        //console.log(ts.getSimbolo(this.identificador));
        //console.log(ts.getSimbolo(this.identificador).valor);
        return ts.getSimbolo(this.identificador).valor;
        //throw new Error("Method not implemented.");
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        //console.log("Estoy ejecutando [Llamada.ts]");
        //Verificar si la funcion/metodo existe
        if (ts.existe(this.identificador)) {
            //Se crea una nueva tabla de simbolos local
            let ts_local = new TablaSimbolos(ts, null);
            ts_local.ant.sig = ts_local;
            //Se coloca esta tabla de simbolos como siguiente de la anterior

            //Se obtiene el simbolo de la funcion
            let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion;

            //TODO: Hacer un metodo para validar si los parametros de la llamada son del mismo tipo que el de la funcion
            /*
            if (this.realizarVerificaciones(simbolo_funcion, controlador, ts_local) == true) {
                console.log(ts);
                let res = simbolo_funcion.ejecutar(controlador, ts_local);
                if (res != null) {
                    return res;
                }
            }
            */
            let contador = 0;
            if (this.parametros.length == simbolo_funcion.lista_params.length) {
                //Se verifica si cumple con la cantidad de parametros
                for (let i = 0; i < this.parametros.length; i++) {
                    console.log("----- ESTOY OBTENIENDO LOS PARAMETROS -----");
                    if(this.parametros[i] instanceof Llamada) {
                        console.log("SOY TIPO LLAMADA");
                        console.log("MAMA SE MAMA SA MAMASUELTA");
                        //console.log(this.parametros[i].getValor(controlador, ts_local));
                        let resLlamada = simbolo_funcion.ejecutar(controlador, ts_local, funcion);
                        console.log(resLlamada);
                        //simbolo_funcion.ejecutar(controlador, ts_local, this.parametros[i]);
                        console.log("TERMINE SOY TIPO LLAMADA");
                    } else {
                        //console.log("NO SOY TIPO LLAMADA");
                        //console.log(this.parametros[i].getValor(controlador, ts_local));
                        //console.log("WWWWWWWWWWW");
                    }
                    let aux = this.parametros[i].getTipo(controlador, ts_local);
                    let aux2 = simbolo_funcion.lista_params[i].tipo;
                    if (aux == aux2.type || aux == tipo.DOBLE && aux2.type == tipo.ENTERO) {
                        simbolo_funcion.lista_params[i].setValor(this.parametros[i].getValor(controlador, ts_local));
                        ts_local.agregar(simbolo_funcion.lista_params[i].identificador, simbolo_funcion.lista_params[i]);
                        contador++;
                    }
                    console.log("----- SALI DE OBTENER LOS PARAMETROS -----");
                }
                if (contador == this.parametros.length) {
                    
                    let res = simbolo_funcion.ejecutar(controlador, ts_local, funcion);
                    if (res != null) {
                        return res;
                    }
                } else {
                    let error = new Errores('Semantico', `No se cumplio con todos los tipos de parametros`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se cumplio con todos los tipos de parametros, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
            } else {
                let error = new Errores('Semantico', `No se cumplio con la cantidad de parametros`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: No se cumplio con la cantidad de parametros, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
            }

        } else {
            let error = new Errores('Semantico', `El metodo no existe`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: El metodo no existe, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Llamada", "");
        padre.agregarHijo(new Nodo(this.identificador, ""));
        padre.agregarHijo(new Nodo("(", ""));

        //TODO: Agregar nodos hijos de parametros

        padre.agregarHijo(new Nodo(")", ""));

        return padre;
    }

}