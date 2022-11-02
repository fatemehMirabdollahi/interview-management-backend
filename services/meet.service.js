const pool = require("../postgress");
module.exports = {
  addMeets: (req, res) => {
    let meets = req.body.meets;
    let interview = req.body.interview;
    pool.query(
      `DELETE FROM MEET WHERE interviewyear = ${interview.interviewyear}`
    );
    let values = [];
    for (let index = 0; index < meets.length; index++) {
      const meet = meets[index];
      values.push(
        `(${meet.interviewyear},${meet.docnumber},$$${meet.date}$$,$$${meet.startTime}$$,$$${meet.endTime}$$,'${meet.type}')`
      );
    }
    pool.query(
      `INSERT INTO meet(interviewyear, docnumber, meetdate, starttime, endtime, meettype) VALUES ${values.join(
        ","
      )}`,
      (error) => {
        if (error) {
          console.log("insert", error);
          res.status(500).json(error);
        } else {
          pool.query(
            `UPDATE interview SET dates = ARRAY[${interview.dates.map(
              (el) => `$$${el}$$`
            )}], interviewlength = ${interview.interviewlength}, rest = ${
              interview.rest
            }, starttime = $$${interview.starttime}$$, endtime = $$${
              interview.endtime
            }$$, gapstart = $$${interview.gapstart}$$, gapend = $$${
              interview.gapend
            }$$ WHERE interviewyear = ${interview.interviewyear};`,
            (error) => {
              if (error) {
                console.log("update", error);
                res.status(500).json(error);
              } else {
                res.status(200).json("ok");
              }
            }
          );
        }
      }
    );
  },
  getMeets: (req, res) => {
    let year = req.params.year;
    pool.query(
      `SELECT  dates,interviewlength,rest,starttime,endtime,gapstart,gapend FROM interview WHERE interviewyear = ${year}`,
      (error, result) => {
        if (error) {
          res.status(400).json("Bad Request");
        } else if (result.rows.length == 0) {
          res.status(404).json("No interview with this year");
        } else {
          var interview = result.rows[0];
          pool.query(
            `SELECT starttime,endtime, studentname,lastname,student.docnumber,meetdate,meettype FROM meet LEFT OUTER JOIN student on student.docnumber = meet.docnumber OR meet.docnumber =NULL WHERE meet.interviewyear = ${year} `,
            (error, result2) => {
              if (error) {
                res.status(500);
              } else {
                let meets = result2.rows;
                let sortedMeets = {};
                for (let index = 0; index < meets.length; index++) {
                  const element = meets[index];
                  let date = element.meetdate;
                  if (sortedMeets[date])
                    sortedMeets[date].push({
                      type: element.meettype,
                      start: {
                        hour: Number(element.starttime.split(":")[0]),
                        minute: Number(element.starttime.split(":")[1]),
                      },
                      end: {
                        hour: Number(element.endtime.split(":")[0]),
                        minute: Number(element.endtime.split(":")[1]),
                      },
                      student: element.docnumber
                        ? {
                            docnumber: element.docnumber,
                            studentname: element.studentname,
                            lastname: element.lastname,
                          }
                        : null,
                    });
                  else
                    sortedMeets[date] = [
                      {
                        type: element.meettype,
                        start: {
                          hour: Number(element.starttime.split(":")[0]),
                          minute: Number(element.starttime.split(":")[1]),
                        },
                        end: {
                          hour: Number(element.endtime.split(":")[0]),
                          minute: Number(element.endtime.split(":")[1]),
                        },
                        student: element.docnumber
                          ? {
                              docnumber: element.docnumber,
                              studentname: element.studentname,
                              lastname: element.lastname,
                            }
                          : null,
                      },
                    ];
                }

                let data = {
                  interview: interview,
                  meets: sortedMeets,
                };
                res.status(200).json(data);
              }
            }
          );
        }
      }
    );
  },
};
