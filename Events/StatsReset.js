const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const VS = require('../Models/Voice')
const MS = require('../Models/Message')
const { CronJob } = require("cron");
const settings = require('../config')
module.exports = () => {

const dailyStats = new CronJob("0 0 * * *", () => {
client.guilds.cache.forEach(async (guild) => {
await MS.findOneAndUpdate({GuildID: guild.id}, {$set: {DailyStat: 0}})
await VS.findOneAndUpdate({GuildID: guild.id}, {$set: {DailyStat: 0}})
})
}, null, true, "Europe/Istanbul");
dailyStats.start();

const weeklyStats = new CronJob("0 0 * * 0", () => {
client.guilds.cache.forEach(async (guild) => {
await MS.findOneAndUpdate({GuildID: guild.id}, {$set: {WeeklyStat: 0}})
await VS.findOneAndUpdate({GuildID: guild.id}, {$set: {WeeklyStat: 0}})
})
}, null, true, "Europe/Istanbul");
weeklyStats.start();


}
module.exports.configuration = {name: "ready"}