import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Llamada from "./Llamada";

export default class Asignacion implements Instruccion {

    public identificador: string;
    public valor: Expresion;
    public linea: number;
    public columna: number;

    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion?: any) {
        //Se verifica si ya existe en la tabla de simbolos para asignarle el valor
        if (ts.existe(this.identificador) == true) {

            if (this.valor instanceof Llamada) {
                this.valor.ejecutar(controlador, ts, funcion);
            }
            //console.log("NO SOY TIPO LLAMADA ASIGNACION");
            let valor = this.valor.getValor(controlador, ts);

            //let tipo_valor = this.valor.getTipo(controlador, ts);
            //let auxTipo = ts.getSimbolo(this.identificador)?.tipo;

            //TODO: Verificar que el tipo del valor obtenido se igual al de la declaracion
            /*
            if (tipo_valor == auxTipo?.type || (tipo_valor == 1 && auxTipo?.stype == 'ENTERO') || (tipo_valor == 4 && auxTipo.type == 3)) {
                ts.getSimbolo(this.identificador)?.setValor(valor);
            } else {
                let error = new Errores('Semantico', `El tipo a asignar no es compatible con la variable ${this.identificador}`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR SEMANTICO: El tipo a asignar no es compatible con la variable ${this.identificador}, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
            }          
            */
            ts.getSimbolo(this.identificador)?.setValor(valor);

        } else {
            let error = new Errores('Semantico', `La variable ${this.identificador} no ha sido declarada`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR SEMANTICO: La variable ${this.identificador} no ha sido declarada, LINEA: ${this.linea}, COLUMNA: ${this.columna}`);
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Asignacion", "");

        padre.agregarHijo(new Nodo(this.identificador, ""));
        padre.agregarHijo(new Nodo("=", ""));
        padre.agregarHijo(this.valor.recorrer());

        return padre;
    }

}