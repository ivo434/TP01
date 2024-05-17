import express from "express";
import EventController from "./controllers/EventController.js"
import ProvinceController from "./controllers/ProvinceController.js"
import UserController from "./controllers/UsersController.js"
import LocationController from "./controllers/LocationController.js"
import EventLocationController from "./controllers/EventLocationController.js"

const app = express();
app.use(express.json());
const port = 3000;

app.use("/event", EventController);
app.use("/province", ProvinceController)
app.use("/user", UserController)
app.use("/location", LocationController)
app.use("/event-location", EventLocationController)

app.listen(port, ()  => 
{console.log("Loaded")}
)