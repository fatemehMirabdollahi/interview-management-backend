const pool = require("../postgress");
module.exports = {
  addComment: (req, res) => {
    let comment = req.body;
    pool.query(
      `SELECT docnumber, user_id, firstimpression, opinion, favphdfields from comment WHERE user_id=${comment.user_id}`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          if (results.rows.length) {
            pool.query(
              `UPDATE comment SET firstimpression = $$${comment.firstimpression}$$, opinion = $$${comment.opinion}$$, favphdfields = $$${comment.favphdfields}$$ WHERE user_id = ${comment.user_id}`,
              (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).json(error);
                } else res.status(200).json("updated");
              }
            );
          } else {
            pool.query(
              `INSERT INTO comment(docnumber, user_id, firstimpression, opinion, favphdfields) VALUES(${comment.docnumber},${comment.user_id},$$${comment.firstimpression}$$,$$${comment.opinion}$$,$$${comment.favphdfields}$$)`,
              (error) => {
                if (error) {
                  console.log(error);
                  res.status(500).json(error);
                } else res.status(200).json("added");
              }
            );
          }
        }
      }
    );
  },
  getComments: (req, res) => {
    let docnumber = req.params.id;
    pool.query(
      `SELECT docnumber, user_id, firstimpression, opinion, favphdfields from comment WHERE docnumber=${docnumber}`,
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json(error);
        } else res.status(200).json(results.rows);
      }
    );
  },
};
