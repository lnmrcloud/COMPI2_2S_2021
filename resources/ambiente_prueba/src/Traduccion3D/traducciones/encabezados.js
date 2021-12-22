// 'use strict'

function principal(contendio,contador){

    let consola = '';
    // var consola = '';
    consola += '/*------HEADER------*/\n';
    consola += '#include <stdio.h> //Importar para el uso de Printf\n';
    consola += '#include <math.h> \n';
    consola += '\n';
    consola += 'float heap[16384]; //Estructura para heap\n'; 
    consola += 'float stack[16394]; //Estructura para stack\n'; 
    consola += 'float P; //Puntero P\n'; 
    consola += 'float H; //Puntero H\n';
    // declaracon de los contador;

    consola += 'float t0,t1,t2,t3,t4'

    // console.log(contador);
    // agregacion de temporales si existirion a lo largo de la ejecucion
    if(contador > 5 ){
        consola += ',';
        for (let temporales = 5; temporales <= contador; temporales++){
            consola += `t${temporales}`;
            if(temporales < contador){
                consola += `,`;
            }
        }                
    }    
    consola += ';\n';


    // funcion nativa en c para imprimr palabras string
    consola += `
    /*------NATIVES------*/
    void printString(){

        /*------(tamanio del arreglo)------*/
        t1 = t0;

        /*------(inicio del arreglo)------*/
        t3 = heap[(int)t2];

        /*------(contador del for)------*/
        t4 = 0;
        IMPRIMIR:
        if(t4 == t1) goto FINIMPRIMIR;

        printf("%c",(char)t3);
        
        t2 = t2 + 1;
        t3 = heap[(int)t2];

        t4 = t4 + 1;

        goto IMPRIMIR;


        FINIMPRIMIR:
        return;
        }
    `;
    // declaracion dela funcion printNativa en c

    consola += '\n';
    consola += 'void main(){\n';
    consola += '\n';
    consola += '    P = 0;\n';
    consola += '    H = 0;\n';
    consola += '\n'

    consola += `${contendio}`;

    consola += '\n';
    consola += '    return;\n';
    consola += '}';

    return consola;
}
