import express from 'express';
import EventService from '../services/event-services.js';
import Event from '../entities/event.js';
import {AuthMiddleware} from '../utils/token.js';
import EventEnrollment from '../entities/event-enrollments.js';
import { Pagination } from "../utils/paginacion.js";

const router = express.Router();
const eventService = new EventService();
const pagination = new Pagination();

router.get('/', async (req, res) => {
    let { limit, offset } = req.query;
    limit = pagination.parseLimit(limit)
    offset = pagination.parseOffset(offset)
    const category = req.query.category
    const startdate = req.query.startdate
    const tag = req.query.tag
    let name = req.query.name;
    if (name){
        name = name.trim()
    }
        const events = await eventService.busquedaEventos(name, category, startdate, tag, limit, offset);
        const total = await eventService.getListadoEventos(limit, offset);
        const paginatedResponse = pagination.buildPaginationDto(limit, offset, total, req.path);
        res.status(200).json({
            eventos: events,
            paginacion: paginatedResponse
        });
  
});

router.get('/:id', async (req, res) => {
    const { limit, offset } = req.query;
    try {
        const events = await eventService.getEvento(req.params.id, limit, offset);
        res.status(200).json(events);
        return events;
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
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id/enrollment', async (req, res) => {
    const {first_name, last_name, username, attended, rating } = req.query;
    try {
        const participantes = await eventService.listaParticipantes(req.params.id, first_name, last_name, username, attended, rating);
        res.status(200).json(participantes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/', AuthMiddleware, async (req, res) => {
    const {name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance} = req.body;
    const id_creator_user = req.user.id;
    const evento = new Event(null, name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
    try {
        const newEvent = await eventService.CrearEvento(evento);
        if (newEvent === "Nombre menor a 3" || newEvent === "Asistencia maxima mayor a capacidad maxima" || newEvent === "Precio y duracion menores a 0") {
            return res.status(400).json(newEvent)
        }
        return res.status(201).json({'mensaje':'Se creo el evento'});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:id', AuthMiddleware, async (req, res) => {
    try {
        const filas = await eventService.BorrarEvento(req.params.id, req.user.id);
        if (filas === "404") {
            return res.status(404).json("Id invalido o no perteneciente al usuario")
        } else if(filas === "400"){
            return res.status(400).json("Usuarios registrados en el evento")
        }
        else{
            return res.status(200).json({mensaje:'Se elimino el evento', filas});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:id', AuthMiddleware, async (req, res) => {
    const eventData = req.body;
    const {name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user} = req.query;
    const idPayload = req.user.id;
    const evento = new Event(null, name, description, id_event_category, id_event_location, start_date, 
        duration_in_minutes, price, enabled_for_enrollment, max_assistance, idPayload)
    try {
        if (req.params.id === null || idPayload !== id_creator_user) {
            res.status(404).json("Id invalido o no perteneciente al usuario")
        } else{
            await eventService.EditarEvento(req.params.id, evento);
            res.status(200).json({ message: 'Evento actualizado correctamente' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id/enrollment/', AuthMiddleware, (req, res) => {
    const fecha = new Date();
    const { attended, observations, rating } = req.body
    const event = eventService.getEvento(req.params.id)
    const newEventEnrollment = new EventEnrollment(
        req.params.id,
        user.id,
        event.description,
        fecha,
        attended,
        observations,
        rating
    )
    try {
        const event = eventService.enrollUserToEvent(newEventEnrollment);
        res.status(201).json({ message: 'Usuario registrado exitosamente en el evento' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id/enrollment/', (req, res) => {
    const eventId = req.params.id;
    const token = req.headers.authorization;
    const payload = decryptToken(token);
    const userId = payload.id
    try {
        eventService.removeUserFromEvent(eventId, userId);
        res.status(200).json({ message: 'Usuario removido exitosamente del evento' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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


// /**
//  * POST /api/event/
//  * Inserta un evento que es enviado en el body de request (necesita autenticación).
//  */
// router.post('/event', async (req, res) => {
//     try {
//       // Verificar autenticación del usuario (supongamos que ya está implementado)
//       const authenticatedUserId = req.user.id; // Obtener ID del usuario autenticado desde el token
  
//       // Extraer datos del cuerpo de la solicitud
//       const { name, description, max_assistance, id_event_location, price, duration_in_minutes } = req.body;
  
//       // Validar datos
//       if (!name || !description || name.length < 3 || description.length < 3) {
//         return res.status(400).json({ error: 'El nombre y la descripción deben tener al menos 3 caracteres' });
//       }
  
//       // Verificar que max_assistance no sea mayor que max_capacity de la ubicación
//       const location = await db.query('SELECT max_capacity FROM ubicaciones WHERE id = ?', [id_event_location]);
//       if (!location || max_assistance > location[0].max_capacity) {
//         return res.status(400).json({ error: 'El número máximo de asistentes supera la capacidad máxima de la ubicación' });
//       }
  
//       if (price < 0 || duration_in_minutes < 0) {
//         return res.status(400).json({ error: 'El precio y la duración deben ser mayores o iguales a cero' });
//       }
  
//       // Insertar evento en la base de datos
//       const result = await db.query('INSERT INTO eventos (name, description, max_assistance, id_event_location, price, duration_in_minutes, id_creator) VALUES (?, ?, ?, ?, ?, ?, ?)',
//         [name, description, max_assistance, id_event_location, price, duration_in_minutes, authenticatedUserId]);
  
//       res.status(201).json({ message: 'Evento creado exitosamente' });
//     } catch (error) {
//       console.error('Error al crear evento:', error);
//       res.status(500).json({ error: 'Error al crear evento' });
//     }
//   });
  
//   /**
//    * PUT /api/event/
//    * Actualiza un evento que es enviado en el body y retorna un status code 200 (ok).
//    */
//   router.put('/event', async (req, res) => {
//     try {
//       // Verificar autenticación del usuario (supongamos que ya está implementado)
//       const authenticatedUserId = req.user.id; // Obtener ID del usuario autenticado desde el token
  
//       // Extraer datos del cuerpo de la solicitud
//       const { id, name, description, max_assistance, id_event_location, price, duration_in_minutes } = req.body;
  
//       // Validar que el evento existe y pertenece al usuario autenticado
//       const existingEvent = await db.query('SELECT id_creator FROM eventos WHERE id = ?', [id]);
//       if (!existingEvent || existingEvent[0].id_creator !== authenticatedUserId) {
//         return res.status(404).json({ error: 'El evento no existe o no pertenece al usuario autenticado' });
//       }
  
//       // Validar datos (mismo proceso de validación que en POST)
  
//       // Actualizar evento en la base de datos
//       await db.query('UPDATE eventos SET name = ?, description = ?, max_assistance = ?, id_event_location = ?, price = ?, duration_in_minutes = ? WHERE id = ?',
//         [name, description, max_assistance, id_event_location, price, duration_in_minutes, id]);
  
//       res.status(200).json({ message: 'Evento actualizado exitosamente' });
//     } catch (error) {
//       console.error('Error al actualizar evento:', error);
//       res.status(500).json({ error: 'Error al actualizar evento' });
//     }
//   });
  
//   /**
//    * DELETE /api/event/{id}
//    * Elimina un evento cuyo id es enviado por parámetro.
//    */
//   router.delete('/event/:id', async (req, res) => {
//     try {
//       // Verificar autenticación del usuario (supongamos que ya está implementado)
//       const authenticatedUserId = req.user.id; // Obtener ID del usuario autenticado desde el token
//       const eventId = req.params.id;
  
//       // Verificar que el evento existe y pertenece al usuario autenticado
//       const existingEvent = await db.query('SELECT id_creator FROM eventos WHERE id = ?', [eventId]);
//       if (!existingEvent || existingEvent[0].id_creator !== authenticatedUserId) {
//         return res.status(404).json({ error: 'El evento no existe o no pertenece al usuario autenticado' });
//       }
  
//       // Verificar si hay usuarios registrados al evento (supongamos que existe una tabla de registros de usuarios a eventos)
//       const registeredUsers = await db.query('SELECT COUNT(*) AS count FROM registros_eventos WHERE id_evento = ?', [eventId]);
//       if (registeredUsers[0].count > 0) {
//         return res.status(400).json({ error: 'No se puede eliminar el evento porque hay usuarios registrados a él' });
//       }
  
//       // Eliminar evento de la base de datos
//       await db.query('DELETE FROM eventos WHERE id = ?', [eventId]);
  
//       res.status(200).json({ message: 'Evento eliminado exitosamente' });
//     } catch (error) {
//       console.error('Error al eliminar evento:', error);
//       res.status(500).json({ error: 'Error al eliminar evento' });
//     }
//   });
  
  

export default router;
