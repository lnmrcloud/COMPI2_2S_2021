var editor = CodeMirror.fromTextArea
    (document.getElementById('Txt_Entrada'), {
        line: "integer",
        lineNumbers: true,
        autoCloseTags: true,
        mode: "text/x-java",
        theme: "gruvbox-dark",
    });

var contenido = editor.getValue();


export function abc(){
    var a =JSON.stringify(contenido);
    return a;
}

