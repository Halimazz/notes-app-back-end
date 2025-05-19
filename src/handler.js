const { nanoid } = require("nanoid");
const Joi = require("joi");
const notes = require("./notes"); // Mengimpor array notes

// Handler untuk menambahkan catatan
const addNoteHandler = (req, res) => {
  // Validasi payload menggunakan Joi
  const schema = Joi.object({
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).optional(),
    body: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message,
    });
  }

  const { title, tags, body } = req.body;
  const id = nanoid(16); // Menghasilkan ID unik
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  // Menambahkan catatan baru ke array notes
  notes.push(newNote);

  // Mengirim respons
  return res.status(201).json({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    data: { noteId: id },
  });
};

// Handler untuk mengambil semua catatan
const getAllNotesHandler = (req, res) => {
  return res.status(200).json({
    status: "success",
    data: { notes },
  });
};

const getNoteByIdHandler = (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);

  if (note) {
    return res.status(200).json({
      status: "success",
      data: { note },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
};

const editNotebyIdHandler = (req,res)=>{
  const {id} =req.params;
  const {title,tags,body}=req.body;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    return res.status(200).json({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  

};

const deleteByIdHandler = (req, res) => {
  const {id}=req.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return res.status(200).json({
      status: "success",
      message: "Catatan berhasil dihapus",
    });

  }
  return res.status(404).json({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNotebyIdHandler, deleteByIdHandler };
