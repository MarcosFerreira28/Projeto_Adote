let lobos = JSON.parse(localStorage.getItem('lobos'))

//----- Aramzenamento dos dados

function pegar(tag) {
    return document.querySelector(tag)
}

const estado = {
    pagina: 1,
    porPagina: 4,
    totalPagina: Math.ceil(lobos.length / 4),
    maxBotaoVisivel: 5
}

estado.filtroAdotados = false;

let controls = {
    avancarFinal() {
        estado.pagina = estado.totalPagina
        update();
    },
    voltarFinal() {
        estado.pagina = 1;
        update();
    },
    filtrar() {
        estado.filtroAdotados = !estado.filtroAdotados;
        estado.pagina = 1;
        update();

    },
    buscarNome() {
        const input = pegar("#buscaNome");
        const termo = input.value.toLowerCase().trim();

        estado.termoBusca = termo;
        estado.pagina = 1;

        const encontrou = lobos.some(lobo => lobo.nome.toLowerCase().includes(termo));

        if (!encontrou && termo !== "") {
            alert("Nenhum lobinho com esse nome foi encontrado!");

            // Limpa a busca
            input.value = "";
            estado.termoBusca = "";

            // Atualiza a lista completa
            update();
            return; // Interrompe aqui para não aplicar filtro
        }

        update();
    },
    eventoClickar() {
        pegar("#avancar").addEventListener("click", controls.avancarFinal);//Botão de Avançar
        pegar("#voltar").addEventListener("click", controls.voltarFinal);//Botão de Voltar
        pegar("#filtroAdotados").addEventListener("click", controls.filtrar);//Botão de Filtro de adoção
        pegar("#buscaNome").addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                controls.buscarNome();
            }
        });//aperta enter para filtrar

        pegar(".lupinha").addEventListener("click", () => {
            controls.buscarNome();
        });//Apertar lupa para filtrar

        pegar("#btnAdicionarLobinho").addEventListener("click", () => {
            window.location.href = "PaginaAdicionarLobinho.html";
        });//Botão de +adicionar para levar a outra pagina
        pegar("#filtroAdotados").addEventListener("click", () => {
            const botao = pegar("#filtroAdotados")
            botao.classList.toggle("ativo");
            botao.textContent = botao.classList.contains("ativo") ? "✔" : "";
        })
    },


}

const lista = {
    criar(item, index) {
        const div = document.createElement("div");


        const lados = index % 2 === 0 ? "ladoEsquerdo" : "ladoDireito";
        div.classList.add("lobins", lados);


        div.innerHTML = `
            <div class="container">
                <div class="imagemLobo">
                    <div class="fundoAzul"></div>
                    <div class="imagem">
                    <img src=${item.imagem} alt="">
                    </div>
                    
                </div>
                <div class="escrita">

                    <div class="topo">
                        <h2 class="nomeLobo">${item.nome}</h2>
                        <button class="adotar ${item.adotado ? 'adotado' : ''}">
                        ${item.adotado ? 'Adotado' : 'Adotar'}
                        </button>
                    </div>

                    <div class="texto">
                        <p class="idade">Idade: ${item.idade} anos</p>
                        <p class="descricao">${item.descricao}</p>
                    </div>

                </div>
            </div>
        `;

        if (!item.adotado) {
            const botaoAdotar = div.querySelector(".adotar");
            botaoAdotar.addEventListener("click", () => {
                window.location.href = `PaginaShowLobinho.html?id=${item.id}`;
            });
        }


        pegar(".lista").appendChild(div);
    },

    update() {
        pegar(".lista").innerHTML = "";

        const pagina = estado.pagina - 1;
        const inicio = pagina * estado.porPagina;
        const fim = inicio + estado.porPagina;

        let dadosFiltrados = lobos;

        if (estado.filtroAdotados) {
            dadosFiltrados = dadosFiltrados.filter(lobo => lobo.adotado);
        }

        if (estado.termoBusca) {
            dadosFiltrados = dadosFiltrados.filter(lobo =>
                lobo.nome.toLowerCase().includes(estado.termoBusca)
            );
        }

        estado.totalPagina = Math.ceil(dadosFiltrados.length / estado.porPagina)

        if (estado.pagina > estado.totalPagina && estado.totalPagina > 0) {
            estado.pagina = estado.totalPagina;
        } else if (estado.totalPagina === 0) {
            estado.pagina = 1;
        }

        const lobosPaginados = dadosFiltrados.slice(inicio, fim);

        lobosPaginados.forEach((item, index) => {
            lista.criar(item, index);
        });

    }
}

const botões = {
    criar(numeroPagina) {
        const botao = document.createElement('div')
        botao.innerHTML = numeroPagina;

        if (numeroPagina === estado.pagina) {
            botao.classList.add('ativo');
        }

        botao.addEventListener("click", () => {
            estado.pagina = numeroPagina;
            update();
        });

        pegar("#exibir").appendChild(botao)

    },

    criarReticencias() {
        const span = document.createElement('span');
        span.classList.add('reticencias');
        span.textContent = "...";
        pegar("#exibir").appendChild(span);
    },
    update() {
        const container = pegar("#exibir");
        container.innerHTML = "";
        const { maxEsquerdo, maxDireito } = botões.calcularMaximoVisivel();

        if (maxEsquerdo > 1) {
            botões.criar(1);
            botões.criarReticencias();
        }

        for (let pagina = maxEsquerdo; pagina <= maxDireito; pagina++) {
            botões.criar(pagina);
        }

        if (maxDireito < estado.totalPagina) {
            botões.criarReticencias();
            botões.criar(estado.totalPagina);
        }
    },

    calcularMaximoVisivel() {
        const { maxBotaoVisivel } = estado
        let maxEsquerdo = (estado.pagina - Math.floor(maxBotaoVisivel / 2))
        let maxDireito = (estado.pagina + Math.floor(maxBotaoVisivel / 2))

        if (maxEsquerdo < 1) {
            maxEsquerdo = 1
            maxDireito = maxBotaoVisivel
        }

        if (maxDireito > estado.totalPagina) {
            maxEsquerdo = estado.totalPagina - (maxBotaoVisivel - 1)
            maxDireito = estado.totalPagina

            if (maxEsquerdo < 1) { maxEsquerdo = 1 }
        }
        return { maxDireito, maxEsquerdo }
    }

}
function update() {
    lista.update()
    botões.update()
}


function iniciar() {
    controls.eventoClickar();
    update();
}

iniciar()






