// import required projects
const express = require("express");
const app = express();
//dotenv configuration module used to store the secret keys
require("dotenv").config();
//To parse incoming body requests
app.use(express.json());

// cookie-parser to handling cookies
const cookieparser = require("cookie-parser");
app.use(cookieparser());

// cors config
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", "Acces-Control-Allow-Origin"],
  })
);

// db connection start
const db = require("mongoose");
db.connect(process.env.MONGODB_URI, {
  servername: "TEST",
})
  .then((data) => {
    console.log("db running...");
  })
  .catch((err) => {
    console.log(err);
  });
// db connection end

// Routes
const root = require("./Routes/main");
app.use("/api", root);

// server running on port 4000
app.listen(4000, () => {
  console.log("server running...");
});
