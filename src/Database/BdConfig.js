const sql = require('mssql');
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
module.exports = { sql, conectarBanco}; 
