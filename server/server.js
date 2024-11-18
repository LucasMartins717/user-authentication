const express = require('express');
const cors = require('cors')
const db = require('./db');

const app = express();
app.use(cors());

app.get('/users', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    }catch(err){
        console.log("DB error: " + err)
        res.status(500).send('Server error!');
    }
})

app.listen(3030, () => {
    console.log("Server running, port 3030")
})