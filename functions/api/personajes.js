// personajes.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// Crear un nuevo personaje
router.post('/nuevo', (req, res) => {
    db.collection('personaje').doc(req.body.id).set({
        nombre: req.body.nombre,
        color: req.body.color,
        animal: req.body.animal,
        // Otros atributos...
    })
    .then(() => res.status(204).json())
    .catch(error => res.status(500).json({ error: error.message }));
});

// Obtener todos los personajes
router.get('/', (req, res) => {
    db.collection('personaje').get()
    .then(snapshot => {
        let personajes = [];
        snapshot.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            personajes.push({ id, ...data });
        });
        res.json(personajes);
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

// Otras operaciones (update, delete) pueden seguir aquí...

module.exports = router;
