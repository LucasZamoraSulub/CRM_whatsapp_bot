
import http from 'http';
import https from "https";
import app from '../app';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from "path";

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir rutas de los certificados
const certPath = path.resolve(__dirname, '../cert/cert.pem');
const keyPath = path.resolve(__dirname, '../cert/key.pem');
let cert= fs.readFileSync(certPath);
let key= fs.readFileSync(keyPath);

const port = process.env.PORT || 3000;
app.set('port', port);

/*
const server = https.createServer(app);

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

server.on('error', (error: any) => {
  console.error('Error al iniciar el servidor:', error);
});
*/
//console.log("la ruta quedo "+ cert);
https.createServer({
  cert: cert,
  key: key,
}, app).listen(port, function() {
  console.log("My https server listening on port " + port + "...");
});