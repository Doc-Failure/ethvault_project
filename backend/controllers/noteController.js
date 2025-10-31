const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

let notes = [];
let nextId = 1;

exports.createNote = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Please provide title and content", 400));
  }

  const note = {
    id: nextId++,
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  notes.push(note);

  res.status(201).json({
    success: true,
    note,
  });
});

exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    count: notes.length,
    notes: notes,
  });
});

exports.getNote = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

exports.updateNote = asyncErrorHandler(async (req, res, next) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return next(new ErrorHandler("Note not found", 404));
  }

  const { title, content } = req.body;

  if (!title && !content) {
    return next(
      new ErrorHandler("Please provide title or content to update", 400)
    );
  }

  if (title) notes[noteIndex].title = title;
  if (content) notes[noteIndex].content = content;
  notes[noteIndex].updatedAt = new Date();

  res.status(200).json({
    success: true,
    note: notes[noteIndex],
  });
});

exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
  const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

  if (noteIndex === -1) {
    return next(new ErrorHandler("Note not found", 404));
  }

  notes.splice(noteIndex, 1);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
