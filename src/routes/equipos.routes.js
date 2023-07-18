import { Router } from "express";
import { getEquipos, createEquipos, getEquipo, updateEquipo, deleteEquipo} from '../controllers/equipos.controller.js'
const router = Router()

router.get('/equipos', getEquipos)

router.get('/equipos/:id', getEquipo)

router.post('/equipos', createEquipos)

router.patch('/equipos/:id', updateEquipo)

router.delete('/equipos/:id', deleteEquipo)



export default router