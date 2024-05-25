// environment variables
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// parse cookie
const cookieParser = require("cookie-parser");
const cors = require("cors");
// cors setup
const corsOptions = require("../config/corsOptions");
// function to connect with database
const connectDB = require("../config/dbConnect");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV;
const URI = process.env.DATABASE_URI;

console.log(ENV);
// connect to database
connectDB();

// set cors with cors options
app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json
app.use(cookieParser()); // middleware to parse cookie

// static route
// default index.html file and css to serve in root
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("../routes/root"));

// user routes - for testing
// to see if serve is on
app.use("/test", require("../routes/testRoutes"));

// user routes - for /api/users and /api/user
// to signup, login, get user and put user
app.use("/api", require("../routes/userRoutes"));

// user routes - for profiles
// to follow or unfollow profile, and get profile
app.use("/api/profiles", require("../routes/profileRoutes"));

// article routes
// to get feed, get list articles
app.use("/api/articles", require("../routes/articleRoutes"));

// tag route
// to get all existed articles' tags
app.use("/api/tags", require("../routes/tagRoutes"));

// comment routes
// to get all comments, create and delete a comment
app.use("/api/articles", require("../routes/commentRoutes"));

// mongoose event listener
mongoose.connection.once("open", () => {
  console.log(`about to connect database string: `, URI);
  console.log("Connected to MongoDB");

  // the app only listen when database connection is formed
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// mongoose event listener
mongoose.connection.on("error", (err) => {
  // log error if happen
  console.log(err);
});

module.exports = app;
