import {z} from 'zod';

const ANIO_MINIMO = 1450;
const ANIO_ACTUAL = new Date().getFullYear();

export const libroSchema = z.object({
    titulo: z.string().trim().min(1, {message: 'El título es obligatorioo'}),
    autor: z.string().trim().min(1, {message: 'El autor es obligatorio'}),
    anio: z.number().int().min(ANIO_MINIMO, {message: `El año debe ser mayor o igual a ${ANIO_MINIMO}`}).max(ANIO_ACTUAL, {message: `El año debe ser menor o igual a ${ANIO_ACTUAL}`}).nullable().optional(),
    categoriaId: z.number().int().positive().nullable().optional()
});

export const consultarLibrosSchema = z.object({
    titulo: z.string().trim().min(1, {message: 'El título es obligatorio'}).optional(),
    autor: z.string().trim().min(1, {message: 'El autor es obligatorio'}).optional(),
    anio: z.coerce.number().int().optional(),
    anioDesde: z.coerce.number().int().optional(),
    anioHasta: z.coerce.number().int().optional(),
    categoriaId: z.coerce.number().int().positive().optional(),
    ordenPor: z.enum(['titulo', 'autor', 'anio','createdAt']).default('titulo'),
    direccion: z.enum(['asc', 'desc']).default('asc'),
    pagina: z.coerce.number().int().positive().default(1),
    limite: z.coerce.number().int().min(1).max(50).default(10)
}).refine(
    ({anioDesde, anioHasta}) => 
anioDesde === undefined || anioHasta === undefined || anioDesde <= anioHasta,
    {message: 'anioDesde no puede ser mayor que anioHasta', path: ['anioDesde', 'anioHasta']}
);