class Tabla {
    constructor(){
        this.TablaVariables = [];
        this.TablaFunciones = [];
        this.Temporal = 0;
        this.Etiqueta = 0;
        this.Heap = 0;
        this.Stack = 0;
        this.ListaTemporales = [];
        this.TemporalesDeclarar = [];
        this.Ambito = false;
        this.ListaReturn = [];
        this.ListaLlamadas = [];
        this.TamAmbitoActual = [];
        this.inicioArregloGlobal = [];
        this.infoArreglos = [];
    }

    //Insertar un nuevo simbolo a la tabla de variables
    setVariable(simbolo){
        for(let elemento of this.TablaVariables){
            if(elemento.Identificador == simbolo.Identificador){
                //console.log(`La variable ${simbolo.identificador} ya existe.`);
                return `La variable ${simbolo.identificador} ya existe.`
            }
        }
        console.log("tipo:" + simbolo.tipo + "id:" + simbolo.indentificador + "linea:" + simbolo.linea + "columna:" + simbolo.columna + "valor:" + simbolo.valor);
        this.TablaVariables.push(simbolo);
        return null;
    }

    //Obtener una variable por su ID
    getVariable(id){
        for(let elemento of this.TablaVariables){
            if(elemento.identificadores == id){
                return elemento
            }
        }
        //console.log("elemento dif");
        return null;
    }

    //Almacenar una nueva funcion en la tabla de funciones
    setFuncion(simbolo){
        for(let elemento of this.TablaFunciones){
            if(elemento.Identificador == simbolo.Identificador){
                return `La funcion ${simbolo.Identificador} ya existe.`
            }
        }
        this.TablaFunciones.push(simbolo);
    }

    //Obtener una funcion por su ID
    getFuncion(id){
        for(let elemento of this.TablaFunciones){
            if(elemento.Identificador == id){
                return elemento;
            }
        }
        return null;
    }

    //Generar un nuevo temporal
    getTemporal(){
        let t = "t" + ++this.Temporal;
        this.TemporalesDeclarar.push(t);
        return t;
    }

    //Obtener el ultimo temporal generado
    getTemporalActual(){
        return "t" + this.Temporal;
    }

    //Generar una nueva etiqueta
    getEtiqueta(){
        return "L" + ++this.Etiqueta;
    }

    //Obtiene la ultima etiqueta generada
    getEtiquetaActual(){
        return "L" + this.Etiqueta;
    }

    //Para incrementar el valor del atributo heap
    getHeap(){
        return this.Heap++;
    }

    //Para incrementar el valor del atributo stack
    getStack(){
        return this.Stack++;
    }

    //Cambia el valor del atributo stack
    setStack(valor){
        this.Stack = valor;
    }

    //Agregar temporal no usado
    AgregarTemporalNoUsado(temporal){
        if(this.ListaTemporales.indexOf(temporal) == -1){
            this.ListaTemporales.push(temporal);
        }
    }

    QuitarTemporalNoUsado(temporal){
        let indice = this.ListaTemporales.indexOf(temporal);
        if(indice >-1){
            this.ListaTemporales.splice(indice, 1);
        }
    }

    recorrerListaInicioArreglo(){
        for(let a of this.inicioArregloGlobal){
            console.log(a);
        }
        console.log("fin");
    }


    recorrerListaInfoArreglo(){
        for(let a of this.infoArreglos){
            console.log(a);
        }
    }

    generarTs() {
        let html = `<h4>Tabla de Simbolos</h4>
        <table id="tablaSimbolos" style="width:100%">
        <thead>
        <tr>
        <th>Tipo</th>
        <th>Id</th>
        <th>Valor</th>
        <th>linea</th>
        <th>columna</th>
        </tr>
        </thead>
        <tbody>
        `;
        for (let Simbolo of this.TablaVariables) {
            html += `<tr>
                    <td>${Simbolo.indentificador}</td>
                    <td>${Simbolo.tipo}</td>
                    <td>${Simbolo.valor}</td>
                    <td>${Simbolo.linea}</td>
                    <td>${Simbolo.columna}</td>
                    </tr>`
                }
        html += `</tbody>
    </table>`;
        return html;
    }

}