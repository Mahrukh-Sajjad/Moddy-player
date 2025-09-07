const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to Mongodb");
    })
    .catch((err) => {
      console.log("error connecting to mongodb", err);
    });
}
module.exports = connectDB;
