import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

// Crear __dirname a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración del motor de vistas (por ejemplo, EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
import indexRouter from './routes/index';
import sendMessageRouter from './routes/sendMessage';

app.use('/', indexRouter);
app.use('/send', sendMessageRouter);

// Manejo de 404 y errores
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Página no encontrada', error: {} });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: process.env.NODE_ENV === 'development' ? err : {} });
});

export default app;
