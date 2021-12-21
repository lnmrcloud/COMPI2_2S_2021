"use strict";
exports.__esModule = true;
exports.Asignacion = void 0;
var Asignacion = /** @class */ (function () {
    function Asignacion(identificador, exp, linea, columna) {
        this.identificador = identificador;
        this.linea = linea;
        this.columna = columna;
        this.expresion = exp;
    }
    Asignacion.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Asignacion.prototype.ejecutar = function (ent, arbol) {
        console.log("Entre en ejecutar ASIGNACION");
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            if (simbolo.getTipo(ent, arbol) === this.expresion.getTipo(ent, arbol)) {
                var valor = this.expresion.getValorImplicito(ent, arbol);
                simbolo.valor = valor;
                ent.reemplazar(this.identificador, simbolo);
            }
            else {
                console.error("error semantico, no valor de tipo difente al declarado");
            }
        }
        else {
            console.error("error semantico no existe variable", this.linea, "columna", this.columna);
        }
    };
    return Asignacion;
}());
exports.Asignacion = Asignacion;
