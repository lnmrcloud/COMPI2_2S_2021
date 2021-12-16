"use strict";
exports.__esModule = true;
exports.AccesoName = void 0;
var Tipo_1 = require("../AST/Tipo");
var AccesoName = /** @class */ (function () {
    function AccesoName(identificador, linea, columna) {
        this.linea = linea;
        this.columna = columna;
        this.identificador = identificador;
    }
    AccesoName.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    AccesoName.prototype.getTipo = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            return simbolo.getTipo(ent, arbol);
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
        return Tipo_1.Tipo.NULL;
    };
    AccesoName.prototype.getValorImplicito = function (ent, arbol) {
        if (ent.existe(this.identificador)) {
            var simbolo = ent.getSimbolo(this.identificador);
            return simbolo.valor;
        }
        else {
            console.error("error semantico no existe la variable", this.linea, "columna", this.columna);
        }
    };
    return AccesoName;
}());
exports.AccesoName = AccesoName;
