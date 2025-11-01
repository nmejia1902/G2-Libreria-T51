const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get('/book', (req,res)=>{
    res.json({status:200, message:'success', data:books});
});

app.post('/book', (req,res)=>{
    const book = req.body;
    books.push(book);
    res.json({status:200, message:'success', data:book});
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});