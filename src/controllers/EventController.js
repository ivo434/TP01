import express from 'express';
import EventService from '../services/event-services.js';
import decryptToken from '../utils/token.js';
const router = express.Router();
const eventService = new EventService();

router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await eventService.getListadoEventos(limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    const { name, category, startDate, tag, limit, offset } = req.query;
    try {
        const events = await eventService.busquedaEventos(name, category, startDate, tag, limit, offset);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const event = await eventService.detalleEventos(req.params.id);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id/enrollment', async (req, res) => {
    const {first_name, last_name, username, attended, rating, limit, offset } = req.query;
    try {
        const event = await eventService.detalleEventos(req.params.id, first_name, last_name, username, attended, rating, limit, offset);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/', async (req, res) => {
    const eventData = req.body;
    const token = req.headers.authorization;
    const payload = decryptToken(token);
    try {
        const newEvent = await eventService.CrearEvento(...Object.values(eventData));
        if (newEvent > 0){
            return res.status(201).json({'mensaje':'Se elimino el evento'});
        }else{
            return res.status(404).json({'mensaje':'no se elimino'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:id', async (req, res) => {
    const token = req.headers.authorization;
    const payload = decryptToken(token);
    try {
        const filas = await eventService.BorrarEvento(req.params.id, payload.id);
        if (filas > 0){
            return res.status(200).json({mensaje:'Se elimino el evento'});
        }else{
            return res.status(404).json({mensaje:'No se elimino'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:id', async (req, res) => {
    const eventData = req.body;
    const token = req.headers.authorization;
    const payload = decryptToken(token);
    try {
        await eventService.EditarEvento(req.params.id, ...Object.values(eventData));
        res.status(200).json({ message: 'Evento actualizado correctamente' });
    } catch (error) {
        res.status(404).json({ error: 'Internal Server Error' });
    }
});

router.post("/:id/enrollment", (req, res) => {
    try {
        const event = eventService.postInscripcionEvento(req.params.id, req.body.id_user);
        if(!event){
            return res.status(400).json({ error: 'El formato de attended no es valido' });
        } else{
            return res.json("Se ha inscripto correctamente al evento");
        }
    }
    catch(error){
        console.log("Error al inscribir");
        return res.status(404).json("Un Error");
    }
});


router.patch("/:id/enrollment", (req, res) => {
    if(!Number.isInteger(Number(req.body.rating))&& Number.isInteger(Number(req.body.attended))){
        return res.status(400).json({ error: 'El formato de attended no es valido' });
    }
    const {rating, descripcion, attended, observation} = req.body
    try {
        
        const enrollment = eventService.patchEnrollment(rating, descripcion, attended, observation);
        return res.json(enrollment);
    }
    catch(error){
        console.log("Error al puntuar");
        return res.status(404).json("Un Error");
    }
});

export default router;
