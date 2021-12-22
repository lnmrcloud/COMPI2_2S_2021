import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export interface Expresion {

    /**
     * @function getTipo Retorna el tipo del valor de la expresion
     * @param controlador Lleva el control de todo el programa
     * @param ts Permite acceder a la tabla de simbolos
     */
    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo;

    /**
     * @function getValor Retorna el valor de la expresion
     * @param controlador Lleva el control de todo el programa
     * @param ts Permite acceder a la tabla de simbolos
     */
    getValor(controlador: Controlador, ts: TablaSimbolos);

    /**
     * @function recorrer Permite crear y recorrer el subarbol de la expresion
     */
    recorrer(): Nodo;
}