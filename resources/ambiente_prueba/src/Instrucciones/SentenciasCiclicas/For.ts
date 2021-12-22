import Nodo from "../..//Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import Asignacion from "../Asignacion";
import Declaracion from "../Declaracion";
import Continuar from "../../Instrucciones/SentenciaTransferencia/Continuar";
import Detener from "../SentenciaTransferencia/Detener";
import Errores from "../../Ast/Errores";

export default class CicloFor implements Instruccion {

    public declaracion: Declaracion;
    public asignacion: Asignacion;
    public condicion: Expresion;
    public actualizacion: Asignacion;
    public lista_instrucciones: Array<Instruccion>;
    public linea: number;
    public columna: number;

    constructor(declaracion, asignacion, condicion, actualizacion, lista_instrucciones, linea, columna) {
        this.declaracion = declaracion;
        this.asignacion = asignacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion: any) {
        if (this.declaracion != null) {
            let ts_local = new TablaSimbolos(ts, null);
            ts_local.ant.sig = ts_local;
            let tipo_declaracion = this.declaracion.type.getStype(); //OBTIENE EL INT
            //SE VERIFICA SI ES DE TIPO INT
            if (tipo_declaracion.toLowerCase() == "int") {
                this.declaracion.ejecutar(controlador, ts_local); //Se almacena la declaracion de variable
                while (this.condicion.getValor(controlador, ts_local)) {
                    let tsTemporal = new TablaSimbolos(ts_local, null); //Se genera una tabla temporal solo para la iteracion del for
                    tsTemporal.ant.sig = tsTemporal;
                    for (let instruc of this.lista_instrucciones) {
                        let res = instruc.ejecutar(controlador, tsTemporal, funcion);
                        //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                        if (instruc instanceof Detener || res instanceof Detener) {
                            return res;
                        }
                        if (instruc instanceof Continuar || res instanceof Continuar) {
                            this.actualizacion.ejecutar(controlador, tsTemporal);
                        }
                    }
                    this.actualizacion.ejecutar(controlador, ts_local); //Se ejecuta la condicion de actualizacion
                }
                //let identificador_declaracion = this.declaracion.lista_simbolos[0].identificador; //Obtiene el identificador
                //let valor_declaracion = this.declaracion.lista_simbolos[0].valor.primitivo; //Obtiene el valor
                //this.actualizacion.ejecutar(controlador, ts_local); //Se ejecuta la condicion de actualizacion            
            } else {
                //ERROR SEMANTICO DE TIPO NO INT
                let error = new Errores('Semantico', `La variable a utilizar en el for no es de tipo ENTERO(int)`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: La variable a utilizar en el for no es de tipo ENTERO(int), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
            }
        }
        if (this.asignacion != null) {
            let ts_local = new TablaSimbolos(ts, null);
            ts_local.ant.sig = ts_local;
            this.asignacion.ejecutar(controlador, ts);
            if (ts.getSimbolo(this.asignacion.identificador).tipo.stype == "INT") {
                while (this.condicion.getValor(controlador, ts_local)) {
                    let tsTemporal = new TablaSimbolos(ts_local, null); //Se genera una tabla temporal solo para la iteracion del for
                    tsTemporal.ant.sig = tsTemporal;
                    for (let instruc of this.lista_instrucciones) {
                        let res = instruc.ejecutar(controlador, tsTemporal, funcion);
                        //TODO: verificar si res es de tipo CONTINUE, BREAK, RETORNO
                        if (instruc instanceof Detener || res instanceof Detener) {
                            return res;
                        }
                        if (instruc instanceof Continuar || res instanceof Continuar) {
                            this.actualizacion.ejecutar(controlador, tsTemporal);
                        }
                    }
                    this.actualizacion.ejecutar(controlador, ts_local); //Se ejecuta la condicion de actualizacion
                }
            } else {
                //TODO: ERROR SEMANTICO DE TIPO NO INT
                let error = new Errores('Semantico', `La variable a utilizar en el for no es de tipo ENTERO(int)`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: La variable a utilizar en el for no es de tipo ENTERO(int), LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
            }
        }

    }

    recorrer(): Nodo {
        let padre = new Nodo("FOR", "");
        padre.agregarHijo(new Nodo("(", ""));

        if (this.declaracion != null) {
            padre.agregarHijo(this.declaracion.recorrer());
        } else { //Es una asignacion
            padre.agregarHijo(this.asignacion.recorrer());
        }
        padre.agregarHijo(new Nodo(";", ""));
        padre.agregarHijo(this.condicion.recorrer());
        padre.agregarHijo(new Nodo(";", ""));
        padre.agregarHijo(this.actualizacion.recorrer());
        padre.agregarHijo(new Nodo(")", ""));
        padre.agregarHijo(new Nodo("{", ""));
        for (let instruc of this.lista_instrucciones) {
            padre.agregarHijo(instruc.recorrer());
        }
        padre.agregarHijo(new Nodo("}", ""));


        return padre;
    }

}