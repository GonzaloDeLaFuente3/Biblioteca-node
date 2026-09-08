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

        const librosPersistidos = await prisma.libro.findMany({ 
            where,
            include: {categoria: true}
        });
        res.json(librosPersistidos);
    } catch (error) {
        next(error);
    }
};

export const obtenerLibroPorId = async (req, res, next) => {
    try {
        const libro = await prisma.libro.findUnique({
            where: { id: req.libroId },
            include: {categoria: true}
        });

        if (!libro) {
            return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
        }

        res.json(libro);
    } catch (error) {
        next(error);
    }
};


export const crearLirbro = async(req, res, next) => {
    try {
        const { titulo, autor, anio } = req.body;

        const nuevoLibro = await prisma.libro.create({
            data: {
                titulo, autor, anio: anio ?? null
            }
        });
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
};

export const actualizarLibro = async (req, res, next) => {
    try {
        const existe = await prisma.libro.findUnique({
            where: { id: req.libroId }
        });

        if (!existe) {
            return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
        }

        const { titulo, autor, anio } = req.body;

        const libroActualizado = await prisma.libro.update({
            where: { id: req.libroId },
            data: {
                titulo, autor, anio: anio ?? null
            }
        });

        res.json(libroActualizado);
    } catch (error) {
        next(error);
    }
};

export const eliminarLibro = async (req, res, next) => {
    try {
        const existe = await prisma.libro.findUnique({
            where: { id: req.libroId }
        });

        if(!existe) {
            return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
        }

        await prisma.libro.delete({
            where: { id: req.libroId }
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};