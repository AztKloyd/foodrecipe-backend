const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const path = require("path");

// DB 연결
connectDb();

// 미들웨어
app.use(express.json());
app.use(cors({
  origin: "*", 
  credentials: true
}));
app.use(express.static("public"));

// 라우터
app.use("/recipe", require("./routes/recipe"));
app.use("/", require("./routes/user"));


// 포트 설정 및 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
