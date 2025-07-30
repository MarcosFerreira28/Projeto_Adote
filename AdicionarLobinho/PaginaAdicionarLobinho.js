let lobos = JSON.parse(localStorage.getItem("lobos"));


let nome = document.querySelector("#nome");
let idade = document.querySelector("#idade");
let link = document.querySelector("#link");
let descricao = document.querySelector("#descricao");
let botao = document.querySelector("#salvar")

function InsereLobo(event) {
    event.preventDefault();

    // Validação da idade
    const idadeNum = Number(idade.value);
    if (isNaN(idadeNum) || idadeNum < 0) {
        alert("Idade inválida. Insira um número positivo.");
        return;
    }

    if (nome.value.trim().length <= 1) {
        alert("O nome deve ter mais de uma letra.");
        return;
    }

    // Validação da URL
    try {
        new URL(link.value);
    } catch (e) {
        alert("O link da imagem não é uma URL válida.");
        return;
    }

    if (descricao.value.trim() == ""){
        alert("Insira uma descrição!");
        return;
    }

    let insere = {
        id: lobos[lobos.length - 1].id + 1,
        nome: nome.value,
        idade: idade.value,
        descricao: descricao.value,
        imagem: link.value,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };

    lobos.push(insere);
    localStorage.setItem("lobos", JSON.stringify(lobos));
    alert("Lobinho adicionado com sucesso!");

    //esvaziando os campos caso queira adicionar mais um lobo
    nome.value = "";
    idade.value = "";
    link.value = "";
    descricao.value = "";
}


botao.addEventListener("click", InsereLobo)