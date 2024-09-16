// app.js
const express = require('express');
const cors = require('cors');
const { conectarBanco } = require('./Database/BdConfig');
const produtoRoutes = require('./Routes/ProdutoRoutes');
const artesaoRoutes = require('./Routes/ArtesaoRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Inicia a conexão ao banco de dados
conectarBanco();

// Rotas
app.use('/Produto', produtoRoutes);
app.use('/Artesao', artesaoRoutes);

app.get('/', (req, res) => {
    return res.json('Servidor Iniciado :)');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
