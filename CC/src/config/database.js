const mysql = require("mysql");

// Konfigurasi koneksi ke database
const db = mysql.createPool({
  connectionLimit: 10,
  host: '',
  user: '',
  password: '',
  database: ''
});

module.exports = db;
