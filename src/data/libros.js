export const libros = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1949 },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605 },
    { id: 3, titulo: 'Ficciones', autor: 'George Orwell', anio: 1948 },
    { id: 4, titulo: 'El Principito', autor: 'Borges', anio: 1963 }
];

export const siguienteId = () => libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) + 1 : 1;
