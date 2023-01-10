const pool = require("../postgress");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  register: (req, res) => {
    console.log("register");
    var user = req.body;
    pool.query(
      `SELECT professor.username FROM professor WHERE professor.name = '${user.username}'`,
      async (error, results) => {
        if (error) {
          console.log("Select Error");
          res.status(500);
        } else if (results?.rows?.length) {
          res.status(409).json("User already exist.");
        } else {
          encryptedPassword = await bcrypt.hash(user.password, 10);
      
          pool.query(
            `INSERT INTO professor(name, username, password) VALUES('${user.name}', '${user.username}', '${encryptedPassword}')`,
            (error) => {
              if (error) {
                console.log(error);
                res.status(500);
              } else {
                const token = jwt.sign(
                  { username: user.username },
                  "interview-managment",
                  {
                    expiresIn: "2h",
                  }
                );
                res.status(201);
              }
            }
          );
        }
      }
    );
  },
  login: (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    pool.query(
      `SELECT * FROM professor WHERE username = '${username}'`,
      async (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json("eror");
        }
        if (!result?.rows?.length) {
          res.status(500).json("not found");
        } else {
          let user = result.rows[0];
          if (!(await bcrypt.compare(password, user.password))) {
            res.status(500).json("wrong pass");
          } else {
            const token = jwt.sign(
              { username: user.username },
              "interview-managment",
              {
                expiresIn: "2h",
              }
            );
            user.token = token;
            res
              .status(201)
              .json({ username: user.username, token: user.token });
          }
        }
      }
    );
  },
};
