const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "interviewManagement",
  password: "30101378",
  port: 5432,
});
module.exports = pool;
