/*add um escutador de evento na página, no caso quando clica no título
titulo.addEventListener("click", mostraMensagem);

function mostraMensagem() {
    console.log("Olá eu fui clicado!");
}*/

var botaoAdicionar = document.querySelector("#adicionar-paciente");

//utilizando uma função dentro da função do escutador. a boa prática é trabalhar com addEventListener() mesmo que você só queira adicionar um único evento. Porque mais tarde, se outro desenvolvedor quiser adicionar outro evento para o mesmo elemento, não corremos o risco de substituir a função já associada por outra.
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault(); //previne o comportamento padrão do botão
    
    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form); //simplificando o código utilizando uma nova função (ver no final)

    var erros = validaPaciente(paciente);
    console.log(erros);
    //! se não for valido
    if(erros.length > 0) {
        exibeMensagensDeErro(erros);
        return; //return vazio ele sai da função maior sem chegar na parte que add na tabela

        /*if(!validaPaciente(paciente)) {
        //console.log("Paciente inválido!");

        var mensagemErro = document.querySelector("#mensagem-erro");
        mensagemErro.textContent = erros;*/
        
    }

    /*---------------estes são modelos anteriores----------------------
    var nome = form.nome.value;
    var peso = form.peso.value;
    var altura = form.altura.value;
    var gordura = form.gordura.value;

    var pacienteTr = document.createElement("tr"); //esta função cria um novo elemento no html

    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");

    //recuperando as info das var dos campos preenchidos para criação de novas TDs dos novos pacientes
    nomeTd.textContent = nome;
    pesoTd.textContent = peso;
    alturaTd.textContent = altura;
    gorduraTd.textContent = gordura;
    imcTd.textContent = calculaImc(peso,altura); //função extraída do calcula-imc
    
    //hierarquizando, criando as TDs como filho das Trs
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);*/

    adicionaPacienteNaTabela(paciente);

    form.reset(); //limpa os campos do form a cada paciente inserido

    //limpando os campos após inserido um novo paciente
    var mensagemErro = document.querySelector("#mensagens-erro");
    mensagemErro.innerHTML = "";


});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    //acrescentando na tabela o novo paciente. Criando como filho o novo TR na var tabela
    tabela.appendChild(pacienteTr);

}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    //controla o conteudo html
    ul.innerHTML = ""; //neste caso apaga o conteudo da ul e li que tem dentro dela


    //for mais simplificado forEach para percorrer arrays
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);

    });

}

function obtemPacienteDoFormulario(form) {
    //criando objeto, utiliza-se o {} na var. Neste caso, o paciente e dentro destãoo as características dele
    var paciente = {
        //value para recuperar o que for preenchido em cada campo do form. Aqui pega o valor do input por meio da propriedade
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)

        //utilizar o sinal de : para declarar um objeto no JS e usar , para cada linha

    }

    return paciente;

}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr"); //esta função cria um novo elemento no html
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    /*---------------------estes são modelos anteriores--------------------
    var nomeTd = montaTd(paciente.nome, "info-nome");
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");
    var imcTd = montaTd(paciente.imc, "info-imc");

    
    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");

    //recuperando as info das var dos campos preenchidos para criação de novas TDs dos novos pacientes
    nomeTd.textContent = paciente.nome;
    pesoTd.textContent = paciente.peso;
    alturaTd.textContent = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent = paciente.imc;
    
    //hierarquizando, criando as TDs como filho das Trs
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);*/

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {

    var erros = []; //array para erros de input

    //dois modelos de if
    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco."); //push para colocar elementos dentro de um array

    }

    if(!validaPeso(paciente.peso)) erros.push("Peso é inválido!"); 

    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida!");

    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco.");

    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco.");

    }
    
    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco.");

    }


    return erros;
}    