import express from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLirbro, actualizarLibro, eliminarLibro } from '../controllers/libros.controller.js';
import { validarId } from '../middlewares/validarId.js';
import { validarLibro } from '../middlewares/validarLibro.js';

const router = express.Router();

router.get('/', obtenerLibros);
router.get('/:id',validarId, obtenerLibroPorId);
router.post('/', validarLibro, crearLirbro);
router.put('/:id', validarId, validarLibro, actualizarLibro);
router.delete('/:id', validarId, eliminarLibro);

export default router;