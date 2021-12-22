// expresiones aritmeticas para realizar validaciones


//  expresion regular para numeros decimales
var expresionEnteros = /^\d+$/;
//  expresion regular para numeros decimales
var expresionDecimal = /^\d+\.\d+$/;
// expresion regular para identifiadores
var expresionIdentificador = /[a-zñA-ZÑ_][a-zA-Z0-9Ññ_]*/;
// expresion regular para identificar un strings
var expresionString = /[\"][^\\\"]*([\\][\\\"ntr][^\\\"]*)*[\"]/;
var variableString = /[^\\\"]*([\\][\\\"ntr][^\\\"]*)*/;


// funcion para realizar los print y PRINTLN
function impresion(punteroStack,contador,valor,variables){

    let concatenacion = '';

    // imprime numeros enteros
    if(typeof valor === 'number'){
        concatenacion += `  /*------IMPRESION INT------*/\n`;
        concatenacion += `  printf("%f",(float)${valor});\n`;
        return [punteroStack,contador,concatenacion];
    }

    if(expresionString.test(valor)){
        let palabra = valor.substr(1,valor.length-2);
        let tamanioPalabra = palabra.length;

        
        concatenacion += `  /*------IMPRESION DE UN STRING------*/\n`;           
        concatenacion += `  stack[(int)P] = H;\n`;
        concatenacion += `  P = P + 1;\n`
        punteroStack++;
        concatenacion += `  heap[(int)H] = ${tamanioPalabra};\n`;
        concatenacion += `  H = H + 1;\n`;
        concatenacion += `  \n`;
        // guardo en t0 el tamanio del arreglo 
        concatenacion += `  t0 = ${tamanioPalabra};\n`;
        concatenacion += `  \n`;
        // guardo en t2 el inicio del arreglo
        concatenacion += `  t2 = H;\n`;
        concatenacion += `  \n`;
        // ciclo for para guarda los carcters del string en codigo ascii
        for(let i = 0; i < palabra.length; i++){
            concatenacion += `  heap[(int)H] = ${palabra.charCodeAt(i)};\n`;
            concatenacion += `  H = H + 1;\n`;
        }

        concatenacion += `  \n`;
        concatenacion += `  printString();\n`;
        concatenacion += `  \n`;
        return [punteroStack,contador,concatenacion];


    } else if( expresionDecimal.test(valor)){
        concatenacion += `  /*------IMPRESION DECIMAL------*/\n`;
        concatenacion += `  printf("%f",(float)${valor});\n`;
        concatenacion += `  \n`;
        return [punteroStack,contador,concatenacion];


    } else if(expresionIdentificador.test(valor)){

        // para encontra la variable en la tabla
        for(let i = 0; i<variables.length; i++){

            // impresion de variables de tipo entero                
            if(variables[i].id === valor && expresionEnteros.test(variables[i].value)) {
                console.log(expresionEnteros.test(variables[i].value));
                concatenacion += `  /*------IMPRESION IDENTIFICADOR INT------*/\n`;
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion}];\n`;
                concatenacion += `  printf("%f",(float)t${contador});\n`;
                contador++;
                return [punteroStack,contador,concatenacion];

                
            } else if(variables[i].id === valor && expresionDecimal.test(variables[i].value)){
                concatenacion += `  /*------IMPRESION IDENTIFICADOR DOUBLE------*/\n`;
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion}];\n`;
                concatenacion += `  printf("%f",(float)t${contador});\n`;
                contador++;
                return [punteroStack,contador,concatenacion];


            } else if (variables[i].id === valor && variableString.test(variables[i].value)){
                let contadorTemporal = 0;
                concatenacion += `  /*------IMPRESION IDENTIFICADOR STRING------*/\n`;
                concatenacion += `  t${contador} = ${variables[i].posicion};\n`;
                contadorTemporal = contador;
                contador++;
                concatenacion += `  t${contador} = stack[(int)t${contadorTemporal}];\n`;
                concatenacion += `  t0 = heap[(int)t${contador}]; //obtiene el tamanio del arreglo\n`;
                concatenacion += `  t${contador} = t${contador} + 1; // se mueve al inicio del arreglo\n`;
                concatenacion += `  t2 = t${contador};\n`;
                concatenacion += `  printString();\n`;
                concatenacion += `  \n`;
                return [punteroStack,contador,concatenacion];


            } else {
                $$ = '--->';
            }
        }
    }
}



function impresionExpresiones(contador,cadena){
    // console.log(cadena);
    let contadorTemporal = 0;
    contadorTemporal = contador -1;
    let concatenacion = '';
    concatenacion += `  printf("%f",t${contadorTemporal});\n`;
    cadena += concatenacion;
    return cadena;
}




// ***************************** APARTADO PARA EL PRINTLN **************************************
// funcion para realizar los print y PRINTLN
function impresionln(punteroStack,contador,valor,variables){

    let concatenacion = '';
    console.log(valor);

    // imprime numeros enteros
    if(typeof valor === 'number'){
        concatenacion += `  /*------IMPRESION INT------*/\n`;
        concatenacion += `  printf("%f",(float)${valor});\n`;
        concatenacion += `  printf("%c", (char)10);\n`;
        return [punteroStack,contador,concatenacion];
    }

    if(expresionString.test(valor)){
        let palabra = valor.substr(1,valor.length-2);
        let tamanioPalabra = palabra.length;

        
        concatenacion += `  /*------IMPRESION DE UN STRING------*/\n`;           
        concatenacion += `  stack[(int)P] = H;\n`;
        concatenacion += `  P = P + 1;\n`
        punteroStack++;
        concatenacion += `  heap[(int)H] = ${tamanioPalabra};\n`;
        concatenacion += `  H = H + 1;\n`;
        concatenacion += `  \n`;
        // guardo en t0 el tamanio del arreglo 
        concatenacion += `  t0 = ${tamanioPalabra};\n`;
        concatenacion += `  \n`;
        // guardo en t2 el inicio del arreglo
        concatenacion += `  t2 = H;\n`;
        concatenacion += `  \n`;
        // ciclo for para guarda los carcters del string en codigo ascii
        for(let i = 0; i < palabra.length; i++){
            concatenacion += `  heap[(int)H] = ${palabra.charCodeAt(i)};\n`;
            concatenacion += `  H = H + 1;\n`;
        }

        concatenacion += `  \n`;
        concatenacion += `  printString();\n`;
        concatenacion += `  \n`;
        concatenacion += `  printf("%c", (char)10);\n`;
        return [punteroStack,contador,concatenacion];


    } else if( expresionDecimal.test(valor)){
        concatenacion += `  /*------IMPRESION DECIMAL------*/\n`;
        concatenacion += `  printf("%f",(float)${valor});\n`;
        concatenacion += `  printf("%c", (char)10);\n`;
        concatenacion += `  \n`;
        return [punteroStack,contador,concatenacion];


    } else if(expresionIdentificador.test(valor)){

        // para encontra la variable en la tabla
        for(let i = 0; i<variables.length; i++){

            // impresion de variables de tipo entero                
            if(variables[i].id === valor && expresionEnteros.test(variables[i].value)) {
                console.log(expresionEnteros.test(variables[i].value));
                concatenacion += `  /*------IMPRESION IDENTIFICADOR INT------*/\n`;
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion}];\n`;
                concatenacion += `  printf("%f",(float)t${contador});\n`;
                concatenacion += `  printf("%c", (char)10);\n`;
                contador++;
                return [punteroStack,contador,concatenacion];

                
            } else if(variables[i].id === valor && expresionDecimal.test(variables[i].value)){
                concatenacion += `  /*------IMPRESION IDENTIFICADOR DOUBLE------*/\n`;
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion}];\n`;
                concatenacion += `  printf("%f",(float)t${contador});\n`;
                concatenacion += `  printf("%c", (char)10);\n`;
                contador++;
                return [punteroStack,contador,concatenacion];


            } else if (variables[i].id === valor && variableString.test(variables[i].value)){
                let contadorTemporal = 0;
                concatenacion += `  /*------IMPRESION IDENTIFICADOR STRING------*/\n`;
                concatenacion += `  t${contador} = ${variables[i].posicion};\n`;
                contadorTemporal = contador;
                contador++;
                concatenacion += `  t${contador} = stack[(int)t${contadorTemporal}];\n`;
                concatenacion += `  t0 = heap[(int)t${contador}]; //obtiene el tamanio del arreglo\n`;
                concatenacion += `  t${contador} = t${contador} + 1; // se mueve al inicio del arreglo\n`;
                concatenacion += `  t2 = t${contador};\n`;
                concatenacion += `  printString();\n`;
                concatenacion += `  printf("%c", (char)10);\n`;
                concatenacion += `  \n`;
                return [punteroStack,contador,concatenacion];


            } else {
                $$ = '--->';
            }
        }
    }
}



function impresionExpresionesln(contador,cadena){
    // console.log(cadena);
    let contadorTemporal = 0;
    contadorTemporal = contador -1;
    let concatenacion = '';
    concatenacion += `  printf("%f",t${contadorTemporal});\n`;
    concatenacion += `  printf("%c", (char)10);\n`;
    concatenacion += `  \n`;
    cadena += concatenacion;
    return cadena;
}