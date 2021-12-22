// -------------------------------- LEXICO --------------------------------
%lex
%options case-insensitive
%option yylineno

/* EXPRESIONES REGULARES */
//--> Numericos
num             [0-9]+
dec             [0-9]+("."[0-9]+)\b
identificador   [a-zñA-ZÑ_][a-zA-Z0-9Ññ_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")
//--> Caracter
escapechar2  [\\ntr]
escape2      \\{escapechar2}
aceptada2    [^\'\\]
caracter     (\'({escape2}|{aceptada2})\')

%%

/* COMENTARIOS */
"//".*                                      {/*Se ignoran los comentarios*/}
"/*"((\*+[^/*])|([^*]))*\**"*/"             {/*Se ignoran los comentarios multilinea*/}

/* SIMBOLOS DEL PROGRAMA */
"++"                                        {console.log("Reconocio: " + yytext); return 'sim_Incremento';}
"--"                                        {console.log("Reconocio: " + yytext); return 'sim_Decremento';}
"["                                         {console.log("Reconocio: " + yytext); return 'sim_CorcheteApertura';}
"]"                                         {console.log("Reconocio: " + yytext); return 'sim_CorcheteCierre';}
"("                                         {console.log("Reconocio: " + yytext); return 'sim_ParentesisApertura';}
")"                                         {console.log("Reconocio: " + yytext); return 'sim_ParentesisCierre';}
"?"                                         {console.log("Reconocio: " + yytext); return 'sim_Interrogacion';}
":"                                         {console.log("Reconocio: " + yytext); return 'sim_DosPuntos';}
","                                         {console.log("Reconocio: " + yytext); return 'sim_Coma';}
"."                                         {console.log("Reconocio: " + yytext); return 'sim_Punto';}


//Operadores Aritmeticos
"*"                                         {console.log("Reconocio: " + yytext); return 'sim_Multiplicacion';}
"/"                                         {console.log("Reconocio: " + yytext); return 'sim_Division';}
"-"                                         {console.log("Reconocio: " + yytext); return 'sim_Menos';}
"+"                                         {console.log("Reconocio: " + yytext); return 'sim_Mas';}
"^"                                         {console.log("Reconocio: " + yytext); return 'sim_Potencia';}
"#"                                         {console.log("Reconocio: " + yytext); return 'sim_Numeral';}
"$"                                         {console.log("Reconocio: " + yytext); return 'sim_Dolar';}
"%"                                         {console.log("Reconocio: " + yytext); return 'sim_Modulo';}


//Operadores Relacionales
"=="                                        {console.log("Reconocio: " + yytext); return 'sim_Igualacion';}
"="                                         {console.log("Reconocio: " + yytext); return 'sim_Igual';}
"!="                                        {console.log("Reconocio: " + yytext); return 'sim_Diferenciacion';}
"<="                                        {console.log("Reconocio: " + yytext); return 'sim_MenorIgualQue';}
"<"                                         {console.log("Reconocio: " + yytext); return 'sim_MenorQue';}
">="                                        {console.log("Reconocio: " + yytext); return 'sim_MayorIgualQue';}
">"                                         {console.log("Reconocio: " + yytext); return 'sim_MayorQue';}


//Operadores Lógicos
"||"                                        {console.log("Reconocio: " + yytext); return 'sim_OR';}
"&&"                                        {console.log("Reconocio: " + yytext); return 'sim_AND';}
"!"                                         {console.log("Reconocio: " + yytext); return 'sim_NOT';}

"&"                                         {console.log("Reconocio: " + yytext); return 'sim_Ampersand';}

/* PALABRAS RESERVADAS */
"null"                                      {console.log("Reconocio: " + yytext); return 'res_Null';}


//Tipos de Datos
"int"                                       {console.log("Reconocio: " + yytext); return 'res_Int';}
"double"                                    {console.log("Reconocio: " + yytext); return 'res_Double';}
"boolean"                                   {console.log("Reconocio: " + yytext); return 'res_Boolean';}
"char"                                      {console.log("Reconocio: " + yytext); return 'res_Char';}
"string"                                    {console.log("Reconocio: " + yytext); return 'res_String';}
"void"                                      {console.log("Reconocio: " + yytext); return 'res_Void';}

//Declaración
"true"                                      {console.log("Reconocio: " + yytext); return 'res_True';}
"false"                                     {console.log("Reconocio: " + yytext); return 'res_False';}

//Nativas
"pow"                                       {console.log("Reconocio: " + yytext); return 'res_Pow';}
"sin"                                       {console.log("Reconocio: " + yytext); return 'res_Sin';}
"log10"                                     {console.log("Reconocio: " + yytext); return 'res_Log10';}
"cos"                                       {console.log("Reconocio: " + yytext); return 'res_Cos';}
"tan"                                       {console.log("Reconocio: " + yytext); return 'res_Tan';}
"sqrt"                                      {console.log("Reconocio: " + yytext); return 'res_Sqrt';}

//Cadenas
"caracterOfPosition"                        {console.log("Reconocio: " + yytext); return 'res_CaracterOfPosition';}
"subString"                                 {console.log("Reconocio: " + yytext); return 'res_SubString';}
"length"                                    {console.log("Reconocio: " + yytext); return 'res_Length';}
"toUppercase"                               {console.log("Reconocio: " + yytext); return 'res_ToUppercase';}
"toLowercase"                               {console.log("Reconocio: " + yytext); return 'res_ToLowercase';}

//Sentencias de control
"if"                                        {console.log("Reconocio: " + yytext); return 'res_If';}
"else"                                      {console.log("Reconocio: " + yytext); return 'res_Else';}
"switch"                                    {console.log("Reconocio: " + yytext); return 'res_Switch';}
"case"                                      {console.log("Reconocio: " + yytext); return 'res_Case';}
"default"                                   {console.log("Reconocio: " + yytext); return 'res_Default';}
"do"                                        {console.log("Reconocio: " + yytext); return 'res_Do';}
"while"                                     {console.log("Reconocio: " + yytext); return 'res_While';}
"for"                                       {console.log("Reconocio: " + yytext); return 'res_For';}
"in"                                        {console.log("Reconocio: " + yytext); return 'res_In';}


//Sentencias de transferencia
"break"                                     {console.log("Reconocio: " + yytext); return 'res_Break';}
"continue"                                  {console.log("Reconocio: " + yytext); return 'res_Continue';}
"return"                                    {console.log("Reconocio: " + yytext); return 'res_Return';}


//Funcion Print
"print"                                     {console.log("Reconocio: " + yytext); return 'res_Print';}
"println"                                   {console.log("Reconocio: " + yytext); return 'res_PrintLn';}

//Funciones
//"function"                                  {console.log("Reconocio: " + yytext); return 'res_Function';}


//struct
"struct"                                    {console.log("Reconocio: " + yytext); return 'res_Struct';}


//Funciones Nativas
"parse"                                     {console.log("Reconocio: " + yytext); return 'res_Parse';}
"toint"                                     {console.log("Reconocio: " + yytext); return 'res_ToInt';}
"todouble"                                  {console.log("Reconocio: " + yytext); return 'res_ToDouble';}
"typeof"                                    {console.log("Reconocio: " + yytext); return 'res_Typeof';}

//Arreglos
"begin"                                     {console.log("Reconocio: " + yytext); return 'res_Begin';}
"end"                                       {console.log("Reconocio: " + yytext); return 'res_End';}
"push"                                      {console.log("Reconocio: " + yytext); return 'res_Push';}
"pop"                                       {console.log("Reconocio: " + yytext); return 'res_Pop';}

//Ejecucion
"main"                                      {console.log("Reconocio: " + yytext); return 'res_Main';}


//Caracteres de finalización
";"                                         {console.log("Reconocio: " + yytext); return 'sim_PuntoComa';}
//[\n]                                        {console.log("Reconocio: " + yytext); return 'sim_SaltoLinea';}


//encapsulamiento de sentencias
"{"                                         {console.log("Reconocio: " + yytext); return 'sim_LlaveApertura';}
"}"                                         {console.log("Reconocio: " + yytext); return 'sim_LlaveCierre';}

/* SIMBOLOS ER */
{dec}                                       {console.log("Reconocio: " + yytext); return 'ER_DECIMAL';}
{num}                                       {console.log("Reconocio: " + yytext); return 'ER_ENTERO';}
{identificador}                             {console.log("Reconocio: " + yytext); return 'ER_ID';}
{cadena}                                    {console.log("Reconocio: " + yytext); return 'ER_CADENA';}
{caracter}                                  {console.log("Reconocio: " + yytext); return 'ER_CHAR';}


/* ESPACIOS */
[\s\r\n\t]                                  {/*Se ignoran los espacios*/}


<<EOF>>                                     return 'EOF'

/* ERRORES LEXICOS */
.                                           {
                                            console.log("Error Lexico: " + yytext + ", linea: " + (yylineno + 1) + ", columna: " + (yylloc.last_column + 1));
                                            new errores.default("LEXICO", "El caracter " + yytext + " no es parte del lenguaje", yylineno + 1, yylloc.last_column + 1);
                                            }

/lex

/* AREA DE IMPORTS */
%{

    // importaciones
    // import principal from './traducciones/encabezados.js';

    // consla para responder con condigo de 3D
    var consola = '';


    // contador para manejo de Teomporales Tn
    // var contador = 0 ;
    var contador = 5;

    // contador para manejar etiquetas
    var etiquetas = 0;

    // puntero externo para saber donde esta el valor del id en la pila 
    var punteroStack = 0;
    var punteroStackTemporal = 0;

    // puntero externo para tener control sobre la pila heap
    var punteroHeap = 0;
            

    // listado de variable-identificador
    var listado = [];
    function addList(id,value){
        return {
            id: id,
            value: value
        }
    }

    // estructura para guardado de variables
    var variables = [];
    function addVariables(id,value,posicion){
        return {
            id: id,
            value: value,
            posicion: posicion
        }
    }

    // 
    var listadoDeclaraciones = [];
 
%}

/* PRECEDENCIA DE OPERADORES */
%right 'sim_Interrogacion'
%left 'sim_OR'//NIVEL9
%left 'sim_AND'//NIVEL8
%right 'sim_NOT'//NIVEL7
%left 'sim_Potencia' //NIVEL6
%left 'sim_Ampersand'//NIVEL5
%left 'sim_Igualacion', 'sim_Diferenciacion', 'sim_MenorQue', 'sim_MenorIgualQue', 'sim_MayorQue', 'sim_MayorIgualQue' //NIVEL 4
%left 'sim_Mas', 'sim_Menos' //NIVEL 3
%left 'sim_Division','sim_Multiplicacion', 'sim_Modulo' //NIVEL 2
%nonassoc 'sim_Potencia' //NIVEL 1
%right 'UNARIO' //NIVEL 0

%start INICIO

%% /* INICIA GRAMATICA */

INICIO
    : INSTRUCCIONES EOF
        {
            console.log(variables);
            return principal($1,contador);
        }
    ;

INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION     {$$ = `${$1} \n${$2}`;}
    | INSTRUCCION                   {$$ = $1;}
    ;


INSTRUCCION
    : DECLARACION_VARIABLES sim_PuntoComa   {}
    | ASIGNACION_VARIABLES sim_PuntoComa    {}
    | SENTENCIA_IF                          {}
    | SENTENCIA_IF_SIN_LLAVES               {}
    | SENTENCIA_SWITCH                      {}
    | SENTENCIA_WHILE                       {}
    | SENTENCIA_DOWHILE                     {}
    | SENTENCIA_FOR                         {}
    | SENTENCIA_FOR_IN                      {}
    | res_Break sim_PuntoComa               {}
    | res_Continue sim_PuntoComa            {}
    | res_Return sim_PuntoComa              {}
    | res_Return EXPRE sim_PuntoComa        {}
    | ARREGLO                               {}
    | PRINT                                 {$$ = $1;}
    | PRINTLN                               {$$ = $1;}
    | FUNCIONES                             {}
    | STRUCT                                {}
    | LLAMADA sim_PuntoComa                 {}
    | error                             {
                                            console.log("Error Sintactico: " + yytext + ", linea: " + this._$.first_line + ", columna: " + this._$.first_column);
                                        }
    ;

ARREGLO
    //Declaracion
    : TIPO sim_CorcheteApertura sim_CorcheteCierre ER_ID sim_Igual sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre sim_PuntoComa  {}
    | TIPO sim_CorcheteApertura sim_CorcheteCierre ER_ID sim_Igual EXPRE sim_PuntoComa                                                  {}
    //Asignacion
    | ER_ID sim_CorcheteApertura EXPRE sim_CorcheteCierre sim_Igual EXPRE sim_PuntoComa                                                 {}
    //Push
    | ER_ID sim_Punto res_Push sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_PuntoComa                                          {}
    //Pop
    | ER_ID sim_Punto res_Pop sim_ParentesisApertura sim_ParentesisCierre sim_PuntoComa                                                 {}
    ;

LISTA_ARREGLO
    : LISTA_ARREGLO sim_Coma sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre      {}
    | sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre                             {}
    | LISTA_ARREGLO sim_Coma EXPRE                                                      {}
    | EXPRE                                                                             {}
    ;

RETORNAR
    : res_Return sim_PuntoComa          {}
    | res_Return EXPRE sim_PuntoComa    {}
    ;

SENTENCIA_FOR_IN
    : res_For ER_ID res_In EXPRE sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre    {}
    ;

SENTENCIA_FOR
    : res_For sim_ParentesisApertura DECLARACION_VARIABLES sim_PuntoComa EXPRE sim_PuntoComa ACTUALIZACION sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {}
    | res_For sim_ParentesisApertura ASIGNACION_VARIABLES sim_PuntoComa EXPRE sim_PuntoComa ACTUALIZACION sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {}
    ;
/*
SENTECIA_FOR_VARIABLES
    : TIPO LISTA_SIMBOLOS                       {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, null));}
    | ER_ID sim_Igual EXPRE                     {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, $3));}
    ;
*/
ACTUALIZACION
    : ER_ID sim_Igual EXPRE {}
    | ER_ID sim_Incremento  {}
    | ER_ID sim_Decremento  {}
    ;

SENTENCIA_DOWHILE
    : res_Do sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_While sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_PuntoComa {}
    ;

SENTENCIA_WHILE
    : res_While sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {}
    ;

SENTENCIA_SWITCH
    : res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura CASES_LIST DEFAULT sim_LlaveCierre {}
    | res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura CASES_LIST sim_LlaveCierre         {}
    | res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura DEFAULT sim_LlaveCierre            {}
    ;

CASES_LIST
    : CASES_LIST res_Case EXPRE sim_DosPuntos INSTRUCCIONES     {}
    | res_Case EXPRE sim_DosPuntos INSTRUCCIONES                {}
    ;

DEFAULT
    : res_Default sim_DosPuntos INSTRUCCIONES   {}
    ;

SENTENCIA_IF_SIN_LLAVES
    : res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre INSTRUCCION_UNICA                            {}
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre INSTRUCCION_UNICA res_Else INSTRUCCION_UNICA {}
    ;

INSTRUCCION_UNICA
    : DECLARACION_VARIABLES sim_PuntoComa   {}
    | ASIGNACION_VARIABLES sim_PuntoComa    {}
    | res_Break sim_PuntoComa               {}
    | res_Continue sim_PuntoComa            {}
    | RETORNAR                              {}
    | ARREGLO                               {}
    | PRINT                                 {}
    | PRINTLN                               {}
    | LLAMADA sim_PuntoComa                 {}
    ;

SENTENCIA_IF
    : res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre  
    {
        // console.log($3);
        // let retornoIf;        
        // retornoIf = sentenciaIF(etiquetas,$3,$6);
        // etiquetas = retornoIf[0]; $$ = retornoIf[1];

        // console.log($6);
        // let retornoIf;
        // retornoIf = pruebaIF($3,$6,etiquetas);
        // $$ = retornoIf[0];
    }
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_Else sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre 
    {
        // if else
        console.log($3);
        let retornoifelse;
        retornoifelse = ifelse(etiquetas,$3,$6,$10); 
        etiquetas = retornoifelse[0];
        $$ = retornoifelse[1];
        // $$ = $3;
    }
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_Else SENTENCIA_IF {}
    ;

LLAMADA
    : ER_ID sim_ParentesisApertura sim_ParentesisCierre                     {}
    | ER_ID sim_ParentesisApertura PARAMETROS_LLAMADA sim_ParentesisCierre  {}
    ;

PARAMETROS_LLAMADA
    : PARAMETROS_LLAMADA sim_Coma EXPRE     {}
    | EXPRE                                 {}
    ;

STRUCT
    : res_Struct ER_ID sim_LlaveApertura sim_LlaveCierre sim_PuntoComa                         {}
    | res_Struct ER_ID sim_LlaveApertura LISTA_ATRIBUTOS_STRUCT sim_LlaveCierre sim_PuntoComa  {}
    //Asignacion de variables struct
    | ER_ID sim_Punto ER_ID sim_Igual EXPRE sim_PuntoComa               {}
    ;

LISTA_ATRIBUTOS_STRUCT
    : LISTA_ATRIBUTOS_STRUCT VARIABLES_STRUCT               {} 
    | VARIABLES_STRUCT                                      {}
    ;

VARIABLES_STRUCT
    : TIPO ER_ID sim_Coma       {}
    | TIPO ER_ID                {}
    | ER_ID ER_ID sim_Coma      {}
    | ER_ID ER_ID               {}
    ;

DECLARACION_VARIABLES
    : TIPO LISTA_SIMBOLOS 
    {
        if($2 === 'null'){
            // console.log('una declaracion sin asginaciones');
            console.log(punteroStackTemporal);
            if(punteroStackTemporal > 0){
                let retornoMultipleDeclaracionesVacias;
                retornoMultipleDeclaracionesVacias = declarcionMultipleVacia(punteroStackTemporal,$1);
                // punteroStack = retornoMultipleDeclaracionesVacias[0];
                $$ = retornoMultipleDeclaracionesVacias[0];
                break;
            } else {
                let retornoDeclaracionVacia;
                retornoDeclaracionVacia = declarcionVacia(punteroStack,$1);
                punteroStack = retornoDeclaracionVacia[0];
                $$ = retornoDeclaracionVacia[1];
                break;
            }
        } else {
            // console.log('una declaracion con asignacion');
            let retornoDeclaracion;
            retornoDeclaracion = declaracion(punteroStack,$1,$2);
            punteroStack = retornoDeclaracion[0];
            $$ = retornoDeclaracion[1];
            break;
        }       
    }
    //Asignacion de Struct
    | ER_ID LISTA_SIMBOLOS {}
    ;

ASIGNACION_VARIABLES
    : ER_ID sim_Igual EXPRE       {}
    | ER_ID sim_Incremento        {}
    | ER_ID sim_Decremento        {}
    ;

FUNCIONES
    //MAIN
    : res_Void res_Main sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre             {$$ = $6;}
    //RESTO DE METODOS
    | res_Void ER_ID sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre                {}
    | res_Void ER_ID sim_ParentesisApertura PARAMETROS sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre     {}
    | TIPO ER_ID sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre                    {}
    | TIPO ER_ID sim_ParentesisApertura PARAMETROS sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre         {}
    ;

PARAMETROS
    : PARAMETROS sim_Coma TIPO ER_ID    {}
    | PARAMETROS sim_Coma ER_ID         {}
    | TIPO ER_ID                        {}
    | ER_ID                             {}
    ;

TIPO
    : res_Int       {$$ = 'int';}
    | res_Double    {$$ = 'double';}
    | res_Boolean   {}
    | res_Char      {}
    | res_String    {$$ = 'string';}
    ;

LISTA_SIMBOLOS
    : ER_ID                                         {variables.push(addVariables(`${$1}`,0.0,punteroStack)); punteroStack++; $$ = 'null';}
    | ER_ID sim_Igual EXPRE                         {variables.push(addVariables(`${$1}`,$3,punteroStack)); $$=$3;}
    //Struct
    | ER_ID sim_Coma LISTA_SIMBOLOS                 
    {        
        variables.push(addVariables(`${$1}`,0.0,punteroStack));  
        punteroStack++;      
        punteroStackTemporal++;
        $$ =$3;
    }
    ;



PRINT
    : res_Print sim_ParentesisApertura IMPRIMIR_VARIOS sim_ParentesisCierre sim_PuntoComa 
    {   
        if(typeof $3 === 'object'){
            // console.log('entro un objeto');
            $$ = impresionExpresiones(contador,$3[1]);
            break;
        } else {
            let retornoprint;
            retornoprint = impresion(punteroStack,contador,$3,variables);
            punteroStack = retornoprint[0];
            contador = retornoprint[1];
            $$ = retornoprint[2];
            break;
        }
    }
    ;




PRINTLN
    : res_PrintLn sim_ParentesisApertura IMPRIMIR_VARIOS sim_ParentesisCierre sim_PuntoComa   
    {
        if(typeof $3 === 'object'){
            // console.log('entro un objeto');
            $$ = impresionExpresionesln(contador,$3[1]);
            break;
        } else {
            let retornoprintln;
            retornoprintln = impresionln(punteroStack,contador,$3,variables);
            console.log(retornoprintln);
            punteroStack = retornoprintln[0];
            contador = retornoprintln[1];
            $$ = retornoprintln[2];
            break;
        }
        if ($3 === '') {$$ = ''; break;}
    }
    ;

IMPRIMIR_VARIOS
    : IMPRIMIR_VARIOS sim_Coma EXPRE    {$$ = '';}
    | EXPRE                             {$$ = $1;}
    ;

EXPRE
    : EXPRE sim_OR EXPRE    {}
    | EXPRE sim_AND EXPRE   
    {
        console.log(typeof $1);
        console.log(typeof $3);
        console.log($1);
        console.log($3);
        console.log(comparador_and($1,$3));
        $$ = comparador_and($1,$3);
    }
    | sim_NOT EXPRE         {}

    | EXPRE sim_Igualacion EXPRE        
    {
        let retornoIgual; 
        retornoIgual = igualIgual(contador,etiquetas,$1,$3,variables);
        contador=retornoIgual[0];
        etiquetas=retornoIgual[1];
        console.log(retornoIgual);
        $$ = retornoIgual;
    }
    | EXPRE sim_Diferenciacion EXPRE    {}
    | EXPRE sim_MenorQue EXPRE          {}
    | EXPRE sim_MenorIgualQue EXPRE     {}
    | EXPRE sim_MayorQue EXPRE          {let retornoMayor = mayorQue(contador,$1,$3); $$ =retornoMayor;}
    | EXPRE sim_MayorIgualQue EXPRE     {}

        
    | EXPRE sim_Mas EXPRE               {let retornoSuma = suma(contador,$1,$3); contador=retornoSuma[0]; $$=retornoSuma;}
    | EXPRE sim_Menos EXPRE             {let retornoResta = resta(contador,$1,$3); contador=retornoResta[0]; $$=retornoResta;}
    | EXPRE sim_Multiplicacion EXPRE    {let retornoMultiplicacion = multiplicacion(contador,$1,$3); contador=retornoMultiplicacion[0];$$=retornoMultiplicacion;}   
    | EXPRE sim_Division EXPRE          {let retornoDivision = division(contador,$1,$3); contador=retornoDivision[0]; $$=retornoDivision;}
    | EXPRE sim_Modulo EXPRE            {let retornoModulo = modulo(contador,$1,$3); contador=retornoModulo[0]; $$=retornoModulo;}
    | sim_Menos EXPRE %prec UNARIO      {let retornoUnario = unario(contador,$2); contador=retornoUnario[0]; $$=retornoUnario;}
    | sim_ParentesisApertura EXPRE sim_ParentesisCierre {$$ = $2;}

    | res_Pow sim_ParentesisApertura EXPRE sim_Coma EXPRE sim_ParentesisCierre  {}
    | res_Sin sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {}
    | res_Log10 sim_ParentesisApertura EXPRE sim_ParentesisCierre               {}
    | res_Cos sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {}
    | res_Tan sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {}
    | res_Sqrt sim_ParentesisApertura EXPRE sim_ParentesisCierre                {}

    | EXPRE sim_Ampersand EXPRE {}
    | EXPRE sim_Potencia EXPRE  {}
    | ER_ID sim_Punto res_CaracterOfPosition sim_ParentesisApertura EXPRE sim_ParentesisCierre          {}
    | ER_ID sim_Punto res_SubString sim_ParentesisApertura EXPRE sim_Coma EXPRE sim_ParentesisCierre    {}
    | ER_ID sim_Punto res_Length sim_ParentesisApertura sim_ParentesisCierre                            {}
    | ER_ID sim_Punto res_ToUppercase sim_ParentesisApertura sim_ParentesisCierre                       {}
    | ER_ID sim_Punto res_ToLowercase sim_ParentesisApertura sim_ParentesisCierre                       {}

    | EXPRE sim_Interrogacion EXPRE sim_DosPuntos EXPRE {}

    | res_Int sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                     {}
    | res_Double sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                  {}
    | res_Boolean sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {}
    | res_ToInt sim_ParentesisApertura EXPRE sim_ParentesisCierre                                       {}
    | res_ToDouble sim_ParentesisApertura EXPRE sim_ParentesisCierre                                    {}
    | res_String sim_ParentesisApertura EXPRE sim_ParentesisCierre                                      {}
    | res_String sim_ParentesisApertura sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre sim_ParentesisCierre  {}
    | res_Typeof sim_ParentesisApertura EXPRE sim_ParentesisCierre                                      {}

    | sim_Numeral ER_ID                                                                                 {}
    | ER_ID sim_CorcheteApertura EXPRE sim_CorcheteCierre                                               {}
    | ER_ID sim_CorcheteApertura res_Begin sim_DosPuntos res_End sim_CorcheteCierre                     {}
    | ER_ID sim_CorcheteApertura res_Begin sim_DosPuntos EXPRE sim_CorcheteCierre                       {}
    | ER_ID sim_CorcheteApertura EXPRE sim_DosPuntos res_End sim_CorcheteCierre                         {}
    | ER_ID sim_CorcheteApertura EXPRE sim_DosPuntos EXPRE sim_CorcheteCierre                           {}
    | ER_ID sim_Punto res_Pop sim_ParentesisApertura sim_ParentesisCierre                               {}

    | LLAMADA   {}
    | VAL       {$$ = $1;}
    ;

VAL
    : ER_ENTERO             {$$ = Number($1);}
    | ER_DECIMAL            {$$= $1;}
    | ER_CADENA             {$$ = $1;}
    | ER_CHAR               {$$ = $1;}
    | res_True              {}
    | res_False             {}
    | res_Null              {}
    | ER_ID                 {$$ = $1;}
    ;