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



// funcion para la trudcion de un mayro en un if
function mayorQue(contador,valor1,valor2){
    let concatenacion = '';

    let contadorTemporal1 = 0;
    let contadorTemporal2 = 0;

    // console.log(valor1);
    // console.log(valor2);

    if(typeof valor1 === 'object' && typeof valor2 === 'object'){

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        // console.log(valor1[0]);
        // console.log(valor2[0])

        // contadorTemporal1 = contador - 1;
        concatenacion += `t${contadorTemporal1} > t${contadorTemporal2}`;
        return [concatenacion,valor1[1],valor2[1]];

    }else if(typeof valor1 === 'object'){

        console.log("lado izquierdo");
        console.log(valor1);
        console.log(valor1[1]);
        
        contadorTemporal1 = contador - 1;
        concatenacion += `t${contadorTemporal1} > ${valor2}`;
        console.log(concatenacion);
        return [concatenacion,valor1[1]];

    } else if(typeof valor2 === 'object'){

        console.log("lado derecho");
        console.log(valor2);
        contadorTemporal2 = contador - 1;
        concatenacion += `${valor1} > t${contadorTemporal2}`;
        return [concatenacion,valor2[1]];

    } else {

        contadorTemporal1 = contador -2;
        contadorTemporal2 = contador - 1;

        concatenacion += `${valor1} > ${valor2}`;

        return [concatenacion];
    }
}




// funcion para comprar si dos valores son iguales
function igualIgual(contador,etiquetas,valor1,valor2,variables){

    console.log(valor1);
    console.log(valor2);

    let concatenacion = '';
    let etiquetaAnterior = 0;
    let etiquetaAnterior1 = 0;
    let etiquetaAnterior2 = 0;
    let etiquetaSalida = 0;

    // 1. reviso si el valor1 es una variable
    if(expresionIdentificador.test(valor1)){
        // para encontra la variable en la tabla
        for(let i = 0; i<variables.length; i++){

            // impresion de variables de tipo entero                
            if(variables[i].id === valor1 && expresionDecimal.test(variables[i].value)) {
                console.log("entro decimales");
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion};]\n`;
                concatenacion += `  if( t${contador} == ${valor2} ) goto L${etiquetas}; \n`;
                etiquetas++;
                contador++;
                concatenacion += `  goto L${etiquetas};\n`;
                etiquetaAnterior1 = etiquetas-1;
                concatenacion += `  L${etiquetaAnterior1}\n`;
                etiquetaSalida = etiquetas;
                etiquetas++;
                
                return [contador,etiquetas,concatenacion,etiquetaAnterior1,etiquetaSalida];
                break;

            } else if(variables[i].id === valor1 && expresionEnteros.test(variables[i].value)){
                concatenacion += `  t${contador} = stack[(int)${variables[i].posicion}];\n`;
                concatenacion += `  if( t${contador} == ${valor2} )  goto L${etiquetas}; \n`;
                etiquetas++;
                contador++;
                concatenacion += `  goto L${etiquetas};\n`;
                etiquetaAnterior1 = etiquetas-1;
                concatenacion += `  L${etiquetaAnterior1}:\n`;
                etiquetaSalida = etiquetas;
                etiquetas++;
                
                return [contador,etiquetas,concatenacion,etiquetaAnterior1,etiquetaSalida];
                break;
            }

        }
    }
}



function comparador_and(valor1,valor2){
    let etiquetaUnion = 0;
    let ultimaEtiqueta = 0;
    let concatenacion = '';
    let etiquetasSalidas = [];

    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // solo hago la union de dos objetos
        etiquetaUnion = valor1[3];
        ultimaEtiqueta = valor2[3];
        etiquetasSalidas.push(valor1[4]);
        etiquetasSalidas.push(valor2[4]);

        concatenacion += valor1[2];
        // concatenacion += `  L${etiquetaUnion}:\n`;
        concatenacion += valor2[2];
        return [concatenacion,ultimaEtiqueta,etiquetasSalidas];
    }
}