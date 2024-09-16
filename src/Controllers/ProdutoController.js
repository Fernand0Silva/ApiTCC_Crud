const { listarProdutos } = require('../Models/ProdutoModel');

async function getProdutos(req, res) {
    try {
        const produtos = await listarProdutos();
        return res.json(produtos);
    } catch (err) {
        console.error('Erro ao consultar produtos:', err);
        return res.status(500).send('Erro ao consultar produtos');
    }
}

module.exports = { getProdutos };