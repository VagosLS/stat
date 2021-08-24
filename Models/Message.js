const mongoose = require("mongoose");
const MessageStats = mongoose.Schema({
    GuildID: String,
    UserID: String,
    ChannelID: String,
    GeneralStat: { type: Number, default: 0 },
    DailyStat: { type: Number, default: 0 },
    WeeklyStat: { type: Number, default: 0 },
    ChannelValue: { type: Number, default: 0 },
});
module.exports = mongoose.model("MessageStats", MessageStats);
