import express from 'express';
import EventService from '../services/event-services.js';
import Event from '../entities/event.js';
import { AuthMiddleware } from '../utils/token.js';
import EventEnrollment from '../entities/event-enrollments.js';
import { Pagination } from "../utils/paginacion.js";
import CrudRepository from '../repositories/CRUD.js';

const router = express.Router();
const eventService = new EventService();
const crudRepository = new CrudRepository();
const pagination = new Pagination();

router.get('/', async (req, res) => {
    let { limit, offset } = req.query;
    limit = pagination.parseLimit(limit);
    offset = pagination.parseOffset(offset);
    const category = req.query.category;
    const startdate = req.query.startdate;
    const tag = req.query.tag;
    let name = req.query.name;
    if (name) {
        name = name.trim();
    }
    try {
        const collection = await eventService.busquedaEventos(name, category, startdate, tag, limit, offset);
        const paginatedResponse = pagination.buildPaginationDto(limit, offset, collection, req.path);
        res.status(200).json({
            paginacion: paginatedResponse
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await eventService.getEvento(req.params.id, limit, offset);
        if (!events) {
            res.status(404).json({ error: 'el id sea inexistente' });
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    const { name, category, startDate, tag, limit, offset } = req.query;
    try {
        const events = await eventService.busquedaEventos(name, category, startDate, tag, limit, offset);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await eventService.detalleEventos(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'el id sea inexistente' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id/enrollment', async (req, res) => {
    const { first_name, last_name, username, attended, rating } = req.query;
    try {
        const participantes = await eventService.listaParticipantes(req.params.id, first_name, last_name, username, attended, rating);
        if (!participantes) {
            return res.status(404).json({ error: 'el id sea inexistente' });
        } else {
            res.status(200).json(participantes);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', AuthMiddleware, async (req, res) => {
    const { name, description, id_event_category, id_event_location, start_date,
        duration_in_minutes, price, enabled_for_enrollment, max_assistance } = req.body;
    const id_creator_user = req.user.id;
    const evento = new Event(null, name, description, id_event_category, id_event_location, start_date,
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    try {
        const newEvent = await eventService.CrearEvento(evento);
        if (newEvent === "Nombre menor a 3" || newEvent === "Asistencia maxima mayor a capacidad maxima" || newEvent === "Precio y duracion menores a 0") {
            return res.status(400).json(newEvent);
        }
        return res.status(201).json({ 'mensaje': 'Se creo el evento' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', AuthMiddleware, async (req, res) => {
    try {
        const filas = await eventService.BorrarEvento(req.params.id, req.user.id);
        if (filas === "400") {
            return res.status(400).json("Usuarios registrados en el evento");
        } else {
            if (!filas) {
                return res.status(404).json({ error: 'el id sea inexistente' });
            }
            return res.status(200).json({ mensaje: 'Se elimino el evento', filas });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', AuthMiddleware, async (req, res) => {
    const { name, description, id_event_category, id_event_location, start_date,
        duration_in_minutes, price, enabled_for_enrollment, max_assistance } = req.body;
    const idPayload = req.user.id;
    const evento = new Event(null, name, description, id_event_category, id_event_location, start_date,
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, idPayload);
    try {
        const newEvent = await eventService.EditarEvento(req.params.id, evento);
        console.log(newEvent)
        if (!newEvent) {
            return res.status(404).json({ error: 'el id sea inexistente' });
        } else {
            if (newEvent === "Nombre menor a 3" || newEvent === "Asistencia maxima mayor a capacidad maxima" || newEvent === "Precio y duracion menores a 0") {
                return res.status(400).json(newEvent);
            } else {
                return res.status(200).json({ message: 'Evento actualizado correctamente' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id/enrollment/', AuthMiddleware, async (req, res) => {
    const fecha = new Date();
    let verif = true;
    const enrollments = await crudRepository.Get("select * from event_enrollments where id_event = $1", [req.params.id]);
    const event = await eventService.getEvento(req.params.id);
    console.log(event)
    if ((event !== 0 && event !== undefined) && enrollments !== undefined) {
        const newEventEnrollment = new EventEnrollment(
            null,
            req.params.id,
            req.user.id,
            event[0].description,
            fecha,
            false,
            null,
            null
        );
        console.log(newEventEnrollment);
        if (enrollments.length >= event[0].max_assistance) {
            return res.status(400).json({ error: 'La capacidad máxima de registrados para el evento ha sido alcanzada' });
        }
        const eventStartDate = new Date(event[0].start_date);
        console.log(event[0]);
        if (eventStartDate <= fecha) {
            return res.status(400).json({ error: 'No es posible registrarse a un evento que ya ha sucedido o que se realiza hoy' });
        }
    
        if (!event[0].enabled_for_enrollment) {
            return res.status(400).json({ error: 'El evento no está habilitado para la inscripción' });
        }
        enrollments.forEach(item => {
            if (item.id_user === req.user.id) {
                verif = false;
            }
        });
        if (!verif) {
            return res.status(400).json({ error: 'El usuario ya se encuentra registrado en el evento' });
        }
        try {
            const verif2 = await eventService.enrollUserToEvent(newEventEnrollment);
            res.status(201).json({ message: 'Usuario registrado exitosamente en el evento', verif2 });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }   
    } else {
        return res.status(404).json({ error: 'el id sea inexistente' });
    }
});

router.delete('/:id/enrollment/', AuthMiddleware, async (req, res) => {
    const enrollments = await crudRepository.Get("select * from event_enrollments where id_event = $1", [req.params.id]);
    const event = await eventService.getEvento(req.params.id);
    let verif = true;
    const fecha = new Date();
    if ((event !== 0 && event !== undefined) && enrollments !== undefined) {
        enrollments.forEach(item => {
            if (item.id_user === req.user.id) {
                verif = false;
            }
        });
        if (verif) {
            return res.status(400).json({ error: 'El usuario no se encuentra registrado en el evento' });
        }
        const eventStartDate = new Date(event[0].start_date);
        console.log(event[0]);
        if (eventStartDate <= fecha) {
            return res.status(400).json({ error: 'No es posible eliminarse de un evento que ya ha sucedido o que se realiza hoy' });
        }
        try {
            const verif2 = await eventService.removeUserFromEvent(req.params.id, req.user.id);
            res.status(200).json({ message: 'Usuario removido exitosamente del evento', verif2 });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        return res.status(404).json({ error: 'el id sea inexistente' });
    }
});

router.patch("/:id/enrollment/:rating", AuthMiddleware, async (req, res) => {
    const { observations } = req.body;
    if (!Number.isInteger(Number(req.params.rating)) || Number(req.params.rating) < 1 || Number(req.params.rating) > 10) {
        return res.status(400).json({ error: 'El formato de attended no es valido, son numeros del 1 al 10' });
    }
    const enrollments = await crudRepository.Get("select * from event_enrollments where id_event = $1", [req.params.id]);
    const event = await eventService.getEvento(req.params.id);
    let verif = true;
    const fecha = new Date();
        enrollments.forEach(item => {
            if (item.id_user === req.user.id) {
                verif = false;
            }
        });
        if (verif) {
            res.status(404).json({ error: 'El usuario no se encuentra registrado en el evento' });
        }
        else{
            const eventStartDate = new Date(event[0].start_date);
            console.log(event[0]);
            if (eventStartDate > fecha) {
                res.status(400).json({ error: 'No es posible ratear un evento que va a suceder o que se realiza hoy' });
            }
            else {
                try {
                    await eventService.patchEnrollment(req.user.id, req.params.id, req.params.rating, observations);
                    res.status(200).json("Usuario ha puesto su rating correctamente");
                } catch(error){
                    res.status(500).json("Internal server error")
                }
            }
        }
});

export default router;
