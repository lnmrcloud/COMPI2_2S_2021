# -OLC2-PROYECTO-2


# MANUAL TECNICO

Quetzal es un lenguaje de programación inspirado en C, su característica principal es la inclusión de tipos implícitos. El sistema de tipos de Quetzal realiza una formalización de los tipos de C y Java. Esto permite a los desarrolladores definir variables y funciones tipadas sin perder la esencia. Otra inclusión importante de Quetzal es la simplificación de los lenguajes C y Java para poder realizar diferentes instrucciones en menos pasos.

Adicional Quetzal tendrá 2 flujos, se podrá interpretar el código fuente ingresado y efectuar todas sus instrucciones, o bien se puede traducir este lenguaje a un lenguaje intermedio basado en un lenguaje de 3 direcciones, este se podrá ejectuar posteriormente en cualquier compilador de C, tomando en cuenta las reglas especificas de un lenguaje de 3 direcciones.

<p>
<img src="images/flujo_quetzal.png" width=500px>
</p>


<p>
<img src="images/automata.png" width=500px>
</p>


## sintaxis del lenguaje Quetazal
EL lenguaje quetazal como un lengauje basado en Java y C, contara con su propia sintaxis en el cual se puede programar en este lenguaje 



# MANUAL USUARIO

## interface principal 

La pagina de QUETAZAL OLC2 sera una un analizador compilador en cual podra realizar un analisis lexico,sintactico y semantico de su propogio lenguaje el cual es un lenguaje basado en los lenguajes de programaicon java y C. 

El cual contara con un menu en el lado izquierdo el cual nos permitira ver cada secciones de la pagina, dicho menu contara con los siguiente apartado
* entrada
* salida del programa
* Traduccion  a 3d 
* graficarTs       
* Tabla de simbolos 
* Tabla de errores 
* Arbol   

De dicha pagina sera alogado en hosting de githupg page el cual lo podremos encontrar en el siguiente link:
[GitHubPage](https://javiermiron89.github.io/-OLC2-PROYECTO-1/) :coffee:

<p>
<img src="images/principal.png" width=500px>
</p>


## Entrada y Analisis  
El apartado de entrada para el lenguaje de quetzal constara con lo que es un area de entrada en el cual se podra ingresar las intrucciones para poder sera analizada con la sintaxis de dicho lenguaje. 
En la parte inferior de este apartado el analizado contara con dos botones para los usuarios Compila y Traduccir los cuales constara con funciones diferentes cada una, la primera creara un analisis sobre la entrda en el text Area y creara una salida la cual sera posteada en el apartado de salida del programa, el boton de traduccir crear una traduccion en codigo de 3 dirrecciones el cual puede ser compilado en el lenguaje C 

<p>
<img src="images/entrada.png" width=500px>
</p>

## salida del programa

El apartado de la salida del programa como se ha mencionado anteriormente se el apartdo en donde los usuario podran ver el resultado sobre el analisis que halla podido realizar sobre el texto puesto en el text area de entrada

<p>
<img src="images/salida.png" width=500px>
</p>


# Traduccion a codigo de 3D 

En el apartado del codigo de 3 direcciones se un apartado el cual funcionara con el boton de traduccir en la seccion de entrada del programa, en este apartado en analisis tomara la entrada que este en el text area de entrada y por medio de un analisis se creara un traduccion similiar al codigo de tres direcciones el cual puede ser compilidado en el lenguaje C 

<p>
<img src="images/3d.png" width=500px>
</p>


# Graficar_ts()

En la parte del menu encontraremos una seccion el cual se llama Graficar_ts() el cual es una seccion en el cual se presentara por consola una impresion de la tablas de simbolos utilizadas en el analisis del compilador, para el cual tendra funcionamiento directamento con el analizador ya que este apartado mostrara informacion si y solo si dentro de nuestra entrada el usuario utilize el comando Graficar_ts();

<p>
<img src="images/3d.png" width=500px>
</p>


# Tabla de simbolos 

La seccion tabla de simbolos, el cual consta de la secciond de reportes de este programa en el cual por medio una tabla se mostrar lo  que es la tabla de simbolos, la cual fue utilizada en todo el recorrido que el analizador pudiera haber ralizado y utilizado dentro de del mismo.

<p>
<img src="images/3d.png" width=500px>
</p>


# Errores

La seccion de errores el cual mostara lo que es un seccion donde cada usuario podra tener de una forma visual todos aquellos errores que halla causado un conflico en el compilador. En el cual se podran ver 3 tipos de erorres los cuales seran errores lexicos, sintacticos y semanticos, prsentaando al usuario el caracter del comflicto asi como su fila en el que lo podemos encontrar.

<p>
<img src="images/3d.png" width=500px>
</p>


# Arbol

La seccion denominada Arbol es la seccion donde se podra ver un reporte grafico del cual se mostarar la construccion del arbol que el analizdor tuvo que hacer para relizar para hacer un recorrido en cada uno de los tokens ingresados para posteriormente sera analizado

<p>
<img src="images/3d.png" width=500px>
</p>