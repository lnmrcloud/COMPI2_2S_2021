//QUETZAL MEZCLA DE C Y JAVA
/* ====================================================================== DEFINICION LEXICA  ============================================================================ */
%{
  let repote_gramatical_asc = ""
%}

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
START : INSTRUCCIONES EOF                   { $$ = $1 + "<br> START : INSTRUCCIONES EOF - {return new AST($1,$1);} <br>" ; return $$; }
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   { $$ = $1 + $2 + "<br> INSTRUCCIONES : INSTRUCCIONES INSTRUCCION - { $1.push($2); $$ = $1;} <br>";} 
              | INSTRUCCION                 { $$ = $1 + "<br> INSTRUCCIONES : INSTRUCCION - { $$ = [$1]; } <br>";}           
;

INSTRUCCION   : DECLARACION     { $$ = $1 + "<br> INSTRUCCION : DECLARACION - { $$ = $1 }  <br>";}                                
              | ASIGNACION      { $$ = $1 + "<br> INSTRUCCION : ASIGNACION - { $$ = $1 }  <br>";}            
              | IMPRESION       { $$ = $1 + "<br> INSTRUCCION : IMPRESION - { $$ = $1 }  <br>";}               
              | FUNCIONES       { $$ = $1 + "<br> INSTRUCCION : FUNCIONES - { $$ = $1 }  <br>";}            
              | CONDICIONAL_IF  { $$ = $1 + "<br> INSTRUCCION : CONDICIONAL_IF - { $$ = $1 }  <br>";}            
              | SWITCH          { $$ = $1 + "<br> INSTRUCCION : SWITCH - { $$ = $1 }  <br>";}               
              | WHILE           { $$ = $1 + "<br> INSTRUCCION : WHILE - { $$ = $1 }  <br>";}            
              | DO_WHILE        { $$ = $1 + "<br> INSTRUCCION : DO_WHILE - { $$ = $1 }  <br>";}                     
;

DECLARACION : TIPO NAME RASIGNACION EXPRESION RPUNTOYCOMA       { $$ = $1 + $2 + $4 + "<br> DECLARACION : TIPO NAME RASIGNACION EXPRESION RPUNTOYCOMA  - { $$ = new Declaracion([$2],$1, @1.first_line, @1.first_column,$4); }  <br>";}                                           
            | TIPO LISTA_DE_DECLARACION RPUNTOYCOMA             { $$ = $1 + $2 + "<br> DECLARACION : TIPO LISTA_DE_DECLARACION RPUNTOYCOMA - { $$ = new Declaracion($2, $1, @1.first_line, @1.first_column); }  <br>";}                         
            | RSTRUCT NAME RIZQLLAVE LISTA_DE_ATRIBUTOS RDERLLAVE RPUNTOYCOMA
            | TIPO RIZQCORCHETE RDERCORCHETE NAME RASIGNACION CUERPO_ARRAY RPUNTOYCOMA    
;

LISTA_DE_ATRIBUTOS  : LISTA_DE_ATRIBUTOS RCOMA ATRIBUTO    { $$ = $1 + $3 +  "<br> LISTA_DE_ATRIBUTOS : LISTA_DE_ATRIBUTOS RCOMA ATRIBUTO - { $1.push($3); $$ = $1; }   <br>";}                               
                    | ATRIBUTO    { $$ =  $1 + "<br> LISTA_DE_ATRIBUTOS : ATRIBUTO - { $$ = [$1] } <br>";}                                                         
;

ATRIBUTO : TIPO NAME      { $$ =   $1 +  $2 +"<br> ATRIBUTO : TIPO NAME  -{ $$ = new Simbolo($1, $2, @1.first_line, @1.first_column); }  <br>";}    
         | NAME NAME         
;

LISTA_DE_DECLARACION  : LISTA_DE_DECLARACION RCOMA NAME  { $$ =  $1 +  $3 +"<br> LISTA_DE_DECLARACION : LISTA_DE_DECLARACION RCOMA NAME - { $1.push($3); $$ = $1; }   <br>";}   
                      | NAME                             { $$ =  $1 + "<br> LISTA_DE_DECLARACION : NAME - { $$ = [$1] } <br>";}     
;

CUERPO_ARRAY  : RIZQCORCHETE LISTA_DE_PARAMETROS RDERCORCHETE 
;

ASIGNACION : NAME RASIGNACION EXPRESION RPUNTOYCOMA      { $$ =  $1 + $3 +"<br> ASIGNACION : NAME RASIGNACION EXPRESION RPUNTOYCOMA - { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); } <br>";}                                                             
           | NAME NAME RASIGNACION NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS RPUNTOYCOMA     
;

TIPO  : TIPO_PRIMITIVO  { $$ =  $1 + "<br> TIPO : TIPO_PRIMITIVO - { $$ = $1 } <br>";}  
;

TIPO_PRIMITIVO :    RINT          { $$ =  "<br> TIPO_PRIMITIVO : RINT - { $$ =  Tipo.INT;} <br>";}           
               |    RDOUBLE       { $$ =  "<br> TIPO_PRIMITIVO : RDOUBLE - { $$ =  Tipo.DOUBLE;} <br>";}  
               |    RSTRING_TIPO  { $$ =  "<br> TIPO_PRIMITIVO : RSTRING_TIPO - { $$ =  Tipo.STRING;} <br>";}       
               |    RBOOLEAN      { $$ =  "<br> TIPO_PRIMITIVO : RBOOLEAN - { $$ =  Tipo.BOOLEAN;} <br>";}   
               |    RCHAR         { $$ =  "<br> TIPO_PRIMITIVO : RCHAR - { $$ =  Tipo.CHAR ;} <br>";}  
               |    RVOID         { $$ =  "<br> TIPO_PRIMITIVO : RVOID - { $$ =  Tipo.VOID;} <br>";}  
;

IMPRESION : RPRINTLN RIZQPARENTESIS LISTA_IMPRESION RDERPARENTESIS RPUNTOYCOMA       
                | RPRINT RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA  { $$ = $3 + "<br> IMPRESION : RPRINT RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA - { $$ = new Print($3, @1.first_line, @1.first_column); }  <br>";}      
                | RPRINTLN RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA  { $$ = $3 + "<br> IMPRESION : RPRINTLN RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA  - { $$ = new Println($3, @1.first_line, @1.first_column); }  <br>";} 
; 

LISTA_IMPRESION : LISTA_IMPRESION RCOMA EXPRESION                                     
                | EXPRESION                                                           
;

LLAMADA         : NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS { $$ = $1 + $3 +"<br> LLAMADA : NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS - { $1.push($2); $$ = $1;}  <br>";}            
                | NAME RIZQPARENTESIS RDERPARENTESIS   { $$ = $1 + "<br> LLAMADA : NAME RIZQPARENTESIS RDERPARENTESIS -  { $$ = [$1]; } <br>";}                                 
;

LISTA_DE_PARAMETROS : LISTA_DE_PARAMETROS RCOMA EXPRESION                             
                    | EXPRESION                                                      
; 

NATIVAS          : TIPO RPUNTO RPARSE RIZQPARENTESIS EXPRESION RDERPARENTESIS          
                 | RTOINT RIZQPARENTESIS EXPRESION RDERPARENTESIS                     
                 | RTODOUBLE RIZQPARENTESIS EXPRESION RDERPARENTESIS                  
                 | RSTRING_CAST RIZQPARENTESIS EXPRESION RDERPARENTESIS              
                 | RTYPEOF RIZQPARENTESIS EXPRESION RDERPARENTESIS                             
;

CONDICIONAL_IF  : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES   { $$ = $3 + $5 + "<br> CONDICIONAL_IF : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES - { $$ = new If($3, $5, [],[], @1.first_line, @1.first_column); } <br>";}                                             
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE CONDICIONAL_IF  { $$ = $3 + $5 + $7 +"<br> CONDICIONAL_IF : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE CONDICIONAL_IF - { $$ = new If($3, $5, [],[$7], @1.first_line, @1.first_column); } <br>";}               
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE BLOQUE_INSTRUCCIONES  { $$ = $3 + $5 + $7 +"<br> CONDICIONAL_IF : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE BLOQUE_INSTRUCCIONES  - { $$ = new If($3, $5, $7,[], @1.first_line, @1.first_column); } <br>";}       
;

BLOQUE_INSTRUCCIONES    : RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE { $$ = $2 +"<br> BLOQUE_INSTRUCCIONES : RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE - { $$ = $2 } <br>";}                                               
                        | DECLARACION                            
                        | ASIGNACION                                     
                        | IMPRESION                                      
                        | LLAMADA RPUNTOYCOMA                            
; 

SWITCH  : RSWITCH RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE BLOQUE_SWITCH RDERLLAVE { $$ = $3 + $6 +"<br> SWITCH :  RSWITCH RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE BLOQUE_SWITCH RDERLLAVE - { $$ = new Switch($3,$6,@1.first_line, @1.first_column); } <br>";}  
;

BLOQUE_SWITCH   : BLOQUE_SWITCH ESTRUCTURA_CASE  { $$ = $1 + $2 +"<br> BLOQUE_SWITCH : BLOQUE_SWITCH ESTRUCTURA_CASE -  { $1.push($2); $$ = $1;}<br>";}            
                | ESTRUCTURA_CASE  { $$ = $1 + "<br> BLOQUE_SWITCH : ESTRUCTURA_CASE -  { $$ = [$1]; }<br>";}           
;

ESTRUCTURA_CASE : RCASE EXPRESION RDOSPUNTOS INSTRUCCIONES_INTERNAS { $$ = $2 +$4 +"<br> ESTRUCTURA_CASE : RCASE EXPRESION RDOSPUNTOS INSTRUCCIONES_INTERNAS -  { $$ = new Case($2,$4,@1.first_line, @1.first_column); } <br>";}        
                | RDEFAULT RDOSPUNTOS INSTRUCCIONES_INTERNAS  { $$ = $3 + "<br> ESTRUCTURA_CASE : RDEFAULT RDOSPUNTOS INSTRUCCIONES_INTERNAS -  { $$ = new Case([],$3,@1.first_line, @1.first_column,true); } <br>";}    
;                 

WHILE  : RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE   { $$ = $3 + $6 + "<br> WHILE : RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE -  { $$ = new While($3,$6,@1.first_line, @1.first_colum); }<br>";}  
;

DO_WHILE  : RDO RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA { $$ = $3 +  $7  +"<br> DO_WHILE : RDO RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA -  { $$ = new DoWhile($7,$3,@1.first_line, @1.first_colum); }<br>";}  
;

FOR : RFOR RIZQPARENTESIS DECLARAR_ASIGNACION RPUNTOYCOMA EXPRESION RPUNTOYCOMA  DECLARAR_ASIGNACION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE  
;

DECLARAR_ASIGNACION : TIPO NAME RASIGNACION EXPRESION       
                    | NAME RASIGNACION EXPRESION            
                    | EXPRESION                             
;

FUNCIONES : TIPO NAME RIZQPARENTESIS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE  { $$ = $1 + $2 + $6 + "<br> FUNCIONES : TIPO NAME RIZQPARENTESIS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE -  { $$ = new Funcion($1,$2,[],$6,@1.first_line, @1.first_column); } <br>";}                      
                | TIPO NAME RIZQPARENTESIS LISTA_DE_ATRIBUTOS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE   { $$ = $1 + $2 + $4 + $7 +"<br> FUNCIONES : TIPO NAME RIZQPARENTESIS LISTA_DE_ATRIBUTOS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE - { $$ = new Funcion($1,$2,$4,$7,@1.first_line, @1.first_column); } <br>";}  
;

TIPO_FUNCION_ATRIBUTO : RPOW     
                      | RSQRT    
                      | RSIN     
                      | RCOS     
                      | RTAN     
;

FUNCION_ARITMETICA  : TIPO_FUNCION_ARITMETICA RIZQPARENTESIS EXPRESION RDERPARENTESIS             
;

INSTRUCCIONES_INTERNAS : INSTRUCCIONES_INTERNAS INSTRUCCION_INTERNA   { $$ = $1 + $2 +"<br> INSTRUCCIONES_INTERNAS : INSTRUCCIONES_INTERNAS INSTRUCCION_INTERNA -   { $1.push($2); $$ = $1;} <br>";}             
                     | INSTRUCCION_INTERNA  { $$ = $1 + "<br> INSTRUCCIONES_INTERNAS : INSTRUCCION_INTERNA -  { $$ = [$1]; } <br>";}                                      
;

INSTRUCCION_INTERNA      : DECLARACION { $$ = $1 + "<br> INSTRUCCION_INTERNA : DECLARACION -  { $$ = $1 } <br>";}                                 
                        | ASIGNACION   { $$ = $1 + "<br> INSTRUCCION_INTERNA : ASIGNACION -  { $$ = $1 } <br>";}                                 
                        | IMPRESION    { $$ = $1 + "<br> INSTRUCCION_INTERNA : IMPRESION -  { $$ = $1 } <br>";}                                 
                        | LLAMADA RPUNTOYCOMA  { $$ = $1 + "<br> INSTRUCCION_INTERNA : LLAMADA RPUNTOYCOMA <br>";}                         
                        | CONDICIONAL_IF        { $$ = $1 + "<br> INSTRUCCION_INTERNA : CONDICIONAL_IF -  { $$ = $1 } <br>";}                              
                        | SWITCH                 { $$ = $1 + "<br> INSTRUCCION_INTERNA : SWITCH -  { $$ = $1 } <br>";}                       
                        | WHILE                   { $$ = $1 + "<br> INSTRUCCION_INTERNA : WHILE -  { $$ = $1 } <br>";}                      
                        | DO_WHILE                 { $$ = $1 + "<br> INSTRUCCION_INTERNA : DO_WHILE -  { $$ = $1 } <br>";}                     
                        | FOR                       { $$ = $1 + "<br> INSTRUCCION_INTERNA : FOR -  { $$ = $1 } <br>";}                    
                        | RRETURN RPUNTOYCOMA         { $$ = "<br> INSTRUCCION_INTERNA : RRETURN RPUNTOYCOMA -  { $$ = new Return([],@1.first_line, @1.first_column); } <br>";}                  
                        | RRETURN EXPRESION RPUNTOYCOMA   { $$ = $2 + "<br> INSTRUCCION_INTERNA : RRETURN EXPRESION RPUNTOYCOMA - { $$ = new Return($2,@1.first_line, @1.first_column); } <br>";}               
                        | RBREAK RPUNTOYCOMA               { $$ = "<br> INSTRUCCION_INTERNA : RBREAK RPUNTOYCOMA - { $$ = new Break(@1.first_line, @1.first_column); } <br>";}               
                        | EXPRESION RINCREMENTORPUNTOYCOMA   { $$ = $1 + "<br> INSTRUCCION_INTERNA : EXPRESION RINCREMENTORPUNTOYCOMA  <br>";}           
                        | EXPRESION RDECREMENTORPUNTOYCOMA   { $$ = $1 + "<br> INSTRUCCION_INTERNA : EXPRESION RDECREMENTORPUNTOYCOMA   <br>";}           
;

EXPRESION : RRESTA EXPRESION %prec UMENOS	{ $$ = $2 + "<br> EXPRESION : RRESTA EXPRESION %prec UMENOS - { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); } <br>";}                      
          | EXPRESION RAMPERSON EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION : EXPRESION RAMPERSON EXPRESION - { $$ = new Operacion($1,$3,Operador.CONCATENACION, @1.first_line, @1.first_column); }   <br>";}	              
          | EXPRESION RPOTENCIA EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RPOTENCIA EXPRESION - { $$ = new Operacion($1,$3,Operador.REPETICION, @1.first_line, @1.first_column); }   <br>";}                 
          | EXPRESION RSUMA EXPRESION     { $$ = $1 + $3 + "<br> EXPRESION : EXPRESION RSUMA EXPRESION  - { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }  <br>";}                             
          | EXPRESION RRESTA EXPRESION		{ $$ = $1 + $3 + "<br> EXPRESION : EXPRESION RRESTA EXPRESION  - { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }	  <br>";}                
          | EXPRESION RMULTIPLICACION EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION : EXPRESION RMULTIPLICACION EXPRESION  - { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }	<br>";}	         
          | EXPRESION RDIVISION EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RDIVISION EXPRESION - { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); } <br>";}                
          | EXPRESION RMODULAR EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RMODULAR EXPRESION - { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }  <br>";}                
          | EXPRESION RMENORQUE EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RMODULAR EXPRESION - { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }  <br>";} 	                    
          | EXPRESION RMAYORQUE EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION : EXPRESION RMAYORQUE EXPRESION - { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }  <br>";} 	                
          | EXPRESION RMENORQUEIGUAL EXPRESION	{ $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RMENORQUEIGUAL EXPRESION -  { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }  <br>";}                
          | EXPRESION RMAYORQUEIGUAL EXPRESION	 { $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RMAYORQUEIGUAL EXPRESION -{ $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }  <br>";}                 
          | EXPRESION RIGUALDAD EXPRESION	  { $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RIGUALDAD EXPRESION - { $$ = new Operacion($1,$3,Operador.IGUAL_IGUAL, @1.first_line, @1.first_column); } <br>";}                 
          | EXPRESION RDIFERENCIA EXPRESION  { $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RDIFERENCIA EXPRESION - { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }  <br>";}                
          | EXPRESION RAND EXPRESION   { $$ = $1 + $3 + "<br> EXPRESION :EXPRESION RAND EXPRESION - { $$ = new Operacion($1,$3,Operador.AND, @1.first_line, @1.first_column); }  <br>";}                      
          | EXPRESION ROR EXPRESION   { $$ = $1 + $3 + "<br> EXPRESION :EXPRESION ROR EXPRESION - { $$ = new Operacion($1,$3,Operador.OR, @1.first_line, @1.first_column); }  <br>";}                                   
          | RNOT EXPRESION { $$ = $2 + "<br> EXPRESION :RNOT EXPRESION - { $$ = new Operacion($2,$2,Operador.NOT, @1.first_line, @1.first_column); }  <br>";} 	   	                          
          | NAME   { $$ = "<br> EXPRESION : NAME -  { $$ = new AccesoName($1, @1.first_line, @1.first_column); } <br>";}                                                                      
          | ENTERO { $$ = "<br> EXPRESION : ENTERO -  { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column); } <br>";}  		                                      
          | DECIMAL		{ $$ = "<br> EXPRESION : DECIMAL -  { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column); } <br>";}  		                                      
          | RTRUE			{ $$ = "<br> EXPRESION : RTRUE -  { $$ = new Primitivo(true,this._$.first_line,this._$.first_column); } <br>";}  	                                    
          | RFALSE	   { $$ = "<br> EXPRESION : RFALSE -  { $$ = new Primitivo(false,this._$.first_line,this._$.first_column); } <br>";}    	                                  
          | CADENA	    { $$ = "<br> EXPRESION : CADENA -  { $$ = new Primitivo($1, @1.first_line, @1.first_column); } <br>";}                                      
          | CARACTER    { $$ = "<br> EXPRESION : CARACTER -  { $$ = new Primitivo($1, @1.first_line, @1.first_column); } <br>";}                                      
          | RNULL    { $$ = "<br> EXPRESION : RNULL -   { $$ = new Primitivo(null, @1.first_line, @1.first_column); } <br>";}                                      
          | NAME RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS { $$ = "<br> EXPRESION : NAME RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS <br>";}  
          | NAME RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS { $$ = $5 +"EXPRESION :  NAME RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROSRDERPARENTESIS <br>";}  
          | CADENA RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS { $$ = "<br> EXPRESION : CADENA RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS <br>";}  
          | CADENA RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS { $$ = $5 +"<br> EXPRESION : CADENA RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS <br>";}  
          | EXPRESION RTERNARIO EXPRESION RDOSPUNTOS EXPRESION  { $$ = $1 + $3 + $5 +"<br> EXPRESION : EXPRESION RTERNARIO EXPRESION RDOSPUNTOS EXPRESION <br>";}          
          | EXPRESION RINCREMENTO  { $$ = $1 +"<br> EXPRESION : EXPRESION RINCREMENTO  <br>";}                                         
          | EXPRESION RDECREMENTO   { $$ = $1 +"<br> EXPRESION : EXPRESION RDECREMENTO <br>";}                                     
          | LLAMADA              { $$ = $1 +"<br> EXPRESION : LLAMADA <br>";}                                       
          | NATIVAS              { $$ = $1 +"<br> EXPRESION : NATIVAS <br>";}                                       
          | FUNCION_ARITMETICA   { $$ = $1 +"<br> EXPRESION : FUNCION_ARITMETICA <br>";}                                       
          | RIZQPARENTESIS EXPRESION RDERPARENTESIS	 { $$ = $2 +"<br> EXPRESION : RIZQPARENTESIS EXPRESION RDERPARENTESIS -  { $$ = $2 }  	<br>";}           	       
;