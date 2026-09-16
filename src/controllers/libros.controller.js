import { crearError } from '../utils/errores.js';
import * as librosService from '../services/libros.service.js';


export const obtenerLibros = async (req, res, next) => {
    try {
        const resultado = await librosService.consultarLibros(req.consultaLibros);
        res.json(resultado);
    } catch (error) {
        next(error);
    }
};

export const obtenerLibroPorId = async (req, res, next) => {
    try {
        const libro = await librosService.obtenerLibroPorId(req.libroId);

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
        const nuevoLibro = await librosService.crearLibro(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        next(error);
    }
};

export const actualizarLibro = async (req, res, next) => {
    try {
        const libro = await librosService.actualizarLibro(req.libroId, req.body);

        if (!libro) {
            return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
        }
        res.json(libro);
    } catch (error) {
        next(error);
    }
};

export const eliminarLibro = async (req, res, next) => {
    try {
        const eliminado = await librosService.eliminarLibro(req.libroId);

        if (!eliminado) {
            return next(crearError(`no existe un libro con id ${req.libroId}`, 404));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};