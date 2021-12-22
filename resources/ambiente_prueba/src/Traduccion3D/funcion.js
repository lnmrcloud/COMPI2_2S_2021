//-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----
//-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----
//-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----
//-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----EVENTOS-----
document.getElementById("Traduccir").addEventListener("click", ejecutar);

//-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-
//-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-
//-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-
//-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-----FUNCIONES-
function ejecutar() {
    // var inputValue = editor.getValue();
    // console.log("############################");
    // console.log(inputValue);
    // var response = traductor.parse(inputValue);
    // console.log(response);
    // editorTraductor.setValue(response);
    // let txtArea = document.getElementById("Txt_Entrada").value;
    var response = traductor.parse(document.getElementById("Txt_Entrada").value);
    editorTraductor.setValue(response);
    // console.log(txtArea);
}