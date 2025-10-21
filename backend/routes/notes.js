const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');

//ROUTE 1: Get All the notes using: GET '/api/auth/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    // HTTP 500 Internal Server Error (for DB or server issues)
    res.status(500).send('Internal Server Error: Could not process request.');
  }
});

//ROUTE 2: Add a new Note using POST '/api/notes/addnote'
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Please enter a title for you Note').isLength({ min: 3 }),
    body('description', 'Please give a description for your note').exists(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      // HTTP 500 Internal Server Error (for DB or server issues)
      res.status(500).send('Internal Server Error: Could not process request.');
    }
  }
);

//ROUTE 3: Update a Note using POST '/api/notes/updatenote'
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find Node to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Not Found');
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send('Not Allowed');
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    // HTTP 500 Internal Server Error (for DB or server issues)
    res.status(500).send('Internal Server Error: Could not process request.');
  }
});

module.exports = router;
