"use strict";
exports.__esModule = true;
exports.Print = void 0;
// print("hola mundo");
var Print = /** @class */ (function () {
    // meter listado de print print(a,b)
    function Print(exp, linea, columna, saltoLinea) {
        if (saltoLinea === void 0) { saltoLinea = false; }
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
        this.salto = saltoLinea;
    }
    Print.prototype.traducir = function (ent, arbol) {
        throw new Error("Method not implemented.");
    };
    Print.prototype.ejecutar = function (ent, arbol) {
        var valor = this.expresion.getValorImplicito(ent, arbol);
        var actual;
        var inputValue = document.getElementById("console").value;
        //actual = document.getElementById("txtSalida").value;
        if (valor !== null) {
            if (!this.salto) {

                agrupar_consola_sin_salto(valor);

                //document.getElementById("console").value = inputValue + '\n' + valor;
                console.log('>', valor);
            }
            else
                document.getElementById("console").value = inputValue + ' ' + valor;
        }
        else {
            document.getElementById("console").value = "Error, no se pueden imprimir valores nulos";
            console.log('>> Error, no se pueden imprimir valores nulos');
        }
    };
    return Print;
}());
exports.Print = Print;
