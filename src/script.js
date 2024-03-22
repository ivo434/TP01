import express from "express";
import EventController from "./controllers/EventController.js"

const app = express();
app.use(express.json());
const port = 3000;

app.use("/event", EventController);

app.listen(port, ()  => 
{console.log("Loaded")}
)