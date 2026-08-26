import express from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLirbro, actualizarLibro, eliminarLibro } from '../controllers/libros.controller.js';
import { validarId } from '../middlewares/validarId.js';

const router = express.Router();

router.get('/', obtenerLibros);
router.get('/:id',validarId, obtenerLibroPorId);
router.post('/', crearLirbro);
router.put('/:id', validarId, actualizarLibro);
router.delete('/:id', validarId, eliminarLibro);

export default router;