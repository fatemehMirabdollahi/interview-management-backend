const e = require("express");
const pool = require("../postgress");
module.exports = {
  applyAssessment: (req, res) => {
    let body = req.body;
    let docnumber = req.params.docnumber;
    let rows = [];
    let hasError = false;
    for (let index = 0; index < body.fields.length; index++) {
      const field = body.fields[index];
      let values = "";
      let sum = field.grade.reduce(
        (partialSum, a) => partialSum + Number(a),
        0
      );
      if (sum > field.max) {
        hasError = true;
        res.status(400).json("sum is grater than max");
      } else {
        values += `('${docnumber}','${field.fieldnum}','${field.formnum}', '${
          field.how
        }','${field.max}', ARRAY[${field.grade.join(",")}])`;
        rows.push(values);
      }
    }
    if (!hasError) {
      pool.query(
        `SELECT docnumber FROM assessment WHERE docnumber = '${docnumber}'`,
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json(error);
          } else {
            if (!result?.rows?.length) {
              console.log(`INSERT INTO assessment VALUES ${rows.join(",")}`);
              pool.query(
                `INSERT INTO assessment VALUES ${rows.join(",")}`,
                (error) => {
                  if (error) {
                    console.log(error);
                    res.status(400).json(error);
                  } else {
                    res.status(200).json("successfull");
                  }
                }
              );
            } else {
              pool.query(
                `DELETE FROM assessment WHERE docnumber = '${docnumber}'`,
                (error) => {
                  if (error) {
                    console.log(error);
                    res.status(400).json(error);
                  } else {
                    pool.query(
                      `INSERT INTO assessment VALUES ${rows.join(",")}`,
                      (error) => {
                        if (error) {
                          console.log(error);
                          res.status(400).json(error);
                        } else {
                          res.status(200).json("successfull");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        }
      );
    }
  },
  getAssessment: (req, res) => {
    let docnumber = req.params.docnumber;
    pool.query(
      `SELECT fieldnum, formnum, how, max, grade FROM assessment WHERE docnumber = '${docnumber}'`,
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json(error);
          console.log(
            "here",
            `SELECT fieldnum, formnum, how, max, grade FROM assessment WHERE docnumber = '${docnumber}'`
          );
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
  },
  getfields: (req, res) => {
    pool.query(
      "SELECT name, fieldnum, formnum FROM assessment_field",
      (error, results) => {
        if (error) {
          res.status(500).json(error);
          console.log(error);
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  },
};
