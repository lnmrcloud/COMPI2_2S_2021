import Simbolos from "./Simbolos";

export class TablaSimbolos {

    public ant: TablaSimbolos;
    public tabla: Map<string, Simbolos>;
    public sig: TablaSimbolos;

    /**
     * @constructor creamos una nueva tabla
     * @param ant indica quien es la tabla anterior a la nueva tabla (para el manejo de ambitos)
     */
    constructor(ant: TablaSimbolos, sig: TablaSimbolos) {
        this.ant = ant;
        this.tabla = new Map<string, Simbolos>();
        this.sig = sig;
    }

    /**
     * @function agregar Metodo que agrega datos a la tabla de simbolos
     * @param id Recibe el nombre de la variable
     * @param simbolo Obtiene los datos de tipo Simbolos
     */
    agregar(id: string, simbolo: Simbolos) {
        this.tabla.set(id/*.toLowerCase()*/, simbolo); //Se convierte a minuscula para evitar distincion, ya que el lenguaje es case insensitive
    }

    /**
     * @function existe Metodo que valida si la variable o funcion ya existe en la tabla (globalmente)
     * @param id Recibe el nombre de la variable
     */
    existe(id: string): boolean {
        let ts: TablaSimbolos = this;

        //Verifica si existe la variable
        while (ts != null) {
            let yaExiste = ts.tabla.get(id);

            if (yaExiste != null) {
                return true;
            }
            ts = ts.ant; //Podemos hace el cambio de local a global para buscar [ts.ant es la tabla global]
        }
        return false; //Si no existe aun, retorna false
    }

    /**
     * @function existeEnActual Metodo que se encarga de ver si existe en Actual (localmente)
     * @param id Recibe el nombre de la variable
     */
    existeEnActual(id: string): boolean {
        let ts: TablaSimbolos = this;

        let yaExiste = ts.tabla.get(id);

        if (yaExiste != null) {
            return true;
        }
        return false;
    }

    /**
     * @function getSimbolo Metodo que sirve para obtener el simbolo (ya existente)
     * @param id Recibe el nombre de la variable
     */
    getSimbolo(id: string) {
        let ts: TablaSimbolos = this;

        while (ts != null) {
            let yaExiste = ts.tabla.get(id);

            if (yaExiste != null) {
                return yaExiste;
            }
            ts = ts.ant;
        }
        return null;
    }

}