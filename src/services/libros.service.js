import prisma from '../config/prisma.js';
import { crearError } from '../utils/errores.js';

const verificarCategoria = async (categoriaId) => {
    if (categoriaId == undefined || categoriaId == null) {
        return;
    }

    const categoria = await prisma.categoria.findUnique({where: {id: categoriaId}});

    if (!categoria) {
        throw crearError(`no existe una categoria con id ${categoriaId}`, 400);
    }
};

export const consultarLibros = async (criterios) => {
    const {
        titulo,autor,anio,anioDesde,anioHasta,categoriaId,ordenPor,direccion,pagina,limite
    } = criterios

    const where = {}

    if(titulo !== undefined){
        where.titulo = {
            contains: titulo,
            mode: 'insensitive'
        };
    }

    if(autor !== undefined){
        where.autor = {
            contains: autor,
            mode: 'insensitive'
        };
    }

    if(categoriaId !== undefined){
        where.categoriaId = categoriaId;
    }

    if(anio !== undefined || anioDesde !== undefined || anioHasta !== undefined){
        where.anio = {};
        if(anio !== undefined) where.anio.equals = anio;
        if(anioDesde !== undefined) where.anio.gte = anioDesde;
        if(anioHasta !== undefined) where.anio.lte = anioHasta;
    }

    const desplazamiento = (pagina - 1) * limite;

    const[libros,total] = await prisma.$transaction([
        prisma.libro.findMany({
            where,
            orderBy: [
                {[ordenPor]: direccion}, {id: 'asc'}
            ],
            skip: desplazamiento,
            take: limite,
            include: {categoria: true}
        }),
        prisma.libro.count({where})
    ]);

    return {
        libros, paginacion:{
            pagina,
            limite,
            total,
            totalPaginas: Math.ceil(total / limite)
        }
    }
    
};

export const obtenerLibroPorId = async (id) => {
    return prisma.libro.findUnique({where: {id}, include: {categoria: true}});
};

export const crearLibro = async (datos) => {
    const {titulo,autor,anio, categoriaId} = datos;
    await verificarCategoria(categoriaId);
    return prisma.libro.create({data: {titulo,autor,anio: anio ?? null, categoriaId: categoriaId ?? null}, include: {categoria: true}});
};

export const actualizarLibro = async (id, datos) => {
    const existe = await prisma.libro.findUnique({where: {id}});

    if (!existe) {
        return null;
    }

    const {titulo,autor,anio, categoriaId} = datos;

    await verificarCategoria(categoriaId);

    return prisma.libro.update({where: {id}, data: {titulo,autor,anio: anio ?? null, categoriaId: categoriaId ?? null}, include: {categoria: true}});
};

export const eliminarLibro = async (id) => {
    const existe = await prisma.libro.findUnique({where: {id}});

    if (!existe) {
        return null;
    }

    return prisma.libro.delete({where: {id}});
}