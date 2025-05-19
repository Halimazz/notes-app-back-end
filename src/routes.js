// routes.js
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotebyIdHandler,
  deleteByIdHandler,
} = require("./handler");

const routes = (app) => {
  // Menambahkan rute POST untuk membuat catatan baru
  app.post("/notes", addNoteHandler);

  // Menambahkan rute GET untuk mendapatkan semua catatan
  app.get("/notes", getAllNotesHandler);

  app.get("/notes/:id", getNoteByIdHandler); // Menggunakan parameter ID untuk mendapatkan catatan tertentu
  app.put("/notes/:id", editNotebyIdHandler); // Menggunakan parameter ID untuk memperbarui catatan tertentu
  app.delete("/notes/:id", deleteByIdHandler); // Menggunakan parameter ID untuk menghapus catatan tertentu
  // Menambahkan rute GET untuk mendapatkan catatan berdasarkan ID
};

module.exports = routes;
