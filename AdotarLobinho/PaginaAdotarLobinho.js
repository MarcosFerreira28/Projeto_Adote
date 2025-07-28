const params = new URLSearchParams(window.location.search);
const idLobo = parseInt(params.get("id"));

let lobos = JSON.parse(localStorage.getItem("lobos"));

let imagem = document.querySelector("#imagemlobo")
let nome = document.querySelector("#nomelobo")
let id = document.querySelector("#idlobo")

function ColocaDadosLobo(){
    let lobo = lobos.find(l => l.id === idLobo);

    imagem.src = lobo.imagem
    nome.innerText = "Adote o(a) " + lobo.nome;
    id.innerText = "ID: " + lobo.id
}

ColocaDadosLobo()
