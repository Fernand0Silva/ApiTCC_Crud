//const express = require('express');
const sql = require('mssql');
//const cors = require('cors');
//const app = express();
//app.use(cors());

const config={
    user:"sa",
    password:"7Pecado$",
    server:"DESKTOP-ALOTJN8",
    database:"Artesanato",
    options:{
        trustServerCertificate:true,
        trustedConnection:false,
        enableArithbort:true,
        instancename:"SQLEXPRESS",
    },
    port:1433
}
// Função para conectar ao banco de dados
async function conectarBanco() {
    try {
        await sql.connect(config);
        console.log('Conectado ao SQL Server');
    } catch (err) {
        console.error('Erro ao conectar ao SQL Server:', err);
    }
}

/*conectarBanco();

app.get('/Produto',async(req,res)=>{
    try{
    const pool = await sql.connect(config);
    const data = pool.request().query('select * from tbl_Produto');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log(err);
}
});

app.get('/Artesao',async(req,res)=>{
    try{
    const pool = await sql.connect(config);
    const data = pool.request().query('select * from tbl_Artesao');
    data.then(resl=>{
        return res.json(resl);
    });
} 
catch(err)
{
    console.log(err);
}
});

app.get('/',(req,res)=>{
    return res.json("backend on!!!");
});

//const port = 3000;

/*app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});*/

//Exporta a conexão e a função para ser usad em outros arquivos
module.exports = { sql, conectarBanco}; 
