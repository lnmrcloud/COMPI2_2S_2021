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
"//".*                                 //'.*  // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]   // comentario multiple líneas /* IGNORE */


// EXPRESIONES REGUALES 

[0-9]+("."[0-9]+)\b         return 'DECIMAL'
[0-9]+\b                    return 'ENTERO'

\"[^\"]*\"                 { yytext = yytext.substr(1,yyleng-2); return 'CADENA' }
\'[^\']*\'                 { yytext = yytext.substr(1,yyleng-2); return 'CARACTER' }

([a-zA-Z])[a-zA-Z0-9_]*      return 'NAME'          // ETIQUETAS - NOMBRE DE VARIABLES

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
"void"            return 'RVOID'
"parse"           return 'RPARSE'

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

','                return 'RCOMA'
';'               return 'RPUNTOYCOMA'
'.'                return 'RPUNTO'
':'                 return 'RDOSPUNTOS'

/*

  AGRUPACION ---------------------------------------------------

*/

'('                 return 'RIZQPARENTESIS'
')'                 return 'RDERPARENTESIS'
'['                 return 'RIZQCORCHETE'
']'                 return 'RDERCORCHETE'
'{'                 return 'RIZQLLAVE'
'}'                 return 'RDERLLAVE'

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

'&&'                return 'RAND'
'||'                return 'ROR'
'!'                 return 'RNOT'
'&'                 return 'RAMPERSON'   // CONCATENA CADENAS -  "para" & "caidismo" = "paracaidismo"

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
.                           {console.log("Lexico", yytext,  yylloc.first_line, yylloc.first_column)}

//SECCION DE IMPORTS
%{    
   
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES

%right'RTERNARIO'
%left 'ROR' 
%left 'RAND' 
%left 'RMENORQUE' 'RMENORQUEIGUAL' 'RMAYORQUE' 'RMAYORQUEIGUAL' 'RIGUALDAD' 'RDIFERENCIA'
%left 'RSUMA' 'RRESTA' 'RAMPERSON'
%left 'RMULTIPLICACION' 'rDIVISION' 'RMODULAR' 'RPOTENCIA'
%left UMENOS
%right 'RNOT'
%right 'RINCREMENTO' 'RDECREMENTO'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%

/* Definición de la gramática */
START : INSTRUCCIONES EOF
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION         
              | INSTRUCCION                      
;

INSTRUCCION   : DECLARACION                       
              | ASIGNACION                       
              | IMPREESION                          
              | FUNCIONES
              | CONDICIONAL_IF                           
;

DECLARACION : TIPO NAME 'RASIGNACION' EXPRESION 'RPUNTOYCOMA'                
            | TIPO LISTA_DE_DECLARACION 'RPUNTOYCOMA'                
            | RSTRUCT NAME 'RIZQLLAVE' LISTA_DE_ATRIBUTOS 'RDERLLAVE' 'RPUNTOYCOMA'
            | TIPO 'RIZQCORCHETE' 'RDERCORCHETE' NAME 'RASIGNACION' CUERPO_ARRAY 'RPUNTOYCOMA'
;

LISTA_DE_ATRIBUTOS  : LISTA_DE_ATRIBUTOS 'RCOMA' ATRIBUTO
                    | ATRIBUTO
;

ATRIBUTO : TIPO NAME
         | NAME NAME
;

LISTA_DE_DECLARACION  : LISTA_DE_DECLARACIONES 'RCOMA' NAME       
                      | NAME                               
;

CUERPO_ARRAY  : 'RIZQCORCHETE' LISTA_DE_PARAMETROS'RDERCORCHETE' 
;

ASIGNACION : NAME 'RASIGNACION' EXPRESION 'RPUNTOYCOMA'                         
           | NAME NAME 'RASIGNACION' NAME 'RIZQPARENTESIS' LISTA_DE_PARAMETROS 'RDERPARENTESIS' 'RPUNTOYCOMA'
;

TIPO  : TIPO_PRIMITIVO
;

TIPO_PRIMITIVO :    RINT           
               |    RDOUBLE         
               |    RSTRING         
               |    RBOOLEAN         
               |    RCHAR          
               |    RVOID          
;

IMPRESION : RPRINTLN 'RIZQPARENTESIS' LISTA_IMPRESION 'RDERPARENTESIS' 'RPUNTOYCOMA'
                | RPRINT 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' 'RPUNTOYCOMA'
;

LISTA_IMPRESION : LISTA_IMPRESION 'RCOMA' EXPRESION          
                | EXPRESION                                  
;

LLAMADA         : NAME 'RIZQPARENTESIS' LISTA_DE_PARAMETROS 'RDERPARENTESIS'
                | NAME 'RIZQPARENTESIS' 'RDERPARENTESIS' 
;

LISTA_DE_PARAMETROS : LISTA_DE_PARAMETROS 'RCOMA' EXPRESION
                    | EXPRESION
; 

NATIVAS          : TIPO 'RPUNTO' RPARSE 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'
                 | RTOINT 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'
                 | RTODOUBLE 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'
                 | RSTRING_CAST 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'
                 | RTYPEOF 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'                 
;

CONDICIONAL_IF  : RIF 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' BLOQUE_INSTRUCCIONES                                              
                | RIF 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' BLOQUE_INSTRUCCIONES RELSE CONDICIONAL_IF                 
                | RIF 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' BLOQUE_INSTRUCCIONES RELSE BLOQUE_INSTRUCCIONES
;

BLOQUE_INSTRUCCIONES    : 'RIZQLLAVE' INSTRUCCIONES_INTERNAS 'RDERLLAVE'                                        
                        | DECLARACION
                        | ASIGNACION
                        | IMPRESION
                        | LLAMADA 'RPUNTOYCOMA'
; 

SWITCH  : RSWITCH 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' 'RIZQLLAVE' BLOQUE_SWITCH 'RDERLLAVE'
;

BLOQUE_SWITCH   : BLOQUE_SWITCH ESTRUCTURA_CASE
                | ESTRUCTURA_CASE
;

ESTRUCTURA_CASE : RCASE EXPRESION 'RDOSPUNTOS' INSTRUCCIONES_INTERNAS
                | RDEFAULT EXPRESION 'RDOSPUNTOS' INSTRUCCIONES_INTERNAS
;

WHILE  : RWHILE 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' 'RIZQLLAVE' INSTRUCCIONES_INTERNAS 'RDERLLAVE' 
;

DO_WHILE  : RDO 'RIZQLLAVE' INSTRUCCIONES_INTERNAS 'RDERLLAVE' RWHILE 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS' 'RPUNTOYCOMA'  
;

FOR : RFOR 'RIZQPARENTESIS' DECLARAR_ASIGNACION 'RPUNTOYCOMA' EXPRESION 'RPUNTOYCOMA'  DECLARAR_ASIGNACION 'RDERPARENTESIS' 'RIZQLLAVE' INSTRUCCIONES_INTERNAS 'RDERLLAVE' 
;

DECLARAR_ASIGNACION : TIPO NAME 'RASIGNACION' EXPRESION
                    | NAME 'RASIGNACION' EXPRESION
                    | EXPRESION
;

FUNCIONES : NAME NAME 'RIZQPARENTESIS' 'RDERPARENTESIS' 'RIZQLLAVE' INSTRUCCIONES_INTERNAS 'RDERLLAVE' 
                | NAME NAME 'RIZQPARENTESIS' LISTA_DE_ATRIBUTOS'RDERPARENTESIS' 'RIZQLLAVE'INSTRUCCIONES_INTERNAS 'RDERLLAVE' 
;

TIPO_FUNCION_ATRIBUTO : RPOW
                      | RSQRT
                      | RSIN
                      | RCOS
                      | RTAN
;

FUNCION_ARITMETICA  : TIPO_FUNCION_ARITMETICA 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'
;

INSTRUCCIONES_INTERNAS : INSTRUCCIONES_INTERNAS INSTRUCCION_INTERNA         
                     | INSTRUCCION_INTERNA                             
;

INSTRUCCION_INTERNA      : DECLARACION
                        | ASIGNACION                    
                        | IMPRESION                                    
                        | LLAMADA 'RPUNTOYCOMA'
                        | CONDICIONAL_IF                                        
                        | SWITCH
                        | WHILE
                        | DO_WHILE
                        | FOR
                        | RRETURN 'RPUNTOYCOMA'
                        | RRETURN EXPRESION 'RPUNTOYCOMA'
                        | RBREAK 'RPUNTOYCOMA'
                        | EXPRESION 'RINCREMENTO''RPUNTOYCOMA'
                        | EXPRESION 'RDECREMENTO''RPUNTOYCOMA'
;

EXPRESION : 'RRESTA' EXPRESION %prec UMENOS	        
          | EXPRESION 'RAMPERSON' EXPRESION		         
          | EXPRESION 'RPOTENCIA' EXPRESION	            
          | EXPRESION 'RSUMA' EXPRESION            
          | EXPRESION 'RRESTA' EXPRESION		         
          | EXPRESION 'RMULTIPLICACION' EXPRESION		          
          | EXPRESION 'RDIVISION' EXPRESION	            
          | EXPRESION 'RMODULAR' EXPRESION	            
          
          | EXPRESION 'RMENORQUE' EXPRESION		        
          | EXPRESION 'RMAYORQUE' EXPRESION		        
          | EXPRESION 'RMENORQUEIGUAL' EXPRESION	        
          | EXPRESION 'RMAYORQUEIGUAL' EXPRESION	         
          | EXPRESION 'RIGUALDAD' EXPRESION	        
          | EXPRESION 'RDIFERENCIA' EXPRESION             
          
          | EXPRESION 'RAND' EXPRESION           
          | EXPRESION 'ROR' EXPRESION             
          | 'RNOT' EXPRESION	   	                
          
          | NAME                                  
          | ENTERO		                            
          | DECIMAL				                
          | RTRUE				              
          | RFALSE	     	                   
          | CADENA	                            
          | CARACTER                            
          | RNULL                              
        
          | NAME 'RPUNTO' NAME 'RIZQPARENTESIS' 'RDERPARENTESIS'
          | NAME 'RPUNTO' NAME 'RIZQPARENTESIS' LISTA_DE_PARAMETROS'RDERPARENTESIS'
          | CADENA 'RPUNTO' NAME 'RIZQPARENTESIS' 'RDERPARENTESIS'
          | CADENA 'RPUNTO' NAME 'RIZQPARENTESIS' LISTA_DE_PARAMETROS 'RDERPARENTESIS'
          | EXPRESION 'RTERNARIO' EXPRESION 'RDOSPUNTOS' EXPRESION

          | EXPRESION 'RINCREMENTO'
          | EXPRESION 'RDECREMENTO'       
          | LLAMADA 
          | NATIVAS
          | FUNCION_ARITMETICA
          | 'RIZQPARENTESIS' EXPRESION 'RDERPARENTESIS'	          	    
;