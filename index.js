const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.post("/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client 에서 가져오려면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.json({ success: false, err }); // save 실패시 에러코드 전송.
    return res.status(200).json({ success: true }); // 성공 메세지.
  }); // mongoose save 함수 호출.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));
