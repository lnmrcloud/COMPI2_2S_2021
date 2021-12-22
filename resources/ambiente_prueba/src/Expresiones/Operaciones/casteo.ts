import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../../Instrucciones/Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class casteo extends Operacion implements Expresion {

    constructor(exp1, operador, exp2, linea, columna, expU) {
        super(exp1, operador, exp2, linea, columna, expU);
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let valor = this.getValor(controlador, ts);
        let queTipoEs = "";

        if (typeof valor === 'number') {
            return tipo.DOBLE;
        } else if (typeof valor === 'string') {
            return tipo.CADENA;
        } if (typeof valor === 'boolean') {
            return tipo.BOOLEANO;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        // 1 + 2
        if (this.expU == false) {
            // console.log(this.exp1.getValor(controlador, ts));
            if (this.exp1.getValor(controlador, ts) == null) {
                if (this.exp1 instanceof Llamada) {
                    this.exp1.ejecutar(controlador, ts);
                }
            }
            valor_exp1 = this.exp1.getValor(controlador, ts);


            if (this.exp2.getValor(controlador, ts) == null) {
                if (this.exp2 instanceof Llamada) {
                    this.exp2.ejecutar(controlador, ts);
                }
            }
            valor_exp2 = this.exp2.getValor(controlador, ts);
        } else {
            if (this.exp1.getValor(controlador, ts) == null) {
                if (this.exp1 instanceof Llamada) {
                    this.exp1.ejecutar(controlador, ts);
                }
            }
            valor_expU = this.exp1.getValor(controlador, ts);
        }



        // switch para toInt(), toDouble() y string() FIXME: el string() funciona pero no con cadenas
        switch (this.operador) {
            case Operador.TOINT:
                if (typeof valor_expU === "number") {
                    return Math.floor(valor_expU);
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar toInt(string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar toInt(string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar toInt(string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            case Operador.TODOUBLE:
                if (typeof valor_expU === "number") {
                    let suma = valor_expU + 0.01;
                    return suma;
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar toInt(string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar toInt(string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar toInt(string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;




            case Operador.STRING:
                if (typeof valor_expU === 'number') {
                    let valor = valor_expU.toString();
                    return valor;
                } else {
                    return valor_expU.toString();
                }
                break;



            case Operador.INT:
                if (typeof valor_exp1 === 'string') {
                    if (valor_exp1.length == 1) {
                        return Number(valor_exp1);
                    }
                    else {
                        return Number(valor_exp1);
                    }
                } else {
                    console.log("No se puede realizar int.parse(int/double/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar int.parse(int/double/boolean)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar int.parse(int/double/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            case Operador.DOUBLE:
                if (typeof valor_exp1 === 'string') {
                    if (valor_exp1.length == 1) {
                        // char
                        return parseFloat(valor_exp1);
                    }
                    else {
                        // string
                        return parseFloat(valor_exp1);
                    }
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar double.parse(int/double/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar double.parse(int/double/boolean)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar double.parse(int/double/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            case Operador.BOOLEAN:
                if (typeof valor_exp1 === 'string') {
                    if (valor_exp1.length == 1) {
                        // char
                        if (valor_exp1 === '1') {
                            return true;
                        } else if (valor_exp1 === '0') {
                            return false;
                        } else {
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar boolean.parse( string > 1)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar boolean.parse( string > 1)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar boolean.parse( string > 1 ), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                    else {
                        // string
                        if (valor_exp1.length == 1) {
                            if (valor_exp1 === '1') {
                                return true;
                            } else if (valor_exp1 === '0') {
                                return false;
                            } else {
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar boolean.parse( string > 1)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar boolean.parse( string > 1)`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar boolean.parse( string > 1 ), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                        else {
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar boolean.parse( string > 1)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar boolean.parse( string > 1)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar boolean.parse( string > 1 ), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar boolean.parse(int/double/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar boolean.parse(int/double/boolean)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar boolean.parse(int/double/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            default:
                break;
        }

    }


    recorrer(): Nodo{
        let padre = new Nodo("Casteo", "");

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