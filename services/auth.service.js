const pool = require("../postgress");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {

  login: (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    pool.query(
      `SELECT * FROM professor WHERE username = '${username}'`,
      async (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json("not authorized");
        }
        if (!result?.rows?.length) {
          res.status(401).json("not authorized");
        } else {
          let user = result.rows[0];
          if (!(await bcrypt.compare(password, user.password))) {
            res.status(401).json("not authorized");
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
