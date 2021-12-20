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
.                       {console.log("Lexico", yytext,  yylloc.first_line, yylloc.first_column)}

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
START : INSTRUCCIONES EOF    {return new AST($1,$1);} 
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION         { $1.push($2); $$ = $1;}  
              | INSTRUCCION                       { $$ = [$1]; }   
//              | error                             { $$ = new Error("Sintactico", yytext, this._$.first_line, this._$.first_column);console.log("Sintactico", yytext, this._$.first_line, this._$.first_column)}
;

INSTRUCCION   : DECLARACION          { $$ = $1 }                 
              | ASIGNACION           { $$ = $1 }          
              | IMPRESION            { $$ = $1 }             
              | FUNCIONES            { $$ = $1 }
              | CONDICIONAL_IF       { $$ = $1 }    
              | SWITCH               { $$ = $1 }   
              | WHILE                { $$ = $1 } 
              | DO_WHILE             { $$ = $1 } 
;

DECLARACION : TIPO NAME RASIGNACION EXPRESION RPUNTOYCOMA                             { $$ = new Declaracion([$2],$1, @1.first_line, @1.first_column,$4); }    
            | TIPO LISTA_DE_DECLARACION RPUNTOYCOMA                                   { $$ = new Declaracion($2, $1, @1.first_line, @1.first_column); }
            | RSTRUCT NAME RIZQLLAVE LISTA_DE_ATRIBUTOS RDERLLAVE RPUNTOYCOMA
            | TIPO RIZQCORCHETE RDERCORCHETE NAME RASIGNACION CUERPO_ARRAY RPUNTOYCOMA
;

LISTA_DE_ATRIBUTOS  : LISTA_DE_ATRIBUTOS RCOMA ATRIBUTO     { $1.push($3); $$ = $1; }
                    | ATRIBUTO                              { $$ = [$1] }
;

ATRIBUTO : TIPO NAME    { $$ = new Simbolo($1, $2, @1.first_line, @1.first_column); } 
         | NAME NAME
;

LISTA_DE_DECLARACION  : LISTA_DE_DECLARACION RCOMA NAME      { $1.push($3); $$ = $1; }   
                      | NAME                                 { $$ = [$1] }   
;

CUERPO_ARRAY  : RIZQCORCHETE LISTA_DE_PARAMETROS RDERCORCHETE 
;

ASIGNACION : NAME RASIGNACION EXPRESION RPUNTOYCOMA                                                         { $$ = new Asignacion($1, $3, @1.first_line, @1.first_column); }                  
           | NAME NAME RASIGNACION NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS RPUNTOYCOMA
;

TIPO  : TIPO_PRIMITIVO  { $$ = $1 }
;

TIPO_PRIMITIVO :    RINT            { $$ =  Tipo.INT;}         
               |    RDOUBLE         { $$ =  Tipo.DOUBLE;} 
               |    RSTRING_TIPO    { $$ =  Tipo.STRING;}    
               |    RBOOLEAN        { $$ =  Tipo.BOOLEAN;} 
               |    RCHAR           { $$ =  Tipo.CHAR;} 
               |    RVOID           { $$ =  Tipo.VOID;} 
;

IMPRESION       : RPRINTLN RIZQPARENTESIS LISTA_IMPRESION RDERPARENTESIS RPUNTOYCOMA
                | RPRINT RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA            { $$ = new Print($3, @1.first_line, @1.first_column); }
                | RPRINTLN RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA            { $$ = new Println($3, @1.first_line, @1.first_column); }
;

LISTA_IMPRESION : LISTA_IMPRESION RCOMA EXPRESION                  { $1.push($2); $$ = $1;}
                | EXPRESION                                        { $$ = [$1]; }
;

LLAMADA         : NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS
                | NAME RIZQPARENTESIS RDERPARENTESIS 
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

CONDICIONAL_IF  : RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES                             { $$ = new If($3, $5, [],[], @1.first_line, @1.first_column); }                                   
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE CONDICIONAL_IF        { $$ = new If($3, $5, [],[$7], @1.first_line, @1.first_column); }         
                | RIF RIZQPARENTESIS EXPRESION RDERPARENTESIS BLOQUE_INSTRUCCIONES RELSE BLOQUE_INSTRUCCIONES  { $$ = new If($3, $5, $7,[], @1.first_line, @1.first_column); }
;

BLOQUE_INSTRUCCIONES    : RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE                                            { $$ = $2 }                         
                        | DECLARACION
                        | ASIGNACION
                        | IMPRESION
                        | LLAMADA RPUNTOYCOMA
; 

SWITCH  : RSWITCH RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE BLOQUE_SWITCH RDERLLAVE      { $$ = new Switch($3,$6,@1.first_line, @1.first_column); }
;

BLOQUE_SWITCH   : BLOQUE_SWITCH ESTRUCTURA_CASE    { $1.push($2); $$ = $1;}
                | ESTRUCTURA_CASE                  { $$ = [$1]; }
;

ESTRUCTURA_CASE : RCASE EXPRESION RDOSPUNTOS INSTRUCCIONES_INTERNAS         { $$ = new Case($2,$4,@1.first_line, @1.first_column); }
                | RDEFAULT RDOSPUNTOS INSTRUCCIONES_INTERNAS      { $$ = new Case([],$3,@1.first_line, @1.first_column,true); }
;

WHILE  : RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE    { $$ = new While($3,$6,@1.first_line, @1.first_colum); }
;

DO_WHILE  : RDO RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE RWHILE RIZQPARENTESIS EXPRESION RDERPARENTESIS RPUNTOYCOMA  { $$ = new DoWhile($7,$3,@1.first_line, @1.first_colum); }
;

FOR : RFOR RIZQPARENTESIS DECLARAR_ASIGNACION RPUNTOYCOMA EXPRESION RPUNTOYCOMA  DECLARAR_ASIGNACION RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE 
;

DECLARAR_ASIGNACION : TIPO NAME RASIGNACION EXPRESION
                    | NAME RASIGNACION EXPRESION
                    | EXPRESION
;

FUNCIONES : TIPO NAME RIZQPARENTESIS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE                         { $$ = new Funcion($1,$2,[],$6,@1.first_line, @1.first_column); }
                | TIPO NAME RIZQPARENTESIS LISTA_DE_ATRIBUTOS RDERPARENTESIS RIZQLLAVE INSTRUCCIONES_INTERNAS RDERLLAVE  { $$ = new Funcion($1,$2,$4,$7,@1.first_line, @1.first_column); }
;

TIPO_FUNCION_ARITMETICA : RPOW
                      | RSQRT
                      | RSIN
                      | RCOS
                      | RTAN
;

FUNCION_ARITMETICA  : TIPO_FUNCION_ARITMETICA RIZQPARENTESIS EXPRESION RDERPARENTESIS
;

INSTRUCCIONES_INTERNAS : INSTRUCCIONES_INTERNAS INSTRUCCION_INTERNA        { $1.push($2); $$ = $1;} 
                     | INSTRUCCION_INTERNA                                 { $$ = [$1]; }
;

INSTRUCCION_INTERNA     : DECLARACION                       { $$ = $1 }     
                        | ASIGNACION                        { $$ = $1 }
                        | IMPRESION                         { $$ = $1 }           
                        | LLAMADA RPUNTOYCOMA
                        | CONDICIONAL_IF                    { $$ = $1 }                  
                        | SWITCH                            { $$ = $1 }
                        | WHILE                             { $$ = $1 }
                        | DO_WHILE                          { $$ = $1 }
                        | FOR
                        | RRETURN RPUNTOYCOMA               { $$ = new Return([],@1.first_line, @1.first_column); }
                        | RRETURN EXPRESION RPUNTOYCOMA     { $$ = new Return($2,@1.first_line, @1.first_column); }
                        | RBREAK RPUNTOYCOMA                { $$ = new Break(@1.first_line, @1.first_column); }
                        | EXPRESION RINCREMENTORPUNTOYCOMA
                        | EXPRESION RDECREMENTORPUNTOYCOMA
;

EXPRESION : RRESTA EXPRESION %prec UMENOS	                  { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }    
          | EXPRESION RAMPERSON EXPRESION		                { $$ = new Operacion($1,$3,Operador.CONCATENACION, @1.first_line, @1.first_column); }
          | EXPRESION RPOTENCIA EXPRESION	                  { $$ = new Operacion($1,$3,Operador.REPETICION, @1.first_line, @1.first_column); }	
          | EXPRESION RSUMA EXPRESION                       { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }
          | EXPRESION RRESTA EXPRESION		                  { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }	
          | EXPRESION RMULTIPLICACION EXPRESION		          { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }
          | EXPRESION RDIVISION EXPRESION	                  { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); } 
          | EXPRESION RMODULAR EXPRESION	                  { $$ = new Operacion($1,$3,Operador.MODULO, @1.first_line, @1.first_column); }   
          | EXPRESION RMENORQUE EXPRESION		                        { $$ = new Operacion($1,$3,Operador.MENOR_QUE, @1.first_line, @1.first_column); }
          | EXPRESION RMAYORQUE EXPRESION		                        { $$ = new Operacion($1,$3,Operador.MAYOR_QUE, @1.first_line, @1.first_column); }
          | EXPRESION RMENORQUEIGUAL EXPRESION	                    { $$ = new Operacion($1,$3,Operador.MENOR_IGUA_QUE, @1.first_line, @1.first_column); }
          | EXPRESION RMAYORQUEIGUAL EXPRESION	                    { $$ = new Operacion($1,$3,Operador.MAYOR_IGUA_QUE, @1.first_line, @1.first_column); }
          | EXPRESION RIGUALDAD EXPRESION	                          { $$ = new Operacion($1,$3,Operador.IGUAL_IGUAL, @1.first_line, @1.first_column); }
          | EXPRESION RDIFERENCIA EXPRESION                         { $$ = new Operacion($1,$3,Operador.DIFERENTE_QUE, @1.first_line, @1.first_column); }
          | EXPRESION RAND EXPRESION                        { $$ = new Operacion($1,$3,Operador.AND, @1.first_line, @1.first_column); }
          | EXPRESION ROR EXPRESION                         { $$ = new Operacion($1,$3,Operador.OR, @1.first_line, @1.first_column); }
          | RNOT EXPRESION	   	                                    { $$ = new Operacion($2,$2,Operador.NOT, @1.first_line, @1.first_column); }
          | NAME                                                                          { $$ = new AccesoName($1, @1.first_line, @1.first_column); }
          | ENTERO		                                                                    { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column); }		
          | DECIMAL				                                                                { $$ = new Primitivo(Number($1), this._$.first_line, this._$.first_column); }
          | RTRUE				                                                                  { $$ = new Primitivo(true,this._$.first_line,this._$.first_column); }
          | RFALSE	     	                                                                { $$ = new Primitivo(false,this._$.first_line,this._$.first_column); }
          | CADENA	                                                                      { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
          | CARACTER                                                                      { $$ = new Primitivo($1, @1.first_line, @1.first_column); }
          | RNULL                                                                         { $$ = new Primitivo(null, @1.first_line, @1.first_column); }
          | NAME RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS
          | NAME RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS
          | CADENA RPUNTO NAME RIZQPARENTESIS RDERPARENTESIS
          | CADENA RPUNTO NAME RIZQPARENTESIS LISTA_DE_PARAMETROS RDERPARENTESIS
          | EXPRESION RTERNARIO EXPRESION RDOSPUNTOS EXPRESION
          | EXPRESION RINCREMENTO
          | EXPRESION RDECREMENTO       
          | LLAMADA 
          | NATIVAS
          | FUNCION_ARITMETICA
          | RIZQPARENTESIS EXPRESION RDERPARENTESIS	       { $$ = $2 }  	    
          ;