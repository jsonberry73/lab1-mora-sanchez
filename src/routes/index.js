const { Router } = require('express');
const crypto = require('crypto');
const Note = require('../models/Note');

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'hello world' });
});

router.post('/notes', async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !title.trim() || !content || !content.trim() || !author || !author.trim()) {
            return res.status(400).json({
                error: 'title, content and author are required'
            });
        }

        const note = new Note({
            id: crypto.randomUUID(),
            title: title.trim(),
            content: content.trim(),
            author: author.trim()
        });

        await note.save();

        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.put('/notes/:id', async (req, res) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !title.trim() || !content || !content.trim() || !author || !author.trim()) {
            return res.status(400).json({
                error: 'title, content and author are required'
            });
        }

        const note = await Note.findOne({ id: req.params.id });

        if (!note) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        note.title = title.trim();
        note.content = content.trim();
        note.author = author.trim();

        await note.save();

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ id: req.params.id });

        if (!note) {
            return res.status(404).json({
                error: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

module.exports = router;