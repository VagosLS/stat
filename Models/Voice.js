const mongoose = require("mongoose");
const VoiceStats = mongoose.Schema({
    GuildID: String,
    UserID: String,
    ChannelID: String,
    ParentID: String,
    Start: Number,
    GeneralStat: { type: Number, default: 0 },
    DailyStat: { type: Number, default: 0 },
    WeeklyStat: { type: Number, default: 0 },
    ChannelValue: { type: Number, default: 0 },
    ParentValue: { type: Number, default: 0 },
});
module.exports = mongoose.model("VoiceStats", VoiceStats);
