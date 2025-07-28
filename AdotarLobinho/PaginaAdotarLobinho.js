const params = new URLSearchParams(window.location.search);
const idLobo = parseInt(params.get("id"));

let lobos = JSON.parse(localStorage.getItem("lobos"));

let imagem = document.querySelector("#imagemlobo")
let nome = document.querySelector("#nomelobo")
let id = document.querySelector("#idlobo")

function ColocaDadosLobo(){
    let lobo = lobos[idLobo - 1];



    nome.innerText = "Adote o(a) " + lobo.nome;

}

ColocaDadosLobo()
