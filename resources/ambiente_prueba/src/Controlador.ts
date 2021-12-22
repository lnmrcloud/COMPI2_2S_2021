import { Expresion } from "Interfaces/Expresion";
import Errores from "./Ast/Errores";
import Simbolos from "./TablaSimbolos/Simbolos";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";

export default class Controlador {

    public errores: Array<Errores>;
    public consola: string;
    public consolaTraduccion: string;
    public consolaGraficarTs: string;

    constructor() {
        this.errores = new Array<Errores>();
        this.consola = "";
        this.consolaTraduccion = "";
        this.consolaGraficarTs = "";
    }
    
    public append(consola: string) { //PARA EL USO DE PRINT
        this.consola += consola;
    }

    public appendLn(consola: string) { //PARA EL USO DE PRINTLN
        this.consola += consola + '\n';
    }

    public appendTraduccion(consolaTraduccion: string) {
        this.consolaTraduccion += consolaTraduccion + '\n';
    }

    graficar_ts(controlador: Controlador, ts: TablaSimbolos): string {
        var cuerpohtml = "<thead class=\"thead-light\"><tr><th scope=\"col\">ROL</th><th scope=\"col\">NOMBRE</th><th scope=\"col\">TIPO</th><th scope=\"col\">VALOR</th><th scope=\"col\">PARAMETRO</th></tr>";

        while (ts != null) {
            //console.log("%%%%%%%%%%%%%%%%%%");
            //console.log(ts.tabla.values());
            //console.log("%%%%%%%%%%%%%%%%%%");
            let indice = 0;
            for (let sim of ts.tabla.values()) {
                //console.log(ts.tabla.keys().next().value);

                cuerpohtml += "<tr class=\"grey lighten-1 black-text\"><th scope=\"row\">" + this.getRol(sim) + 
                    "</th><td>" + sim.identificador +
                    "</td><td>" + this.getTipo(sim) + "</td>";
                
                if(this.getRol(sim) == "metodo") {
                    cuerpohtml += "</td><td>---";
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
                        cuerpohtml += "</td><td>" + variable;
                    } else {
                        cuerpohtml += "</td><td>" + this.getValor(sim);
                    }
                }
                cuerpohtml += "</td><td>" + this.parametros(sim) + "</td>" + "</tr>";
                indice++;
            }
            ts = ts.sig;
        }
        cuerpohtml += "</thead>";
        return cuerpohtml;
    }

    graficar_tsActual(controlador: Controlador, ts: TablaSimbolos): string {
        var cuerpo = "<thead class=\"thead-light\"><tr><th scope=\"col\">ROL</th><th scope=\"col\">NOMBRE</th><th scope=\"col\">TIPO</th><th scope=\"col\">VALOR</th><th scope=\"col\">PARAMETRO</th></tr>";

        while (ts != null) {
            //console.log("%%%%%%%%%%%%%%%%%%");
            //console.log(ts.tabla.values());
            //console.log("%%%%%%%%%%%%%%%%%%");
            let indice = 0;
            for (let sim of ts.tabla.values()) {
                //console.log(ts.tabla.keys().next().value);

                cuerpo += "<tr class=\"grey lighten-1 black-text\"><th scope=\"row\">" + this.getRol(sim) + 
                    "</th><td>" + sim.identificador +
                    "</td><td>" + this.getTipo(sim) + "</td>";
                
                if(this.getRol(sim) == "metodo") {
                    cuerpo += "</td><td>---";
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
                        cuerpo += "</td><td>" + variable;
                    } else {
                        cuerpo += "</td><td>" + this.getValor(sim);
                    }
                }
                cuerpo += "</td><td>" + this.parametros(sim) + "</td>" + "</tr>";
                indice++;
            }
            ts = ts.sig;
        }
        cuerpo += "</thead>";
        return cuerpo;
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