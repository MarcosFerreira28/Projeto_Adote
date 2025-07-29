const params = new URLSearchParams(window.location.search);
const idLobo = parseInt(params.get("id"));

let lobos = JSON.parse(localStorage.getItem("lobos"));

let formulario = document.querySelector(".formulario");

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

    if (!Number.isInteger(lobo.idadeDono)){
        alert("Idade deve ser um inteiro!");
        window.location.href="PaginaAdotarLobinho.html?id=" + lobo.id;
        return
    }

    if (nome.value.trim() == "" || idade.value.trim() == "" || email.value.trim() == ""){
        return
    }

    localStorage.setItem("lobos", JSON.stringify(lobos))
    
    window.location.href="ListaLobinhos.html";
}

ColocaDadosLobo()

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    AdotaLobo();
})