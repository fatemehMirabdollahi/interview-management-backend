const e = require("express");
const pool = require("../postgress");
module.exports = {
  addStudents: (req, res) => {
    let body = req.body;
    let interviewYear = body.year;
    if (!interviewYear) {
      res.status(404).json("year needed");
    } else
      pool.query(
        `SELECT interviewYear from interview WHERE interviewYear='${interviewYear}'`,
        (error, results) => {
          if (results.rows.length) {
            res.status(409).json("there is a interview for this year");
          } else {
            pool.query(
              `INSERT INTO interview(interviewyear) VALUES('${interviewYear}')`,
              (error) => {
                if (error) {
                  console.log(error);
                  res.status(400).json(error);
                } else {
                  let keys = Object.keys(body.students[0]);
                  let values = [];
                  for (let index = 0; index < body.students.length; index++) {
                    const student = body.students[index];
                    let valStr = [];
                    for (let index = 0; index < keys.length; index++) {
                      const key = keys[index];

                      valStr.push(
                        student[key] || student[key] == false
                          ? `'${student[key]}'`
                          : "null"
                      );
                    }
                    valStr.push(interviewYear);
                    values.push(`(${valStr.join(",")})`);
                  }
                  pool.query(`INSERT INTO student VALUES ${values.join(",")}`);
                  res.status(200).json("add");
                }
              }
            );
          }
        }
      );
  },
  selectStudents: (req, res) => {
    let body = req.body;
    let unSelect = () => {
      pool.query(
        `UPDATE student SET selected = false WHERE docnumber  = ANY(ARRAY[${body.unSelecteds}])
      `,
        (error) => {
          if (error) res.status(400).json("Bad request (unSelecteds)");
          else res.status(200).json("updated");
        }
      );
    };
    if (body.selecteds.length) {
      pool.query(
        `UPDATE student SET selected = true WHERE docnumber  = ANY(ARRAY[${body.selecteds}])
    `,
        (error) => {
          if (error) {
            res.status(400).json("Bad request (selecteds)");
          } else {
            if (body.unSelecteds.length) unSelect();
            else res.status(200).json("updated");
          }
        }
      );
    } else if (body.unSelecteds.length) {
      unSelect();
    } else {
      res.status(200).json("updated");
    }
  },
  getSchedulingStudent: (req, res) => {
    let year = req.params.year;
    pool.query(
      `SELECT docnumber,studentname,lastname from student where interviewYear=${year} AND selected = true`,
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  },
  getStudent: (req, res) => {
    let docnumber = req.params.docnumber;
    pool.query(
      `SELECT docnumber, chosenfields, studentname, lastname, fathername, talent, gender, birthdate, bacheloruni, bachelorfield, masteruni, masterfield, thesistitle, mastersupervisorname, diplomagrade, writtendiplomagrade, bachelorgrade, gradewiththesis, bachelordate, masterdate, employmentstatus, quota, phonenumber, email, homeaddress, evnumber from student WHERE docnumber = ${docnumber}`,
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else {
          res.status(200).json(results.rows[0]);
        }
      }
    );
  },

};
