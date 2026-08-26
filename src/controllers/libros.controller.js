import {libros, siguienteId} from '../data/libros.js';
import { crearError } from '../utils/errores.js';


export const obtenerLibros = (req, res) => {
    const { autor, anio } = req.query;

        let resultado = libros;

        if (autor) {
            resultado = resultado.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
        }

        if (anio) {
            resultado = resultado.filter(libro => libro.anio === Number(anio));
        }
        res.json(resultado);
};

export const obtenerLibroPorId = (req, res, next) => {

    const libro = libros.find(libro => libro.id === req.libroId);

    if (!libro) {
        return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
    }

    res.json(libro);
};


export const crearLirbro = (req, res, next) => {
    const { titulo, autor, anio } = req.body;

    if (!titulo || !autor ) {
        return next(crearError('Faltan datos obligatorios: titulo y autor son requeridos', 400));
    }

    const nuevoLibro = { id: siguienteId(), titulo, autor, anio: anio ?? null };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
};

export const actualizarLibro = (req, res, next) => {

    const libro = libros.find(libro => libro.id === req.libroId);

    if (!libro) {
        return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
    }

    const { titulo, autor, anio } = req.body;

    if (!titulo || !autor) {
        return next(crearError('Faltan datos obligatorios: titulo y autor son requeridos', 400));
    }

    libro.titulo = titulo;
    libro.autor = autor;
    libro.anio = anio ?? null;

    res.json(libro);
};

export const eliminarLibro = (req, res, next) => {

    const indice = libros.findIndex(libro => libro.id === req.libroId);

    if (indice === -1) {
        return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
    }

    libros.splice(indice, 1);
    res.status(204).send();
};