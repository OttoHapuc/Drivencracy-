import express from 'express';
import cors from 'cors';
import pollRoutes from './routes/poll.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(pollRoutes);

app.listen(process.env.PORT);