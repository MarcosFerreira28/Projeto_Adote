function InsereLobosRandom(n){
    let nrand = Math.ceil(Math.random() * lobos.length);

    let imglobo = document.querySelector("#imglobo" + n);
    let idadelobo = document.querySelector("#idadelobo" + n);
    let descricaolobo = document.querySelector("#descricaolobo" + n);
    let nomelobo = document.querySelector("#nomelobo" + n);

    let lobo = lobos[nrand]

    imglobo.src = lobo.imagem;

    if(lobo.idade > 1){
        idadelobo.innerText = "Idade: " + lobo.idade + " anos";
    }else {
        idadelobo.innerText = "Idade: " + lobo.idade + " ano"; 
    }

    descricaolobo.innerText = lobo.descricao;

    nomelobo.innerText = lobo.nome;
}

let lobos = JSON.parse(localStorage.getItem("lobos"));


InsereLobosRandom("1");
InsereLobosRandom("2");