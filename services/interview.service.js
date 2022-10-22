const pool = require("../postgress");
module.exports = {
  getInterviews: (req, res) => {
    pool.query(
      'SELECT "interviewyear" AS "interview_year", count(*) AS "students_number", count(talent=true) AS "talent"  FROM "public"."student" GROUP BY "interviewyear" ORDER BY "interviewyear" DESC',
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  },
  getInterviewYears: (req, res) => {
    pool.query(
      'SELECT "interviewyear" AS "interview_year" FROM "public"."interview" GROUP BY "interviewyear" ORDER BY "interviewyear" DESC',
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  },
  getInterviewStudents: (req, res) => {
    pool.query(
      `SELECT * from STUDENT WHERE interviewyear = ${Number(
        req.params.year
      )} ORDER BY docnumber`,
      (error, results) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  },
};
