const express = require('express');
const app = express();
const pool = require('./db');

app.listen(3000, () => {
    console.log("server iniciado!")
})

app.get('/', (req, res) =>
    res.send('<h1 style="color: blue">Criando um servidor!</h1>')
)

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.log("Erro: " + error);
        res.status(500).send('Erro ao buscar usuarios!')
    }
})