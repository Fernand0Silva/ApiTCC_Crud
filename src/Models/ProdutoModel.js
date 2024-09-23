const { sql } = require('../Database/BdConfig');

async function listarProdutos() {
    const pool = await sql.connect();  // Conexão com o banco de dados
    const data = await pool.request().query('SELECT * FROM tbl_Produto'); // Executa a query SQL
    return data.recordset;  // Retorna os dados
}

async function criarProduto(Nome,Descricao,Preco) {
    const pool = await sql.connect();
    await pool.request()
    .input('Nome',sql.NVarChar,Nome)
    .input('Descricao',sql.NVarChar,Descricao)
    .input('Preco',sql.Int,Preco)
    .query('INSERT INTO tbl_Produto (Nome, Descricao, Preco) VALUES (@Nome, @Descricao, @Preco)');   
}
async function listarProdutoPorId(id) {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM tbl_Produto WHERE Id = @Id');
    return result.recordset[0]; // Retorna o primeiro resultado
}
async function atualizarProduto(id,Nome,Descricao,Preco) {
    const pool = await sql.connect();
    const result = await pool.request()
    .input('Id', sql.Int, id)
    .input('Nome',sql.NVarChar,Nome)
    .input('Descricao',sql.NVarChar,Descricao)
    .input('Preco',sql.Int,Preco)
    .query('UPDATE tbl_Produto SET Nome = @Nome, Descricao = @Descricao, Preco = @Preco WHERE Id = @Id');
    return result.rowsAffected[0];  
}

module.exports = { listarProdutos, criarProduto,listarProdutoPorId,atualizarProduto};  // Exporta a função para ser usada em outras partes do código
