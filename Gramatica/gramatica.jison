%{
        //const {entregable}=  require("../Expresiones/entregable");
        //const {Error}=  require("../AST/ErrorA");
        //var entreg= new entregable;  
%}

//QUETZAL MEZCLA DE C Y JAVA
/* ====================================================================== DEFINICION LEXICA  ============================================================================ */
%lex

//CASE SENSITIVE
%options case-sensitive


//COMENTARIOS --------------------------------------------------------------------------

\s+                                   // se ignoran espacios en blanco
"//".*                                // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   // comentario multiple líneas


// EXPRESIONES REGUALES 

[0-9]+\b                    return 'ENTERO';
[0-9]+("."[0-9]+)?\b        return 'DECIMAL';

((\").*?(\"))|((\').*?(\')) return 'STRING';        // TODO LO QUE VENGA ENTRE COMILLAS NORMALES O DOBLES

[a-zA-Z_][a-aA-Z_0-9]*      return 'NAME';          // ETIQUETAS - NOMBRE DE VARIABLES

// PENDIENTE EL NEGATIVO

/* 

PALABRAS RESERVADAS DE QUETZAL -----------------------------------------------

*/

"null"            return 'RNULL'
"int"             return 'RINT'
"double"          return 'RDOUBLE'
"boolean"         return 'RBOOLEAN'
"true"            return 'RTRUE'
"false"           return 'RFALSE'
"char"            return 'RCHAR'
"String"          return 'RSTRING_TIPO'
"struct"          return 'RSTRUCT'
"main"            return 'RMAIN'

"print"           return 'RPRINT'    // Esta imprime sin realizar un salto de línea
"println"         return 'RPRINTLN'  // Esta imprime realizando un salto de línea
// REVISAR OPCIONES DE IMPRESION DE ELEMENTOS
// ARREGLOS Y STRUCTS ; OPERACIONES $


"if"                return 'RIF'
"else"              return 'RELSE'
"switch"            return 'RSWITCH'
"case"              return 'RCASE'
"default"           return 'RDEFAULT'
"break"             return 'RBREAK'
"continue"          return 'RCONTINUE'
"return"            return 'RRETURN'
"while"             return 'RWHILE'
"do"                return 'RDO'
"for"               return 'RFOR'
"in"                return 'RIN'
"of"                return 'ROF'

"++"                return 'RINCREMENTO'
"--"                return 'RDECREMENTO'
"**"				        return 'RPODER'

// CASOS ESPECIALES CON FOR CON PALABRA IN


/*

  NATIVAS ---------------------------------------------------

*/

"pow"             return 'RPOW'    // pow(base,potencia) numeros
"sqrt"            return 'RSQRT'
"sin"             return 'RSIN'
"cos"             return 'RCOS'
"tan"             return 'RTAN'
"log10"           return 'RLOG10'  // Logaritmo base 10


/*

  PUNTUACION ---------------------------------------------------

*/

","                 return 'RCOMA'
";"                 return 'RPUNTOYCOMA'
"."                 return 'RPUNTO'
":"                 return 'RDOSPUNTOS'

/*

  AGRUPACION ---------------------------------------------------

*/

"("                 return 'RIZQPARENTESIS'
")"                 return 'RDERPARENTESIS'
"["                 return 'RIZQCORCHETE'
"]"                 return 'RDERCORCHETE'
"{"                 return 'RIZQLLAVE'
"}"                 return 'RDERLLAVE'

/*

  ARITMETICAS ---------------------------------------------------

*/
"+"                 return 'RSUMA'
"-"                 return 'RRESTA'
"*"                 return 'RMULTIPLICACION'
"/"                 return 'RDIVISION'
"%"                 return 'RMODULAR'

"?"                 return 'RTERNARIO'
"#"                 return 'RNUMERAL' //COPIA UN ARREGLO


/*

  RELACIONALES ---------------------------------------------------

*/

"=="                return 'RIGUALDAD'
"!="                return 'RDIFERENCIA'
">"                 return 'RMAYORQUE'
"<"                 return 'RMENORQUE'
">="                return 'RMAYORQUEIGUAL'
"<="                return 'RMENORQUEIGUAL'

/*

  LOGICAS ---------------------------------------------------

*/

"&&"                return 'RAND'
"||"                return 'ROR'
"!"                 return 'RNOT'
"&"                 return 'RAMPERSON'   // CONCATENA CADENAS -  "para" & "caidismo" = "paracaidismo"

/*

  SIMBOLOS ---------------------------------------------------

*/

"^"                 return 'RPOTENCIA'   // CONCATENA CADENAS POTENCIA - "Cadena"^3 = "CadenaCadenaCadena"
"="                 return 'RASIGNACION'

/*

  FUNCIONES ---------------------------------------------------

*/

"caracterOfPosition"    return 'RACCESO_POCISION'  //animal = "Tigre"; println(animal.caracterOfPosition(2)); -- g
"subString"             return 'RACCESO_PORCION'   //animal = "Tigre"; println(animal.subString(2,4)); -- gre
"length"                return 'RLENGHT'          //animal = "Tigre"; println(animal.length()); -- 5 // Tamaño de arreglos tmb
"toUppercase"           return 'RMAYUSCULAS'       //animal = "Tigre"; println(animal.toUppercase()); -- TIGRE
"toLowercase"           return 'RMINUSCULAS'      //animal = "Tigre"; println(animal.toLowercase()); -- tigre
"toInt"                 return 'RTOINT'            //toInt(3.99999)  // retorna 3
"toDouble"              return 'RTODOUBLE'         //toDouble(34)  // retorna 34.0
"string"                return 'RSTRING_CAST'
"typeof"                return 'RTYPEOF'          //typeof(5 * 5) // int

// ARREGLOS

"push"                  return 'RPUSH'
"pop"                   return 'RPOP'

<<EOF>>                 return 'EOF'

//SECCION DE IMPORTS
%{    
   
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES

// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : RNULL EOF
{ 
  
}
;