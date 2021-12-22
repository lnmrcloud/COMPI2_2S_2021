import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../../Instrucciones/Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Strings extends Operacion implements Expresion {

    public exp3: Expresion;

    constructor(exp1, operador, exp2, linea, columna, expU, exp3?) {
        super(exp1, operador, exp2, linea, columna, expU);
        this.exp3 = exp3;
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
        let valor_exp3;
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

            if(this.exp3 != null) {
                if (this.exp3.getValor(controlador, ts) == null) {
                    if (this.exp3 instanceof Llamada) {
                        this.exp3.ejecutar(controlador, ts);
                    }
                }
                valor_exp3 = this.exp3.getValor(controlador, ts);
            }
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
            
            case Operador.CONCATENACION_STRING:
                if(typeof valor_exp1 === 'string'){
                    if(typeof valor_exp2 === 'string'){
                        return valor_exp1 + '' + valor_exp2;
                    }
                    else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar concatenacion tipo  STRING & (int/double/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar concatenacion tipo  STRING & (int/double/boolean)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar concatenacion tipo  STRING & (int/double/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);    
                    }
                } else {
                    if(typeof valor_exp2 === 'string'){
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar concatenacion tipo  (int/double/boolean) & (string/char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar concatenacion tipo (int/double/boolean) & (string/char)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar concatenacion tipo (int/double/boolean) & (string/char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    } else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar concatenacion tipo  (int/double/boolean) & (int/double/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar concatenacion tipo (int/double/boolean) & (int/double/boolean)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar concatenacion tipo (int/double/boolean) & (int/double/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                }
                break;

            case Operador.POTENCIA_STRING:
                if(typeof valor_exp1 === 'string'){
                    if(typeof valor_exp2 === 'number'){
                        let retorno = valor_exp1;
                        for(let i = 1 ; i < valor_exp2 ; i++){
                            retorno += valor_exp1;
                        }
                        return retorno;
                    } else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar repeticion tipo  (string) & (string/char/boolean/double)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar repeticion tipo  (string) & (string/char/boolean/double)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar repeticion tipo  (string) & (string/char/boolean/double), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                } else {
                    //TODO: Se debe agregar a error semantico.
                    console.log("No se puede realizar repeticion el primer valor deve de ser tipo (string)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    let error = new Errores('Semantico', `No se puede realizar repeticion el primer valor deve de ser tipo (string)`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No se puede realizar repeticion el primer valor deve de ser tipo (string), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            
            
            case Operador.POSICION_STRING:
                    if(typeof valor_exp1 === 'string'){
                        if (valor_exp1.length == 1) {
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar caracterOfPosition(char)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            let error = new Errores('Semantico', `No se puede realizar caracterOfPosition(char)`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`ERROR SEMANTICO: No se puede realizar caracterOfPosition(char), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                        } else {
                            let cadena = valor_exp1;
                            let posicionExtracion = valor_exp2;
                            return cadena[posicionExtracion];
                        }
                    } else {
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar caracterOfPosition(int/float/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        let error = new Errores('Semantico', `No se puede realizar caracterOfPosition(int/float/boolean)`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR SEMANTICO: No se puede realizar caracterOfPosition(int/float/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                    }
                break;


            case Operador.SUB_STRING:
                if (typeof valor_exp1 === 'string'){
                    if (valor_exp1.length == 1) {
                    } else {
                        if(typeof valor_exp2 == 'number'){
                            if(typeof valor_exp3 == 'number'){
                                return valor_exp1.substr(valor_exp2, valor_exp3);
                            }
                        }                  

                    }
                } else {
                }
                break;


            case Operador.LENGTH_STRING:
                if (typeof valor_expU === 'string'){
                    if (valor_expU.length == 1) {
                        return valor_expU.length;
                    } else {         
                        return valor_expU.length-1;
                    }   
                } else {
                     //TODO: Se debe agregar a error semantico.
                     console.log("No se puede realizar toLowerCase(int/float/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                     let error = new Errores('Semantico', `No se puede realizar toLowerCase(int/float/boolean)`, this.linea, this.columna);
                     controlador.errores.push(error);
                     controlador.append(`ERROR SEMANTICO: No se puede realizar toLowerCase(int/float/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;


            case Operador.TOUPPERCASE_STRING:
                if (typeof valor_expU === 'string'){
                    if (valor_expU.length == 1) {
                        return valor_expU.toUpperCase();
                    } else {         
                        return valor_expU.toUpperCase();
                    }   
                } else {
                     //TODO: Se debe agregar a error semantico.
                     console.log("No se puede realizar toLowerCase(int/float/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                     let error = new Errores('Semantico', `No se puede realizar toLowerCase(int/float/boolean)`, this.linea, this.columna);
                     controlador.errores.push(error);
                     controlador.append(`ERROR SEMANTICO: No se puede realizar toLowerCase(int/float/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;


            case Operador.TOLOWERCASE_STRING:
                if (typeof valor_expU === 'string'){
                    if (valor_expU.length == 1) {
                        return valor_expU.toLocaleLowerCase();
                    } else {         
                        return valor_expU.toLocaleLowerCase();
                    }   
                } else {
                     //TODO: Se debe agregar a error semantico.
                     console.log("No se puede realizar toLowerCase(int/float/boolean)"); //ERROR ERROR ERROR ERROR ERROR ERROR
                     let error = new Errores('Semantico', `No se puede realizar toLowerCase(int/float/boolean)`, this.linea, this.columna);
                     controlador.errores.push(error);
                     controlador.append(`ERROR SEMANTICO: No se puede realizar toLowerCase(int/float/boolean), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }
                break;

            default:
                break;
        }

    }


    recorrer(): Nodo{
        let padre = new Nodo("Cadenas", "");

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