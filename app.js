import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

const libros = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1949 },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605 },
    { id: 3, titulo: 'Ficciones', autor: 'George Orwell', anio: 1948 },
    { id: 4, titulo: 'El Principito', autor: 'Borges', anio: 1963 }
];

app.get('/libros', (req, res) => {
    const { autor, anio } = req.query;

    let resultado = libros;

    if (autor) {
        resultado = resultado.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
    }

    if (anio) {
        resultado = resultado.filter(libro => libro.anio === Number(anio));
    }
    res.json(resultado);
});

app.get('/libros/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID del libro debe ser un número entero positivo' });
    }

    const libro = libros.find(libro => libro.id === id);

    if (!libro) {
        return res.status(404).json({ error: `no existe un libro con id ${id}` });
    }

    res.json(libro);
});

app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST de gestión de libros');
});

app.get('/info', (req, res) => {
    res.json({
        nombre: 'API REST de gestión de libros',
        version: '1.0.0',
        autor: 'Tu Nombre',
        estado: 'En desarrollo'
    });
} );

app.post('/libros', (req, res) => {
    const { titulo, autor, anio } = req.body;

    if (!titulo || !autor ) {
        return res.status(400).json({ error: 'Faltan datos obligatorios: titulo y autor son requeridos' });
    }

    const nuevoId = libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) + 1 : 1;

    const nuevoLibro = { id: nuevoId, titulo, autor, anio: anio ?? null };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
    
});

app.put('/libros/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID del libro debe ser un número entero positivo' });
    }

    const libro = libros.find(libro => libro.id === id);

    if (!libro) {
        return res.status(404).json({ error: `no existe un libro con id ${id}` });
    }

    const { titulo, autor, anio } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ error: 'Faltan datos obligatorios: titulo y autor son requeridos' });
    }

    libro.titulo = titulo;
    libro.autor = autor;
    libro.anio = anio ?? null;

    res.json(libro);
});

app.delete('/libros/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'El ID del libro debe ser un número entero positivo' });
    }

    const indice = libros.findIndex(libro => libro.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: `no existe un libro con id ${id}` });
    }

    libros.splice(indice, 1);
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});