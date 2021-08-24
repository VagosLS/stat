const { Discord, MessageEmbed, Client, Collection, User } = require('discord.js')
const DB = require('../Models/Voice')
const settings = require('../config')

module.exports = async(oldState, newState) => {

//SESE GİRİNCE
if (!oldState.channelID && newState.channelID) {
DB.findOne({UserID: newState.id}, async(err, data) => {
await DB.findOneAndUpdate({ GuildID: newState.guild.id, UserID: newState.id, ChannelID: newState.channel.id, ParentID: newState.channel.parentID}, { $set: { Start: Date.now() } }, { upsert: true })
await DB.findOneAndUpdate({ GuildID: newState.guild.id, UserID: newState.id, ChannelID: newState.channel.id, ParentID: newState.channel.parentID}, { upsert: true }).catch(err => console.log('boş hata'));;
})//DATA BİTİŞ
}//SESE GİRİŞ BİTİŞ
 

//SESTEN ÇIKINCA
let Time = await DB.findOne({UserID: oldState.id})
if (oldState.channelID && !newState.channelID) {
DB.findOne({UserID: newState.id}, async(err, data) => { 
if(!Time) return
let voiceData = Date.now() - Time.Start
await DB.findOneAndUpdate({ GuildID: oldState.guild.id, UserID: oldState.id }, { $set: { Start: Date.now() } }, { upsert: true }).catch(err => console.log('boş hata'));
await DB.findOneAndUpdate({ GuildID: oldState.guild.id, UserID: oldState.id, ChannelID: oldState.channel.id, ParentID: oldState.channel.parentID}, { $inc: { GeneralStat: voiceData, DailyStat: voiceData, WeeklyStat: voiceData, ChannelValue: voiceData, ParentValue: voiceData  } }, { upsert: true }).catch(err => console.log('boş hata'));;
})//DATA BİTİŞ

}//SESTEN ÇIKMA BİTİŞ




}
module.exports.configuration = {name: "voiceStateUpdate"}