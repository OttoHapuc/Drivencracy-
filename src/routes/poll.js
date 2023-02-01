import { Router } from "express";
import { poll } from "../controller/poll.js";

const pollRoutes = Router();

pollRoutes.post('/poll', poll);

export default pollRoutes;