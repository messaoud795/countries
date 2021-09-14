const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");

//configuration
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
//access the body of request
app.use(express.json({ extended: false }));

//database connection
connectDB();

//routes
app.use("/api/country", require("./routes/countryRoute"));

//sever starter
const expressServer = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
