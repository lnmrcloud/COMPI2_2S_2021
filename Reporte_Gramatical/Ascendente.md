### Universidad de San Carlos de Guatemala.
### Compiladores 2
#### Vacacionse Junio 2021
___

### REPORTE GRAMATICAL

## ASCENDENTE

### GRAMATICA

<**START**> ::= <**INSTRUCCIONES**> &#60;EOF&#62;
___
<**INSTRUCCIONES**> ::= <**INSTRUCCIONES**> <**INSTRUCCION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     |   <**INSTRUCCION**> 
___
<**INSTRUCCION**> ::= <**DECLARACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ASIGNACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**IMPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**FUNCIONES**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**SWITCH**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**WHILE**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**DO_WHILE**> 
___
<**DECLARACION**> ::= <**TIPO**> <NAME> <RASIGNACION> <**EXPRESION**> <RPUNTOYCOMA> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**TIPO**> <**LISTA_DE_DECLARACION**> <RPUNTOYCOMA> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <RSTRUCT> &#60;NAME&#62;  &#60;RIZQLLAVE&#62; <**LISTA_DE_ATRIBUTOS**>  &#60;RDERLLAVE&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**TIPO**> &#60;RIZQCORCHETE&#62; &#60;RDERCORCHETE&#62; &#60;NAME&#62;  &#60;RASIGNACION&#62;
<**CUERPO_ARRAY**> &#60;RPUNTOYCOMA&#62; 
___
<**LISTA_DE_ATRIBUTOS**> ::= <**LISTA_DE_ATRIBUTOS**> &#60;RCOMA&#62; <**ATRIBUTO**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**ATRIBUTO**>
___
<**ATRIBUTO**> ::= <**TIPO**> &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;NAME&#62;
___
<**LISTA_DE_DECLARACION**> ::= <**LISTA_DE_DECLARACION**> &#60;RCOMA&#62; &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62;
___
<**CUERPO_ARRAY**> ::= &#60;RIZQCORCHETE&#62; <**LISTA_DE_PARAMETROS**>  &#60;RDERCORCHETE&#62;
___
<**ASIGNACION**> ::= &#60;NAME&#62; &#60;RASIGNACION&#62;  <**EXPRESION**> &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;NAME&#62; &#60;RASIGNACION&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62;<**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; 
___
<**TIPO_PRIMITIVO**> ::=  &#60;RINT&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RDOUBLE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RSTRING_TIPO&#62;\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RBOOLEAN&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RCHAR&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RVOID&#62; 
___
<**IMPRESION**> ::= &#60;RPRINTLN&#62; &#60;RIZQPARENTESIS&#62;  <**LISTA_IMPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RPRINT&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RPRINTLN&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; &#60;RPUNTOYCOMA&#62;
___
<**LISTA_IMPRESION**> ::= <**LISTA_IMPRESION**> &#60;RCOMA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**EXPRESION**>
___
<**LLAMADA**> ::=  &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; <**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; &#60;RDERPARENTESIS&#62;
___
<**LISTA_DE_PARAMETROS**> ::= <**LISTA_DE_PARAMETROS**> &#60;RCOMA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | <**EXPRESION**>
___
<**NATIVAS**> ::= <**TIPO**> &#60;RPUNTO&#62; &#60;RPARSE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTOINT&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTODOUBLE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RSTRING_CAST&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RTYPEOF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60; 
___
<**CONDICIONAL_IF**> ::= &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**>  &#60;RELSE&#62; <**CONDICIONAL_IF**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    | &#60;RIF&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; <**BLOQUE_INSTRUCCIONES**>  &#60;RELSE&#62; <**BLOQUE_INSTRUCCIONES**> 
___
<**BLOQUE_INSTRUCCIONES**> ::=  &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**> &#60;RDERLLAVE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**DECLARACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ASIGNACION**>\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**IMPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**LLAMADA**> &#60;RPUNTOYCOMA&#62; 
___
<**SWITCH**> ::= &#60;RSWITCH&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60;RIZQLLAVE&#62; <**BLOQUE_SWITCH**>  &#60;RDERLLAVE&#62;
___
<**BLOQUE_SWITCH**> ::= <**BLOQUE_SWITCH**> <**ESTRUCTURA_CASE**>  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ESTRUCTURA_CASE**> 
___
<**ESTRUCTURA_CASE**> ::= &#60;RCASE&#62; <**EXPRESION**>  &#60;RDOSPUNTOS &#62; <**INSTRUCCIONES_INTERNAS**>  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |  &#60;RDEFAULT&#62; &#60;RDOSPUNTOS&#62; <**INSTRUCCIONES_INTERNAS**>  
___
<**WHILE**> ::= &#60;RWHILE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62; &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**>  &#60;RDERLLAVE&#62;
___
<**DO_WHILE**> ::= &#60;RDO&#62; &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**>  &#60;RDERLLAVE&#62; &#60;RWHILE&#62; &#60;RIZQPARENTESIS&#62; <**EXPRESION**>  &#60;RDERPARENTESIS&#62;  &#60;RPUNTOYCOMA&#62; 
___
<**FOR**> ::= &#60;RFOR&#62; &#60;RIZQPARENTESIS&#62; <**DECLARAR_ASIGNACION**>  &#60;RPUNTOYCOMA&#62; <**EXPRESION**>  &#60;RPUNTOYCOMA&#62; <**DECLARAR_ASIGNACION**> &#60;RDERPARENTESIS&#62; &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**> &#60;RDERLLAVE&#62; 
___
<**DECLARAR_ASIGNACION**> ::= <**TIPO**> &#60;NAME&#62; &#60;RASIGNACION&#62; <**EXPRESION**>  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; &#60;RASIGNACION&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> 
___
<**FUNCIONES**> ::= <**TIPO**> &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; &#60;RDERPARENTESIS&#62; &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**> &#60;RDERLLAVE&#62;  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**TIPO**> &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; <**LISTA_DE_ATRIBUTOS**> &#60;RDERPARENTESIS&#62; &#60;RIZQLLAVE&#62; <**INSTRUCCIONES_INTERNAS**> &#60;RDERLLAVE&#62;
___
<**TIPO_FUNCION_ARITMETICA**> ::=  &#60;RPOW&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RSQRT&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RSIN&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RCOS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RTAN&#62; 
___
<**FUNCION_ARITMETICA**> ::= <**TIPO_FUNCION_ARITMETICA**> &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; 
___
<**INSTRUCCIONES_INTERNAS**> ::= <**INSTRUCCIONES_INTERNAS**> <**INSTRUCCION_INTERNA**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**INSTRUCCION_INTERNA**> 
___
<**INSTRUCCION_INTERNA**> ::=  <**DECLARACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**ASIGNACION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**IMPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**LLAMADA**> &#60;RPUNTOYCOMA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**CONDICIONAL_IF**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**SWITCH**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**WHILE**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**DO_WHILE**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**FOR**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RRETURN&#62; &#60;RPUNTOYCOMA&#62;  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RRETURN&#62; <**EXPRESION**> &#60;RPUNTOYCOMA&#62;  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RBREAK&#62; &#60;RPUNTOYCOMA&#62;  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RINCREMENTORPUNTOYCOMA&#62;  \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RDECREMENTORPUNTOYCOMA&#62;  
___
<**EXPRESION**> ::=  &#60;RRESTA&#62; <**EXPRESION**> &#60;%prec&#62; &#60;%UMENOS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RAMPERSON&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RPOTENCIA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RSUMA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RRESTA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMULTIPLICACION&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RDIVISION&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMODULAR&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMENORQUE&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMAYORQUE&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMENORQUEIGUAL&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RMENORQUEIGUAL&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RIGUALDAD&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RDIFERENCIA&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RAND&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;ROR&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RNOT&#62; <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;ENTERO&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RTRUE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RFALSE&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;CADENA&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;CARACTER&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RNULL&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; &#60;RPUNTO&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;NAME&#62; &#60;RPUNTO&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62; <**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;CADENA&#62; &#60;RPUNTO&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62;  &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;CADENA&#62; &#60;RPUNTO&#62; &#60;NAME&#62; &#60;RIZQPARENTESIS&#62;  <**LISTA_DE_PARAMETROS**> &#60;RDERPARENTESIS&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RTERNARIO&#62; <**EXPRESION**> &#60;RDOSPUNTOS&#62;  <**EXPRESION**> \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RINCREMENTO&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**EXPRESION**> &#60;RDECREMENTO&#62; \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**LLAMADA**> \  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**NATIVAS**> \ 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   <**FUNCION_ARITMETICA**>  \ 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                      |   &#60;RIZQPARENTESIS&#62; <**EXPRESION**> &#60;RDERPARENTESIS&#62; \ 
___
## License
[MIT](https://choosealicense.com/licenses/mit/)