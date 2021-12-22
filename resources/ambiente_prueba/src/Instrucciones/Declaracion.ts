import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";
import Llamada from "./Llamada";
import Primitivo from '../Expresiones/Primitivos';

export default class Declaracion implements Instruccion {

    public type: Tipo;
    public stype: string;
    public lista_simbolos: Array<Simbolos>;

    public linea: number;
    public columna: number;

    constructor(type, lista_simbolos, linea, columna) {
        this.type = type;
        this.lista_simbolos = lista_simbolos;
        this.linea = linea;
        this.columna = columna;
        this.asignarValorDefault();
    }

    asignarValorDefault(){
        for (let simbolo of this.lista_simbolos) {
            let variable = simbolo as Simbolos;
            if(variable.valor == null){
                if(this.type.stype == "INT"){
                    let primitivo = new Primitivo(0, 0, 0);
                    simbolo.valor = primitivo;
                } else if(this.type.stype == "STRING"){
                    let primitivo = new Primitivo("", 0, 0);
                    simbolo.valor = primitivo;
                } else if(this.type.stype == "DOUBLE"){
                    let primitivo = new Primitivo(0.0, 0, 0);
                    simbolo.valor = primitivo;
                } else if(this.type.stype == "CHAR"){
                    let primitivo = new Primitivo('\0', 0, 0);
                    simbolo.valor = primitivo;
                } else if(this.type.stype == "BOOLEAN"){
                    let primitivo = new Primitivo(true, 0, 0);
                    simbolo.valor = primitivo;
                }
                /*
                if(variable.tipo.stype == "INT"){
                    console.log("MAJE, SOY INT");
                    //simbolo.valor = 0;
                }*/
            }
        }
    }

    traducir(controlador: Controlador, ts: TablaSimbolos, contador: number) {
        for (let simbolo of this.lista_simbolos) {
            let variable = simbolo as Simbolos;

            if (ts.existeEnActual(variable.identificador)) { //Si existe
                let error = new Errores('Semantico', `La variable ${variable.identificador} ya existe en el entorno local`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: La variable ${variable.identificador} ya existe en el entorno local, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                continue;
            }

            if (variable.valor != null) {
                let valor = variable.valor.getValor(controlador, ts);
                let tipo_valor = variable.valor.getTipo(controlador, ts);
                if (tipo_valor == this.type.type || (tipo_valor == tipo.DOBLE && this.type.type == tipo.ENTERO) || (tipo_valor == tipo.CADENA && this.type.type == tipo.CARACTER)) {
                    //Se agrega a la tabla de simbolos
                    let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
                    nuevoSimbolo.datos3D.posicion = contador;
                    nuevoSimbolo.datos3D.longitud = 1;
                    ts.agregar(variable.identificador, nuevoSimbolo);
                    controlador.appendTraduccion("stack[(int)P] = " + nuevoSimbolo.datos3D.cadenaTraduccion + ";");
                    controlador.appendTraduccion("P = P + 1;")
                } else {
                    console.log("NO SON DEL MISMO TIPO");
                }
            } else {
                //Se agrega a la tabla de simbolos
                let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, null);
                ts.agregar(variable.identificador, nuevoSimbolo);
            }


        }
        /*
        console.log(simbolo);
        if(simbolo.tipo.stype == "INT" || simbolo.tipo.stype == "DOUBLE") {
            controlador.appendTraduccion("stack[(int)P] = " + simbolo.valor + ";");
            controlador.appendTraduccion("P = P + 1;");
        } else if(simbolo.tipo.stype == "CHAR") {
            let ascii = simbolo.valor.charCodeAt(0);
            console.log(ascii);
            controlador.appendTraduccion("");
            controlador.appendTraduccion("P = P + 1;");
        } else if(simbolo.tipo.stype == "BOOLEAN") {
            controlador.appendTraduccion("P = P + 1;");
        } else if(simbolo.tipo.stype == "STRING") {
            controlador.appendTraduccion("P = P + 1;");
        }*/
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        for (let simbolo of this.lista_simbolos) {
            let variable = simbolo as Simbolos;

            //Se verifica que la variable no exista en la tabla de simbolos Actual (LOCALMENTE)
            if (ts.existeEnActual(variable.identificador)) { //Si existe
                let error = new Errores('Semantico', `La variable ${variable.identificador} ya existe en el entorno local`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: La variable ${variable.identificador} ya existe en el entorno local, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                continue;
            }

            //int = 2;
            //int p2;
            if (variable.valor != null) {
                //console.log();
                /*
                if(this.expresion instanceof Llamada){

                }*/
                if(variable.valor instanceof Llamada){
                    //console.log("SOY DE TIPO LLAMADA DECLARACION");
                    variable.valor.ejecutar(controlador, ts, funcion);
                }
                
                let valor = variable.valor.getValor(controlador, ts);
                //TODO: Verificar que el tipo del valor obtenido se igual al de la declaracion

                let tipo_valor = variable.valor.getTipo(controlador, ts);


                //getQueTipoEs();
                //console.log(tipo_valor, this.type.type);
                if (tipo_valor == this.type.type || (tipo_valor == tipo.DOBLE && this.type.type == tipo.ENTERO) || (tipo_valor == tipo.CADENA && this.type.type == tipo.CARACTER)) {
                    //Se agrega a la tabla de simbolos
                    let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
                    ts.agregar(variable.identificador, nuevoSimbolo);
                } else {
                    console.log("NO SON DEL MISMO TIPO");
                    let error = new Errores('Semantico', `No son del mismo tipo`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR SEMANTICO: No son del mismo tipo, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
                }

                //let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
                //ts.agregar(variable.identificador, nuevoSimbolo);

                //Se agrega a la tabla de simbolos
                //let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, valor);
                //ts.agregar(variable.identificador, nuevoSimbolo);
            } else {
                //Se agrega a la tabla de simbolos
                let nuevoSimbolo = new Simbolos(variable.simbolo, this.type, variable.identificador, null);
                ts.agregar(variable.identificador, nuevoSimbolo);
            }
        }
    }

    recorrer(): Nodo {
        console.log("que pumas");
        let padre = new Nodo("Declaracion", "");
        padre.agregarHijo(new Nodo(this.type.stype, "")); //INT, STRING, BOOLEAN, CHAR....

        let iteraciones = this.lista_simbolos.length;
        for(let simbolo of this.lista_simbolos) {
            padre.agregarHijo(new Nodo(simbolo.identificador, ""));

            if (simbolo.valor != null) {
                padre.agregarHijo(new Nodo("=", ""));
                padre.agregarHijo(simbolo.valor.recorrer());
                if (--iteraciones){
                    padre.agregarHijo(new Nodo(",", ""));
                }
            }
        }


        return padre;
    }

}