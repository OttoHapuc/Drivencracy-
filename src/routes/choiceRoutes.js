import { Router } from "express";
import { createChoice, createChoiceId } from "../controller/choice.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { choiceSchema } from "../schemas/choiceSchema.js";


const choiceRoutes = Router();

choiceRoutes.post("/choice", createChoice);
choiceRoutes.post("/choice/:id/vote", createChoiceId);

export default choiceRoutes;