import { Router } from "express";
import { pollCollectionSurvey, pollCreateSurvey } from "../controller/poll.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { pollSchema } from "../schemas/pollSchema.js";

const pollRoutes = Router();

pollRoutes.post('/poll',validateSchema(pollSchema), pollCreateSurvey);
pollRoutes.get('/poll', pollCollectionSurvey);
export default pollRoutes;