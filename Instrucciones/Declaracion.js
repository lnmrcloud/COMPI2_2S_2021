"use strict";
exports.__esModule = true;
exports.Declaracion = void 0;
// print("hola mundo");
var Declaracion = /** @class */ (function () {
    // meter listado de print print(a,b)
    function Declaracion(identificadores, tipo, linea, columna, exp) {
        if (exp === void 0) { exp = null; }
        this.identificadores = identificadores;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }
    Declaracion.prototype.traducir = function (tablasimbolos) {
        let codigo = "";
        if(this.expresion==null){
            return codigo;
        }
       
        let variable = tablasimbolos.getVariable(this.identificadores);
        //console.log(variable);

        if(variable != null && this.expresion != ""){

            console.log("Entre a expresion en declaracion para traducir valor");

            let valor3D = this.expresion.getC3D(tablasimbolos);
            codigo += valor3D;

            if(!tablasimbolos.ambito){
                codigo += `heap[${variable.Direccion}] = ${tablasimbolos.getTemporalActual()};\n\n`;
            }else{
                let tempActual = tablasimbolos.getTemporalActual();
                let tempNuevo = tablasimbolos.getTemporal();
                codigo += `${tempNuevo} = p;\n`;
                codigo += `${tempNuevo} = ${tempNuevo} + ${variable.Direccion};\n`;
                codigo += `stack[(int)${tempNuevo}] = ${tempActual};\n\n`;
            }
            tablasimbolos.QuitarTemporalNoUsado(tablasimbolos.getTemporal);
        }
        return codigo;
    };
    Declaracion.prototype.ejecutar = function (ent, arbol) {
        //console.log("Entre en ejecutar DECLARACION");
        var _this = this;

        this.identificadores.forEach(function (id) {
            if (!ent.existe(id)) {
                if (_this.expresion !== null) {
                    if (_this.tipo === _this.expresion.getTipo(ent, arbol)) {
                        var valor = _this.expresion.getValorImplicito(ent, arbol);
                        let simbolo = new Simbolo(_this.tipo, id, _this.linea, _this.columna, valor);
                        //console.log("tipo:" + _this.tipo + "id:" + id + "linea:" + _this.linea + "columna:" + _this.columna + "valor:" + valor);
                        //console.log("tipo:" + simbolo.tipo + "id:" + simbolo.indentificador + "linea:" + simbolo.linea + "columna:" + simbolo.columna + "valor:" + simbolo.valor);
                        agregar_a_tablasimbolos(simbolo);
                        ent.agregar(id, simbolo);
                    }
                    else {
                        console.error("valor de tipo difente al declarado");
                    }
                }
                else {
                    let simbolo = new Simbolo(_this.tipo, id, _this.linea, _this.columna, _this.getValorDefault());
                    agregar_a_tablasimbolos(simbolo);
                    ent.agregar(id, simbolo);
                }
            }
            else {
                console.error("error semantico", _this.linea, "columna", _this.columna);
            }
        });
    }
    ;
    Declaracion.prototype.getValorDefault = function () {
        if (this.tipo === Tipo.INT)
            return 0;
        else if (this.tipo === Tipo.DOUBLE)
            return 0.0;
        else if (this.tipo === Tipo.BOOL)
            return false;
        else if (this.tipo === Tipo.STRING)
            return "";
        else if (this.tipo === Tipo.CHAR)
            return "";
        else
            return null;
    };
    return Declaracion;
}());
exports.Declaracion = Declaracion;