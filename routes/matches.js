const express = require('express');
const router = express.Router();
const Match = require('../models/matches');

// GET ALL MATCHES
router.get('/', async (req, res)=> {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
});

// GET ONE MATCH
router.get('/:id', getMatch, (req, res)=>{
    res.send(res.match)
})

// POST NEW MATCH
router.post('/', async (req, res)=>{
    const match = new Match({
        matchId: req.body.matchId,
        participants: req.body.participants,
        info: req.body.info
    });
    try {
        const newMatch = await match.save();
        res.status(201).json(newMatch);
    } catch (err){
        res.status(400).json({message: err.message});
    }
});

// UPDATE MATCH
router.patch('/:id', getMatch, async (req, res)=>{
    if (req.body.matchId != null){
        res.match.matchId = req.body.matchId;
    }
    if (req.body.participants != null){
        res.match.participants = req.body.participants;
    }
    if (req.body.info != null){
        res.match.info = req.body.info;
    }

    try{
        const updatedMatch = await res.match.save();
        res.status(200).json({message: "Updated match", data: updatedMatch});
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

// DELETE MATCH
router.delete('/:id', getMatch, async (req, res)=>{
    try{
        await res.match.remove()
        res.json({message: "Deleted Match"});
    }catch(err){
        res.send(500).json({message: err.message});
    }
});




async function getMatch(req, res, next){
    try{ 
        match = await Match.findById(req.params.id)
        if (match == null){
            return res.status(404).json({message: "Cannont find Match"})
        }
    }catch (err){
        return res.status(500).json({message: err.message});
    }
    res.match = match;
    next();
}

module.exports = router