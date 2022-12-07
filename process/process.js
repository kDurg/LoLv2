// DEPENDENCIES
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
const {Schema} = mongoose;

// EXTERNAL CONNECTIONS
const riot = require("../external connections/riot");
const dataDragon = require("../external connections/dataDragon");

// INTERNAL CONNECTIONS
const matches = require("../models/matches");


// FUNCTIONS
function checkRecentData(){
    console.log("Checking Recent Matches Against Database");
};

function start(){
    console.log("Starting Process");
    console.log(matches.find())

}

module.exports = {checkRecentData, start}