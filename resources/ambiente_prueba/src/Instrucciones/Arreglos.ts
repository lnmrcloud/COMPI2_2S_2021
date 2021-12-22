import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Primitivo from  "../Expresiones/Primitivos";
import Errores from "../Ast/Errores";
import { Expresion } from "../Interfaces/Expresion";
import Simbolos from "../TablaSimbolos/Simbolos";

export default class Arreglo implements Instruccion {

    public simbolo: number; //4 arreglo
    public tipo: Tipo;
    public identificador: string;
    public lista_primitivos: Array<Expresion>;

    public linea: number;
    public columna: number;

    constructor(simbolo: number, tipo: Tipo, identificador: string, lista_primitivos, linea: number, columna: number){
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.lista_primitivos = lista_primitivos;
        this.linea = linea;
        this.columna = columna;

    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        //console.log("MAMARREEEEEEE");
        //console.log("$$$$$$$$$$$$");

        if (ts.existeEnActual(this.identificador)) { //Si existe
            let error = new Errores('Semantico', `El arreglo ${this.identificador} ya existe en el entorno local`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: El arreglo ${this.identificador} ya existe en el entorno local, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        } else {
            let contadorTipoPrimitivo = 0;
            for (let primitivo of this.lista_primitivos) {
                let variable = primitivo as Primitivo;
                //Se verificia que el 
                let tipoPrimitivo = variable.getTipo(controlador, ts);
                let tipoArreglo = this.tipo.type; 
                if (tipoPrimitivo == tipoArreglo || (tipoPrimitivo == 1 && tipoArreglo == 0) || (tipoPrimitivo == 4 && tipoArreglo == 3)) {
                    contadorTipoPrimitivo++
                }                
            }

            if(this.lista_primitivos.length == contadorTipoPrimitivo) {
                let nuevoSimbolo = new Simbolos(this.simbolo, this.tipo, this.identificador, this.lista_primitivos);
                ts.agregar(this.identificador, nuevoSimbolo);
            }
        }
        //console.log("$$$$$$$$$$$$");
    }
    traducir(controlador: Controlador, ts: TablaSimbolos, contador: number) {
        throw new Error("Method not implemented.");
    }
    recorrer(): Nodo {
        let padre = new Nodo("Arreglo", "");

        padre.agregarHijo(new Nodo(this.tipo.stype, ""));
        padre.agregarHijo(new Nodo("[", ""));
        padre.agregarHijo(new Nodo("]", ""));
        padre.agregarHijo(new Nodo(this.identificador, ""));
        padre.agregarHijo(new Nodo("=", ""));
        padre.agregarHijo(new Nodo("[", ""));

        let iteraciones = this.lista_primitivos.length;
        for(let dato of this.lista_primitivos) {
            let hijo = dato.recorrer();
            padre.agregarHijo(hijo);
            if (--iteraciones){
                padre.agregarHijo(new Nodo(",", ""));
            }
        }

        padre.agregarHijo(new Nodo("]", ""));

        return padre;
    }

    getSTipo(tipo: number): string {
        if (tipo == 0) {
            return "INT";
        } else if (tipo == 1) {
            return "DOUBLE";
        } else if (tipo == 2) {
            return "BOOLEAN";
        } else if (tipo == 3) {
            return "CHAR";
        } else if (tipo == 4) {
            return "STRING";
        }
    }
    

}