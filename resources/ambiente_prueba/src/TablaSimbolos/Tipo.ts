export enum tipo {
    ENTERO,
    DOBLE,
    BOOLEANO,
    CARACTER,
    CADENA,
    VOID,
    MAIN
}
/**
 * @class Esta clase sirve para llevar el control de los tipos de los simbolos del lenguaje
 */
export default class Tipo {

    public type: tipo;
    public stype: string;

    constructor(stype: string) {
        this.stype = stype;
        this.type = this.getTipo(stype);
    }

    getTipo(stype: string): tipo {
        if (stype == 'INT') {
            return tipo.ENTERO;
        } else if (stype == 'DOUBLE') {
            return tipo.DOBLE;
        } else if (stype == 'BOOLEAN') {
            return tipo.BOOLEANO;
        } else if (stype == 'CHAR') {
            return tipo.CARACTER;
        } else if (stype == 'STRING') {
            return tipo.CADENA;
        } else if (stype == 'VOID') {
            return tipo.VOID;
        } else if (stype == 'MAIN') {
            return tipo.MAIN;
        }
    }

    getStype(): string {
        return this.stype;
    }
}