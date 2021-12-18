### Universidad de San Carlos de Guatemala.
### Compiladores 2
#### Vacacionse Junio 2021
___

### REPORTE GRAMATICAL

## ASCENDENTE

### GRAMATICA

<**START**> ::= <**INSTRUCCIONES**> &#60;EOF&#62;

<**INSTRUCCIONES**> ::= <**INSTRUCCIONES**> <**INSTRUCCION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     |   <**INSTRUCCION**> 

<**INSTRUCCION**> ::= <**DECLARACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ASIGNACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**IMPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**FUNCIONES**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**SWITCH**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**WHILE**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**DO_WHILE**> 

<**DECLARACION**> ::= <**TIPO**> <NAME> <RASIGNACION> <**EXPRESION**> <RPUNTOYCOMA> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**TIPO**> <**LISTA_DE_DECLARACION**> <RPUNTOYCOMA> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <RSTRUCT> &#60;NAME&#62;  &#60;RIZQLLAVE&#62; <**LISTA_DE_ATRIBUTOS**>  &#60;RDERLLAVE&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**TIPO**> &#60;RIZQCORCHETE&#62; &#60;RDERCORCHETE&#62; &#60;NAME&#62;  &#60;RASIGNACION&#62;<**CUERPO_ARRAY**> &#60;RPUNTOYCOMA&#62; 

<**LISTA_DE_ATRIBUTOS**> ::= <**LISTA_DE_ATRIBUTOS**> &#60;RCOMA&#62; <**ATRIBUTO**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**ATRIBUTO**>

<**ATRIBUTO**> ::= <**TIPO**> &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;NAME&#62;

<**LISTA_DE_DECLARACION**> ::= <**LISTA_DE_DECLARACION**> &#60;RCOMA&#62; &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62;

<**CUERPO_ARRAY**> ::= &#60;RIZQCORCHETE&#62; <**LISTA_DE_PARAMETROS**>  &#60;RDERCORCHETE&#62;

<**ASIGNACION**> ::= &#60;NAME&#62; &#60;RASIGNACION&#62;  <**EXPRESION**> &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;NAME&#62; &#60;RASIGNACION&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62;<**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; 

<**TIPO_PRIMITIVO**> ::=  &#60;RINT&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RDOUBLE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RSTRING_TIPO&#62;\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RBOOLEAN&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RCHAR&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RVOID&#62; 

<**IMPRESION**> ::= &#60;RPRINTLN&#62; &#60;RIZQPARENTESIS&#62;  <**LISTA_IMPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RPRINT&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RPRINTLN&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62;

<**LISTA_IMPRESION**> ::= <**LISTA_IMPRESION**> &#60;RCOMA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**EXPRESION**>

<**LLAMADA**> ::=  &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; <**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; &#60;RDERPARENTESIS&#62;

<**LISTA_DE_PARAMETROS**> ::= <**LISTA_DE_PARAMETROS**> &#60;RCOMA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**EXPRESION**>

<**NATIVAS**> ::= <**TIPO**> &#60;RPUNTO&#62; &#60;RPARSE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTOINT&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTODOUBLE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RSTRING_CAST&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTYPEOF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; 

<**CONDICIONAL_IF**> ::= &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**>  &#60;RELSE&#62; <**CONDICIONAL_IF**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**>  &#60;RELSE&#62; <**BLOQUE_INSTRUCCIONES**> 

<**BLOQUE_INSTRUCCIONES**> ::=  &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**> &#60;RDERLLAVE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**DECLARACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ASIGNACION**>\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**IMPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**LLAMADA**> &#60;RPUNTOYCOMA&#62; 


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
## License
[MIT](https://choosealicense.com/licenses/mit/)