const express = require('express');
const app = express();




app.use(express.json());
app.use(express.urlencoded({extended:true}));


const userRoutes = require("./Routes/user.Route");
app.use("/api/v1/users",userRoutes);

module.exports = app;