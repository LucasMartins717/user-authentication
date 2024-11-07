const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("server iniciado!")
})

app.get('/', (req, res) => 
res.send('<h1 style="color: blue">Criando um servidor!</h1>')
)