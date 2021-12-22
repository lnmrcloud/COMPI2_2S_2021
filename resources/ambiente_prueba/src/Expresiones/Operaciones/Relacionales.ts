import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../../Instrucciones/Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Relacionales extends Operacion implements Expresion {

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
            case Operador.IGUALACION:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // == Entero/Double
                        return valor_exp1 == valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // == boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double == Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // == char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 == numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double == String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // == Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean == Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // == Boolean
                        return valor_exp1 == valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // == char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean == Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean == String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // == Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii == valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String == Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // == boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter == Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String == Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // == Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 == numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter == String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String == Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 == valor_exp2;
                            }
                        }
                    }
                }
                break;
            case Operador.DIFERENCIACION:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // != Entero/Double
                        return valor_exp1 != valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // != boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double != Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // != char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 != numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double != String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // != Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean != Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // != Boolean
                        return valor_exp1 != valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // != char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean != Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean != String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // != Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii != valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String != Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // != boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter != Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String != Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // != Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 != numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter != String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String != Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 != valor_exp2;
                            }
                        }
                    }
                }
                break;

            case Operador.MENORQUE:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // < Entero/Double
                        return valor_exp1 < valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // < boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double < Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // < char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 < numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double < String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // < Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean < Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // < Boolean
                        return valor_exp1 < valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // < char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean < Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean < String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // < Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii < valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String < Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // < boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter < Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String < Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // < Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 < numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter < String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String < Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 < valor_exp2;
                            }
                        }
                    }
                }
                break;
            
            case Operador.MENORIGUALQUE:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // <= Entero/Double
                        return valor_exp1 <= valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // <= boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double <= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // <= char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 <= numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double <= String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // <= Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean <= Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // <= Boolean
                        return valor_exp1 <= valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // <= char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean <= Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean <= String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // <= Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii <= valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String <= Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // <= boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter <= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String <= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // <= Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 <= numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter < String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String <= Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 <= valor_exp2;
                            }
                        }
                    }
                }
                break;
            case Operador.MAYORQUE:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // > Entero/Double
                        return valor_exp1 > valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // > boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double > Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // > char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 > numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double > String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // > Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean > Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // > Boolean
                        return valor_exp1 > valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // > char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean > Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean > String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // > Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii > valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String > Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // > boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter > Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String > Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // > Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 > numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter > String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String > Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 > valor_exp2;
                            }
                        }
                    }
                }
                break;
            case Operador.MAYORIGUALQUE:
                if (typeof valor_exp1 === 'number') {// Entero/Double
                    if (typeof valor_exp2 === 'number') { // >= Entero/Double
                        return valor_exp1 >= valor_exp2;
                    } else if (typeof valor_exp2 === 'boolean') { // >= boolean
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Entero/Double >= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'string') { // >= char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            let numeroAscii = valor_exp2.charCodeAt(0);
                            return valor_exp1 >= numeroAscii;
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Entero/Double >= String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'boolean') { //Boolean
                    if (typeof valor_exp2 === 'number') { // >= Entero/Double
                        //TODO: Se debe agregar a error semantico.
                        console.log("No se puede realizar Boolean >= Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                    } else if (typeof valor_exp2 === 'boolean') { // >= Boolean
                        return valor_exp1 >= valor_exp2;
                    } else if (typeof valor_exp2 === 'string') { // >= char/string
                        if (valor_exp2.length == 1) { //ES CHAR
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean >= Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //ES STRING
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Boolean >= String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    }
                } else if (typeof valor_exp1 === 'string') { // char/string
                    if (typeof valor_exp2 === 'number') { // >= Entero/Double
                        if (valor_exp1.length == 1) { //char
                            let numeroAscii = valor_exp1.charCodeAt(0);
                            return numeroAscii >= valor_exp2;
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String >= Entero/Double"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'boolean') { // >= boolean
                        if (valor_exp1.length == 1) { //char
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar Caracter >= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        } else { //string
                            //TODO: Se debe agregar a error semantico.
                            console.log("No se puede realizar String >= Boolean"); //ERROR ERROR ERROR ERROR ERROR ERROR
                        }
                    } else if (typeof valor_exp2 === 'string') { // >= Char/String
                        if (valor_exp1.length == 1) { //char
                            if (valor_exp2.length == 1) { // derecha = char
                                let numeroAscii_1 = valor_exp1.charCodeAt(0);
                                let numeroAscii_2 = valor_exp2.charCodeAt(0);
                                return numeroAscii_1 >= numeroAscii_2;
                            } else { // derecha = string
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar Caracter >= String"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            }
                        } else { //string
                            if (valor_exp2.length == 1) { // derecha = char
                                //TODO: Se debe agregar a error semantico.
                                console.log("No se puede realizar String >= Caracter"); //ERROR ERROR ERROR ERROR ERROR ERROR
                            } else { //derecha = string
                                return valor_exp1 >= valor_exp2;
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Relacional", "");

        if(this.expU){ //Si es negativo
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