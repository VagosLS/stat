const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const MessageDataBase = require('../Models/Message')
const settings = require('../config')

module.exports = async(message) => {

const embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor('RANDOM')

if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
let prefix = settings.Prefix.filter(p => message.content.startsWith(p))[0]; 
if (!prefix) return;
let config = settings;
let args = message.content.split(' ').slice(1);
let command = message.content.split(' ')[0].slice(prefix.length); 
let stg = client.commands.get(command) || client.commands.get(client.aliases.get(command));
if (stg){
stg.stg(client, message, args, config, embed)}

}
module.exports.configuration = {name: "message"}