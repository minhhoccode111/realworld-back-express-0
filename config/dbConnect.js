const mongoose = require("mongoose");

// function to connect with database
const connectDB = async () => {
  try {
    // will warn if don't have this line
    mongoose.set("strictQuery", false);

    // connect using this link in dev environment
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
