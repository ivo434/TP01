import express from "express";
import ProvinceService from "../services/province-services.js"
const router = express.Router();

const ProvinceService = new ProvinciasService();

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const provincia = await ProvinceService.GetProvinciasById(req.params.id);
    res.json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las provincias con paginación
router.get('/', async (req, res) => {
  const {limit, offset} = req.body
  try {
    const provincias = await ProvinceService.GetAllProvincias(limit, offset);
    console.log(provincias);
    res.json(provincias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const {name, full_name, latitude, longitude, display_order} = req.body;
  try {
    const provincia = await ProvinceService.CrearProvincia(name,full_name, latitude, longitude, display_order);
    res.status(201).json(provincia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const provincia = await ProvinceService.BorrarProvincia(req.params.id);
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const {id, name, full_name, latitude, longitude} = req.body
  console.log(id, name, full_name, latitude, longitude);
  try {
    const provincia = await ProvinceService.EditarProvincia(id, name, full_name, latitude, longitude);
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;