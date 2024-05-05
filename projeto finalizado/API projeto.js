const express = require('express');// Importa o módulo express
const router = express.Router();// Cria um novo objeto de roteador Express

const AndersonEstudos = require('../models/AndersonEstudo');

/* Get TODOS OS DADOS */
/* URL EXEMPLO: URL DA API */
router.get('/', (req, res, next) => { // Define uma rota HTTP GET para a raiz do URL
    AndersonEstudos.getProdutos((error, frotas) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        const response = {
            quantidade: frotas.length,
            registros: frotas
        };
        return res.status(200).json(response);
    });
});
/* Rota para criar um novo produto */
router.post('/criar-produto', (req, res, next) => {
    const { nomeProduto, tamanhoProduto, potenciaProduto, marcaProduto, preco, precoAluguel, imagemProduto } = req.body;

    const infosProdutos = { // Cria um objeto com as informações do produto
        nomeProduto: nomeProduto,
        tamanhoProduto: tamanhoProduto,
        potenciaProduto: potenciaProduto,
        marcaProduto: marcaProduto,
        preco: preco,
        precoAluguel: precoAluguel,
        imagemProduto: imagemProduto
    };

    AndersonEstudos.postCriarProduto(infosProdutos, res, (error, result) => {// Chama a função postCriarProduto do modelo AndersonEstudo para criar um novo produto
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json({ dados: result }); // Retorna o erro como resposta HTTP 500 em formato JSON
    });
}); 

router.delete('/deletar-produto/:id', (req, res, next) => {
    const { id } = req.params;

    AndersonEstudos.deletaProduto(id, res, (error, result) => {// Chama a função deletaProduto do modelo AndersonEstudo para deletar um produto
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.status(200).json({ dados: result });
    })
}); 

module.exports = router;// Exporta o roteador para ser usado em outros arquivos