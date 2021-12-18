//QUETZAL MEZCLA DE C Y JAVA
/* ====================================================================== DEFINICION LEXICA  ============================================================================ */
%lex

%%

//COMENTARIOS --------------------------------------------------------------------------

\s+                                   // se ignoran espacios en blanco /* skip whitespace */
"//".*                                 //'.*  // comentario simple línea /* skip comment */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   // comentario multiple líneas /* IGNORE */

// PENDIENTE EL NEGATIVO

/* 

PALABRAS RESERVADAS DE QUETZAL -----------------------------------------------

*/

"null"            return 'RNULL';
"int"             return 'RINT';
"double"          return 'RDOUBLE';
"boolean"         return 'RBOOLEAN';
"true"            return 'RTRUE';
"false"           return 'RFALSE';
"char"            return 'RCHAR';
"String"          return 'RSTRING_TIPO';
"struct"          return 'RSTRUCT';
"main"            return 'RMAIN';
"void"            return 'RVOID';
"parse"           return 'RPARSE';

"print"           return 'RPRINT';    // Esta imprime sin realizar un salto de línea
"println"         return 'RPRINTLN';  // Esta imprime realizando un salto de línea
// REVISAR OPCIONES DE IMPRESION DE ELEMENTOS
// ARREGLOS Y STRUCTS ; OPERACIONES $


"if"                return 'RIF';
"else"              return 'RELSE';
"switch"            return 'RSWITCH';
"case"              return 'RCASE';
"default"           return 'RDEFAULT';
"break"             return 'RBREAK';
"continue"          return 'RCONTINUE';
"return"            return 'RRETURN';
"while"             return 'RWHILE';
"do"                return 'RDO';
"for"               return 'RFOR';
"in"                return 'RIN';
"of"                return 'ROF';

"++"                return 'RINCREMENTO';
"--"                return 'RDECREMENTO';
"**"				        return 'RPODER';

// CASOS ESPECIALES CON FOR CON PALABRA IN


/*

  NATIVAS ---------------------------------------------------

*/

"pow"             return 'RPOW';    // pow(base,potencia) numeros
"sqrt"            return 'RSQRT';
"sin"             return 'RSIN';
"cos"             return 'RCOS';
"tan"             return 'RTAN';
"log10"           return 'RLOG10';  // Logaritmo base 10


/*

  PUNTUACION ---------------------------------------------------

*/

","                 return 'RCOMA';
";"                 return 'RPUNTOYCOMA';
"."                 return 'RPUNTO';
":"                 return 'RDOSPUNTOS';

/*

  AGRUPACION ---------------------------------------------------

*/

"("                 return 'RIZQPARENTESIS';
")"                 return 'RDERPARENTESIS';
"["                 return 'RIZQCORCHETE';
"]"                 return 'RDERCORCHETE';
"{"                 return 'RIZQLLAVE';
"}"                 return 'RDERLLAVE';

/*

  ARITMETICAS ---------------------------------------------------

*/
"+"                 return 'RSUMA';
"-"                 return 'RRESTA';
"*"                 return 'RMULTIPLICACION';
"/"                 return 'RDIVISION';
"%"                 return 'RMODULAR';

"?"                 return 'RTERNARIO';
"#"                 return 'RNUMERAL'; //COPIA UN ARREGLO


/*

  RELACIONALES ---------------------------------------------------

*/

"=="                return 'RIGUALDAD';
"!="                return 'RDIFERENCIA';
">"                 return 'RMAYORQUE';
"<"                 return 'RMENORQUE';
">="                return 'RMAYORQUEIGUAL';
"<="                return 'RMENORQUEIGUAL';

/*

  LOGICAS ---------------------------------------------------

*/

"&&"                return 'RAND';
"||"                return 'ROR';
"!"                 return 'RNOT';
"&"                 return 'RAMPERSON';   // CONCATENA CADENAS -  "para" & "caidismo" = "paracaidismo"

/*

  SIMBOLOS ---------------------------------------------------

*/

"^"                 return 'RPOTENCIA';   // CONCATENA CADENAS POTENCIA - "Cadena"^3 = "CadenaCadenaCadena"
"="                 return 'RASIGNACION';

/*

  FUNCIONES ---------------------------------------------------

*/

"caracterOfPosition"    return 'RACCESO_POCISION';  //animal = "Tigre"; println(animal.caracterOfPosition(2)); -- g
"subString"             return 'RACCESO_PORCION';   //animal = "Tigre"; println(animal.subString(2,4)); -- gre
"length"                return 'RLENGHT';          //animal = "Tigre"; println(animal.length()); -- 5 // Tamaño de arreglos tmb
"toUppercase"           return 'RMAYUSCULAS';       //animal = "Tigre"; println(animal.toUppercase()); -- TIGRE
"toLowercase"           return 'RMINUSCULAS';     //animal = "Tigre"; println(animal.toLowercase()); -- tigre
"toInt"                 return 'RTOINT';            //toInt(3.99999)  // retorna 3
"toDouble"              return 'RTODOUBLE';         //toDouble(34)  // retorna 34.0
"string"                return 'RSTRING_CAST';
"typeof"                return 'RTYPEOF';          //typeof(5 * 5) // int

// ARREGLOS

"push"                  return 'RPUSH';
"pop"                   return 'RPOP';

// EXPRESIONES REGUALES 

[0-9]+("."[0-9]+)\b         return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';

\"[^\"]*\"                 { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'                 { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }

([a-zA-Z])[a-zA-Z0-9_]*      return 'NAME';          // ETIQUETAS - NOMBRE DE VARIABLES


<<EOF>>                 return 'EOF';
.                           {console.log("Lexico", yytext,  yylloc.first_line, yylloc.first_column)}

/lex

//SECCION DE IMPORTS
%{    
   
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES

%right RTERNARIO
%left ROR 
%left RAND 
%left RMENORQUE RMENORQUEIGUAL RMAYORQUE RMAYORQUEIGUAL RIGUALDAD RDIFERENCIA
%left RSUMA RRESTA RAMPERSON
%left RMULTIPLICACION rDIVISION RMODULAR RPOTENCIA
%left UMENOS
%right RNOT
%right RINCREMENTO RDECREMENTO


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START : INSTRUCCIONES EOF                   {$$ = {node: newNode(yy, yystate, $1.node, 'EOF') };return $$; }
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}      
              | INSTRUCCION                 { $$ = { node: newNode(yy, yystate, $1.node) }}                      
;

INSTRUCCION   : DECLARACION                 { $$ = { node: newNode(yy, yystate, $1.node) }}                       
              | ASIGNACION                  { $$ = { node: newNode(yy, yystate, $1.node) }}    
              | IMPREESION                  { $$ = { node: newNode(yy, yystate, $1.node) }}           
              | FUNCIONES                   { $$ = { node: newNode(yy, yystate, $1.node) }}
              | CONDICIONAL_IF              { $$ = { node: newNode(yy, yystate, $1.node) }}            
;

DECLARACION : TIPO NAME RASIGNACION EXPRESION RPUNTOYCOMA                                 { $$ = { node: newNode(yy, yystate, $1.node, $2, $4.node) }}               
            | TIPO LISTA_DE_DECLARACION RPUNTOYCOMA                                       { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}
            | RSTRUCT NAME RIZQLLAVE LISTA_DE_ATRIBUTOS RDERLLAVE RPUNTOYCOMA
            | TIPO RIZQCORCHETE RDERCORCHETE NAME RASIGNACION CUERPO_ARRAY RPUNTOYCOMA    { $$ = { node: newNode(yy, yystate, $1.node, $4, $6.node) }}
;

LISTA_DE_ATRIBUTOS  : LISTA_DE_ATRIBUTOS RCOMA ATRIBUTO                                    { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }}
                    | ATRIBUTO                                                             { $$ = { node: newNode(yy, yystate, $1.node) }}
;

ATRIBUTO : TIPO NAME         { $$ = { node: newNode(yy, yystate, $1.node, $2) }}
         | NAME NAME         { $$ = { node: newNode(yy, yystate, $1, $2) }}
;

LISTA_DE_DECLARACION  : LISTA_DE_DECLARACIONES RCOMA NAME     { $$ = { node: newNode(yy, yystate, $1.node, $3) }}  
                      | NAME                                  { $$ = { node: newNode(yy, yystate, $1) }}    
;

CUERPO_ARRAY  : RIZQCORCHETE LISTA_DE_PARAMETROS RDERCORCHETE 
;

ASIGNACION : NAME RASIGNACION EXPRESION RPUNTOYCOMA                                                       { $$ = { node: newNode(yy, yystate, $1, $2.node) }}                  
           | NAME NAME RASIGNACION NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS RPUNTOYCOMA     { $$ = { node: newNode(yy, yystate, $1, $2, $4, $6.node) }} 
;

TIPO  : TIPO_PRIMITIVO    { $$ = { node: newNode(yy, yystate, $1.node) }}  
;

TIPO_PRIMITIVO :    RINT            { $$ = { node: newNode(yy, yystate, $1) }} 
               |    RDOUBLE         { $$ = { node: newNode(yy, yystate, $1) }}
               |    RSTRING_TIPO    { $$ = { node: newNode(yy, yystate, $1) }}     
               |    RBOOLEAN        { $$ = { node: newNode(yy, yystate, $1) }} 
               |    RCHAR           { $$ = { node: newNode(yy, yystate, $1) }}
               |    RVOID           { $$ = { node: newNode(yy, yystate, $1) }}
;

IMPRESION : RPRINTLN RIZQPARENTESIS LISTA_IMPRESION RDERPARENTESIS RPUNTOYCOMA        { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                | RPRINT RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA          { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
;

LISTA_IMPRESION : LISTA_IMPRESION RCOMA EXPRESION                                     { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }} 
                | EXPRESION                                                           { $$ = { node: newNode(yy, yystate, $1.node) }}   
;

LLAMADA         : NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS              { $$ = { node: newNode(yy, yystate, $1, $3.node) }} 
                | NAME RIZQPARENTESIS RDERPARENTESIS                                  { $$ = { node: newNode(yy, yystate, $1) }}   
;

LISTA_DE_PARAMETROS : LISTA_DE_PARAMETROS RCOMA EXPRESION                             { $$ = { node: newNode(yy, yystate, $1.node, $3.node) }} 
                    | EXPRESION                                                       { $$ = { node: newNode(yy, yystate, $1.node) }}
; 

NATIVAS          : TIPO RPUNTO RPARSE RIZQPARENTESIS EXPRESION RDERPARENTESIS          { $$ = { node: newNode(yy, yystate, $1.node, $3, $5.node) }}
                 | RTOINT RIZQPARENTESIS EXPRESION RDERPARENTESIS                      { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RTODOUBLE RIZQPARENTESIS EXPRESION RDERPARENTESIS                   { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RSTRING_CAST RIZQPARENTESIS EXPRESION RDERPARENTESIS                { $$ = { node: newNode(yy, yystate, $1, $3.node) }}
                 | RTYPEOF RIZQPARENTESIS EXPRESION RDERPARENTESIS                     { $$ = { node: newNode(yy, yystate, $1, $3.node) }}        
;

CONDICIONAL_IF  : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES                                   { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node) }}            
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE CONDICIONAL_IF              { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $6, $7.node) }}   
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE BLOQUE_INSTRUCCIONES        { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $6, $7.node) }}  
;

BLOQUE_INSTRUCCIONES    : RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE      { $$ = { node: newNode(yy, yystate, $1.node) }}                                        
                        | DECLARACION                                     { $$ = { node: newNode(yy, yystate, $1.node) }}
                        | ASIGNACION                                      { $$ = { node: newNode(yy, yystate, $1.node) }}
                        | IMPRESION                                       { $$ = { node: newNode(yy, yystate, $1.node) }}
                        | LLAMADA RPUNTOYCOMA                             { $$ = { node: newNode(yy, yystate, $1.node) }}
; 

SWITCH  : RSWITCH RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE BLOQUE_SWITCH RDERLLAVE   { $$ = { node: newNode(yy, yystate, $1, $3.node, $6.node) }}
;

BLOQUE_SWITCH   : BLOQUE_SWITCH ESTRUCTURA_CASE             { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}
                | ESTRUCTURA_CASE                           { $$ = { node: newNode(yy, yystate, $1.node) }}
;

ESTRUCTURA_CASE : RCASE EXPRESION RDOSPUNTOS INSTRUCCIONES_INTERNAS      { $$ = { node: newNode(yy, yystate, $1, $2.node, $4.node) }}    
                | RDEFAULT EXPRESION RDOSPUNTOS INSTRUCCIONES_INTERNAS   { $$ = { node: newNode(yy, yystate, $1, $3.node) }} 
;

WHILE  : RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE { $$ = { node: newNode(yy, yystate, $1, $3.node, $6.node) }}
;

DO_WHILE  : RDO RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA  { $$ = { node: newNode(yy, yystate, $1, $3.node, $5, $7.node) }}
;

FOR : RFOR RIZQPARENTESIS DECLARAR_ASIGNACION RPUNTOYCOMA EXPRESION RPUNTOYCOMA  DECLARAR_ASIGNACION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE  { $$ = { node: newNode(yy, yystate, $1, $3.node, $5.node, $7.node, $10.node) }}
;

DECLARAR_ASIGNACION : TIPO NAME RASIGNACION EXPRESION       { $$ = { node: newNode(yy, yystate, $1.node, $2, $4.node) }}
                    | NAME RASIGNACION EXPRESION            { $$ = { node: newNode(yy, yystate, $1, $3.node) }} 
                    | EXPRESION                             { $$ = { node: newNode(yy, yystate, $1.node) }} 
;

FUNCIONES : NAME NAME RIZQPARENTESIS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE                            { $$ = { node: newNode(yy, yystate, $1, $2, $6.node) }}
                | NAME NAME RIZQPARENTESIS LISTA_DE_ATRIBUTOS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE     { $$ = { node: newNode(yy, yystate, $1, $2, $4.node, $7.node) }}
;

TIPO_FUNCION_ATRIBUTO : RPOW     { $$ = { node: newNode(yy, yystate, $1) }} 
                      | RSQRT    { $$ = { node: newNode(yy, yystate, $1) }} 
                      | RSIN     { $$ = { node: newNode(yy, yystate, $1) }} 
                      | RCOS     { $$ = { node: newNode(yy, yystate, $1) }} 
                      | RTAN     { $$ = { node: newNode(yy, yystate, $1) }} 
;

FUNCION_ARITMETICA  : TIPO_FUNCION_ARITMETICA RIZQPARENTESIS EXPRESION RDERPARENTESIS         { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}    
;

INSTRUCCIONES_INTERNAS : INSTRUCCIONES_INTERNAS INSTRUCCION_INTERNA     { $$ = { node: newNode(yy, yystate, $1.node, $2.node) }}        
                     | INSTRUCCION_INTERNA                              { $$ = { node: newNode(yy, yystate, $1.node) }}             
;

INSTRUCCION_INTERNA      : DECLARACION                                  { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | ASIGNACION                                    { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | IMPRESION                                     { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | LLAMADA RPUNTOYCOMA                           { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | CONDICIONAL_IF                                { $$ = { node: newNode(yy, yystate, $1.node) }}         
                        | SWITCH                                        { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | WHILE                                         { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | DO_WHILE                                      { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | FOR                                           { $$ = { node: newNode(yy, yystate, $1.node) }} 
                        | RRETURN RPUNTOYCOMA                           { $$ = { node: newNode(yy, yystate, $1) }} 
                        | RRETURN EXPRESION RPUNTOYCOMA                 { $$ = { node: newNode(yy, yystate, $1, $2.node) }} 
                        | RBREAK RPUNTOYCOMA                            { $$ = { node: newNode(yy, yystate, $1) }}   
                        | EXPRESION RINCREMENTORPUNTOYCOMA              { $$ = { node: newNode(yy, yystate, $1.node, $2) }}
                        | EXPRESION RDECREMENTORPUNTOYCOMA              { $$ = { node: newNode(yy, yystate, $1.node, $2) }}
;

EXPRESION : RRESTA EXPRESION %prec UMENOS	                { $$ = { node: newNode(yy, yystate, $1, $2.node) }} 
          | EXPRESION RAMPERSON EXPRESION		              { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}
          | EXPRESION RPOTENCIA EXPRESION	                { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }} 
          | EXPRESION RSUMA EXPRESION                     { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}             
          | EXPRESION RRESTA EXPRESION		                { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}
          | EXPRESION RMULTIPLICACION EXPRESION		        { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }} 
          | EXPRESION RDIVISION EXPRESION	                { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}
          | EXPRESION RMODULAR EXPRESION	                { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}
          | EXPRESION RMENORQUE EXPRESION		              { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}      
          | EXPRESION RMAYORQUE EXPRESION		              { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}  
          | EXPRESION RMENORQUEIGUAL EXPRESION	          { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}     
          | EXPRESION RMAYORQUEIGUAL EXPRESION	          { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}       
          | EXPRESION RIGUALDAD EXPRESION	                { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}  
          | EXPRESION RDIFERENCIA EXPRESION               { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}  
          | EXPRESION RAND EXPRESION                      { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}  
          | EXPRESION ROR EXPRESION                       { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node) }}              
          | RNOT EXPRESION	   	                          { $$ = { node: newNode(yy, yystate, $1, $2.node) }}
          | NAME                                          { $$ = { node: newNode(yy, yystate, $1) }}                              
          | ENTERO		                                    { $$ = { node: newNode(yy, yystate, $1) }}   
          | DECIMAL				                                { $$ = { node: newNode(yy, yystate, $1) }}       
          | RTRUE				                                  { $$ = { node: newNode(yy, yystate, $1) }}   
          | RFALSE	     	                                { $$ = { node: newNode(yy, yystate, $1) }}   
          | CADENA	                                      { $$ = { node: newNode(yy, yystate, $1) }}   
          | CARACTER                                      { $$ = { node: newNode(yy, yystate, $1) }}   
          | RNULL                                         { $$ = { node: newNode(yy, yystate, $1) }}   
          | NAME RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS
          | NAME RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROSRDERPARENTESIS
          | CADENA RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS
          | CADENA RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS
          | EXPRESION RTERNARIO EXPRESION RDOSPUNTOS EXPRESION         { $$ = { node: newNode(yy, yystate, $1.node, $2, $3.node, $4, $5.node) }}
          | EXPRESION RINCREMENTO                                      { $$ = { node: newNode(yy, yystate, $1.node, $2) }}  
          | EXPRESION RDECREMENTO                                      { $$ = { node: newNode(yy, yystate, $1.node, $2) }}
          | LLAMADA                                                    { $$ = { node: newNode(yy, yystate, $1.node) }}
          | NATIVAS                                                    { $$ = { node: newNode(yy, yystate, $1.node) }}
          | FUNCION_ARITMETICA                                         { $$ = { node: newNode(yy, yystate, $1.node) }}
          | RIZQPARENTESIS EXPRESION RDERPARENTESIS	          	       { $$ = { node: newNode(yy, yystate, $1, $2.node, $3) }}
;