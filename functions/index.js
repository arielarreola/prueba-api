const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');


const app = express();
admin.initializeApp({
    credential: admin.credential.cert('./credentials.json'),
});
const productosRouter = require('./api/productos');
const pruebaRouter = require('./api/prueba');
const personajesRouter = require('./api/personajes');

app.use(express.json()); // Para parsear JSON

// Rutas para los módulos
app.use('/api/productos', productosRouter);
app.use('/api/prueba', pruebaRouter);
app.use('/api/personajes', personajesRouter);

exports.app = functions.https.onRequest(app);
//estoy pasando mi backend dentro de firebase para ejecutarlo en la nube
