import { libroSchema } from "../validators/libros.schemas.js";
import { crearError, detallarErroresZod } from "../utils/errores.js";



export const validarLibro = (req, res, next) => {
    const resultado = libroSchema.safeParse(req.body);
    console.log('Resultado de la validación:', resultado);
    if (!resultado.success) {
        const detalles = detallarErroresZod(resultado.error);
        return next(crearError('Datos de libro inválidos', 400, detalles));
    }

    req.body = resultado.data;
    next();
}

