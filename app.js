import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.config.js';
import apiRouter from './routes/api.routes.js';
import indexMiddlewares from './middlewares/index.middleware.js';
import { setupErrorHandlers } from './middlewares/errorHandler.middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGO_URI;

if (!MONGODB_URL) {
    console.error('FATAL ERROR: MONGO_URI is not defined');
    process.exit(1);
}

indexMiddlewares(app);

app.use('/api', apiRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

setupErrorHandlers(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB(MONGODB_URL)
})