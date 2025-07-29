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

  
  const wrapper = document.createElement("div");
  wrapper.classList.add("lobo-wrapper");

  const titulo = document.createElement("h1");
  titulo.classList.add("titulo-lobo");
  titulo.innerText = lobo.nome;
  wrapper.appendChild(titulo);

 
  const loboContainer = document.createElement("div");
  loboContainer.classList.add("lobo-container");

 
  const colunaEsquerda = document.createElement("div");
  colunaEsquerda.classList.add("lobo-foto");

  const imagemWrapper = document.createElement("div");
  imagemWrapper.classList.add("imagem-wrapper");

  const imagem = document.createElement("img");
  imagem.src = lobo.imagem;
  imagem.alt = lobo.nome;
  imagemWrapper.appendChild(imagem);

  colunaEsquerda.appendChild(imagemWrapper);

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

  
  const colunaDireita = document.createElement("div");
  colunaDireita.classList.add("lobo-info");

  const descricao = document.createElement("p");
  descricao.innerText = lobo.descricao;
  colunaDireita.appendChild(descricao);

  if (lobo.adotado) {
    const adotado = document.createElement("p");
    adotado.innerHTML = `<strong>Adotado por:</strong> ${lobo.nomeDono} (${lobo.idadeDono} anos) - ${lobo.emailDono}`;
    colunaDireita.appendChild(adotado);
  }

  
  loboContainer.appendChild(colunaEsquerda);
  loboContainer.appendChild(colunaDireita);

  wrapper.appendChild(loboContainer);
  container.appendChild(wrapper);
}

function excluirLobo(id) {
  let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
  lobos = lobos.filter(l => l.id !== id);
  localStorage.setItem("lobos", JSON.stringify(lobos));
  window.location.href = "ListaLobinhos.html";
}

exibirLobo();
