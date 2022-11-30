const express = require("express");
const authentication = require("./middleware/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const student = require("./routes/student");
const interview = require("./routes/interview");
const meet = require("./routes/meet");
const comment = require("./routes/comment");
const auth = require("./routes/auth");

app.use("/student", authentication, student);
app.use("/interview", authentication, interview);
app.use("/meet", authentication, meet);
app.use("/comment", authentication, comment);
app.use("/auth",auth);

module.exports = app;
