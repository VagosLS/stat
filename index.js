const {Discord, MessageEmbed, Collection, Client} = require('discord.js')
const client = global.client = new Client({fetchAllMembers: true});
const mongoose = require('mongoose')
const fs = require('fs')
const settings = require('./config')

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./Commands', (err, files) => { 
console.log(`❯ "${files.length}" Files Loading Command 💚`);   
files.forEach(fs => {  
let command = require(`./Commands/${fs}`); 
client.commands.set(command.conf.name, command);
console.log(`❯ Command Loaded "${command.conf.name}" 💚.`);
if(command.conf.aliases) command.conf.aliases.forEach(Aliases => client.aliases.set(Aliases, command.conf.name));
})});


fs.readdir("./Events", (err, files) => {
if(err) return console.error(err);
files.filter(STGEvents => STGEvents.endsWith(".js")).forEach(STGEvents => {
let STGEventLoad = require(`./Events/${STGEvents}`);
if(!STGEventLoad.configuration) return console.log(`❯ "${STGEvents}" Loading Event 💜`)
client.on(STGEventLoad.configuration.name, STGEventLoad)})});

mongoose.connect(settings.URL, {useNewUrlParser: true, useUnifiedTopology: true})
client.login(settings.Token).then(function(){console.log('BOT ACTIVATED ❤️')}, function(err){console.log('BOT TOKEN INVALID 💔')})





