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
router.get("/event", (req, res) => {
    const id_event = req.query.id_event;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const username = req.query.username;
    const attended = req.query.attended;
    const rating = req.query.rating;
    const limit = req.query.limit;
    const offset = req.query.offset;
    const ListaParticipantes = EventService.ListaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset)

    return res.json(ListaParticipantes);
});

export default router;