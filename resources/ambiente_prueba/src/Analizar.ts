import * as sintactico_interprete from './parser/index.js';
import Controlador from './Controlador';
import { TablaSimbolos } from './TablaSimbolos/TablaSimbolos';

export class Analizador {

    public ejecutar(input): any {
        console.log("SE INICIA EL ANALISIS DE LA ENTRADA");

        try {
            //let salida = sintactico.parse(input);
            console.log("----------- 0 -----------");
            let ast = sintactico_interprete.parse(input);
            let erroresLexSin = sintactico_interprete.listaErrores();
            //console.log(erroresLexSin);
            sintactico_interprete.LimpiarListas();
            console.log("----------- 0.1 -----------");
            let controlador = new Controlador();
            let ts_global = new TablaSimbolos(null, null);
            console.log("----------- 1 -----------");
            ast.ejecutar(controlador, ts_global);
            let controlador3D = new Controlador();
            let ts_global3D = new TablaSimbolos(null, null);
            //ast.traducir(controlador3D, ts_global3D);
            console.log("----------- 2 -----------");
            //console.log(ts_global);
            //let ts_html = "";
            let ts_html = controlador.graficar_ts(controlador, ts_global);
            console.log("----------- 3 -----------");
            
            let retorno = {"errores": controlador.errores, "erroresLexSin": erroresLexSin, "ts": ts_html, "consola": controlador.consola, "traduccion": controlador3D.consolaTraduccion, "graficarTs": controlador.consolaGraficarTs}
            console.log("----------- 4 -----------");
            return retorno;
        } catch (error) {
            console.log("Ocurrio un error al analizar [Analizar.ts]");
            //return "Ocurrio un error al analizar";
        }
    }

    public recorrer(input){
        try {
            let ast = sintactico_interprete.parse(input);
            console.log(ast);
            let nodo_ast = ast.recorrer();
            console.log(nodo_ast);

            return nodo_ast;
        } catch (error) {
            console.log("Error al recorrer [Analizar.ts]");
        }
    }
}