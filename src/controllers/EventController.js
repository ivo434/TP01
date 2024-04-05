import express from "express";
import EventService from "../services/event-services.js"
const router = express.Router();

router.get("/event", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const ListadoEventos = EventService.GetListadoEventos(limit, offset)

    return res.json(ListadoEventos);
});
router.get("/event", (req,res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const name = req.query.name;
    const category = req.query.category;
    const startDate = req.query.startDate;
    const tag = req.query.tag;
    const BusquedaEventos = EventService.BusquedaEventos(name, category, startDate, tag, limit, offset)

    return res.json(BusquedaEventos);
});
router.get("/event", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const id = req.query.id;
    const DetallesEvento = EventService.DetallesEvento(id, limit, offset)

    return res.json(DetallesEvento);
});

export default router;