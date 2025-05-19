// server.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Mengimpor rute dari routes.js

const app = express();

// Middleware untuk body parsing
app.use(express.json()); // Untuk meng-handle JSON payload

// Middleware CORS untuk semua origin
app.use(cors()); // Middleware CORS yang diaktifkan untuk semua origin

// Menggunakan rute yang telah didefinisikan di routes.js
routes(app); // Menyediakan instance 'app' ke dalam routes

// Menjalankan server pada port 5001
app.listen(5002, () => {
  console.log("Server berjalan pada http://localhost:5002");
});
