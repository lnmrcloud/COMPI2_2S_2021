let consola_resultado ="";
document.getElementById('errores').innerHTML = "";

var indice = 0;
var ambitos = [];
var hayError = false;
var tablaSimbolos;

function interpretar(){

    const content = entrada.getValue();
    const ast = gramatica.parse(content);    
    const entornoGlobal = new Entorno(null);

    salida.setValue(""); // LIMPIAMOS CONSOLA

    const noMain = ast.ejecutarMain();

    if(noMain == null){
        //console.log("no existe main");
    }else {
        ast.funciones[noMain].ejecutar(entornoGlobal,ast);
    }

    if(ast.instrucciones!=null){
        ast.instrucciones.forEach((element) => {
            element.ejecutar(entornoGlobal,ast);
    })
    }else{
        
    }

    salida.setValue(consola_resultado);

}

function mostrarGramatical(result){

    document.getElementById("gramatical_txt").innerHTML = result;
}

function mostrarErrores(){

    document.getElementById('errores').style.display = "block";
    const tablaErrores = ReporteErrores.getInstance().getErrores();

    let html = `<h4>Tabla de Errores</h4>
    <table border=1 align="center" id="tablaSimbolos" style="width:100%">
    <thead>
    <tr bgcolor=darkred>
    <th style="color:white">Tipo</th>
    <th style="color:white"> Descripcion</th>
    <th style="color:white">Fila</th>
    <th style="color:white">Columna</th>
    </tr>
    </thead>
    <tbody>
    `;
    console.log(tablaErrores);
    var i = 0;
    for (i = 0; i < tablaErrores.length; i++) {
        let simbolo = tablaErrores[i];
        html += `<tr>
                <td>${simbolo.tipo}</td>
                <td>${simbolo.descripcion}</td>
                <td>${simbolo.linea}</td>
                <td>${simbolo.columna}</td>
                </tr>`
            }
    

    html += `</tbody>
    </table> </br></br><hr>`;

    document.getElementById('errores').innerHTML = html;
    
    
}

function reporte_gramatical(){
    const content = entrada.getValue();
    var result = gramatical_asc.parse(content);
    console.log("reporte gramatical: \n" + result);
    mostrarGramatical(result);
}

function graficar(){
    const content = entrada.getValue();
    var result = ast_ascend.parse(content);
    generateTree([result.node]);

}

function newNode(yy, state, ...nodes) {
    const parent = getNonTerminal(yy, state);
    const children = [];
    for (let node of nodes) {
        node.parent = node.parent ? node.parent : parent;
        if (node.parent == parent) {
            children.push(node);
        } else if (typeof node == 'string') {
            children.push({
                name: node,
                parent,
                children: []
            });
        } else {
            children.push({
                name: node.parent,
                parent,
                children: [node]
            });
        }
    }

    return {
        name: parent,
        parent: null,
        children
    }

    function getNonTerminal(yy, state) {
        const simbolos = yy.parser.symbols_;
        const produccion = yy.parser.productions_[state];
        let nonTerminal = '';
        for (let sim in simbolos) {
            if (simbolos[sim] === produccion[0]) {
                nonTerminal = sim;
                break;
            }
        }
        return nonTerminal;
    }
}

function agrupar_consola_sin_salto(resultado_print){
    consola_resultado = consola_resultado + resultado_print;
}

function agrupar_consola_con_salto(resultado_print){
    consola_resultado = consola_resultado + '\n' + resultado_print;
}

function agregar_a_tablasimbolos(simbolo){
    console.log("en agregar tipo:" + simbolo.tipo + "id:" + simbolo.indentificador + "linea:" + simbolo.linea + "columna:" + simbolo.columna + "valor:" + simbolo.valor);
    this.tablasimbolos.setVariable(simbolo);
}

function contar_simbolos(){
    var cadena_ts = this.tablasimbolos.generarTs();
    console.log(cadena_ts);
}

function traduccion(){
    this.tablasimbolos = new Tabla();
    const content = entrada.getValue();
    const ast = gramatica.parse(content);    
    const entornoGlobal = new Entorno(null);

    salida.setValue(""); // LIMPIAMOS CONSOLA

    const noMain = ast.ejecutarMain();

    if(noMain == null){
        //console.log("no existe main");
    }else {
        ast.funciones[noMain].ejecutar(entornoGlobal,ast);
    }

    if(ast.instrucciones!=null){
        ast.instrucciones.forEach((element) => {
            element.ejecutar(entornoGlobal,ast);
    })
    }else{
        
    }

    salida.setValue(consola_resultado);

    // fin de interpretar 
    // inicia el traducir 

    this.tablasimbolos.TamAmbitoActual.push(0);
    let globales = 0;

    ast.instrucciones.map(i => {
        if(i instanceof Declaracion){
           //console.log("hola entre a declaraciones 3d");
            i.posicion = this.tablasimbolos.getHeap();
            globales++;
        }

    });

    let codigo3d = "";
    codigo3d = "#include <stdio.h>\n#include <math.h>\n\ndouble heap[16384];\ndouble stack[16394];\ndouble p;\ndouble h;\n\n"

    //Declarar aqui todos los temporales se imprimen todos en la misma linea
    for(let i = 0; i< this.tablasimbolos.TemporalesDeclarar.length; i++){
        let a = this.tablasimbolos.TemporalesDeclarar[i];
        let ultimo = this.tablasimbolos.TemporalesDeclarar.length - 1;

        if(i == 0 && i < ultimo){
            codigo3d += `double ${a}, `;
        }
        if(i == 0 && i == ultimo){
            codigo3d += `double ${a};`;
        }
        if(i > 0 && i < ultimo){
         codigo3d += `${a}, `;
        }
        if(i > 0 && i == ultimo){
         codigo3d += `${a};\n`;
        }
     }

     ast.instrucciones.map(i => {
        if(i instanceof Declaracion){
            codigo3d += i.traducir(this.tablasimbolos);
            globales++;
        }

    });

    ast.instrucciones.map(i => {
        if(i instanceof Asignacion){
            codigo3d += i.traducir(this.tablasimbolos);
            globales++;
        }
    });

    codigo3d += `\n`;
    this.tablasimbolos.Temporal = 0;
    this.tablasimbolos.Etiqueta = 0;
    this.tablasimbolos.inicioArregloGlobal = [];
    this.tablasimbolos.TemporalesDeclarar = [];

    consola_traduccion.setValue(codigo3d);
    contar_simbolos();
}