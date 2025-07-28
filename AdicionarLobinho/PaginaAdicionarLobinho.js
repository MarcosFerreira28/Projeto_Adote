let lobos = JSON.parse(localStorage.getItem("lobos"));


let nome = document.querySelector("#nome");
let idade = document.querySelector("#idade");
let link = document.querySelector("#link");
let descricao = document.querySelector("#descricao");
let botao = document.querySelector("#salvar")

function InsereLobo(){
    let insere = {
        id: lobos.length + 1,
        nome: nome.value,
        idade: idade.value,
        descricao: descricao.value,
        imagem: link.value,
        adotado:false,
        nomeDono:null,
        idadeDono:null,
        emailDono:null
    }

    if (nome.value.trim() == "" || idade.value.trim() == "" || link.value.trim() == "" || descricao.value.trim() == ""){
        return
    }
    
    lobos.push(insere);
    
    localStorage.setItem("lobos", JSON.stringify(lobos));
}

botao.addEventListener("click", InsereLobo)