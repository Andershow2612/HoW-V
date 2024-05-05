// Função para buscar dados da API e renderizá-los
function fetchData() {
    fetch('URL DO BANCO DE DADOS')
        .then(response => response.json())
        .then(data => renderizarRegistros(data.registros))
        .catch(error => console.error('Erro ao buscar os dados:', error));
}
// Função para excluir um registro
function excluirBotao(id) {
    fetch(`URL DO BANCO DE DADOS${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) { // Verifica se a resposta não foi OK
                throw new Error('Erro ao excluir');
            }
            alert('Excluido com sucesso');
            setTimeout(() => {
                window.location.href='./index.html';
            }, 300);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

// Função para renderizar os registros no HTML
function renderizarRegistros(registros) {
    const container = document.getElementById('registros-container');

    registros.forEach(registro => {
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="flexionando">
                    <div class="infoproduto">
                        <p>ID: ${registro.id}</p>
                        <p>Nome do Produto: ${registro.nomeProduto}</p>
                        <p>Tamanho do Produto: ${registro.tamanhoProduto}</p>
                        <p>Potência do Produto: ${registro.potenciaProduto}</p>
                        <p>Marca do Produto: ${registro.marcaProduto}</p>
                        <p>preço Aluguel: ${registro.precoAluguel}</p>
                        <p>preço: ${registro.preco}</p>
                    </div>
                        <div><img class="img-content" src="${registro.imagemProduto}"/></div>
                        <div class="btn-excluir" id="excluir-btn"><button onClick="excluirBotao(${registro.id})" >Excluir</button></div>
                </div>
            `;// Adiciona HTML com informações do registro e um botão de exclusão
        container.appendChild(div);
    });
}

window.onload = fetchData;// Quando a página é carregada, chama a função fetchData para buscar e renderizar os registros