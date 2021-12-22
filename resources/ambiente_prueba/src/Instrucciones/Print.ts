import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";

export default class Print implements Instruccion {

    public expresiones: Array<Expresion>;
    public linea: number;
    public columna: number;
    public saltoLinea: boolean;

    constructor(expresiones, linea, columna, saltoLinea) {
        this.expresiones = expresiones;
        this.linea = linea;
        this.columna = columna;
        this.saltoLinea = saltoLinea;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        let cantidadPrints = this.expresiones.length;
        for (let expresion of this.expresiones) {
            let expre = expresion as Expresion;
            //console.log("VAMOS A IMPRIMIR");
            //TODO: Verificar que el tipo sea un valor primitivo, osea que solo sea un valor exacto y no una lista y etc...
            if (expre instanceof Llamada) {
                //console.log("AWEBO SOY LLAMADA");
                //console.log("Nombre de la funcion: " + this.expresion.getIdentificador(controlador, ts) + " [Print.ts]");
                expre.ejecutar(controlador, ts, funcion);
            }
            //Se obtiene el valor de la expresion
            let valor = expre.getValor(controlador, ts);
            //Se verifica si es una arreglo
            if(Array.isArray(valor)) {
                let variable;
                let iteracion = valor.length;
                variable = "[";
                for(let lista of valor){
                    let dato = lista as Expresion;
                    variable += dato.getValor(controlador, ts);
                    if (--iteracion) {
                        variable += ","
                    }
                }
                variable += "]";
                if (this.saltoLinea == true) {
                    if(!--cantidadPrints){
                        controlador.appendLn(variable);
                    } else {
                        controlador.append(variable);
                    }
                } else {
                    controlador.append(variable);
                }
            } else {
                try {
                    if(typeof valor === 'string'){
                        if(valor.includes("$")){
                            let temporal = valor;
                            let div1 = temporal.split(" ");
                            let cadenaImprimir = "";
                            for(let dato of div1){
                                if(dato.includes("$")){
                                    let div2 = dato.slice(1);
                                    let simboloTS = ts.getSimbolo(div2);
                                    if(simboloTS != null) {
                                        cadenaImprimir += simboloTS.valor + " ";
                                    } else {
                                        cadenaImprimir += dato + " ";
                                        let error = new Errores('Semantico', `No existe la variable ${dato}`, this.linea, this.columna);
                                        controlador.errores.push(error);
                                    }
                                } else {
                                    cadenaImprimir += dato + " ";
                                }
                            }
                            //console.log(cadenaImprimir);


                            if (this.saltoLinea == true) {
                                if(!--cantidadPrints){
                                    controlador.appendLn(cadenaImprimir);
                                } else {
                                    controlador.append(cadenaImprimir);
                                }
                            } else {
                                controlador.append(cadenaImprimir);
                            }
                            continue;
                        }
                    }    
                } catch (error) {
                    console.log("Fallo al verificar si contenia $");
                }
                
                if (this.saltoLinea == true) {
                    if(!--cantidadPrints){
                        controlador.appendLn(valor);
                    } else {
                        controlador.append(valor);
                    }
                } else {
                    controlador.append(valor);
                }
            }
        }
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Print", "");
        if(this.saltoLinea == true){
            padre.agregarHijo(new Nodo("printLn", ""));   
        } else {
            padre.agregarHijo(new Nodo("print", ""));
        }
        padre.agregarHijo(new Nodo("(", ""));

        let iteraciones = this.expresiones.length;
        for (let expresion of this.expresiones){
            //let hijo = new Nodo("expresion", "");
            let hijo = expresion.recorrer();
            padre.agregarHijo(hijo);
            if (--iteraciones){
                padre.agregarHijo(new Nodo(",", ""));
            }
        }
        padre.agregarHijo(new Nodo(")", ""));
        //hijo.agregarHijo(this.expresion.recorrer());

        return padre;
    }

}