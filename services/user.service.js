const pool = require("../postgress");
module.exports = {
  getUser: (req, res) => {
    pool.query(
      `SELECT name FROM professor WHERE professor.username = '${req.user.username}' `,
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
          console.log(error);
        } else if (results.leght == 0) {
          res.status(401).json("No user with this username");
        } else {
          console.log(results.rows, req.user.username);
          res.status(200).json(results.rows[0]);
        }
      }
    );
  },
  getAllUsers: (req, res) => {
    pool.query(
      `SELECT name, username FROM professor`,
      (error, results) => {
        if (error) {
          console.log(error);
        } else res.status(200).json(results.rows);
      }
    );
  },

};
