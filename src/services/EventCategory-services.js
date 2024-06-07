import EventCategoryRepository from "../repositories/event-categories";;
const eventCategoryRepository = new EventCategoryRepository();
export default class EventCategoryService{
    async GetEventCategories(limit, offset){
        try {
            return await eventCategoryRepository.GetAllCategories(limit, offset);
        } catch (error) {
            console.error('Error in GetEventCategories:', error);
            throw error;
        }
    }
    async getEventCategoryById(id) {
        try {
            const eventCategory = await eventCategoryRepository.GetCategoriesById(id);
            return eventCategory;
        } catch (error) {
            console.error('Error in GetEventCategoryById:', error);
            throw error;
        }
    }
    async CrearEventCategory(eventCategory){
        try {
            await eventCategoryRepository.InsertCategory(eventCategory)
        } catch (error){
            console.error('Error in CrearEventCategory:', error);
            throw error;
        }
    }
    async UpdateEventCategory(eventCategory){
        try {
            await eventCategoryRepository.UpdateCategory(eventCategory)
        } catch (error){
            console.error('Error in UpdateEventCategory:', error);
            throw error;
        }
    }
    async DeleteEventCategory(id){
        try {
            await eventCategoryRepository.DeleteCategory(id)
        } catch (error){
            console.error('Error in DeleteEventCategory:', error);
            throw error;
        }
    }
}