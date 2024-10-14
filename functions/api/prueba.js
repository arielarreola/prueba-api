// prueba.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Obtener todos los documentos en "prueba"
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('prueba').get();
        const productos = [];
        const promises = snapshot.docs.map(async (doc) => {
            let id = doc.id;
            let data = doc.data();
            // Aquí podrías cargar las referencias si es necesario...
            productos.push({ id, ...data });
        });
        await Promise.all(promises);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
