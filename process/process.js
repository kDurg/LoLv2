// DEPENDENCIES
// const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE_URL);
// const db = mongoose.connection;
// const {Schema} = mongoose;

// EXTERNAL CONNECTIONS
const riot = require("../external connections/riot");
const dataDragon = require("../external connections/dataDragon");

// INTERNAL CONNECTIONS
const matches = require("../models/matches");


// FUNCTIONS
async function checkRecentData(riotAPIkey, matchList){
    let success = true;
    console.log("Checking Recent Matches Against Database");
    // PULL DB ARRAY OF RIOT MATCHIDS
    let dbMatchIDs = [];

    // FIND THE MATCHES NOT IN THE DB
    let diff = matchList.filter(x=> dbMatchIDs.indexOf(x) === -1);
    if (diff.length){
        let newMatchesAdded = 0;
        let unsuccessfulMatchAdd = 0;
        console.log("There are " + diff.length + " New Matches. Pulling Data from Riot API...");
        for (const matchID of diff){
            // GET MATCH DATA
            let matchDetails = await riot.getMatchDetails(riotAPIkey, matchID);
            let callSuccess = matchDetails.success;
            if (callSuccess){
                // console.log(matchDetails);
                let matchParticipants = matchDetails.matchData.metadata.participants ? matchDetails.matchData.metadata.participants : null;
                let matchInfo = matchDetails.matchData.info ? matchDetails.matchData.info : null;
                
                // IF WE HAVE ALL THE DATA REQUIRED FOR THE DATABASE, WRITE TO DB
                if (matchID && matchParticipants && matchInfo){
                    // TODO: ADD MATCH DATA TO DATABASE

                    newMatchesAdded ++;
                } else {
                    success = false;
                }
            } else {
                success = false;
                console.error("ERROR: Unable to get match data for " + matchID);
                unsuccessfulMatchAdd ++;
            }
        }

        success ? console.log("SUCCESS: Added " + newMatchesAdded + " New Matches To Database."): console.log("ERROR: There were " + unsuccessfulMatchAdd + " matches that were not added to the database. Added " + newMatchesAdded + "/" + matchList.length + " new matches.")
        return success;
    } else {
        console.log("SUCCESS: No New Matches Found or Added To The Database.");
        return success;
    } 
};

async function start(riotAPIkey){
    console.log("Starting Process");
    let summonerData = await riot.getUser(riotAPIkey);
    let matchList = summonerData.success ? await riot.getMatches(riotAPIkey, summonerData.data.puuid): null;
    // console.log(matchList);
    if (summonerData.success && matchList.success){
        let matchComparison = await checkRecentData(riotAPIkey, matchList.matchList);
        console.log("matchComparison Success: " + matchComparison);
    }
}

module.exports = {checkRecentData, start}