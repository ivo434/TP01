export default class EventEnrollment{
    constructor(id, id_event, id_user, description, registration_date_time, attended, observations, rating){
        this.id = id,
        this.id_event = id_event,
        this.id_user = id_user,
        this.description = description,
        this.registration_date_time = registration_date_time,
        this.attended = attended,
        this.observations = observations,
        this.rating = rating
    }
}