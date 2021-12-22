import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";

export default class GraficarTS implements Instruccion {

    constructor(){

    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos, funcion: any) {
        console.log("ACA SI LLEGUE");
        var cuerpo = "-----------------TABLA DE SIMBOLOS ACTUAL-----------------\n";
        cuerpo += "-----------------------------------------------------------\n";
        cuerpo += "ROL   ||   NOMBRE   ||   TIPO   ||   VALOR   ||   PARAMETRO\n";
        cuerpo += "-----------------------------------------------------------\n";
        while (ts != null) {
            let indice = 0;
            for (let sim of ts.tabla.values()) {
                cuerpo += this.getRol(sim) + "   ||   " + sim.identificador + "   ||   " + this.getTipo(sim) + "   ||   ";
                if(this.getRol(sim) == "metodo") {
                    cuerpo += "---" + "   ||   ";
                } else {
                    if(Array.isArray(sim.valor)) {
                        let variable;
                        let iteracion = sim.valor.length;
                        variable = "[";
                        for(let lista of sim.valor){
                            let dato = lista as Expresion;
                            variable += dato.getValor(controlador, ts);
                            if (--iteracion) {
                                variable += ","
                            }
                        }
                        variable += "]";
                        cuerpo += variable + "   ||   ";
                    } else {
                        cuerpo += this.getValor(sim) + "   ||   ";
                    }
                }
                cuerpo += this.parametros(sim) + "\n";
                indice++;
            }
            ts = ts.ant;
        }

        cuerpo += "\n\n";
        controlador.consolaGraficarTs += cuerpo;
    }

    traducir(controlador: Controlador, ts: TablaSimbolos, contador: number) {
        throw new Error("Method not implemented.");
    }

    recorrer(): Nodo {
        //throw new Error("Method not implemented.");
        return null;
    }

    getRol(sim: Simbolos) {
        let rol: string = '';
        switch (sim.simbolo) {
            case 1:
                rol = "variable"
                break
            case 2:
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
            case 4:
                rol = "vector";
                break
            case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro"
                break;
        }
        return rol;
    }

    parametros(sim) {
        if (sim.lista_params != undefined) {
            return sim.lista_params.length
        } else {
            return "...";
        }
    }

    getValor(sim: Simbolos): string {
        if (sim.valor != null) {
            return sim.valor.toString();
        } else {
            return '---';
        }
    }

    getTipo(sim): string {
        return sim.tipo.stype.toLowerCase();
    }

}