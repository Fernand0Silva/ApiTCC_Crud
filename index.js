const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/',(req,res) => {
    return res.json('Servidor Iniciado :)');

});

let artesao = [];

//Criar artesao

app.post('/artesao',(req,res) => {
    const {Nome,Cidade,Rg,Cpf,Email,Telefone,Endereco,Idade} = req.body;
    if(!Nome || !Cidade|| !Rg|| !Cpf|| !Email|| !Telefone|| !Endereco|| !Idade){
        return res.status(400).send('Nome,Cidade,Rg,Cpf,Email,Telefone,Endereço ou Idade ausentes')
    }
    const novoArtesao = {id: artesao.length + 1, Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade};
    artesao.push(novoArtesao);
    res.status(201).send(novoArtesao);
});
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
    "Rg":19809877,
    "Cpf":1980999,
    "Email":"joseArtesanato@gmail.com ",
    "Telefone":11984417588,
    "Endereco":"Rua cel dilermano Brisola ",
    "Idade":20
}*/
//Deletar Artesão
app.delete('/artesao/:id',(req,res) =>{
    const artesaoIndex = artesao.findIndex(p => p.id === parseInt(req.params.id));
    if(artesaoIndex === -1){
        return res.status(404).send('Artesão não encontrado');
    }

     artesao.splice(artesaoIndex, 1);
     res.status(204).send('Produto deletado com sucesso :)');
});
//Crud Produto

let produto = [];

app.post('/produto',(req,res) => {
    const {Nome,Descricao,Preco}= req.body;
    if(!Nome||!Descricao||!Preco){
        return res.status(400).send('Nome,Descricao ou Preço ausentes');
    }
    const novoProduto ={id: produto.length+1,Nome,Descricao,Preco}
    produto.push (novoProduto);
    res.status(201).send(novoProduto);
});
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
    
});

app.listen(port, () =>{
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});