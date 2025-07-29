function inicializarLocalStorage() {
  fetch("../localStorage/lobinhos.json")
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("lobos", JSON.stringify(data));
      exibirLobo();
    })
    .catch(error => {
      console.error("Erro ao carregar lobinhos:", error);
    });
}

function exibirLobo() {
  const lobos = JSON.parse(localStorage.getItem("lobos")) || [];
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const lobo = lobos.find(l => l.id === id);

  const container = document.getElementById("detalhes-lobinho");
  container.innerHTML = "";

  if (!lobo) {
    const erro = document.createElement("section");
    erro.classList.add("lobo-info");

    const titulo = document.createElement("h1");
    titulo.innerText = "Lobinho não encontrado";

    const texto = document.createElement("p");
    texto.innerText = "O lobinho com esse ID não existe ou foi removido.";

    const voltar = document.createElement("button");
    voltar.innerText = "Voltar para a lista";
    voltar.addEventListener("click", () => {
      window.location.href = "ListaLobinhos.html";
    });

    erro.appendChild(titulo);
    erro.appendChild(texto);
    erro.appendChild(voltar);
    container.appendChild(erro);
    return;
  }

  // WRAPPER PRINCIPAL (título + container)
  const wrapper = document.createElement("div");
  wrapper.classList.add("lobo-wrapper");

  // TÍTULO CENTRALIZADO
  const titulo = document.createElement("h1");
  titulo.classList.add("titulo-lobo");
  titulo.innerText = lobo.nome;
  wrapper.appendChild(titulo);

  // CONTAINER EM DUAS COLUNAS
  const loboContainer = document.createElement("div");
  loboContainer.classList.add("lobo-container");

  // COLUNA ESQUERDA (imagem + botões)
  const colunaEsquerda = document.createElement("div");
  colunaEsquerda.classList.add("lobo-foto");

  const imagemWrapper = document.createElement("div");
  imagemWrapper.classList.add("imagem-wrapper");

const imagem = document.createElement("img");
imagem.src = lobo.imagem;
imagem.alt = lobo.nome;

imagemWrapper.appendChild(imagem);
colunaEsquerda.appendChild(imagemWrapper);

//
  if (!lobo.adotado) {
  const botoes = document.createElement("div");
  botoes.classList.add("botoes");

  const btnAdotar = document.createElement("button");
  btnAdotar.classList.add("btn-adotar");
  btnAdotar.innerText = "Adotar";
  btnAdotar.addEventListener("click", () => {
    window.location.href = `PaginaAdotarLobinho.html?id=${lobo.id}`;
  });

  const btnExcluir = document.createElement("button");
  btnExcluir.classList.add("btn-excluir");
  btnExcluir.innerText = "Excluir";
  btnExcluir.addEventListener("click", () => {
    excluirLobo(lobo.id);
  });

  botoes.appendChild(btnAdotar);
  botoes.appendChild(btnExcluir);
  colunaEsquerda.appendChild(botoes);
}

//
  // COLUNA DIREITA (idade + descrição + adoção)
  const colunaDireita = document.createElement("div");
  colunaDireita.classList.add("lobo-info");

  const idade = document.createElement("p");
  idade.innerHTML = `<strong>Idade:</strong> ${lobo.idade} anos`;

  const descricao = document.createElement("p");
  descricao.innerText = lobo.descricao;

  colunaDireita.appendChild(idade);
  colunaDireita.appendChild(descricao);

  if (lobo.adotado) {
    const adotado = document.createElement("p");
    adotado.innerHTML = `<strong>Adotado por:</strong> ${lobo.nomeDono} (${lobo.idadeDono} anos) - ${lobo.emailDono}`;
    colunaDireita.appendChild(adotado);
  }

  // Monta as colunas no container
  loboContainer.appendChild(colunaEsquerda);
  loboContainer.appendChild(colunaDireita);

  // Monta o wrapper com título + container
  wrapper.appendChild(loboContainer);
  container.appendChild(wrapper);
}

function excluirLobo(id) {
  let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
  lobos = lobos.filter(l => l.id !== id);
  localStorage.setItem("lobos", JSON.stringify(lobos));
  window.location.href = "ListaLobinhos.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("lobos")) {
    inicializarLocalStorage();
  } else {
    exibirLobo();
  }
});