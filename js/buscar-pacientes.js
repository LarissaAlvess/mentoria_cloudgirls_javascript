//técnica AJAX

var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
    console.log("Buscando pacientes...");

    //importar dados de uma outra API
    var xhr = new XMLHttpRequest();

    //abrindo a requisição, configurando a requisição que é o end da API
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes")

    //carrega os dados que estão na requisição para a tabela
    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        //para dectar erros no carregamento da página (ex. erro 404). 200 significa que a página está funcionando
        if(xhr.status == 200) {
            erroAjax.classList.remove("invisivel");
            var resposta = xhr.responseText;

            var pacientes = JSON.parse(resposta); //transforma um tipo de codigo em outro, no caso de string para objeto (array)
            pacientes.forEach(function(paciente) {
            adicionaPacienteNaTabela(paciente);

        });

        }else{
            console.log(xhr.status);
            console.log(xhr.responseText);
            
            erroAjax.classList.remove("invisivel");

        }

        

    });

    xhr.send();

});