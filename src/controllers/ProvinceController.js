import express from "express";
import ProvinceService from "../services/province-services.js"
import { Pagination } from "../utils/paginacion.js";

const router = express.Router();
const pagination = new Pagination();
const provinceService = new ProvinceService();

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const provincia = await provinceService.GetProvinciaById(req.params.id);
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las provincias con paginación
router.get('/', async (req, res) => {
  let { limit, offset } = req.query;
  limit = pagination.parseLimit(limit)
  offset = pagination.parseOffset(offset)
  try {
    const provincias = await provinceService.GetAllProvincias(limit, offset);
    const paginatedResponse = pagination.buildPaginationDto(limit, offset, provincias, req.path);
        res.status(200).json({
            paginacion: paginatedResponse
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const {name, full_name, latitude, longitude, display_order} = req.body;
  try {
    if(display_order === undefined || display_order >= 0){
      const provincia = await provinceService.CrearProvincia(name, full_name, latitude, longitude, display_order);
      res.status(201).json(provincia);
    } else {
      res.status(401).json({mensaje: "display_order tiene que ser mayor o igual a 0"})
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const provincia = await provinceService.BorrarProvincia(req.params.id);
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const {name, full_name, latitude, longitude, display_order} = req.body
  console.log(req.params.id, name, full_name, latitude, longitude, display_order);
  try {
    if(display_order >= 0){
      const provincia = await provinceService.EditarProvincia(req.params.id, name, full_name, latitude, longitude, display_order);
      res.status(200).json(provincia);
    } else {
      res.status(401).json({mensaje: "display_order tiene que ser mayor o igual a 0"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;