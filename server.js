const app = require("./index");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8080",
};
app.use(cors(corsOptions));

app.listen(3000, (err) => {
  if (err) throw err;

  console.log("Server is running in http://127.0.0.1:3002");
});
