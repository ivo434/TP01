import express from "express";
import PizzaController from "./src/controllers/pizza-controller.js"

const app = express();
app.use(express.json());
const port = 3000;

app.use("/Pizzas", PizzaController);

app.listen(port, ()  => 
{console.log("ARRANCA")}
)