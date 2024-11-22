const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.log("DB error: " + err)
        res.status(500).send('Server error!');
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({message: 'Usuario registrado com sucesso!'});
    } catch (err) {
        console.log('Erro ao registrar usuario: ' + err);
        res.status(500).json({ message: 'Falha ao registra usuario!'});
    }
})

app.listen(3030, () => {
    console.log("Server running, port 3030")
})