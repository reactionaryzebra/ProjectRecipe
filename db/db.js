const mongoose = require("mongoose");
const connectionString =
  process.env.CONNECTIONSTRING || "mongodb://localhost/recipeTest2";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("You are connected to the MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("You have disconnected from the MongoDB");
});

mongoose.connection.on("error", err => {
  console.log(err);
});