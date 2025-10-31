const express = require("express");
const {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.route("/").post(createNote).get(getAllNotes);
router
  .route("/:id")
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
