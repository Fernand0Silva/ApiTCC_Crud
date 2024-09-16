const { sql } = require('../Database/BdConfig');

async function listarProdutos() {
    const pool = await sql.connect();  // Conexão com o banco de dados
    const data = await pool.request().query('SELECT * FROM tbl_Produto'); // Executa a query SQL
    return data.recordset;  // Retorna os dados
}

module.exports = { listarProdutos };  // Exporta a função para ser usada em outras partes do código
