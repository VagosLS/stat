const { Discord, MessageEmbed } = require('discord.js')
const VoiceStats = require('../Models/Voice')
const MessageStats = require('../Models/Message')
const PH = require('../Parents.json')
const moment = require('moment');
 require('moment-duration-format')
moment.locale('tr')
module.exports = {
conf: {name: 'denetim', aliases: ["stat-denetim"], help: "!denetim"},
stg: async(client, message, args, config, embed) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return

let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) 
if(!rol) return message.channel.send(`Lütfen bir rol belirt.`)

let rolMember = 0;

const category = async (parentsArray) => {
const data = await VoiceStats.find({UserID: message.author.id });
const voiceUserParentData = data.filter((x) => parentsArray.includes(x.ParentID));
let voiceStat = 0;
for (var i = 0; i <= voiceUserParentData.length; i++) {voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].ParentValue : 0;}
return moment.duration(voiceStat).format("H [saat], m [dakika]");};


const filteredParents = message.guild.channels.cache.filter((x) => x.type === "category" && !PH.Public.includes(x.id) && !PH.Register.includes(x.id) && !PH.Problem.includes(x.id) && !PH.Secret.includes(x.id) && !PH.Alone.includes(x.id) && !PH.Games.includes(x.id));


message.guild.members.cache.map(x => {
if (x.roles.cache.has(rol.id)) {rolMember++;}})

message.guild.members.cache.map(x => {
if(x.roles.cache.has(rol.id)) {
VoiceStats.findOne({UserID: x.id}, async(err, data) => {
if(!data) return message.channel.send(`${x} adlı üye hiç sese girmemiş`)
message.channel.send(`
${x} adlı üye toplamda \`${moment.duration(data ? data.GeneralStat : 0).format("H [saate], m [dakikaya]")}\` sahip.

\`•\` Public Odaları: \`${await category(PH.Public)}\`
\`•\` Secret Odaları: \`${await category(PH.Secret)}\`
\`•\` Kayıt Odaları: \`${await category(PH.Register)}\`
\`•\` Oyun Odaları: \`${await category(PH.Games)}\`
━━━━━━━━━`)})}})



}}