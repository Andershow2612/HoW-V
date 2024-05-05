const NomeProdutoForm = document.getElementById("NomeProdutoForm"); //aqui é declarado os valores que vem dos input do html
const TamanhoProdutoForm = document.getElementById("TamanhoProdutoForm");
const PotenciaProdutoForm = document.getElementById("PotenciaProdutoForm");
const MarcaProdutoInfo = document.getElementById("MarcaProdutoInfo");
const PreçoAluguelProdutoInfo = document.getElementById("PreçoAluguelProdutoInfo");
const ImagemProduto = document.getElementById("imagemProduto");
const preco = document.getElementById("preco");

function criarProduto() { //essa é a função onde atribui os valores aos nomes com o .value; let é usado para armazenar as informações das const
    let nome = NomeProdutoForm.value;
    let tamanho = TamanhoProdutoForm.value;
    let potencia = PotenciaProdutoForm.value;
    let marca = MarcaProdutoInfo.value;
    let precoAluguel = PreçoAluguelProdutoInfo.value;
    let imagemProduto = ImagemProduto.value;
    let precoproduto = preco.value;

    const data = { //essa é a parte de criação de objeto.
        nomeProduto: nome,
        tamanhoProduto: Number(tamanho),
        potenciaProduto: Number(potencia),
        marcaProduto: marca,
        preco: Number(precoproduto),
        precoAluguel: Number(precoAluguel),
        imagemProduto: imagemProduto,
    }
     // Configurações da requisição POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const url = "URL DO BANCO DE DADOS"

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a solicitação');
            }
            return response.json();// Converte a resposta para JSON
        })
        .then(data => {
            alert('Adicionado com sucesso!');// Exibe um alerta de sucesso
            setTimeout(() => {
                window.location.href='../../../index.html'; // Redireciona para a página inicial após um pequeno intervalo
            }, 300);
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
};