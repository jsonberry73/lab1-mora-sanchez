const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => res.json({message: "hello world"}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.APP_ENV || 'development' });
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find(); // Consulta todas las notas en MongoDB
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: 'Note not found' }); // O 400 si el ID tiene formato inválido
  }
});
module.exports = router;