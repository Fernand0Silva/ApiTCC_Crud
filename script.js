/*const axios = require('axios');
const { sql, connectDB } = require('./Database/BdConfig');

async function fetchDataAndStore() {
    try {
        // Conecte ao banco de dados
        await connectDB();

        // Consome a API
        const response = await axios.get('https://api.example.com/data'); // Substitua pela URL da API
        const data = response.data;

        // Itera pelos dados recebidos da API e insere no banco de dados
        for (let item of data) {
            const query = `
                INSERT INTO sua_tabela (coluna1, coluna2, coluna3)
                VALUES (@valor1, @valor2, @valor3)
            `;
            const request = new sql.Request();
            request.input('valor1', sql.VarChar, item.campo1); // Ajuste os tipos de dados conforme necessário
            request.input('valor2', sql.Int, item.campo2);
            request.input('valor3', sql.VarChar, item.campo3);
            
            await request.query(query);
        }

        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao buscar ou inserir dados:', error);
    } finally {
        sql.close(); // Feche a conexão
    }
}
// Executa a função
fetchDataAndStore();
//Nome,Descricao,Preco*/

/* Create table tbl_Produto(
 Id int Identity(1,1) Primary Key,
 Nome varchar(100),
 Descricao varchar(100),
 Preco money  

);*/