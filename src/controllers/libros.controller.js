import {libros, siguienteId} from '../data/libros.js';
import { crearError } from '../utils/errores.js';
import prisma from '../config/prisma.js';


export const obtenerLibros = async (req, res, next) => {
    try {
        const {autor, anio} = req.query;

        const where = {};
        if (autor) {
            where.autor = {contains: autor, mode: 'insensitive'};
        }
        if (anio) {
            where.anio = Number(anio);
        }

        const librosPersistidos = await prisma.libro.findMany({ where });
        res.json(librosPersistidos);
    } catch (error) {
        next(error);
    }
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