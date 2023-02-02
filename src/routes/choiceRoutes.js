import { Router } from "express";
import { createChoice } from "../controller/choice.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { choiceSchema } from "../schemas/choiceSchema.js";


const choiceRoutes = Router();

choiceRoutes.post("/choice", createChoice);

export default choiceRoutes;