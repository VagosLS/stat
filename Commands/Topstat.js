const { Discord, MessageEmbed } = require('discord.js')
const VoiceStats = require('../Models/Voice')
const MessageStats = require('../Models/Message')
const PH = require('../Parents.json')
const moment = require('moment');
 require('moment-duration-format')
moment.locale('tr')
module.exports = {
conf: {name: 'top-stat', aliases: ["topstat"], help: "!stat"},
stg: async(client, message, args, config, embed) => {

if(!message.member.roles.cache.get(config.TagRole) && !message.member.hasPermission('ADMINISTRATOR')) return    

let VStat = await VoiceStats.find({GuildID: message.guild.id}).sort({ GeneralStat: -1 });
let MStat = await MessageStats.find({GuildID: message.guild.id}).sort({ GeneralStat: -1 });

let WVStat = await VoiceStats.find({GuildID: message.guild.id}).sort({ WeeklyStat: -1 });
let WMStat = await MessageStats.find({GuildID: message.guild.id}).sort({ WeeklyStat: -1 });

let vnumb = 1; let mnumb = 1;
let VoiceUsers = VStat.splice(0, 5).map(x => `${vnumb++}. <@${x.UserID}> | \`${moment.duration(x.GeneralStat).format("H [saat], m [dakika]")}\``).join(`\n`);
let MessageUsers = MStat.splice(0, 5).map(x => `${mnumb++}. <@${x.UserID}> | \`${x.GeneralStat} mesaj\``).join(`\n`);

let WeeklyVoice = WVStat.splice(0, 5).map((x, z) => `${z+1} <@${x.UserID}> | \`${moment.duration(x.WeeklyStat).format("H [saat], m [dakika]")}\``).join(`\n`);
let WeeklyMessage = WMStat.splice(0, 5).map((x, z) => `${z+1} <@${x.UserID}> | \`${x.WeeklyStat} mesaj\``).join(`\n`);


message.channel.send(embed.setDescription(`
${message.guild.name} sunucusunun istatisliksel liderlik tablosu.

\`❯\` **TOP 5 SES** 
━━━━━━━━━━
${VoiceUsers}

\`❯\` **TOP 5 MESAJ** 
━━━━━━━━━━
${MessageUsers}

\`❯\` **TOP 5 __HAFTALIK__ SES** 
━━━━━━━━━━
${WeeklyVoice}

\`❯\` **TOP 5 __HAFTALIK__ MESAJ** 
━━━━━━━━━━
${WeeklyMessage}

`).setThumbnail(message.guild.iconURL({dyanmic:true})))

}}