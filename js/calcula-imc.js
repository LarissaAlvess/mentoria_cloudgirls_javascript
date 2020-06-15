var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

                        //retorna todos os pacientes da lista
var pacientes = document.querySelectorAll(".paciente");

for(var i = 0; i < pacientes.length; i++) {

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = validaPeso(peso); //recebe true ou false
    var alturaEhValida = validaAltura(altura); //recebe true ou false

    //! para negativo, ou seja, "se for negativo..."
    if (!pesoEhValido) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido!";
        paciente.classList.add("paciente-invalido");

    }

    if(!alturaEhValida) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida!";
        paciente.classList.add("paciente-invalido");

    }
    
    /*-------------------------modelo anterior sem validação dos novos pacientes do form-------------------------------
    var pesoEhValido = true;
    var alturaEhValida = true;

    if (peso <= 0 || peso >= 1000) {
        console.log("Peso inválido!");
        pesoEhValido = false;
        tdImc.textContent = "Peso inválido!";
        paciente.classList.add("paciente-invalido");

    }

    if(altura <= 0 || altura >= 3.00) {
        console.log("Altura inválida!");
        alturaEhValida = false;
        tdImc.textContent = "Altura inválida!";
        paciente.classList.add("paciente-invalido");

    }*/

    if(alturaEhValida && pesoEhValido) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;

    }
}

//funções criadas para validar o peso e altura dos novos pacientes inseridos na tabela
function validaPeso(peso) {
    if(peso >=0 && peso < 1000) {
        
        return true;

    }else{

        return false;

    }
}

function validaAltura(altura) {
    if(altura >=0 && altura <= 3.0) {

        return true;

    }else{

        return false;

    }
}

//função criada para ser reaproveitada no código do form
function calculaImc(peso, altura) {
    var imc = 0;

    imc = peso / (altura * altura);

    return imc.toFixed(2);
}