const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'yourpass',
  host: 'localhost',
  port: 5432,
  database: process.env.DB || 'cinema_postgres_tiny',
});

module.exports = pool;
