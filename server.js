require('dotenv').config();

// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// PROCESS FILES
const processes = require("./process/process");

// MONGO CONNECTION
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err)=> console.error(err))
db.once('open', ()=>console.log("Connected to Database"));

// INBOUND API ROUTES
app.use(express.json());
const matches = require('./routes/matches');
app.use('/matches', matches);

// START SERVER/ KICK OFF PROCESSES
app.listen(3000, ()=> console.log("Server Started"));
console.log(db.matches)

processes.start();