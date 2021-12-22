import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export interface Instruccion {
    
    /**
     * @function ejecutar Ejecuta las instrucciones
     * @param controlador Lleva el control del programa
     * @param ts Permite acceder a la tabla de simbolos
     */
    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion: any);

    traducir(controlador: Controlador, ts: TablaSimbolos, contador: number);

    /**
     * @function recorrer Permite crear y recorrer el subarbol de la Instruccion
     */
    recorrer(): Nodo;
}