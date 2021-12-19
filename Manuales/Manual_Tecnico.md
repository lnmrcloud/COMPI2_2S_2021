### Universidad de San Carlos de Guatemala.
### Compiladores 2
#### Vacacionse Diciembre 2021
___

### Manual de Tecnico
#### Proyecto 1

## HERRAMIENTAS UTILIZADAS

- Interfaz Grafica, Lenguaje de Etiquetas HTML
- BackEnd, Javascript
- Analizador Lexico, Lex Jison
- Analizador Sintactico, Jison
- Analizador Semantico, Javascript
- Graficas Arbol AST, d3.js 
- Librerias Anexas, Code Mirror .css
- Librerias Anexas, Bootstrap .css

## LENGUAJES ASOCIADOS

- Entrada, Quetzal (Java y C++)
- Salida, 3DC

## DEPLOYMENT

- Github pages [QUETZAL OLC2 - 2S-DICIEMBRE](https://lnmrcloud.github.io/COMPI2_2S_2021/)

## GRAMATICAS

Detalle de gramatica de proyecto ascendente [Gramatica Ascendente](https://github.com/lnmrcloud/COMPI2_2S_2021/blob/main/Reporte_Gramatical/Ascendente.md). \
Detalle de gramatica de proyecto ascendente [Gramatica Descendente](https://github.com/lnmrcloud/COMPI2_2S_2021/blob/main/Reporte_Gramatical/Descendente.md).

Eliminacion de recursividad por la Izquierda:

A - > A &#945;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  &#946;

A - > &#946; A'\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  &#945;  A' \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  &#949; 

## TRADUCCION

Reglas de Traduccion 

+ Asignacion: **X** = y **op** Z
+ Operacion unaria: **X** = **op** Z
+ Copia : **X** =  Z
+ Salto incondicional: **goto** L
+ Salto condicional: if **X** goto **L**
+ Llamadas: param **X** = call p,n;
+ Copia indexada: **X** = y[i]
+ Asignacion direccional: x = &y

## CARPETAS PRINCIPALES

+ AST, Manejo de atributos de objetos para armar arbol y entornos
+ Expresiones, Manejo de las operaciones del proyecto
+ Instrucciones, Manejo de los objetos e instrucciones de lenguaje
+ Gramatica, gramaticas de proyecto en .jison y js
    + jison gramatica.jison
+ Interfaces, Manejo de clases abstractas
+ Reporte_Gramatical, Detalles de gramatica
+ chart, libreria d3.js

## ARCHIVOS PRINCIPALES

+ interpretar.js, manejo del flujo de la interpretacion y ejecucion de codigo
+ index.html, interfaz grafica del proyecto

___
## License
[MIT](https://choosealicense.com/licenses/mit/)