import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../../Instrucciones/Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Aritmetica extends Operacion implements Expresion {

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
            case Operador.SUMA:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // + Entero/Double
                        return valor_exp1 + valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // + boolean
                        let num = 1; //Si es true se toma como 1
                        if (valor_exp2 == false) {
                            num = 0; //Si es false se toma como 0
                        }
                        return valor_exp1 + num;
                    } else if (typeof valor_exp2 === 'string') { // + char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 + numeroAscii; // + char
                        } else { //ES STRING
                            return valor_exp1 + valor_exp2; // + string
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // + Entero/Double
                        let num = 1;
                        if (valor_exp1 == false) {
                            num = 0;
                        }
                        return num + valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // + Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean + Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean + Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean + Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // + char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean + Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean + Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean + Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            return valor_exp1 + valor_exp2; // + string
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // + Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii + valor_exp2;
                        } else { //string
                            return valor_exp1 + valor_exp2;
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // + boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter + Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter + Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter + Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            return valor_exp1 + valor_exp2;
                        }
                    } else if (typeof valor_exp2 === 'string') {
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                return valor_exp1 + valor_exp2;
                            } else { // derecha = string
                                return valor_exp1 + valor_exp2;
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                return valor_exp1 + valor_exp2;
                            } else { //derecha = string
                                return valor_exp1 + valor_exp2;
                            }
                        }
                    }
                }
                break;

            case Operador.RESTA:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // - Entero/Double
                        return valor_exp1 - valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // - boolean
                        let num = 1; //Si es true se toma como 1
                        if (valor_exp2 == false) {
                            num = 0; //Si es false se toma como 0
                        }
                        return valor_exp1 - num;
                    } else if (typeof valor_exp2 === 'string') { // - char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 - numeroAscii; // - char
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double - String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double - String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double - String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // - Entero/Double
                        let num = 1;
                        if (valor_exp1 == false) {
                            num = 0;
                        }
                        return num - valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // - Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean - Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean - Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean - Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // - char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean - Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean - Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean - Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean - String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean - String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean - String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // - Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii - valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String - Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String - Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String - Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // - boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter - Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter - Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter - Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String - Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String - Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String - Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'string') { // - Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter - Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter - Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter - Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter - String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter - String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter - String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String - Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String - Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String - Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { //derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String - String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String - String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String - String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                    }
                }
                break;
            case Operador.MULTIPLICACION:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // * Entero/Double
                        return valor_exp1 * valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // * boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double * Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Entero/Double * Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double * Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // * char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 * numeroAscii; // * char
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double * String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double * String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double * String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // * Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean * Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean * Entero/Double`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean * Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'boolean') { // * Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean * Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean * Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean * Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // * char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean * Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean * Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean * Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean * String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean * String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean * String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // * Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii * valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String * Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String * Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String * Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // * boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter * Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter * Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter * Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String * Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String * Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String * Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'string') { // * Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter * Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter * Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter * Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter * String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter * String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter * String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String * Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String * Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String * Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { //derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String * String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String * String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String * String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                    }
                }
                break;

            case Operador.DIVISION:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // / Entero/Double
                        return valor_exp1 / valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // / boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double / Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Entero/Double / Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double / Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // / char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 / numeroAscii; // / char
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double / String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double / String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double / String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // / Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean / Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean / Entero/Double`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean / Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'boolean') { // / Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean / Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean / Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean / Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // / char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean / Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean / Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean / Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean / String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean / String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean / String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // / Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii / valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String / Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String / Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String / Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // / boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter / Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter / Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter / Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String / Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String / Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String / Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'string') { // / Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter / Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter / Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter / Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter / String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter / String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter / String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String / Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String / Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String / Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { //derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String / String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String / String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String / String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                    }
                }
                break;

            case Operador.POTENCIA:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // ^ Entero/Double
                        return Math.pow(valor_exp1, valor_exp2);
                    } else if (typeof valor_exp2 === 'boolean') { // ^ boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double ^ Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Entero/Double ^ Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double ^ Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // ^ char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double ^ Char"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double ^ Char`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double ^ Char, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double ^ String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double ^ String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double ^ String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // ^ Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean ^ Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean ^ Entero/Double`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean ^ Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'boolean') { // ^ Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean ^ Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean ^ Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean ^ Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // ^ char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean ^ Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean ^ Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean ^ Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean ^ String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean ^ String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean ^ String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // ^ Entero/Double
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Char ^ Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Char ^ Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Char ^ Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String ^ Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String ^ Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String ^ Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // ^ boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter ^ Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter ^ Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter ^ Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String ^ Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String ^ Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String ^ Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'string') { // ^ Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter ^ Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter ^ Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter ^ Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter ^ String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter ^ String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter ^ String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String ^ Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String ^ Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String ^ Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { //derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String ^ String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String ^ String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String ^ String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                    }
                }
                break;

            case Operador.MODULO:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // % Entero/Double
                        return valor_exp1 % valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // % boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double % Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Entero/Double % Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double % Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // % char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double % Char"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double % Char`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double % Char, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double % String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Entero/Double % String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Entero/Double % String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // % Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean % Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean % Entero/Double`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean % Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'boolean') { // ^ Boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean % Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar Boolean % Boolean`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean % Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if (typeof valor_exp2 === 'string') { // ^ char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean % Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean % Caracter`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean % Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean % String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Boolean % String`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Boolean % String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // % Entero/Double
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Char % Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Char % Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Char % Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String % Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String % Entero/Double`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String % Entero/Double, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // ^ boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter % Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar Caracter % Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter % Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String % Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar String % Boolean`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar String % Boolean, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else if (typeof valor_exp2 === 'string') { // ^ Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter % Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter % Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter % Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter % String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar Caracter % String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar Caracter % String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String % Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String % Caracter`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String % Caracter, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            } else { //derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String % String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                                let error = new Errores('Semantico', `No se puede realizar String % String`, this.linea, this.columna);
                                controlador.errores.push(error);
                                controlador.append(`ERROR SEMANTICO: No se puede realizar String % String, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                            }
                        }
                    }
                }
                break;

            case Operador.UNARIO:
                if (typeof valor_expU == 'number') { //Entero/Double
                    return -valor_expU;
                } else { //Cualquier otro
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar -String, -Boolean, -Char"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar -String, -Boolean, -Char`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar -String, -Boolean, -Char, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            case Operador.POW:
                if (typeof valor_exp1 === 'number') {
                    if(typeof valor_exp2 === 'number'){
                        return Math.pow(valor_exp1, valor_exp2);
                    } else if(typeof valor_exp2 === 'boolean'){
                        // mensaje de error semantico
                        console.log("No se puede realizar POW(int, true/false)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar POW(int, true/false)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar POW(int, true/false), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if(typeof valor_exp2 === 'string'){    
                        console.log("No se puede realizar POW(int, string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar POW(int, string/char)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar POW(int, string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                } else if (typeof valor_exp1 === 'boolean') {
                    if(typeof valor_exp2 === 'number'){
                        // mensaje de error semantico
                        console.log("No se puede realizar POW(true/false, number)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar POW(true/false, number)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar POW(true/false, number), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if(typeof valor_exp2 === 'boolean'){
                        // mensaje de error semantico
                        console.log("No se puede realizar POW(true/false, true/false)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar POW(true/false, true/false)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar POW(true/false, true/false), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else if(typeof valor_exp2 === 'string'){                    
                        console.log("No se puede realizar POW(true/false, string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar POW(true/false, string/char)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar POW(true/false, string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                } else if (typeof valor_exp1 === 'string') {
                    if (valor_exp1.length == 1) { //ES CHAR
                        if(typeof valor_exp2 === 'number'){
                            // mensaje de error semantico
                            console.log("No se puede realizar POW(char, int/double)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(char, int/double)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(char, int/double), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else if(typeof valor_exp2 === 'boolean'){
                            // mensaje de error semantico
                            console.log("No se puede realizar POW(char, true/false)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(char, true/false)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(char, true/false), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else if(typeof valor_exp2 === 'string'){
                            console.log("No se puede realizar POW(string/char, string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(string/char, string/char)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(string/char, string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    } else { //ES STRING
                        if(typeof valor_exp2 === 'number'){
                            // mensaje de error semantico
                            console.log("No se puede realizar POW(string, int/double)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(string, int/double)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(string, int/double), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else if(typeof valor_exp2 === 'boolean'){
                            // mensaje de error semantico
                            console.log("No se puede realizar POW(string, true/false)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(string, true/false)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(string, true/false), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else if(typeof valor_exp2 === 'string'){
                            console.log("No se puede realizar POW(string/char, string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar POW(string/char, string/char)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar POW(string/char, string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        }
                    }                    
                }
                break;


            case Operador.SQRT:
                if (typeof valor_expU === 'number'){
                    return Math.sqrt(valor_expU);
                } else {
                     //TODO: Se debe agregar a error semantico.
                     console.log("No se puede realizar SQRT(boolean/string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                     let error = new Errores('Semantico', `No se puede realizar SQRT(boolean/string/char)`, this.linea, this.columna);
                     controlador.errores.push(error);
                     controlador.append(`ERROR SEMANTICO: No se puede realizar SQRT(boolean/string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            case Operador.SIN:
                if (typeof valor_expU === 'number'){
                    return Math.sin(valor_expU);
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar SIN(boolean/string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar SIN(boolean/string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar SIN(boolean/string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }               
                break;

            case Operador.COS:
                if (typeof valor_expU === 'number'){
                    return Math.cos(valor_expU);
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar COS(boolean/string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar COS(boolean/string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar COS(boolean/string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }    
                break;

            case Operador.TAN:
                if (typeof valor_expU === 'number'){
                    return Math.tan(valor_expU);
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar TAN(boolean/string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar TAN(boolean/string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar TAN(boolean/string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
            break;

            case Operador.LOG:
                if (typeof valor_expU === 'number'){
                    return Math.log10(valor_expU);
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar LOG10(boolean/string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar LOG10(boolean/string/char)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar LOG10(boolean/string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
            break;

            default:
                //TODO: Agregar error que se produjo algo inesperado
                //ERROR ERROR ERROR ERROR ERROR ERROR
                break;
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Aritmetica", "");

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