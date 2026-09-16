import express from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLirbro, actualizarLibro, eliminarLibro } from '../controllers/libros.controller.js';
import { validarId } from '../middlewares/validarId.js';
import { validarLibro } from '../middlewares/validarLibro.js';
import { validarConsultaLibros } from '../middlewares/validarConsultaLibros.js';

const router = express.Router();

router.get('/',validarConsultaLibros, obtenerLibros);
router.get('/:id',validarId, obtenerLibroPorId);
router.post('/', validarLibro, crearLirbro);
router.put('/:id', validarId, validarLibro, actualizarLibro);
router.delete('/:id', validarId, eliminarLibro);

export default router;