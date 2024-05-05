const mysql = require('../connect/mysql').pool;// Importa o módulo mysql e obtém a pool de conexão

function getProdutos(callback) {// Função para obter todos os produtos
    mysql.getConnection((error, conn) => {
        if (error) {
            return callback(error, null);// Retorna o erro através do callback
        }

        conn.query('SELECT * FROM ProdutosAnderson;', (error, result, fields) => {
            conn.release();
            if (error) {// Verifica se há erro durante a execução da consulta
                return callback(error, null);
            }
            // Mapeia os resultados da consulta para um formato específico de objeto
            const avisos = result.map(prod => {
                return {
                    id: prod.id,
                    nomeProduto: prod.nomeProduto,
                    tamanhoProduto: prod.tamanhoProduto,
                    potenciaProduto: prod.potenciaProduto,
                    marcaProduto: prod.marcaProduto,
                    preco: prod.preco,
                    precoAluguel: prod.precoAluguel,
                    imagemProduto: prod.imagemProduto
                };
            });

            callback(null, avisos); // Retorna os resultados através do callback
        });
    });
};

function postCriarProduto(infoPrduto, res, callback) {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        const query = 'INSERT INTO ProdutosAnderson (nomeProduto, tamanhoProduto, potenciaProduto, marcaProduto, preco, precoAluguel, imagemProduto) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = Object.values(infoPrduto);

        conn.query(query, values, (error, result, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            const response = {
                id: result.insertId,
                message: 'Produto criado com sucesso!'
            };
            return callback(null, response);
        });
    });
}

function deletaProduto(id, res, callback) { // Função para deletar um produto
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }

        const query = 'DELETE FROM ProdutosAnderson WHERE id = ?';// Query SQL para deletar um produto com base no ID
        const values = [id];

        conn.query(query, values, (error, result, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({ error: error });
            }
            const response = {
                id: id,
                message: 'Registro deletado com sucesso'
            };
            return callback(null, response);
        });
    });
}

module.exports = { // Exporta as funções para serem utilizadas em outros arquivos
    getProdutos: getProdutos,
    postCriarProduto: postCriarProduto,
    deletaProduto: deletaProduto
};