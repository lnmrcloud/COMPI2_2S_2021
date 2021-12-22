import Tipo from "./Tipo";
import Datos3D from "./Datos3D";

/**
 * @class Esta clase define los simbolos del lenguaje que seran variables o funciones/metodos
 */
export default class Simbolos {

    public simbolo: number; //1 = variable, 2 = funcion, 3 = metodo
    //Simbolo Variable [int x = 0;]
    public tipo: Tipo;                  //int
    public identificador: string;       //x
    public valor: any;                  //0

    //Simbolo funcion/metodo
    public lista_params: Array<Simbolos>;
    public metodo: boolean;
    public datos3D: Datos3D;

    constructor(simbolo: number, tipo: Tipo, identificador: string, valor: any, lista_params?, metodo?){
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.lista_params = lista_params;
        this.metodo = metodo;
        this.datos3D = this.construir3D();
    }

    construir3D(): Datos3D{
        //console.log("aslkfja lsflasd;jf alkdjf");
        //console.log(this);
        //let cadena = String(this.valor);
        let traducido = new Datos3D(null, null, null);

        return traducido;
    }

    setValor(valor): void {
        this.valor = valor;
    }

    //TODO: Agregar metodos set y get
}