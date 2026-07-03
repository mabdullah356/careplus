const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const userRoutes = require("./Routes/user.Route");
const doctorRoutes = require("./Routes/doctorProfile.Route");
const patientRoutes = require("./Routes/patientProfile.Route");
const appointmentRoutes = require("./Routes/appointment.Route");

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/doctor",doctorRoutes);
app.use("/api/v1/patient",patientRoutes);
app.use("/api/v1/appointment",appointmentRoutes);


module.exports = app;