import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import  cors  from "cors";
var bodyParser = require('body-parser');
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
app.use(cors());
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST,DELETE');
  res.header("Content-Type: application/json; charset=UTF-8");
  res.header("Content-Type: application/x-www-form-urlencoded");
  res.header("Content-Type: multipart/form-data");
  next();
});

// Rutas
import indexRouter from './routes/index';
import sendMessageRouter from './routes/sendMessage';
import notifyRouter from './routes/notify';

app.use(indexRouter);
app.use('/send', sendMessageRouter);
app.use('/notify', notifyRouter);

// Manejo de 404 y errores
//app.use((req, res, next) => {
  //res.status(404).render('error', { message: 'Página no encontrada', error: {} });
//});

//app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  //res.status(err.status || 500);
  //res.render('error', { message: err.message, error: process.env.NODE_ENV === 'development' ? err : {} });
//});

export default app;
