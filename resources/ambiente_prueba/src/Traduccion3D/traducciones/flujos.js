
// traduccion de sentencia if
function sentenciaIF(etiquetas,expresion,instrucciones){
    let concatenacion = ''; 
    let etiquetaSiguiente = 0;
    let etiquetaSalida = 0 ;
    let operacion1 = '';
    let operacion2 = '';

    etiquetaSiguiente = etiquetas + 1;
    etiquetaSalida = etiquetas + 2;
    
    if(expresion.length == 3){

        operacion1 = expresion[1];
        operacion2 = expresion[2];

        concatenacion += operacion1;
        concatenacion += `  \n`;
        concatenacion += operacion2;
        concatenacion += `  \n`;
        concatenacion += `  if ( ${expresion[0]} ) goto L${etiquetas};\n`;
        concatenacion += `  goto L${etiquetaSiguiente}; \n`;

        // si se cumple la condicion
        concatenacion += `  L${etiquetas}: \n`;
        // codigo que se tiene que realizar 
        concatenacion += `  ${instrucciones} \n`;
        // salida del if
        concatenacion += `  goto L${etiquetaSalida}; \n`;


        // si no se cumple la condicion
        concatenacion += `  L${etiquetaSiguiente}: \n`;
        // codigo que tiene que realizar 
        // salida del else


        // etiqueta de salida
        concatenacion += `  L${etiquetaSalida}: \n`;

        etiquetas = etiquetas + 3;

        return [etiquetas,concatenacion];

    }else if(expresion.length == 2){

        operacion1 = expresion[1];
        // console.log(expresion[0]);
        // console.log(operacion1);

        concatenacion += operacion1;
        concatenacion += `  \n`;
        concatenacion += `  if ( ${expresion[0]} ) goto L${etiquetas};\n`;
        concatenacion += `  goto L${etiquetaSiguiente}; \n`;

        // si se cumple la condicion
        concatenacion += `  L${etiquetas}: \n`;
        // codigo que se tiene que realizar 
        concatenacion += `  ${instrucciones} \n`;
        // salida del if
        concatenacion += `  goto L${etiquetaSalida}; \n`;


        // si no se cumple la condicion
        concatenacion += `  L${etiquetaSiguiente}: \n`;
        // codigo que tiene que realizar 
        // salida del else


        // etiqueta de salida
        concatenacion += `  L${etiquetaSalida}: \n`;

        etiquetas = etiquetas + 3;

        return [etiquetas,concatenacion];



    } else if(expresion.length == 1){
        concatenacion += `  if ( ${expresion} ) goto L${etiquetas};\n`;
        concatenacion += `  goto L${etiquetaSiguiente}; \n`;

        // si se cumple la condicion
        concatenacion += `  L${etiquetas}: \n`;
        // codigo que se tiene que realizar 
        concatenacion += `  ${instrucciones} \n`;
        // salida del if
        concatenacion += `  goto L${etiquetaSalida}; \n`;


        // si no se cumple la condicion
        concatenacion += `  L${etiquetaSiguiente}: \n`;
        // codigo que tiene que realizar 
        // salida del else


        // etiqueta de salida
        concatenacion += `  L${etiquetaSalida}: \n`;

        etiquetas = etiquetas + 3;

        return [etiquetas,concatenacion];
    }
}




function pruebaIF(cadena,instrucciones,etiquetas){
    console.log(instrucciones);
    let concatenacion = '';
    let etiquetaAnteriro = 0; //

    etiquetaAnteriro = etiquetas - 1;

    concatenacion += cadena;
    concatenacion += `\n`;
    concatenacion += `  L${etiquetaAnteriro}:\n`;
    concatenacion += instrucciones;
    concatenacion += `  L${etiquetas}:\n`;

    return [concatenacion];
}


function ifelse(etiquetas,elementos,instruccion1,instruccion2){
    let concatenacion = '';
    let salidas = [];

    console.log(elementos);

    concatenacion += elementos[0];
    // concatenacion += `  L${elementos[1]}:\n`;
    concatenacion += instruccion1;  

    concatenacion += `\n`;
    concatenacion += `  goto L${etiquetas};\n`;
    

    // etiquetas de salida
    salidas = elementos[2];
    concatenacion += `\n`;
    for(let i=0; i < salidas.length; i++){
        concatenacion += ` L${salidas[i]}: \n`;
    }
    concatenacion += instruccion2;
    concatenacion += `  L${etiquetas}:\n`;
    etiquetas++;

    return [etiquetas,concatenacion];
}