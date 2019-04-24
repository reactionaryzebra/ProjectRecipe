const mongoose = require("mongoose");
const connectionString = "mongodb://localhost/recipeTest";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

mongoose.connection.on("connected", () => {
  console.log("You are connected to the MongoDB at " + connectionString);
});

mongoose.connection.on("disconnected", () => {
  console.log("You have disconnected from the MongoDB");
});

mongoose.connection.on("error", err => {
  console.log(err);
});
