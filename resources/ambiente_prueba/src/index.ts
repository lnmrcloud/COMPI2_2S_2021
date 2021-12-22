//import * as parser from 'parser';
//import Controlador from './Controlador';
//import { TablaSimbolos } from './TablaSimbolos/TablaSimbolos';
import * as analizar from './Analizar';
import Errores from './Ast/Errores';
import * as d3Graphviz from 'd3-graphviz';
//import { graphviz } from "d3-graphviz";


const compileBtn = document.getElementById('compilar');

compileBtn?.addEventListener('click', () => {
  
  const code: string = 'int x = 0';
  // var texto: string = "int x = 0;";
  var texto: string = (<HTMLInputElement>document.getElementById('Txt_Entrada')).value;
  var consola = "";
  var consolaTraduccion = "";
  var consolaGraficarTS = "";
  listaErrores: Array<Errores>();

  try {
    let ana = new analizar.Analizador();
    consola = "";
    consolaTraduccion = "";
    consolaGraficarTS = "";

    if (texto != "") {

      let ejecutar = ana.ejecutar(texto);
      console.log("SI SALIO DE EJECUCION EN ANALIZAR");
      consola = ejecutar.consola;
      consolaTraduccion = ejecutar.traduccion;
      consolaGraficarTS = ejecutar.graficarTs;
      console.log("------Consola------");
      console.log(consola);
      (<HTMLInputElement>document.getElementById('Txt_Salida')).value = consola;
      (<HTMLInputElement>document.getElementById('Txt_Traduccion')).value = consolaTraduccion;
      (<HTMLInputElement>document.getElementById('Txt_GraficarTS')).value = consolaGraficarTS;
      console.log("------Consola------");
      //TABLA DE SIMBOLOS
      document.getElementById('tablaSimbolos').innerHTML = ejecutar.ts;
      //document.getElementById("tablaSimbolos").innerHTML = ejecutar.ts;
      console.log("^^^^^^^^^^^^^^^^ERRORES^^^^^^^^^^^^^^^^^^");
      //TABLA DE ERRORES
      let cuerpoErrores = graficarErrores(ejecutar.erroresLexSin, ejecutar.errores);
      document.getElementById('tablaErrores').innerHTML = cuerpoErrores;
      console.log("^^^^^^^^^^^^^^^^ERRORES^^^^^^^^^^^^^^^^^^");

    }
  } catch {
    console.log("Error al analizar [index.ts]");
  }
  //Se inicia la recoleccion de datos para graficar el arbol AST
  //recorrerATS(texto);
})


function recorrerATS(texto: string) {
  try {
    let ana = new analizar.Analizador();
    if (texto != "") {
      console.log("##################################");
      console.log("######## VAMOS A GRAFICAR ########");
      console.log("##################################");
      let nodo_ast = ana.recorrer(texto);
      //console.log("nodo ast");
      //console.log(nodo_ast);
      let grafo = nodo_ast.graficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
      //console.log("Aca se muestra el codigo del grafo de graphviz");
      console.log(grafo);
      //d3Graphviz.graphviz("#graph").renderDot(grafo);
      //graphviz("#graph").renderDot('digraph  {a -> b}');
      //graphviz("#graph").renderDot(grafo);
    }
  } catch (error) {
    console.log("Error al recorrer [index.ts]");
  }
}

function graficarErrores(lexicoSintactico, semantico){
  var cuerpohtml = "<thead class=\"thead-light\"><tr><th scope=\"col\">TIPO</th><th scope=\"col\">DESCRIPCION</th><th scope=\"col\">LINEA</th><th scope=\"col\">COLUMNA</th></tr>";
  cuerpohtml += "<tr class=\"grey lighten-1 black-text\">";
  //PROCEDEMOS CON LOS ERRORES LEXICOS Y SINTACTICO
  for(let errorcito of lexicoSintactico){
    let dato = errorcito as Errores;
    cuerpohtml += "<th scope=\"row\">" + dato.tipo + "</th>" +
                  "<td>" + dato.descripcion + "</th>" +
                  "<td>" + dato.linea + "</th>" +
                  "<td>" + dato.columna + "</th></td>";
  }

  for(let errorcito of semantico){
    let dato = errorcito as Errores;
    cuerpohtml += "<th scope=\"row\">" + dato.tipo + "</th>" +
                  "<td>" + dato.descripcion + "</th>" +
                  "<td>" + dato.linea + "</th>" +
                  "<td>" + dato.columna + "</th></td>";
  }
  cuerpohtml += "</tr></thead>";

  //PROCEDEMOS CON LOS ERRORES SEMANTICOS
  return cuerpohtml;
}

export default {}
