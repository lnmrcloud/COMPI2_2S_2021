import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import FuncionMain from "../Instrucciones/FuncionMain";
import Funcion from "../Instrucciones/Funcion";
import Arreglo from "../Instrucciones/Arreglos";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion {

    public lista_instrucciones: Array<Instruccion>;

    constructor(lista_instrucciones) {
        this.lista_instrucciones = lista_instrucciones;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        let bandera = false;

        try {

            for (let instruccion of this.lista_instrucciones) {
                if (instruccion instanceof FuncionMain) {
                    let funcion = instruccion as FuncionMain;
                    funcion.agregarSimboloFuncion(controlador, ts);
                } else if (instruccion instanceof Funcion) {
                    let funcion = instruccion as Funcion;
                    funcion.agregarSimboloFuncion(controlador, ts);
                }
            }

            let encabezado3D = `#include <stdio.h>\nfloat heap[16384];\nfloat stack[16394];\nfloat P;\nfloat H;`;
            controlador.appendTraduccion(encabezado3D);
            var contadorGlobal = 0;
            for (let instruccion of this.lista_instrucciones) {
                /*
                if (!(instruccion instanceof Funcion)) {
                    instruccion.ejecutar(controlador, ts);
                }
                */
                if (instruccion instanceof FuncionMain && bandera == false) {
                    instruccion.traducir(controlador, ts, contadorGlobal);
                    bandera = true;
                } else if (bandera == true) {
                    return;
                }
                /*
                if (instruccion instanceof Declaracion) {
                    instruccion.ejecutar(controlador, ts);
                }*/
            }


        } catch (error) {
            
        }
    }

    /**
     * @function ejecutar Metodo que recorrera todas las instrucciones y las ejecuta en el orden que ingresaron
     */
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let bandera = false;

        try {

            //1era: Se inicia la primer pasada, la cual guarda las funciones y metodos del programa
            for (let instruccion of this.lista_instrucciones) {
                if (instruccion instanceof FuncionMain) {
                    let funcion = instruccion as FuncionMain;
                    funcion.agregarSimboloFuncion(controlador, ts);
                } else if (instruccion instanceof Funcion) {
                    let funcion = instruccion as Funcion;
                    funcion.agregarSimboloFuncion(controlador, ts);
                }
            }
            //2da: Esta se encarga de ejecutar el codigo
            for (let instruccion of this.lista_instrucciones) {
                /*
                if (!(instruccion instanceof Funcion)) {
                    instruccion.ejecutar(controlador, ts);
                }
                */
                if (instruccion instanceof FuncionMain && bandera == false) {
                    instruccion.ejecutar(controlador, ts);
                    bandera = true;
                } else if (bandera == true) {
                    return;
                }
                if (instruccion instanceof Declaracion || instruccion instanceof Arreglo) {
                    instruccion.ejecutar(controlador, ts);
                }
            }

        } catch (error) {
            console.log("Se interrumpio el flujo del programa [Ast.ts]");
        }
    }

    recorrer(): Nodo {
        let raiz = new Nodo("INICIO", "");

        for (let inst of this.lista_instrucciones) {
            raiz.agregarHijo(inst.recorrer());
        }
        return raiz;
    }

}