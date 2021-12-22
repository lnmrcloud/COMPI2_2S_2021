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

//Graficar TS
"graficar_ts"                               {console.log("Reconocio: " + yytext); return 'res_GraficarTS';}


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
    //Operaciones Aritmeticas, logicas y relacionales
    const aritmetica = require('../Expresiones/Operaciones/Aritmetica');
    const logica = require('../Expresiones/Operaciones/Logicas');
    const relacional = require('../Expresiones/Operaciones/Relacionales')
    const primitivo = require('../Expresiones/Primitivos');

    // casteos
    const casteo = require('../Expresiones/Operaciones/casteo');

    // operaciones sobre string
    const strings = require('../Expresiones/Operaciones/Strings');

    //Declaracion y asignacion de variables
    const ast = require('../Ast/Ast');
    const declaracion = require('../Instrucciones/Declaracion');
    const asignacion = require('../Instrucciones/Asignacion');
    const simbolo = require('../TablaSimbolos/Simbolos');
    const tipo = require('../TablaSimbolos/Tipo');

    const identificador = require('../Expresiones/Identificador');
    const ternario = require('../Expresiones/Ternario');

    //Instrucciones
    const ifs = require('../Instrucciones/SentenciasControl/Ifs');
    const sentenciaSwitch = require('../Instrucciones/SentenciasControl/Switch');
    const sentenciaCase = require('../Instrucciones/SentenciasControl/Case');
    const sentenciaWhile = require('../Instrucciones/SentenciasCiclicas/While');
    const sentenciaDoWhile = require('../Instrucciones/SentenciasCiclicas/DoWhile');
    const sentenciaFor = require('../Instrucciones/SentenciasCiclicas/For');

    //Sentencias de transferencia
    const detener = require('../Instrucciones/SentenciaTransferencia/Detener');
    const continuar = require('../Instrucciones/SentenciaTransferencia/Continuar');
    const retornar = require('../Instrucciones/SentenciaTransferencia/Retornar');

    //Print
    const print = require('../Instrucciones/Print');

    //Arreglos
    const arreglo = require('../Instrucciones/Arreglos');

    //Graficar TS
    const graficarTS = require('../Instrucciones/Graficar_TS')

    const funcion = require('../Instrucciones/Funcion');
    const llamada = require('../Instrucciones/Llamada');
    const funcionMain = require('../Instrucciones/FuncionMain');

    //Errores
    const errores = require('../Ast/Errores.ts');
    var listaErrores = [];

    exports.listaErrores = function(){
        return listaErrores;
    }

    exports.LimpiarListas = function(){
        listaErrores = [];
    }

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
            //console.log($1);
            $$ = $1;
            $$ = new ast.default($1);
            return $$;
        }
    ;

INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION     {$$ = $1; $$.push($2);}
    | INSTRUCCION                   {$$ = new Array(); $$.push($1);}
    ;


INSTRUCCION
    : DECLARACION_VARIABLES sim_PuntoComa   {$$ = $1;}
    | ASIGNACION_VARIABLES sim_PuntoComa    {$$ = $1;}
    | SENTENCIA_IF                          {$$ = $1;}
    | SENTENCIA_IF_SIN_LLAVES               {$$ = $1;}
    | SENTENCIA_SWITCH                      {$$ = $1;}
    | SENTENCIA_WHILE                       {$$ = $1;}
    | SENTENCIA_DOWHILE                     {$$ = $1;}
    | SENTENCIA_FOR                         {$$ = $1;}
    | SENTENCIA_FOR_IN                      {}
    | res_Break sim_PuntoComa               {$$ = new detener.default();}
    | res_Continue sim_PuntoComa            {$$ = new continuar.default();}
    | res_Return sim_PuntoComa              {$$ = new retornar.default(null);}
    | res_Return EXPRE sim_PuntoComa        {$$ = new retornar.default($2);}
    | ARREGLO                               {}
    | PRINT                                 {$$ = $1;}
    | PRINTLN                               {$$ = $1;}
    | FUNCIONES                             {$$ = $1;}
    | STRUCT                                {}
    | LLAMADA sim_PuntoComa                 {$$ = $1;}
    | GRAPHTS                               {$$ = $1;}
    | error sim_PuntoComa                   {
                                            console.log("Error Sintactico: " + yytext + ", linea: " + this._$.first_line + ", columna: " + this._$.first_column);
                                            var errorlexico = new errores.default("SINTACTICO", "El caracter " + yytext + " no se esperaba", this._$.first_line, this._$.first_column);
                                            listaErrores.push(errorlexico);
                                        }
    ;

GRAPHTS
    : res_GraficarTS sim_ParentesisApertura sim_ParentesisCierre sim_PuntoComa {$$ = new graficarTS.default();}
    ;

ARREGLO
    //Declaracion
    : TIPO sim_CorcheteApertura sim_CorcheteCierre ER_ID sim_Igual sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre sim_PuntoComa  {$$ = new arreglo.default(4, $1, $4, $7, @1.first_line, @1.last_column)}
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
    | LISTA_ARREGLO sim_Coma EXPRE                                                      {$$ = $1; $$.push($3);}
    | EXPRE                                                                             {$$ = new Array(); $$.push($1);}
    ;

RETORNAR
    : res_Return sim_PuntoComa          {$$ = new retornar.default(null);}
    | res_Return EXPRE sim_PuntoComa    {$$ = new retornar.default($2);}
    ;

SENTENCIA_FOR_IN
    : res_For ER_ID res_In EXPRE sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre    {}
    ;

SENTENCIA_FOR
    : res_For sim_ParentesisApertura DECLARACION_VARIABLES sim_PuntoComa EXPRE sim_PuntoComa ACTUALIZACION sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {$$ = new sentenciaFor.default($3, null, $5, $7, $10, @1.first_line, @1.last_column);}
    | res_For sim_ParentesisApertura ASIGNACION_VARIABLES sim_PuntoComa EXPRE sim_PuntoComa ACTUALIZACION sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {$$ = new sentenciaFor.default(null, $3, $5, $7, $10, @1.first_line, @1.last_column);}
    ;
/*
SENTECIA_FOR_VARIABLES
    : TIPO LISTA_SIMBOLOS                       {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, null));}
    | ER_ID sim_Igual EXPRE                     {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, $3));}
    ;
*/
ACTUALIZACION
    : ER_ID sim_Igual EXPRE {$$ = new asignacion.default($1, $3, @1.first_line, @1.last_column);}
    | ER_ID sim_Incremento  {$$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column),'+', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false), @1.first_line, @1.last_column);}
    | ER_ID sim_Decremento  {$$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column),'-', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false), @1.first_line, @1.last_column);}
    ;

SENTENCIA_DOWHILE
    : res_Do sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_While sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_PuntoComa {$$ = new sentenciaDoWhile.default($7, $3, @1.first_line, @1.last_column);}
    ;

SENTENCIA_WHILE
    : res_While sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre   {$$ = new sentenciaWhile.default($3, $6, @1.first_line, @1.last_column);}
    ;

SENTENCIA_SWITCH
    : res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura CASES_LIST DEFAULT sim_LlaveCierre {$$ = new sentenciaSwitch.default($3, $6, $7);}
    | res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura CASES_LIST sim_LlaveCierre         {$$ = new sentenciaSwitch.default($3, $6, null);}
    | res_Switch sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura DEFAULT sim_LlaveCierre            {$$ = new sentenciaSwitch.default($3, null, $6);}
    ;

CASES_LIST
    : CASES_LIST res_Case EXPRE sim_DosPuntos INSTRUCCIONES     {$$ = $1; $$.push(new sentenciaCase.default($3, $5));}
    | res_Case EXPRE sim_DosPuntos INSTRUCCIONES                {$$ = new Array(); $$.push(new sentenciaCase.default($2, $4));}
    ;

DEFAULT
    : res_Default sim_DosPuntos INSTRUCCIONES   {$$ = $3;}
    ;

SENTENCIA_IF_SIN_LLAVES
    : res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre INSTRUCCION_UNICA                            {var instrucc = new Array(); instrucc.push($5); $$ = new ifs.default($3, instrucc, [], @1.first_line, @1.last_column);}
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre INSTRUCCION_UNICA res_Else INSTRUCCION_UNICA {var instrucc = new Array(); var instruccElse = new Array(); instrucc.push($5); instruccElse.push($7); $$ = new ifs.default($3, instrucc, instruccElse, @1.first_line, @1.last_column);}
    ;

INSTRUCCION_UNICA
    : DECLARACION_VARIABLES sim_PuntoComa   {$$ = $1;}
    | ASIGNACION_VARIABLES sim_PuntoComa    {$$ = $1;}
    | res_Break sim_PuntoComa               {$$ = new detener.default();}
    | res_Continue sim_PuntoComa            {$$ = new continuar.default();}
    | RETORNAR                              {$$ = $1;}
    | ARREGLO                               {}
    | PRINT                                 {$$ = $1;}
    | PRINTLN                               {$$ = $1;}
    | LLAMADA sim_PuntoComa                 {$$ = $1;}
    ;

SENTENCIA_IF
    : res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre  {$$ = new ifs.default($3, $6, [], @1.first_line, @1.last_column);}
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_Else sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre {$$ = new ifs.default($3, $6, $10, @1.first_line, @1.last_column);}
    | res_If sim_ParentesisApertura EXPRE sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre res_Else SENTENCIA_IF {$$ = new ifs.default($3, $6, [$9], @1.first_line, @1.last_column);}
    ;

LLAMADA
    : ER_ID sim_ParentesisApertura sim_ParentesisCierre                     {$$ = new llamada.default($1, [], @1.first_line, @1.last_column);}
    | ER_ID sim_ParentesisApertura PARAMETROS_LLAMADA sim_ParentesisCierre  {$$ = new llamada.default($1, $3, @1.first_line, @1.last_column);}
    ;

PARAMETROS_LLAMADA
    : PARAMETROS_LLAMADA sim_Coma EXPRE     {$$ = $1; $$.push($3);}
    | EXPRE                                 {$$ = new Array(); $$.push($1);}
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
    : TIPO LISTA_SIMBOLOS {$$ = new declaracion.default($1, $2, @1.first_line, @1.last_column);}
    //Asignacion de Struct
    | ER_ID LISTA_SIMBOLOS {}
    ;

ASIGNACION_VARIABLES
    : ER_ID sim_Igual EXPRE       {$$ = new asignacion.default($1, $3, @1.first_line, @1.last_column);}
    | ER_ID sim_Incremento        {$$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column),'+', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false), @1.first_line, @1.last_column);}
    | ER_ID sim_Decremento        {$$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column),'-', new primitivo.default(1, @1.first_line, @1.last_column), @1.first_line, @1.last_column, false), @1.first_line, @1.last_column);}
    ;

FUNCIONES
    //MAIN
    : res_Void res_Main sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre             {$$ = new funcionMain.default(3, new tipo.default('MAIN'), "main", [], true, $6, @1.first_line, @1.last_column);}
    //RESTO DE METODOS
    | res_Void ER_ID sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre                {$$ = new funcion.default(3, new tipo.default('VOID'), $2, [], true, $6, @1.first_line, @1.last_column);}
    | res_Void ER_ID sim_ParentesisApertura PARAMETROS sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre     {$$ = new funcion.default(3, new tipo.default('VOID'), $2, $4, true, $7, @1.first_line, @1.last_column);}
    | TIPO ER_ID sim_ParentesisApertura sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre                    {$$ = new funcion.default(3, $1, $2, [], true, $6, @1.first_line, @1.last_column);}
    | TIPO ER_ID sim_ParentesisApertura PARAMETROS sim_ParentesisCierre sim_LlaveApertura INSTRUCCIONES sim_LlaveCierre         {$$ = new funcion.default(3, $1, $2, $4, true, $7, @1.first_line, @1.last_column);}
    ;

PARAMETROS
    : PARAMETROS sim_Coma TIPO ER_ID    {$$ = $1; $$.push(new simbolo.default(6, $3, $4, null));}
    | PARAMETROS sim_Coma ER_ID         {}
    | TIPO ER_ID                        {$$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null));}
    | ER_ID                             {}
    ;

TIPO
    : res_Int       {$$ = new tipo.default('INT');}
    | res_Double    {$$ = new tipo.default('DOUBLE');}
    | res_Boolean   {$$ = new tipo.default('BOOLEAN');}
    | res_Char      {$$ = new tipo.default('CHAR');}
    | res_String    {$$ = new tipo.default('STRING');}
    ;

LISTA_SIMBOLOS
    : ER_ID                                         {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, null));}
    | ER_ID sim_Igual EXPRE                         {$$ = new Array(); $$.push(new simbolo.default(1, null, $1, $3));}
    //Struct
    | ER_ID sim_Coma LISTA_SIMBOLOS                 {$$ = $3; $$.push(new simbolo.default(1, null, $1, null));} 
    | ER_ID sim_Igual EXPRE sim_Coma LISTA_SIMBOLOS {$$ = $5; $$.push(new simbolo.default(1, null, $1, $3));}
    //| ER_ID sim_Igual EXPRE sim_Coma LISTA_SIMBOLOS {}
    ;

PRINT
    : res_Print sim_ParentesisApertura IMPRIMIR_VARIOS sim_ParentesisCierre sim_PuntoComa {$$ = new print.default($3, @1.first_line, @1.last_column, false);}
    ;

PRINTLN
    : res_PrintLn sim_ParentesisApertura IMPRIMIR_VARIOS sim_ParentesisCierre sim_PuntoComa   {$$ = new print.default($3, @1.first_line, @1.last_column, true);}
    ;

IMPRIMIR_VARIOS
    : IMPRIMIR_VARIOS sim_Coma EXPRE    {$$ = $1; $$.push($3);}
    | EXPRE                             {$$ = new Array(); $$.push($1);}
    ;

EXPRE
    : EXPRE sim_OR EXPRE    {$$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_AND EXPRE   {$$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column, false);}
    | sim_NOT EXPRE         {$$ = new logica.default($2, '!', null, @1.first_line, @1.last_column, true);}

    | EXPRE sim_Igualacion EXPRE        {$$ = new relacional.default($1, '==', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Diferenciacion EXPRE    {$$ = new relacional.default($1, '!=', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_MenorQue EXPRE          {$$ = new relacional.default($1, '<', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_MenorIgualQue EXPRE     {$$ = new relacional.default($1, '<=', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_MayorQue EXPRE          {$$ = new relacional.default($1, '>', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_MayorIgualQue EXPRE     {$$ = new relacional.default($1, '>=', $3, @1.first_line, @1.last_column, false);}

    | EXPRE sim_Mas EXPRE               {$$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Menos EXPRE             {$$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Multiplicacion EXPRE    {$$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Division EXPRE          {$$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Modulo EXPRE            {$$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column, false);}
    | sim_Menos EXPRE %prec UNARIO      {$$ = new aritmetica.default($2, 'UNARIO', $2, @1.first_line, @1.last_column, true);}
    | sim_ParentesisApertura EXPRE sim_ParentesisCierre {$$ = $2;}

    | res_Pow sim_ParentesisApertura EXPRE sim_Coma EXPRE sim_ParentesisCierre  {$$ = new aritmetica.default($3, 'POW', $5, @1.first_line, @1.last_column, false);}
    | res_Sin sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {$$ = new aritmetica.default($3, 'SIN', $3, @1.first_line, @1.last_column, true);}
    | res_Log10 sim_ParentesisApertura EXPRE sim_ParentesisCierre               {$$ = new aritmetica.default($3, 'LOG', $3, @1.first_line, @1.last_column, true);}
    | res_Cos sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {$$ = new aritmetica.default($3, 'COS', $3, @1.first_line, @1.last_column, true);}
    | res_Tan sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {$$ = new aritmetica.default($3, 'TAN', $3, @1.first_line, @1.last_column, true);}
    | res_Sqrt sim_ParentesisApertura EXPRE sim_ParentesisCierre                {$$ = new aritmetica.default($3, 'SQRT', $3, @1.first_line, @1.last_column, true);}

    | EXPRE sim_Ampersand EXPRE {$$ = new strings.default($1,'CONCATENACION_STRING', $3, @1.first_line, @1.last_column, false);}
    | EXPRE sim_Potencia EXPRE  {$$ = new strings.default($1,'POTENCIA_STRING', $3, @1.first_line, @1.last_column, false);}
    | ER_ID sim_Punto res_CaracterOfPosition sim_ParentesisApertura EXPRE sim_ParentesisCierre          {$$ = new strings.default(new identificador.default($1, @1.first_line, @1.last_column),'POSICION_STRING', $5, @1.first_line, @1.last_column, false);}
    | ER_ID sim_Punto res_SubString sim_ParentesisApertura EXPRE sim_Coma EXPRE sim_ParentesisCierre    {$$ = new strings.default(new identificador.default($1, @1.first_line, @1.last_column),'SUB_STRING', $5, @1.first_line, @1.last_column, false, $7);}
    | ER_ID sim_Punto res_Length sim_ParentesisApertura sim_ParentesisCierre                            {$$ = new strings.default(new identificador.default($1, @1.first_line, @1.last_column),'LENGTH_STRING', $1, @1.first_line, @1.last_column, true);}
    | ER_ID sim_Punto res_ToUppercase sim_ParentesisApertura sim_ParentesisCierre                       {$$ = new strings.default(new identificador.default($1, @1.first_line, @1.last_column),'TOUPPERCASE_STRING', $1, @1.first_line, @1.last_column, true);}
    | ER_ID sim_Punto res_ToLowercase sim_ParentesisApertura sim_ParentesisCierre                       {$$ = new strings.default(new identificador.default($1, @1.first_line, @1.last_column),'TOLOWERCASE_STRING', $1, @1.first_line, @1.last_column, true);}

    | EXPRE sim_Interrogacion EXPRE sim_DosPuntos EXPRE {$$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column);}

    | res_Int sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                     {$$ = new casteo.default($5,'INT', $5, @1.first_line, @1.last_column, false);}
    | res_Double sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                  {$$ = new casteo.default($5,'DOUBLE', $5, @1.first_line, @1.last_column, false);}
    | res_Boolean sim_Punto res_Parse sim_ParentesisApertura EXPRE sim_ParentesisCierre                 {$$ = new casteo.default($5,'BOOLEAN', $5, @1.first_line, @1.last_column, false);}
    | res_ToInt sim_ParentesisApertura EXPRE sim_ParentesisCierre                                       {$$ = new casteo.default($3, 'TOINT', $3, @1.first_line, @1.last_column, true);}
    | res_ToDouble sim_ParentesisApertura EXPRE sim_ParentesisCierre                                    {$$ = new casteo.default($3, 'TODOUBLE', $3, @1.first_line, @1.last_column, true);}
    | res_String sim_ParentesisApertura EXPRE sim_ParentesisCierre                                      {$$ = new casteo.default($3, 'STRING', $3, @1.first_line, @1.last_column, true);}
    | res_String sim_ParentesisApertura sim_CorcheteApertura LISTA_ARREGLO sim_CorcheteCierre sim_ParentesisCierre  {}
    | res_Typeof sim_ParentesisApertura EXPRE sim_ParentesisCierre                                      {}

    | sim_Numeral ER_ID                                                                                 {}
    | ER_ID sim_CorcheteApertura EXPRE sim_CorcheteCierre                                               {}
    | ER_ID sim_CorcheteApertura res_Begin sim_DosPuntos res_End sim_CorcheteCierre                     {}
    | ER_ID sim_CorcheteApertura res_Begin sim_DosPuntos EXPRE sim_CorcheteCierre                       {}
    | ER_ID sim_CorcheteApertura EXPRE sim_DosPuntos res_End sim_CorcheteCierre                         {}
    | ER_ID sim_CorcheteApertura EXPRE sim_DosPuntos EXPRE sim_CorcheteCierre                           {}
    | ER_ID sim_Punto res_Pop sim_ParentesisApertura sim_ParentesisCierre                               {}

    | LLAMADA   {$$ = $1;}
    | VAL       {$$ = $1;}
    ;

VAL
    : ER_ENTERO             {$$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column);}
    | ER_DECIMAL            {$$ = new primitivo.default(Number(yytext), @1.first_line, @1.last_column);}
    | ER_CADENA             {$1 = $1.slice(1, $1.length - 1); $$ = new primitivo.default($1, @1.first_line, @1.last_column);}
    | ER_CHAR               {$1 = $1.slice(1, $1.length - 1); $$ = new primitivo.default($1, @1.first_line, @1.last_column);}
    | res_True              {$$ = new primitivo.default(true, @1.first_line, @1.last_column);}
    | res_False             {$$ = new primitivo.default(false, @1.first_line, @1.last_column);}
    | res_Null              {$$ = new primitivo.default(null, @1.first_line, @1.last_column);}
    | ER_ID                 {$$ = new identificador.default($1, @1.first_line, @1.last_column);}
    ;