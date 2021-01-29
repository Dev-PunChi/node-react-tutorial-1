const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
  .connect("mongodb://root:1q2w3e4r@112.153.1.31:27018", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));
