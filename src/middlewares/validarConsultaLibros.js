import { consultarLibrosSchema } from "../validators/libros.schemas.js";
import { crearError,detallarErroresZod } from "../utils/errores.js";

export const validarConsultaLibros = (req, res, next) => {
    const resultado = consultarLibrosSchema.safeParse(req.query);

    if (!resultado.success) {
        const detalles = detallarErroresZod(resultado.error);
        return next(crearError('Los parametros de consulta son invalidos', 400, detalles));
    }

    req.consultaLibros = resultado.data;
    next();
};