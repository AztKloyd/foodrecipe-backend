const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

//서버 실행시 폴더 없으면 자동으로 생성
const imageDir = path.join(__dirname, "./public/images");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}
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
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));


// 포트 설정 및 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
