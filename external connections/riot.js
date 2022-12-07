let axios = require('axios');
let config;

// GET USER BY USERNAME
async function getUser(riotAPIkey, name) {
    let success;
    let summonerData = {};
    let summonerName = name ? name : "kdurg";
    // console.log("name : " + summonerName);
    config = {
        method: 'get',
        url: 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName,
        headers: {
            "X-Riot-Token": riotAPIkey
        }
    };

    try {
        const res = await axios(config);
        // MAP RESPONSE OBJECT TO SUMMONERDATA OBJECT
        summonerData.id = res.data.id ? res.data.id : null;
        summonerData.puuid = res.data.puuid ? res.data.puuid : null;
        summonerData.name = res.data.name ? res.data.name : null;
        summonerData.revisionDate = res.data.revisionDate ? res.data.revisionDate : null;
        summonerData.summonerLevel = res.data.summonerLevel ? res.data.summonerLevel : null;
        success = true;
    } catch (error) {
        success = false;
        console.error("ERROR: UNABLE TO GET SUMMONER DATA. " + error);
    }

    const returnData = {
        success: success,
        data: summonerData
    };
    return returnData;
}

// GET RECENT MATCHES (100 COUNT)
async function getMatches(riotAPIkey, summonerPUUID){
    let success;
    let matchList = [];
    config = {
        method: "get",
        url: "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + summonerPUUID + "/ids?start=0&count=1",
        headers: {
            "X-Riot-Token": riotAPIkey
        }
    }
    
    try {
        const res = await axios(config);
        matchList = res.data ? res.data : null;
        success = true;
    } catch (error){
        success = false;
        console.error('ERROR: UNABLE TO GET MATCHES. ' + error);
    }
    
    const returnData = {
        success: success,
        matchList: matchList
    }
    return returnData;
}

// GET MATCH DETAILS BY RIOT MATCH ID
async function getMatchDetails(riotAPIkey, riotMatchID){
    let success;
    let matchData = [];
    config = {
        method: "get",
        url: "https://americas.api.riotgames.com/lol/match/v5/matches/" + riotMatchID,
        headers: {
            "X-Riot-Token": riotAPIkey
        }
    }
    
    try {
        const res = await axios(config);
        // console.log(res)
        matchData = res.data ? res.data : null;
        success = true;
    } catch (error){
        success = false;
        console.error('ERROR: UNABLE TO GET MATCH DATA FOR ' + riotMatchID + ". " + error);
    }
    
    const returnData = {
        success: success,
        matchData: matchData
    }
    return returnData;
}

module.exports = { getUser, getMatches, getMatchDetails };