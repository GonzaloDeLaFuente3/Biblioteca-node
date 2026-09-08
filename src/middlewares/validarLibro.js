import { crearError } from "../utils/errores.js";

const ANIO_MINIMO = 1450;

export const validarLibro = (req, res, next) => {
    const { titulo, autor, anio } = req.body;

    if (typeof titulo !== 'string' || titulo.trim() === '') {
        return next(crearError('El título es obligatorio, debe ser una cadena de texto y no vacia', 400));
    }

    if (typeof autor !== 'string' || autor.trim() === '') {
        return next(crearError('El autor es obligatorio, debe ser una cadena de texto y no vacia', 400));
    }   

    if (anio !== undefined && anio !== null){
        const anioActual = new Date().getFullYear();

        if(!Number.isInteger(anio)){
            return next(crearError('El año debe ser un número entero', 400));
        }

        if (anio < ANIO_MINIMO || anio > anioActual) {
            return next(crearError(`El año debe estar entre ${ANIO_MINIMO} y ${anioActual}`, 400));
        }
    }

    req.body.titulo = titulo.trim();
    req.body.autor = autor.trim();
    next();
}

