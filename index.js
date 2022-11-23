const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const student = require("./routes/student");
const interview = require("./routes/interview");
const meet = require("./routes/meet");
const comment = require("./routes/comment");

app.use("/student", student);
app.use("/interview", interview);
app.use("/meet", meet);
app.use("/comment", comment);

module.exports = app;
