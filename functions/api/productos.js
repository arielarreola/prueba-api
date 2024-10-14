// productos.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Crear un nuevo producto
router.post('/nuevo', (req, res) => {
    db.collection('productos').doc(req.body.id).set({
        nombre: req.body.nombre,
        id: req.body.id,
        precio: req.body.precio
    })
    .then(() => res.status(204).json())
    .catch(error => res.status(500).json({ error: error.message }));
});

// Obtener todos los productos
router.get('/', (req, res) => {
    db.collection('productos').get()
    .then(snapshot => {
        let productos = [];
        snapshot.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            productos.push({ id, ...data });
        });
        res.json(productos);
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

// Otras operaciones (update, delete) pueden seguir aquí...

module.exports = router;
