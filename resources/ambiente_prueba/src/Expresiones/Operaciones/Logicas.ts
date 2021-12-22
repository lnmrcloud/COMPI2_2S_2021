import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../../Instrucciones/Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Logicas extends Operacion implements Expresion {

    public constructor(exp1: Expresion, op: string, exp2: Expresion, linea: number, columna: number, expU: boolean) {
        super(exp1, op, exp2, linea, columna, expU);
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let valor = this.getValor(controlador, ts);

        if (typeof valor == 'number') {
            return tipo.DOBLE;
        } else if (typeof valor == 'string') {
            return tipo.CADENA;
        } else if (typeof valor == 'boolean') {
            return tipo.BOOLEANO;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        if (this.expU == false) {
            if (this.exp1.getValor(controlador, ts) == null) {
                if(this.exp1 instanceof Llamada){
                    this.exp1.ejecutar(controlador, ts);
                }
            }
            valor_exp1 = this.exp1.getValor(controlador, ts);

            if (this.exp2.getValor(controlador, ts) == null) {
                if(this.exp2 instanceof Llamada){
                    this.exp2.ejecutar(controlador, ts);
                }
            }
            valor_exp2 = this.exp2.getValor(controlador, ts);
        } else {
            if (this.exp1.getValor(controlador, ts) == null) {
                if(this.exp1 instanceof Llamada){
                    this.exp1.ejecutar(controlador, ts);
                }
            }
            valor_expU = this.exp1.getValor(controlador, ts);
        }

        switch (this.operador) {
            case Operador.OR:
                if (typeof valor_exp1 === 'boolean') {
                    if (typeof valor_exp2 === 'boolean') {
                        return valor_exp1 || valor_exp2;
                    } else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean || [No Boolean]"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean || [No Boolean]`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean || [No Boolean], LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar [No Boolean] || [Cualquier Tipo]"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar [No Boolean] || [Cualquier Tipo]`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar [No Boolean] || [Cualquier Tipo], LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;
            case Operador.AND:
                if (typeof valor_exp1 === 'boolean') {
                    if (typeof valor_exp2 === 'boolean') {
                        return valor_exp1 && valor_exp2;
                    } else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean && [No Boolean]"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean && [No Boolean]`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean && [No Boolean], LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar [No Boolean] && [Cualquier Tipo]"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar [No Boolean] && [Cualquier Tipo]`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar [No Boolean] && [Cualquier Tipo], LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;
            case Operador.NOT:
                if (typeof valor_expU === 'boolean') {
                    return !valor_expU;
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar ![No Boolean]"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar ![No Boolean]`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar ![No Boolean], LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;
            default:
                break;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Logica", "");

        if (this.expU) { //Si es negativo
            padre.agregarHijo(new Nodo(this.operadorString, ""));
            padre.agregarHijo(this.exp1.recorrer());
        } else { //Si es positivo
            padre.agregarHijo(this.exp1.recorrer());
            padre.agregarHijo(new Nodo(this.operadorString, ""));
            padre.agregarHijo(this.exp2.recorrer());
        }

        return padre;
    }
}