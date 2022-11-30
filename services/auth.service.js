const pool = require("../postgress");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  register: (req, res) => {
    console.log("register");
    var user = req.body;
    pool.query(
      `SELECT username FROM user WHERE username = $$${user.username}$$`,
      async (error, results) => {
        if (error) {
          res.status(500);
        }
        if (results?.rows?.length) {
          console.log(results);
          res.status(409).json("User already exist.");
        }
        encryptedPassword = await bcrypt.hash(user.password, 10);
        pool.query(
          `INSERT INTO user(name, username, password) VALUES(${user.name}, ${user.username}, ${encryptedPassword})`,
          (error) => {
            if (error) {
              console.log(error);
              res.status(500);
            }
            const token = jwt.sign(
              { username: user.username },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            res.status(201).json(token);
          }
        );
      }
    );
  },
  login: (req, res) => {
    const { username, password } = req.body;
    pool.query(
      ` SELECT * FROM user WHERE username = ${username}`,
      async (result) => {
        if (!result.rows.length) {
          res.status(401);
        } else {
          let user = result.rows[0];
          if (!(await bcrypt.compare(password, user.password))) {
            res.status(401);
          }
          const token = jwt.sign(
            { username: user.username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
        }
      }
    );
  },
};
