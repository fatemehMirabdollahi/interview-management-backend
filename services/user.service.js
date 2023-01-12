const pool = require("../postgress");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getUser: (req, res) => {
    pool.query(
      `SELECT name,admin FROM professor WHERE professor.username = '${req.user.username}' `,
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
          console.log(error);
        } else if (results.leght == 0) {
          res.status(404).json("No user with this username");
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    );
  },
  editSelf: async (req, res) => {
    let user = req.body;
    if (user.oldUsername != req.user.username) {
      res.status(403).json("Forbidden");
    } else {
      if (!user.oldPass) {
        pool.query(
          `UPDATE professor SET username = '${user.username}', name = '${user.name}' WHERE username = '${req.user.username}'`,
          (error) => {
            if (error) {
              res.status(500).json(error);
            } else {
              const token = jwt.sign(
                { username: user.username },
                "interview-managment",
                {
                  expiresIn: "2h",
                }
              );
              res
                .status(200)
                .json({
                  username: user.username,
                  token: token,
                  name: user.name,
                });
            }
          }
        );
      } else {
        pool.query(
          `SELECT password FROM professor WHERE username = '${req.user.username}'`,
          async (error, results) => {
            console.log(results.rows[0]);
            if (error) {
              res.status(500).json(error);
            } else if (!results?.rows?.length) {
              res.status(500).json(error);
            } else {
              if (
                !(await bcrypt.compare(user.oldPass, results.rows[0].password))
              ) {
                res.status(400).json("pass is incorrect.");
              } else {
                const token = jwt.sign(
                  { username: user.username },
                  "interview-managment",
                  {
                    expiresIn: "2h",
                  }
                );
                encryptedPassword = await bcrypt.hash(user.newPass, 10);
                pool.query(
                  `UPDATE professor SET username = '${user.username}', name = '${user.name}', password = '${encryptedPassword}' WHERE username = '${req.user.username}'`,
                  (error) => {
                    if (error) {
                      res.status(500).json(error);
                    } else {
                      res
                        .status(200)
                        .json({
                          username: user.username,
                          token: token,
                          name: user.name,
                        });
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  },
  getAllUsers: (req, res) => {
    pool.query(
      `SELECT name, username,admin FROM professor`,
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json(results.rows.filter((e) => !e.admin));
        }
      }
    );
  },
  addUser: (req, res) => {
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
                res.status(201).json("added");
              }
            }
          );
        }
      }
    );
  },
  editUser: (req, res) => {
    var user = req.body;
    pool.query(
      `SELECT professor.username,admin FROM professor WHERE professor.username = '${user.oldUsername}'`,
      async (error, results) => {
        if (error) {
          console.log("Select Error");
          res.status(500).json("error");
        } else if (results?.rows?.length) {
          let query = ``;
          if (results.rows[0].admin) {
            res.status(500).json("you can not edit admin");
          } else {
            if (user.password) {
              encryptedPassword = await bcrypt.hash(user.password, 10);
              query = `UPDATE professor SET name = '${user.name}', username = '${user.username}' ,password = '${encryptedPassword}' WHERE username = '${user.oldUsername}'`;
            } else
              query = `UPDATE professor SET name = '${user.name}', username = '${user.username}'  WHERE username = '${user.oldUsername}'`;
            pool.query(query, (error) => {
              if (error) {
                console.log(error);
                res.status(500).json("error");
              } else {
                res.status(201).json("edited");
              }
            });
          }
        } else {
          res.status(404).json("User not found");
        }
      }
    );
  },
  deleteUser: (req, res) => {
    var username = req.params.username;
    pool.query(
      `SELECT professor.username,admin FROM professor WHERE professor.username = '${username}'`,
      async (error, results) => {
        if (error) {
          console.log("Select Error");
          res.status(500).json("error");
        } else if (results?.rows?.length) {
          let query = ``;
          if (results.rows[0].admin) {
            res.status(500).json("you can not delete admin");
          } else {
            query = `DELETE FROM professor WHERE username = '${username}'`;
            pool.query(query, (error) => {
              if (error) {
                console.log(error);
                res.status(500).json("error");
              } else {
                res.status(200).json("deleted");
              }
            });
          }
        } else {
          res.status(404).json("User not found");
        }
      }
    );
  },
};
