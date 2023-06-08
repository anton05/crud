const Note = require('../models/Note');

const createNote = async (req, res) => {
  try {
    const newNote = {
      title: req.body.title
    };

    const note = await Note.create(newNote);
    res.send(note);
  } catch (error) {
    res.send('Uncorrect data').status(404).end();
  };
};

const fetchNotes = async (req, res) => {
  try {
    const notesList = await Note.find();
    res.send(notesList);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
};

const fetchNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    res.send(note);
  } catch (error) {
    console.log(e);
    res.status(404).end();
  }
};

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const newNote = {
      title: req.body.title
    };
    const updatedNote = await Note.findByIdAndUpdate(noteId, newNote);
    res.send(updatedNote).end();
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  await Note.deleteOne({ _id: noteId });
  res.send(true).end();
};

module.exports = {
  createNote,
  fetchNote,
  fetchNotes,
  updateNote,
  deleteNote
};