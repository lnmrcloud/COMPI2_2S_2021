let consola_resultado ="";

function interpretar(){
    
    const content = entrada.getValue();
    const ast = gramatica.parse(content);    
    const entornoGlobal = new Entorno(null);

    salida.setValue(""); // LIMPIAMOS CONSOLA

    const noMain = ast.ejecutarMain();

    if(noMain == null){
        console.log("no existe main");
    }else {
        ast.funciones[noMain].ejecutar(entornoGlobal,ast);
    }

    ast.instrucciones.forEach((element) => {
        element.ejecutar(entornoGlobal,ast);
    })

    salida.setValue(consola_resultado);

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