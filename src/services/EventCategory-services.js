import EventCategoryRepository from "../repositories/eventcategory-repository.js";

const eventCategoryRepository = new EventCategoryRepository();

export default class EventCategoryService{
    async getEventCategories(limit, offset){
        try {
            return await eventCategoryRepository.getAllCategories(limit, offset);
        } catch (error) {
            console.error('Error in GetEventCategories:', error);
            throw error;
        }
    }
    async getEventCategoryById(id) {
        try {
            const eventCategory = await eventCategoryRepository.getCategoriesById(id);
            return checkId(id, eventCategory)
        } catch (error) {
            console.error('Error in GetEventCategoryById:', error);
            throw error;
        }
    }
    async crearEventCategory(eventCategory){
        try {
            await eventCategoryRepository.insertCategory(eventCategory)
        } catch (error){
            console.error('Error in CrearEventCategory:', error);
            throw error;
        }
    }
    async updateEventCategory(eventCategory){
        try {
            return await eventCategoryRepository.updateCategory(eventCategory)
        } catch (error){
            console.error('Error in UpdateEventCategory:', error);
            throw error;
        }
    }
    async deleteEventCategory(id){
        try {
            return await eventCategoryRepository.deleteCategory(id)
        } catch (error){
            console.error('Error in DeleteEventCategory:', error);
            throw error;
        }
    }
}
function checkId(id, object){
    if (id === null) {
        return "404"
    }
    else{
        return object;
    }
}