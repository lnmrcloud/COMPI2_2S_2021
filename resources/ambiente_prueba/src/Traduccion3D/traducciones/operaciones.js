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



// funcion para realizar restas
function suma(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 

    // console.log(valor1);
    // console.log('------->');
    // console.log(valor2);
    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1|2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        concatenacion += valor1[1];
        concatenacion += '\n';
        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal1} + t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"suma"];
    }

    if(typeof valor1 === 'object'){
        // console.log(valor1[1]);
        console.log("1");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        console.log("---------->");
        console.log(valor1[1]);
        console.log("---------->");

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor2};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} + t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1
        console.log("1");
        console.log(concatenacion);
        console.log("1");

        return [contador,concatenacion,sumaTemporal,"suma"];

        
    } else if(typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor1};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} + t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        console.log("2");
        console.log(concatenacion);
        console.log("2");

        return [contador,concatenacion,sumaTemporal,"suma"];

    }  else {        

        
        // console.log(valor1);
        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = ${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        concatenacion += `  t${contador} = ${valor2};\n`;
        temporalValor2 = contador;
        contador++;

        concatenacion += `  t${contador} = t${temporalValor1} + t${temporalValor2};\n`;
        temporalResultado = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        // console.log("default");
        // console.log(concatenacion);
        // console.log("default");

        return [contador,concatenacion,sumaTemporal,"suma"];
    }
}


// funcion para realizar la ersta
function resta(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 

    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1|2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        concatenacion += valor1[1];
        concatenacion += '\n';
        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal1} - t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"suma"];
    }

    if(typeof valor1 === 'object'){
        // console.log(valor1);
        // console.log(valor1[1]);

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor2};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} - t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"resta"];

        
    } else if(typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor1};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal2} - t${contadorTemporal1};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"resta"];
        
    } else {        

        // console.log(valor1);
        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = ${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        concatenacion += `  t${contador} = ${valor2};\n`;
        temporalValor2 = contador;
        contador++;

        concatenacion += `  t${contador} = t${temporalValor1} - t${temporalValor2};\n`;
        temporalResultado = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        return [contador,concatenacion,sumaTemporal,"resta"];
    }
}

// funcion para traduccion la multiplicacion
function multiplicacion(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 

    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1|2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        concatenacion += valor1[1];
        concatenacion += '\n';
        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal1} * t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"suma"];
    }


    if(typeof valor1 === 'object'){
        // console.log(valor1);
        // console.log(valor1[1]);

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor2};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} * t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"multiplicacion"];

        
    } else if(typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor1};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} * t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"multiplicacion"];
        
    } else {
        // console.log(valor1);  
        // console.log(valor2);       

        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = ${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        concatenacion += `  t${contador} = ${valor2};\n`;
        temporalValor2 = contador;
        contador++;

        concatenacion += `  t${contador} = t${temporalValor1} * t${temporalValor2};\n`;
        temporalResultado = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        // console.log(concatenacion);

        return [contador,concatenacion,sumaTemporal,"multiplicacion"];
    }
}


// funcion para reslizr la division
function division(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 


    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1|2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        concatenacion += valor1[1];
        concatenacion += '\n';
        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal1} / t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"suma"];
    }

    if(typeof valor1 === 'object'){
        // console.log(valor1);
        // console.log(valor1[1]);

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor2};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} / t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"division"];

        
    } else if(typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor1};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = t${contadorTemporal1} / t${contadorTemporal2};\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"division"];
        
    } else {      
        // console.log(valor1);  

        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = ${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        concatenacion += `  t${contador} = ${valor2};\n`;
        temporalValor2 = contador;
        contador++;

        concatenacion += `  t${contador} = t${temporalValor1} / t${temporalValor2};\n`;
        temporalResultado = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        return [contador,concatenacion,sumaTemporal,"division"];
    }
}


// funcion para reslizar el modulo %
function modulo(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 

    if(typeof valor1 === 'object' && typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1|2");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;

        contadorTemporal1 = valor1[0]-1;
        contadorTemporal2 = valor2[0]-1;

        concatenacion += valor1[1];
        concatenacion += '\n';
        concatenacion += valor2[1];
        concatenacion += `  t${contador} = fmod(${contadorTemporal1} , t${contadorTemporal2});\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"suma"];
    }

    if(typeof valor1 === 'object'){
        // console.log(valor1);
        // console.log(valor1[1]);

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor2};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = fmod(t${contadorTemporal1} , t${contadorTemporal2});\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"modulo"];

        
    } else if(typeof valor2 === 'object'){
        // console.log(valor2[1]);
        // console.log("1");

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor2[1];
        concatenacion += `  t${contador} = t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;
        concatenacion += `  t${contador} = ${valor1};\n`;
        contadorTemporal2 = contador;
        contador++;
        concatenacion += `  t${contador} = fmod(t${contadorTemporal1} , t${contadorTemporal2});\n`;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"modulo"];
        
    } else {      
        // console.log(valor1);  

        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = ${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        concatenacion += `  t${contador} = ${valor2};\n`;
        temporalValor2 = contador;
        contador++;

        concatenacion += `  t${contador} = fmod(t${temporalValor1} , t${temporalValor2});\n`;
        temporalResultado = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        return [contador,concatenacion,sumaTemporal,"modulo"];
    }
}




// funcion para reslizar el uniario
function unario(contador,valor1,valor2){
    let concatenacion = '';  
    let temporalValor1 = 0;
    let temporalValor2 = 0;
    let temporalResultado = 0;
    let sumaTemporal = 0; 


    if(typeof valor1 === 'object'){
        // console.log(valor1);
        // console.log(valor1[1]);

        let contadorTemporal = 0;
        let contadorTemporal1 = 0;
        let contadorTemporal2 = 0;
        contadorTemporal = contador - 1;

        concatenacion += valor1[1];
        concatenacion += `  t${contador} = -t${contadorTemporal};\n`;
        contadorTemporal1 = contador;
        contador++;

        sumaTemporal = contador - 1

        return [contador,concatenacion,sumaTemporal,"unario"];

        
    }  else {      
        // console.log(valor1);  

        concatenacion += `  /*------OPERACION ARITMETICA------*/\n`;
        concatenacion += `  t${contador} = -${valor1};\n`;
        temporalValor1 = contador;
        contador++;

        // concatenacion += `  printf("%d",(int)t${temporalResultado});\n`;

        sumaTemporal = valor1 + valor2;

        return [contador,concatenacion,sumaTemporal,"unario"];
    }
}



function parentesis(){
    // puede vernir un valor o un conjuto para operar 
}