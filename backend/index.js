// Requires
const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const getRoutes = require("./routes/getRoutes");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Checking the server
app.get("/", (req, res) => {
  res.send(process.env);
});
app.use(cors());

// middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routers
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/get", getRoutes);

//Mongoose Connection
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("MONGOOSE CONNECTED");
  })
  .catch((e) => {
    console.log(`Not Connencted to MONGOOSE: ${e}`);
    console.log(`${process.env.MONGO_URL}`);
  });

// Listening the server
app.listen(process.env.PORT, () => {
  console.log(`Here I listened something at PORT ${process.env.PORT}`);
});
