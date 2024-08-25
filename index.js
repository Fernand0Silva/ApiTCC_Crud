const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/',(req,res) => {
    return res.json('Hello world');

});

let artesao = [];

//Criar artesao

app.post('/artesao',(req,res) => {
    const {Id, Nome,Cidade} = req.body;
    if(!Nome || !Cidade){
        return res.status(400).send('Nome ou Cidade ausentes')
    }
    const novoArtesao = {id: artesao.length + 1, Nome, Cidade};
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

    const {Nome,Cidade} = req.body;
    artesaoEncontrado.Nome = Nome || artesaoEncontrado.Nome;
    artesaoEncontrado.Cidade = Cidade || artesaoEncontrado.Cidade;
    
    res.send(artesaoEncontrado);
});
//Deletar Artesão
app.delete('/artesao/:id',(req,res) =>{
    const artesaoIndex = artesao.findIndex(p => p.id === parseInt(req.params.id));
    if(artesaoIndex === -1){
        return res.status(404).send('Artesão não encontrado');
    }

     artesao.splice(artesaoIndex, 1);
     res.status(204).send();
});

app.listen(port, () =>{
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});