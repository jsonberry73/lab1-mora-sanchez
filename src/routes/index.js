const { Router } = require('express');
const router = Router();

// 1. Asegúrate de importar el modelo de Mongoose correspondiente a las notas
// (Ajusta la ruta '../models/Note' si tu archivo se llama o está en otro directorio)
const Note = require('../models/Note'); 

router.get('/', (req, res) => res.json({ message: "hello world" }));

// Endpoint /health
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.APP_ENV || 'development' });
});

// Endpoint GET /notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error al consultar notas:', error); // <-- Imprime el detalle real
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint GET /notes/:id
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: 'Note not found' });
  }
});

module.exports = router;