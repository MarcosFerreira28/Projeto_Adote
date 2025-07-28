async function inicializarLocalStorage() {
  try {
    const response = await fetch("../localStorage/lobinhos.json"); // Caminho corrigido
    if (!response.ok) {
      throw new Error(`Erro ao buscar lobinhos.json: ${response.statusText}`);
    }
    const lobos = await response.json();
    localStorage.setItem("lobos", JSON.stringify(lobos));
    console.log("🐺 Lobos inicializados no localStorage");
  } catch (error) {
    console.error("Erro ao inicializar o localStorage:", error);
  } finally {
    console.log("Tentativa de inicialização do localStorage concluída");
  }
}

async function exibirLobo() {
  if (!localStorage.getItem("lobos")) {
    await inicializarLocalStorage();
  }

  let lobos = JSON.parse(localStorage.getItem("lobos")) || [];

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const lobo = lobos.find(l => l.id === id);

  const container = document.getElementById("detalhes-lobinho");

  if (!lobo) {
    container.innerHTML = `
      <section class="lobo-detalhe">
        <h1>Lobinho não encontrado</h1>
        <p>O lobinho com esse ID não existe ou foi removido.</p>
        <button onclick="window.location.href='PaginaListaLobinhos.html'">Voltar para lista</button>
      </section>
    `;
    return;
  }

  container.innerHTML = `
    <section class="lobo-detalhe">
      <h1>${lobo.nome}</h1>
      <img src="${lobo.imagem}" alt="${lobo.nome}" />
      <p><strong>Idade:</strong> ${lobo.idade} anos</p>
      <p>${lobo.descricao}</p>

      ${lobo.adotado ? `
        <p><strong>Adotado por:</strong> ${lobo.nomeDono} (${lobo.idadeDono} anos) - ${lobo.emailDono}</p>
      ` : `
        <button class="btn-adotar" onclick="location.href='PaginaAdotarLobinho.html?id=${lobo.id}'">Adotar</button>
        <button class="btn-excluir" onclick="excluirLobo(${lobo.id})">Excluir</button>
      `}
    </section>
  `;
}

function excluirLobo(id) {
  let lobos = JSON.parse(localStorage.getItem("lobos")) || [];
  lobos = lobos.filter(l => l.id !== id);
  localStorage.setItem("lobos", JSON.stringify(lobos));
  window.location.href = "PaginaListaLobinhos.html";
}

window.onload = exibirLobo;
