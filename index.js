/*const express = require('express');
const cors = require('cors');
const { sql, conectarBanco } = require('./Database/BdConfig'); // Importa a conexão
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Inicia a conexão ao banco de dados

app.get('/',(req,res) => {
    return res.json('Servidor Iniciado :)');

});

conectarBanco();
app.get('/Produto',async(req,res)=>{
    try{
    const pool = await sql.connect();
    const data = pool.request().query('select * from tbl_Produto');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log('Erro ao consultar produtos:',err);
    res.status(500).send('Erro ao consultar produtos');
}
});

app.get('/Artesao',async(req,res)=>{
    try{
    const pool = await sql.connect();
    const data = pool.request().query('Select * from tbl_Artesao');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log('Erro ao consultar artesãos',err);
    res.status(500).send('Erro ao consultar artesãos');
}
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});

//Criar artesao

let artesao = [];

app.post('/artesao',async (req,res) => {
    const {Nome,Cidade,Rg,Cpf,Email,Telefone,Endereco,Idade} = req.body;
    if(!Nome || !Cidade|| !Rg|| !Cpf|| !Email|| !Telefone|| !Endereco|| !Idade){
        return res.status(400).send('Nome,Cidade,Rg,Cpf,Email,Telefone,Endereço ou Idade ausentes')
    }

    try{
        //Usa a conexão existente com o banco
        const pool = await sql.connect();
        await pool.request()
        //.input('Id', sql.NVarChar, )
        .input('Nome', sql.NVarChar, Nome)
        .input('Cidade', sql.NVarChar, Cidade)
        .input('Rg', sql.NVarChar, Rg)
        .input('Cpf', sql.NVarChar, Cpf)
        .input('Email', sql.NVarChar, Email)
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Endereco', sql.NVarChar, Endereco)
        .input('Idade', sql.Int, Idade)
        .query('INSERT INTO tbl_Artesao (Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade) VALUES (@Nome, @Cidade, @Rg, @Cpf, @Email, @Telefone, @Endereco, @Idade)');

          res.status(201).send('Artesão inserido com sucesso!');
    }catch(err){
        console.error('Erro ao inserir artesão:', err);
        res.status(500).send('Erro ao inserir artesão');
    }

/*});
//Exibir todos os artesaos
app.get('/artesao',(req,res) =>{
    res.json(artesao);
});
//Exibir por Id
app.get('/artesao/:id',(req,res) =>{
    const artesao = artesao.find(p => p.id === parseInt(req.params.id));
    if(!artesao){
        return res.status(404).send('Artesão não encontrado  -_-');
    }
    res.json(artesaoId);
});
//Atualizar artesao
app.put('/artesao/:id',(req,res) =>{
    const artesaoEncontrado = artesao.find(p => p.id === parseInt(req.params.id));
    if(!artesaoEncontrado){
        return res.status(404).send('Artesão não encontrado');
    }

    const {Nome,Cidade,Rg,Cpf,Email,Telefone,Endereco,Idade} = req.body;
    artesaoEncontrado.Nome = Nome || artesaoEncontrado.Nome;
    artesaoEncontrado.Cidade = Cidade || artesaoEncontrado.Cidade;
    artesaoEncontrado.Rg = Rg || artesaoEncontrado.Rg;
    artesaoEncontrado.Cpf = Cpf || artesaoEncontrado.Cpf;
    artesaoEncontrado.Email = Email || artesaoEncontrado.Email;
    artesaoEncontrado.Telefone = Telefone|| artesaoEncontrado.Telefone;
    artesaoEncontrado.Endereco = Endereco|| artesaoEncontrado.Endereco;
    artesaoEncontrado.Idade = Idade|| artesaoEncontrado.Idade;
    
    res.send(artesaoEncontrado);
});
/* {
    "Nome":"José",
    "Cidade":"SP",
    "Rg":"19809877",
    "Cpf":"1980999",
    "Email":"joseArtesanato@gmail.com ",
    "Telefone":"11984417588",
    "Endereco":"Rua cel dilermano Brisola ",
    "Idade":20
}*/
//Deletar Artesão
/*app.delete('/artesao/:id',(req,res) =>{
    const artesaoIndex = artesao.findIndex(p => p.id === parseInt(req.params.id));
    if(artesaoIndex === -1){
        return res.status(404).send('Artesão não encontrado');
    }

     artesao.splice(artesaoIndex, 1);
     res.status(204).send('Produto deletado com sucesso :)');
});
//Crud Produto

let produto = [];

app.post('/produto', async (req,res) => {
    const {Nome,Descricao,Preco}= req.body;
    if(!Nome||!Descricao||!Preco){
        return res.status(400).send('Nome,Descricao ou Preço ausentes');
    }
    try{
        //Usa a conexão existente com o banco
        const pool = await sql.connect();
        await pool.request()
        //.input('Id', sql.NVarChar, )
        .input('Nome', sql.NVarChar, Nome)
        .input('Descricao', sql.NVarChar, Descricao)
        .input('Preco', sql.Money, Preco)
        .query('INSERT INTO tbl_Produto (Nome,Descricao,Preco) VALUES (@Nome, @Descricao, @Preco)');

          res.status(201).send('Produto inserido com sucesso!');
    }catch(err){
        console.error('Erro ao inserir produto:', err);
        res.status(500).send('Erro ao inserir produto');
    }
    /*const novoProduto ={id: produto.length+1,Nome,Descricao,Preco}
    produto.push (novoProduto);
    res.status(201).send(novoProduto);*/
/*});
app.get('/produto',(req,res) =>{
    res.json(produto);
});
app.get('/produto/:id',(req,res) =>{
    const prod = produto.find(p => p.id === parseInt(req.params.id));
    if(!prod){
        return res.status(404).send('Produto não encontrado -_-');
    }
    res.json(prod);
});
app.put('/produto/:id',(req,res) =>{
    const produtoEncontrado = produto.find(p => p.id === parseInt(req.params.id));
    if(!produtoEncontrado){
        return res.status(404).send('Produto não encontrado -_-');
    }
    const {Nome,Descricao,Preco} = req.body;
    produtoEncontrado.Nome = Nome || produtoEncontrado.Nome;
    produtoEncontrado.Descricao = Descricao || produtoEncontrado.Descricao;
    produtoEncontrado.Preco = Preco || produtoEncontrado.Preco;

    res.send(produtoEncontrado);
});
app.delete('/produto/:id',(req,res) =>{
    const deletarProduto = produto.find(p => p.id === parseInt(req.params.id));
    if(deletarProduto === -1){
        return res.status(404).send('Produto não encontrado -_-');
    }
    produto.splice(deletarProduto,1);
    res.status(202).send('Produto deletado com sucesso :)');
    
});*/