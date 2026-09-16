import express from 'express';
import librosRoutes from './routes/libros.routes.js';
import { logger } from './middlewares/logger.js';
import { manejadorErrores } from './middlewares/manejadorErrores.js';
import { noEncontrado } from './middlewares/noEncontrado.js';
import {z} from 'zod';

z.config(z.locales.es())
const app = express();
app.use(logger); // Middleware de registro de solicitudes
app.use(express.json());

const PORT = 3000;

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

app.use('/libros', librosRoutes);


app.use(noEncontrado); // Middleware de manejo de rutas no encontradas
app.use(manejadorErrores); // Middleware de manejo de errores, siempre va al ultimo

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});