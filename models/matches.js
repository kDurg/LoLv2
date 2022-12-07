const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true
    },
    participants: {
        type: Array,
        required: true
    },
    info: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Match", matchSchema);