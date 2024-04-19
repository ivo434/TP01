import EventRepository from "../respositories/event-repository";
import pg from "pg";
import { BDConfig } from '../BD/bd';
import { query } from "express";

const client = new pg.Client();
client.connect();

class EventService {

    async getListadoEventos(limit, offset) {
        try {
            return await EventRepository.getListadoEventos(limit, offset);
        } catch (error) {
            console.error('Error in getListadoEventos:', error);
            throw error;
        }
    }

    async busquedaEventos(name, category, startDate, tag, limit, offset) {
        try {
            return await EventRepository.busquedaEventos(name, category, startDate, tag, limit, offset);
        } catch (error) {
            console.error('Error in busquedaEventos:', error);
            throw error;
        }
    }

    async detalleEventos(id, limit, offset) {
        try {
            return await EventRepository.detalleEventos(id, limit, offset);
        } catch (error) {
            console.error('Error in detalleEventos:', error);
            throw error;
        }
    }
    async listaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset) {
        try {
            return await EventRepository.listaParticipantes(id_event, first_name, last_name, username, attended, rating, limit, offset);
        } catch (error) {
            console.error('Error in detalleEventos:', error);
            throw error;
        }
    }
    async CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
        try {
            return await EventRepository.CrearEvento(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        } catch (error) {
            console.error('Error in CrearEvento:', error);
            throw error;
        }
    }
    async BorrarEvento(id, id_creator_user) {
        try {
            return await EventRepository.BorrarEvento(id, id_creator_user);
        } catch (error) {
            console.error('Error in BorrarEvento:', error);
            throw error;
        }
    }
    async EditarEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
        try {
            return await EventRepository.EditarEvento(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        } catch (error) {
            console.error('Error in EditarEvento:', error);
            throw error;
        }
    }
}

export default EventService;
