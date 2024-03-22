import express from "express";
import EventService from "../services/event-services.js"
const router = express.Router();

router.get("/event", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;

    const ListadoEventos = EventService.GetListadoEventos(limit, offset)

    return res.json(ListadoEventos);
});

export default router;