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
app.use(cors());
app.use(express.static("public"));

// 정적 파일 경로: frontend/recipe-app/dist
app.use(express.static(path.join(__dirname, "../frontend/recipe-app/dist")));

// 라우터
app.use("/recipe", require("./routes/recipe"));
app.use("/", require("./routes/user"));

// SPA fallback: React Router 지원 (모든 경로에 대해 index.html 반환)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/recipe-app/dist", "index.html"));
  });


// 포트 설정 및 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
