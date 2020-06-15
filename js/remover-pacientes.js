var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("table");

//excluindo o paciente da tabela mas implementando um fade
tabela.addEventListener("dblclick", function(event) {
    event.target.parentNode.classList.add("fadeOut");

    //tempo para produzir o fade e a linha ser removida
    setTimeout(function() {
        event.target.parentNode.remove();
    }, 500);


});


/*----------------------modelo anterior------------------
//seleciona a tabela toda e busca o alvo (target) a ser clicado e depois removido
tabela.addEventListener("dblclick", function(event) {
    var alvoEvento = event.target;
    var paidDoAlvo = alvoEvento.parentNode; //TR = paciente = remover
    paidDoAlvo.remove();


});

---------------modelo anterior----------------------
//forma simplificada para percorrer arrays
pacientes.forEach(function(paciente) {
    //add evento de duplo click
    paciente.addEventListener("dblclick", function(){
        console.log("Fui clicado com duplo click");

        //this aponta qual paciente foi clicado. remove esclui ele da lista
        this.remove();
    });

});*/