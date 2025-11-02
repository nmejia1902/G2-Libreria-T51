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

app.put('/book/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    const { titulo, autor, genero, anioPublicacion } = req.body;

    books[index] = {
        ...books[index],
        titulo: titulo || books[index].titulo,
        autor: autor || books[index].autor,
        genero: genero || books[index].genero,
        anioPublicacion: anioPublicacion || books[index].anioPublicacion
    };

    res.json({
        mensaje: 'Libro actualizado correctamente',
        libro: books[index]
    });
});

app.delete('/book/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const filtroLibro = books.filter(book => book.id !== id);
    if(filtroLibro.length !== books.length){
        books = filtroLibro;
        res.json({status:200, message:'Usuario eliminado correctamente'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});