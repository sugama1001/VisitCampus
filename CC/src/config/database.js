const mysql = require("mysql");

// Konfigurasi koneksi ke database
const db = mysql.createPool({
  connectionLimit: 10,
  host: '34.128.96.38',
  user: 'root',
  password: 'bukanappbiasavc',
  database: 'visitcampus-db'
});

module.exports = db;