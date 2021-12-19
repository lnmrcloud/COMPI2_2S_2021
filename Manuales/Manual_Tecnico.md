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

## GRAMATICAS

Detalle de gramatica de proyecto ascendente [Gramatica Ascendente](https://github.com/lnmrcloud/COMPI2_2S_2021/blob/main/Reporte_Gramatical/Ascendente.md). \
Detalle de gramatica de proyecto ascendente [Gramatica Descendente](https://github.com/lnmrcloud/COMPI2_2S_2021/blob/main/Reporte_Gramatical/Descendente.md).

Eliminacion de recursividad por la Izquierda:

A - > A &#913;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  B\ 

A - > &#914; A'
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  &#913;  A' \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |  &#917; 

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

+ 

## ARCHIVOS PRINCIPALES

+ interpretar.js, manejo del flujo de la interpretacion y ejecucion de codigo
+ index.html, interfaz grafica del proyecto
+ 