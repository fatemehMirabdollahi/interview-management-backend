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
              `INSERT INTO interview(interviewYear) VALUES('${interviewYear}')`,
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
};
