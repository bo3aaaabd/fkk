const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const fs = require("fs")// npm i fs
const client = new Discord.Client();

////////////////////////
client.on('ready', () => {
    console.log(`~~~~~~~~~~~~~~~~~`);
    console.log(`Logging into Discord`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`on  ${client.guilds.size} Servers `);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame(`%فكك`,"http://twitch.tv/fkk")
    client.user.setStatus("dnd")
 });
 
/////////////////////////////////////////////////







client.on('message', message => {
    if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('%bc')){
if(!message.author.id === '415649344864387072') return;
message.channel.sendMessage('جار ارسال الرسالة |:white_check_mark:')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});


///////////////////////////////

















///////////////////////////////////////////////////////////////
client.on('message', message => {
    if (message.content === "%bot") {
           if(!message.channel.guild) return message.reply('** This command only for servers **');
    let embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .addField("**اسم السيرفر**", message.guild.name)
 .addField("**عدد السيرفرات الي فيها البوت:**" , client.guilds.size)
 .addField("**المستخدمين:**", client.users.size)
 .addField("**قنوات:**", client.channels.size)
message.channel.sendEmbed(embed);
   }
});


//////////////////////////



let points = {}
var prefix = "%";

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
  };
if (message.content.startsWith(prefix + 'فكك')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./fkk/fkk.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لتفكيك الكلمه**').then(msg => {

            
msg.channel.send(`${item.type}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **مبروك لقد كسبت نقطه
لمعرفة نقطاك الرجاء كتابة %نقاطي**`);
        console.log(`[Typing] ${collected.first().author} typed the word.`);
            let userData = points[message.author.id];
            userData.points++;
          })
          .catch(collected => {
            message.channel.send(`:x: **خطأ حاول مرة اخرى**`);
            console.log('[Typing] Error: No one type the word.');
          })
        })
    })
}
});
client.on('message', message => {
if (message.content.startsWith(prefix + 'نقاطي')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
    let userData = points[message.author.id];
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor('#000000')
    .setDescription(`نقاطك: \`${userData.points}\``)
    message.channel.sendEmbed(embed)
  }

  
});




client.login(process.env.BOT_TOKEN);
