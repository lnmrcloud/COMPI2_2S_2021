
// funcion para crear la declarciones en codigo 3d
function declaracion(punteroStack,tipo,valor){

    let concatenacion = '';

    // verifica que tipo de declaricon se realizara en codigo 3d
    if(tipo === 'int' || tipo === 'double'){
        concatenacion += '  /*------DECLARACION DE UN INT/DOUBLE------*/\n';
        concatenacion += `  stack[(int)P] = ${valor};\n`;        
        concatenacion += '  P = P + 1;\n'
        punteroStack++;
        return [punteroStack,concatenacion];    

    } else if( tipo === 'string'){
        // para obtener y despocomponer el string quitando las comillas;
        let palabra = valor.substr(1,valor.length-2);
        let tamanioPalabra = palabra.length;
    
        concatenacion += `  /*------DECLARACION DE UN STRING------*/\n`;
        concatenacion += `  stack[(int)P] = H;\n`;
        concatenacion += `  P = P + 1;\n`;
        punteroStack++;

        concatenacion += `  heap[(int)H] = ${tamanioPalabra};\n`;
        concatenacion += `  H = H + 1;\n`;

        // conversion de cada caracter a un valor ascii 
        for(let i = 0; i < palabra.length; i++){
            concatenacion += `  heap[(int)H] = ${palabra.charCodeAt(i)};\n`
            concatenacion += `  H = H + 1;\n`;  
        }
        return [punteroStack,concatenacion];
    }
}


function declarcionVacia(punteroStack,tipo){
    let concatenacion = '';

    // verifica que tipo de declaricon se realizara en codigo 3d
    if(tipo === 'int' || tipo === 'double'){
        concatenacion += '  /*------DECLARACION DE UN INT/DOUBLE------*/\n';
        concatenacion += `  stack[(int)P] = 0;\n`;        
        concatenacion += '  P = P + 1;\n'
        punteroStack++;
        return [punteroStack,concatenacion];    
    }
}



function declarcionMultipleVacia(punteroStackTemporal,tipo){
    let concatenacion = '';

    for(let i=0; i <= punteroStackTemporal; i++){
        // verifica que tipo de declaricon se realizara en codigo 3d
        if(tipo === 'int' || tipo === 'double'){
            concatenacion += '  /*------DECLARACION DE UN INT/DOUBLE------*/\n';
            concatenacion += `  stack[(int)P] = 0;\n`;        
            concatenacion += '  P = P + 1;\n'
            // punteroStack++;   
        }
    }
    return [concatenacion];     
}
