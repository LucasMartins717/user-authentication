const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

app.post('/check-username', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await db.query('SELECT username FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            res.status(409).json({ message: 'Nome de usuário em uso!' });
        } else {
            res.status(200).json({ message: 'Nome de usuário disponivel!' });
        }
    } catch (err) {
        console.log("DB error: " + err);
        res.status(500).send('Server Error!');
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({ message: 'usuário registrado com sucesso!' });
    } catch (err) {
        console.log('Erro ao registrar usuário: ' + err);
        res.status(500).json({ message: 'Falha ao registra usuário!' });
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        const user = response.rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }

        const correctPassword = bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY, {
            expiresIn: '1h'
        });
        res.json({token});
    } catch (err) {
        console.log('Erro ao fazer login: ' + err);
        res.status(500).send('Server Error!');
    }
})

app.listen(3030, () => {
    console.log("Server running, port 3030")
})