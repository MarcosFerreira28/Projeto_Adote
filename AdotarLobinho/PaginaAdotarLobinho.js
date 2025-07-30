function ColocaDadosLobo(){
    let lobo = lobos.find(l => l.id === idLobo);

    let imagem = document.querySelector("#imagemlobo");
    let nome = document.querySelector("#nomelobo");
    let id = document.querySelector("#idlobo");

    imagem.src = lobo.imagem
    nome.innerText = "Adote o(a) " + lobo.nome;
    id.innerText = "ID: " + lobo.id;
}

function AdotaLobo(){

    console.log(lobos)

    let lobo = lobos.find(l => l.id === idLobo);

    let nome = document.querySelector("#nome");
    let idade = document.querySelector("#idade");
    let email = document.querySelector("#email");

    lobo.emailDono = email.value;
    lobo.idadeDono = parseInt(idade.value);
    lobo.nomeDono = nome.value;
    lobo.adotado = true;

    /*-------------Validando Nome----------------------*/
    if (!/^[A-Za-zÀ-ÿ\s]{2,}$/.test(lobo.nomeDono)) {
        alert("O nome deve conter apenas letras e ter pelo menos 2 caracteres.");
        return
    }

    /*-------------Validando Idade----------------------*/
    if (!Number.isInteger(lobo.idadeDono) || lobo.idadeDono < 1){
        alert("Idade deve ser um inteiro e deve ter pelo menos 1 ano!");
        return
    }

    /*-------------Validando Email----------------------*/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(lobo.emailDono)) {
        alert("Digite um e-mail válido.");
        return
    }
    /*-------------------------------------------------*/
    if (lobo.nomeDono.trim() == "" || lobo.emailDono.trim() == ""){
        alert("Nenhum dos campos pode ficar vazio!")
        return
    }

    localStorage.setItem("lobos", JSON.stringify(lobos))
    
    window.location.href="ListaLobinhos.html";
}

const params = new URLSearchParams(window.location.search);
const idLobo = parseInt(params.get("id"));

let lobos = JSON.parse(localStorage.getItem("lobos"));

let botao = document.querySelector("#botao")

ColocaDadosLobo()

botao.addEventListener("click", function(event) {

    event.preventDefault();
    AdotaLobo();
})