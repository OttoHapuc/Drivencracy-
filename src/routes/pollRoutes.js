import { Router } from "express";
import { pollCollectionSurvey, pollCreateSurvey, pollIdChoice, pollIdResult } from "../controller/poll.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { pollSchema } from "../schemas/pollSchema.js";

const pollRoutes = Router();

pollRoutes.post('/poll',validateSchema(pollSchema), pollCreateSurvey);
pollRoutes.get('/poll', pollCollectionSurvey);
pollRoutes.get('/poll/:id/choice', pollIdChoice);
pollRoutes.get("/poll/:id/result", pollIdResult);

export default pollRoutes;