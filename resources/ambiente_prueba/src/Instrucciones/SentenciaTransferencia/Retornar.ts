import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import Llamada from "../Llamada";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import { TablaSimbolos } from "../../TablaSimbolos/TablaSimbolos";

export default class Retornar implements Instruccion{

    public var_retorno: Expresion;

    constructor(var_retorno){
        this.var_retorno = var_retorno;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos) {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, identificador?: any) {
        console.log("Estoy en ejecutar [Retornar.ts]");
        if(this.var_retorno != null){
            //console.log(this.var_retorno.getValor(controlador, ts));
            console.log("llegue aca");
            if(this.var_retorno instanceof Llamada) {
                this.var_retorno.ejecutar(controlador, ts, identificador);
            } else {
                try {
                    identificador.valor = this.var_retorno.getValor(controlador, ts);
                } catch (error) {
                    console.log("COMO QUE VALIO");
                }
                console.log("llegue aca 2");
                if(this.var_retorno.getValor(controlador, ts) != null){
                    return this.var_retorno.getValor(controlador, ts);   
                }
            }
        } else {
            return this;
        }
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Return", "");

        if(this.var_retorno != null){
            padre.agregarHijo(this.var_retorno.recorrer());
        }

        return padre;
    }

}