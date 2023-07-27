const express = require("express");
const mongoose = require("mongoose");
const cookieParser  = require("cookie-parser");

const productRoutes = require("./routes/productsRoutes.js");
const app = express();

const connect = () => {
  // mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(8000, () => {
  connect();
  console.log("Listening to port 8000");
});