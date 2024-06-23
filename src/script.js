import express from "express";
import EventController from "./controllers/EventController.js"
import ProvinceController from "./controllers/ProvinceController.js"
import UserController from "./controllers/UsersController.js"
import LocationController from "./controllers/LocationController.js"
import EventLocationController from "./controllers/EventLocationController.js"
import EventCategoryController from "./controllers/EventCategoriesController.js"

const app = express();
app.use(express.json());
const port = 3000;

app.use("/api/event", EventController);
app.use("/api/province", ProvinceController)
app.use("/api/user", UserController)
app.use("/api/location", LocationController)
app.use("/api/event-location", EventLocationController)
app.use("/api/event-category", EventCategoryController)

app.listen(port, ()  => 
{console.log("Loaded")}
)