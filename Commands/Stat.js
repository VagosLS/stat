const { Discord, MessageEmbed } = require('discord.js')
const VoiceStats = require('../Models/Voice')
const MessageStats = require('../Models/Message')
const PH = require('../Parents.json')
const moment = require('moment');
 require('moment-duration-format')
moment.locale('tr')
module.exports = {
conf: {name: 'stat', aliases: ["stats"], help: "!stat"},
stg: async(client, message, args, config, embed) => {

if(!message.member.roles.cache.get(config.TagRole) && !message.member.hasPermission('ADMINISTRATOR')) return  

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!member) {

//TOP LIST
let vnumb = 1
let mnumb = 1
let VStat = await VoiceStats.find({UserID: message.author.id}).sort({ ChannelValue: -1 });
let MStat = await MessageStats.find({UserID: message.author.id}).sort({ ChannelValue: -1 });

let topVoice = VStat.length > 0 ? VStat.splice(0, 5).map(x => `${vnumb++}. <#${x.ChannelID}> | \`${moment.duration(x.ChannelValue).format("H [saat], m [dakika]")}\``).join('\n') : "Aktivite Gösterilmemeiş."
let topMessage = MStat.length > 0 ? MStat.splice(0, 5).map(x => `${mnumb++}. <#${x.ChannelID}> | \`${x.ChannelValue} mesaj\``).join('\n') : "Aktivite Gösterilmemeiş."
//TOP LIST


//VOICE DOCUMENTS
let VDB = await VoiceStats.findOne({UserID: message.author.id})
let generalVoice = moment.duration(VDB ? VDB.GeneralStat : 0).format("H [saat], m [dakika]");
let dailyVoice = moment.duration(VDB ? VDB.DailyStat : 0).format("H [saat], m [dakika]");
let weeklyVoice = moment.duration(VDB ? VDB.WeeklyStat : 0).format("H [saat], m [dakika]");
//VOICE DOCUMENTS

//MESSAGE DOCUMENTS 
let MDB = await MessageStats.findOne({UserID: message.author.id})
let generalMessage = MDB ? MDB.GeneralStat : 0;
let dailyMessage = MDB ? MDB.DailyStat : 0;
let weekylMessage = MDB ? MDB.WeeklyStat : 0;
//MESSAGE DOCUMENTS

const category = async (parentsArray) => {
const data = await VoiceStats.find({UserID: message.author.id });
const voiceUserParentData = data.filter((x) => parentsArray.includes(x.ParentID));
let voiceStat = 0;
for (var i = 0; i <= voiceUserParentData.length; i++) {voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].ParentValue : 0;}
return moment.duration(voiceStat).format("H [saat], m [dakika]");};


const filteredParents = message.guild.channels.cache.filter((x) => x.type === "category" && !PH.Public.includes(x.id) && !PH.Register.includes(x.id) && !PH.Problem.includes(x.id) && !PH.Secret.includes(x.id) && !PH.Alone.includes(x.id) && !PH.Games.includes(x.id));

message.channel.send(embed.setDescription(`
${message.author} | ${message.member.roles.highest}

**\`❯\` Ses Kategorisinde Aktifliği**
━━━━━━━━━━
Toplam: \`${moment.duration(VDB ? VDB.GeneralStat : 0).format("H [saat], m [dakika]")}\`
Public Odalarda: \`${await category(PH.Public)}\`
Secret Odalarda: \`${await category(PH.Secret)}\`
Alone Odalarda: \`${await category(PH.Alone)}\`

Kayıt Odalarda: \`${await category(PH.Register)}\`
Sorun Çözme: \`${await category(PH.Problem)}\`
Oyun & Eğlence: \`${await category(PH.Games)}\`
Diğer Odalarda: \`${await category(filteredParents.map(x => x.id))}\`
━━━━━━━━━━

**\`❯\` Mesaj Kategorisinde Aktifliği**
━━━━━━━━━━
Toplam Mesaj: \`${generalMessage}\`

${topMessage}
━━━━━━━━━━

**\`❯\` Top 5 Ses Kanalı**
━━━━━━━━━━
${topVoice}
━━━━━━━━━━
`)
.addField(`\n**\`❯\` Günlük Dökümanları:**\n━━━━━━━`, 
`Toplam Ses: \`${dailyVoice}\`
Toplam Mesaj: \`${dailyMessage} mesaj\`
`, true)
.addField(`\n**\`❯\` Haftalık Dökümanları:**\n━━━━━━━`, 
`Toplam Ses: \`${weeklyVoice}\`
Toplam Mesaj: \`${weekylMessage} mesaj\`
`, true)

.setThumbnail(message.author.avatarURL({dynamic: true})))

} else {

//TOP LIST
let vnumb = 1
let mnumb = 1
let VStat = await VoiceStats.find({UserID: member.id}).sort({ ChannelValue: -1 });
let MStat = await MessageStats.find({UserID: member.id}).sort({ ChannelValue: -1 });

let topVoice = VStat.length > 0 ? VStat.splice(0, 5).map(x => `${vnumb++}. <#${x.ChannelID}> | \`${moment.duration(x.ChannelValue).format("H [saat], m [dakika]")}\``).join('\n') : "Aktivite Gösterilmemeiş."
let topMessage = MStat.length > 0 ? MStat.splice(0, 5).map(x => `${mnumb++}. <#${x.ChannelID}> | \`${x.ChannelValue} mesaj\``).join('\n') : "Aktivite Gösterilmemeiş."
//TOP LIST


//VOICE DOCUMENTS
let VDB = await VoiceStats.findOne({UserID: member.id})
let generalVoice = moment.duration(VDB ? VDB.GeneralStat : 0).format("H [saat], m [dakika]");
let dailyVoice = moment.duration(VDB ? VDB.DailyStat : 0).format("H [saat], m [dakika]");
let weeklyVoice = moment.duration(VDB ? VDB.WeeklyStat : 0).format("H [saat], m [dakika]");
//VOICE DOCUMENTS

//MESSAGE DOCUMENTS 
let MDB = await MessageStats.findOne({UserID: member.id})
let generalMessage = MDB ? MDB.GeneralStat : 0;
let dailyMessage = MDB ? MDB.DailyStat : 0;
let weekylMessage = MDB ? MDB.WeeklyStat : 0;
//MESSAGE DOCUMENTS

const category = async (parentsArray) => {
const data = await VoiceStats.find({UserID: member.id});
const voiceUserParentData = data.filter((x) => parentsArray.includes(x.ParentID));
let voiceStat = 0;
for (var i = 0; i <= voiceUserParentData.length; i++) {voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].ParentValue : 0;}
return moment.duration(voiceStat).format("H [saat], m [dakika]");};

const filteredParents = message.guild.channels.cache.filter((x) => x.type === "category" && !PH.Public.includes(x.id) && !PH.Register.includes(x.id) && !PH.Problem.includes(x.id) && !PH.Secret.includes(x.id) && !PH.Alone.includes(x.id) && !PH.Games.includes(x.id));

message.channel.send(embed.setDescription(`
${member} | ${member.roles.highest}

**\`❯\` Ses Kategorisinde Aktifliği**
━━━━━━━━━━
Toplam: \`${moment.duration(VDB ? VDB.GeneralStat : 0).format("H [saat], m [dakika]")}\`
Public Odalarda: \`${await category(PH.Public)}\`
Secret Odalarda: \`${await category(PH.Secret)}\`
Alone Odalarda: \`${await category(PH.Alone)}\`

Kayıt Odalarda: \`${await category(PH.Register)}\`
Sorun Çözme: \`${await category(PH.Problem)}\`
Oyun & Eğlence: \`${await category(PH.Games)}\`
Diğer Odalarda: \`${await category(filteredParents.map(x => x.id))}\`
━━━━━━━━━━

**\`❯\` Mesaj Kategorisinde Aktifliği**
━━━━━━━━━━
Toplam Mesaj: \`${generalMessage}\`

${topMessage}
━━━━━━━━━━

**\`❯\` Top 5 Ses Kanalı**
━━━━━━━━━━
${topVoice}
━━━━━━━━━━
`)
.addField(`\n**\`❯\` Günlük Dökümanları:**\n━━━━━━━`, 
`Toplam Ses: \`${dailyVoice}\`
Toplam Mesaj: \`${dailyMessage} mesaj\`
`, true)
.addField(`\n**\`❯\` Haftalık Dökümanları:**\n━━━━━━━`, 
`Toplam Ses: \`${weeklyVoice}\`
Toplam Mesaj: \`${weekylMessage} mesaj\`
`, true)

.setThumbnail(member.user.avatarURL({dynamic: true})))

}




}}