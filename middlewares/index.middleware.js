import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import logger from './logger.middleware.js';
import limiter from '../utils/rateLimiter.utils.js';

export default function setupMiddlewares(app) {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(logger);
    app.use(limiter);
}