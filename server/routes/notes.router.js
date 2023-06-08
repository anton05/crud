const express = require('express');
const {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/notesController');
const authTokenMiddleware = require('../middleware/authTokenMiddleware');
const notesRouter = express.Router();

notesRouter.get('/', authTokenMiddleware, fetchNotes);
notesRouter.get('/:id', authTokenMiddleware, fetchNote);
notesRouter.post('/', authTokenMiddleware, createNote);
notesRouter.put('/:id', authTokenMiddleware, updateNote);
notesRouter.delete('/:id', authTokenMiddleware, deleteNote);

module.exports = notesRouter;