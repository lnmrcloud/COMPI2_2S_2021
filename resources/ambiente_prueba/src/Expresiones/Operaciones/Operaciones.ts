import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";

export enum Operador {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO,
    UNARIO,
    IGUALACION,
    DIFERENCIACION,
    MENORQUE,
    MENORIGUALQUE,
    MAYORQUE,
    MAYORIGUALQUE,
    OR,
    AND,
    NOT,
    POW,
    SQRT,
    SIN,
    COS,
    TAN,
    LOG,
    TOINT,
    TODOUBLE,
    STRING,
    INT,
    DOUBLE,
    BOOLEAN,
    CONCATENACION_STRING,
    POTENCIA_STRING,
    POSICION_STRING,
    SUB_STRING,
    LENGTH_STRING,
    TOUPPERCASE_STRING,
    TOLOWERCASE_STRING,
}

export default class Operacion implements Expresion {

    //Recibe los distintos tipos de operadores [1-1, 2+2, 1>2]
    public exp1: Expresion;
    public exp2: Expresion;
    public expU: boolean;
    public operador: Operador;
    public linea: number;
    public columna: number;
    public operadorString: string;

    constructor(exp1, operador, exp2, linea, columna, expU) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.linea = linea;
        this.columna = columna;
        this.expU = expU;
        this.operadorString = operador;
        this.operador = this.getOperador(operador);
    }

    getOperador(op: string): Operador {
        if (op == '+') {
            return Operador.SUMA;
        } else if (op == '-') {
            return Operador.RESTA;
        } else if (op == '*') {
            return Operador.MULTIPLICACION;
        } else if (op == '/') {
            return Operador.DIVISION;
        } else if (op == '^') {
            return Operador.POTENCIA;
        } else if (op == '%') {
            return Operador.MODULO;
        } else if (op == 'UNARIO') {
            return Operador.UNARIO;
        } else if (op == '==') {
            return Operador.IGUALACION;
        } else if (op == '!=') {
            return Operador.DIFERENCIACION;
        } else if (op == '<') {
            return Operador.MENORQUE;
        } else if (op == '<=') {
            return Operador.MENORIGUALQUE;
        } else if (op == '>') {
            return Operador.MAYORQUE;
        } else if (op == '>=') {
            return Operador.MAYORIGUALQUE;
        } else if (op == '||') {
            return Operador.OR;
        } else if (op == '&&') {
            return Operador.AND;
        } else if (op == '!') {
            return Operador.NOT;
        } else if (op == 'POW') {
            return Operador.POW;
        } else if (op == 'SQRT') {
            return Operador.SQRT;
        } else if (op == 'SIN') {
            return Operador.SIN;
        } else if (op == 'COS') {
            return Operador.COS;
        } else if (op == 'TAN') {
            return Operador.TAN;
        } else if (op == 'LOG') {
            return Operador.LOG;   
        } else if (op == 'TOINT'){
            return Operador.TOINT;
        } else if (op == 'TODOUBLE'){
            return Operador.TODOUBLE;
        } else if(op == 'STRING'){
            return Operador.STRING;
        } else if (op == 'INT'){
            return Operador.INT;
        } else if( op == 'DOUBLE'){
            return Operador.DOUBLE;
        } else if( op == 'BOOLEAN'){
            return Operador.BOOLEAN;
        } else if (op == 'CONCATENACION_STRING'){
            return Operador.CONCATENACION_STRING;
        } else if (op == 'POTENCIA_STRING'){
            return Operador.POTENCIA_STRING;
        } else if (op == 'POSICION_STRING'){
            return Operador.POSICION_STRING;
        } else if ( op == 'SUB_STRING'){
            return Operador.SUB_STRING;
        } else if (op == 'LENGTH_STRING'){
            return Operador.LENGTH_STRING;
        } else if (op == 'TOUPPERCASE_STRING'){
            return Operador.TOUPPERCASE_STRING;
        } else if (op == 'TOLOWERCASE_STRING'){
            return Operador.TOLOWERCASE_STRING;
        }
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        throw new Error("Method not implemented.");
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }
    
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}