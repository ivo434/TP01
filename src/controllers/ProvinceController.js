import express from "express";
import ProvinceService from "../services/province-services.js"
import { Pagination } from "../utils/paginacion.js";
import Province from "../entities/province.js"

const router = express.Router();
const pagination = new Pagination();
const provinceService = new ProvinceService();

router.get('/:id', async (req, res) => {
  try {
    const provincia = await provinceService.GetProvinciaById(req.params.id);
    if (!provincia) {
      return res.status(404).json({ error: 'el id sea inexistente' });
    }
    res.status(200).json(provincia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/locations', async (req, res) => {
  try {
    const localizaciones = await provinceService.GetEventLocationByProvinceId(req.params.id);
    if (!localizaciones) {
      return res.status(404).json({ error: 'el id sea inexistente' });
    }
    res.status(200).json(localizaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  let { limit, offset } = req.query;
  limit = pagination.parseLimit(limit)
  offset = pagination.parseOffset(offset)
  try {
    const collection = await provinceService.GetAllProvincias(limit, offset);
    const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
    res.status(200).json({
      paginacion: paginatedResponse
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { name, full_name, latitude, longitude, display_order } = req.body;
  const newProvince = new Province(null, name, full_name, latitude, longitude, display_order);
  try {
      await provinceService.CrearProvincia(newProvince);
      const verif = verificacionProvince1(newProvince)
      console.log(verif)
      if (verif === "") {
        res.status(201).json("Provincia creada");
      } else {
        res.status(400).json(verif)
      }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const provincia = await provinceService.BorrarProvincia(req.params.id);
    if (!provincia) {
      return res.status(404).json({ error: 'La provincia no existe.' });
    }
    res.status(200).json({ message: 'Provincia eliminada correctamente'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, full_name, latitude, longitude, display_order } = req.body;
  const newProvince = new Province(req.params.id, name, full_name, latitude, longitude, display_order);
  try {
    const provincia = await provinceService.EditarProvincia(newProvince);
    var verif = ""
    verif = verificacionProvince2(newProvince)
    if (verif === "") {
      if (!provincia) {
        return res.status(404).json({ error: 'La provincia no existe.' });
      } else {
        res.status(200).json("Provincia actualizada");
      }
    } else {
      res.status(400).json(verif)
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function verificacionProvince1(provincia){
  var values = ""
  if (provincia.name !== undefined) {
    if (provincia.name.length < 3) {
      values += "Nombre menor a 3 "
    }
  } else {
    console.log(provincia.name)
    values += "Nombre inexistente "
  }
  if (provincia.latitude !== undefined) {
    if (isNaN(provincia.latitude)) {
      values += "Latitud no es un entero "
    }
  }
  if (provincia.longitude !== undefined) {
    if (isNaN(provincia.longitude)) {
      values += "Longitud no es un entero "
    }
  }
  return values
}
function verificacionProvince2(provincia){
  var values = ""
  console.log(isNaN(provincia.latitude))
  if (provincia.name !== undefined) {
    if (provincia.name.length < 3) {
      values += "Nombre menor a 3 "
    }
  }
  if (provincia.latitude !== undefined) {
    if (isNaN(provincia.latitude)) {
      values += "Latitud no es un entero "
    }
  }
  if (provincia.longitude !== undefined) {
    if (isNaN(provincia.longitude)) {
      values += "Longitud no es un entero "
    }
  }
  return values
}

export default router;
