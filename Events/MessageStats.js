const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const DB = require('../Models/Message')
const settings = require('../config')

module.exports = async(message) => {

let prefix = settings.Prefix.filter(p => message.content.startsWith(p))[0];     
if (!message.guild || message.author.bot || message.channel.type === 'dm' || message.content.startsWith(prefix)) return;


DB.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => { 
if(!data) {
let striga = new DB({GuildID: message.guild.id, UserID: message.author.id, ChannelID: message.channel.id, GeneralStat: 1, DailyStat: 1, WeeklyStat: 1, ChannelValue: 1})    
striga.save().catch(err => console.log(`Mesaj kayıt edilemedi.`))
} else { 
await DB.findOneAndUpdate({
GuildID: message.guild.id, 
UserID: message.author.id, 
ChannelID: message.channel.id,}, { $inc: { GeneralStat: 1, DailyStat: 1, WeeklyStat: 1, ChannelValue: 1 } }, {upsert: true}) }})

}
module.exports.configuration = {name: "message"}