import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
import morgan from "morgan";
dotenv.config();
app.use(morgan("tiny"));
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: `${process.env.URL}`,
  credentials: true,
};
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/message", messageRoute);

app.get("/api/cron", (req, res) => {
  res.send("Backend is up and running");
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
