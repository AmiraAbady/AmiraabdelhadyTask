const express = require('express');
const bodyParser = require('body-parser');
 
 
const app = express();

const userRoutes = require("./routes/user");
const deviceRoutes = require("./routes/device");
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
}); 


app.use("/user", userRoutes);
app.use("/device", deviceRoutes);


module.exports = app;