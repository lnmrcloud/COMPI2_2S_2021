"use strict";
exports.__esModule = true;
exports.Declaracion = void 0;
var Simbolo_1 = require("../AST/Simbolo");
var Tipo_1 = require("../AST/Tipo");
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
    Declaracion.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Declaracion.prototype.ejecutar = function (ent, arbol) {
        var _this = this;
        this.identificadores.forEach(function (id) {
            if (!ent.existe(id)) {
                if (_this.expresion !== null) {
                    if (_this.tipo === _this.expresion.getTipo(ent, arbol)) {
                        var valor = _this.expresion.getValorImplicito(ent, arbol);
                        var simbolo = new Simbolo_1.Simbolo(_this.tipo, id, _this.linea, _this.columna, valor);
                        ent.agregar(id, simbolo);
                    }
                    else {
                        console.error("valor de tipo difente al declarado");
                    }
                }
                else {
                    var simbolo = new Simbolo_1.Simbolo(_this.tipo, id, _this.linea, _this.columna, _this.getValorDefault());
                    ent.agregar(id, simbolo);
                }
            }
            else {
                console.error("error semantico", _this.linea, "columna", _this.columna);
            }
        });
    };
    Declaracion.prototype.getValorDefault = function () {
        if (this.tipo === Tipo_1.Tipo.INT)
            return 0;
        else if (this.tipo === Tipo_1.Tipo.DOUBLE)
            return 0.0;
        else if (this.tipo === Tipo_1.Tipo.BOOL)
            return false;
        else if (this.tipo === Tipo_1.Tipo.STRING)
            return "";
        else if (this.tipo === Tipo_1.Tipo.CHAR)
            return "";
        else
            return null;
    };
    return Declaracion;
}());
exports.Declaracion = Declaracion;