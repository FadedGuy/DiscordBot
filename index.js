const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Stars is online!');
})

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command == 'wiki'){
        client.commands.get('wiki').execute(message, args);
    } else if(command == 'frase'){
        client.commands.get('frase').execute(message, args);
    } else if(command == 'help'){
        client.commands.get('help').execute(message, args, client.commands);
    } else if(command == 'image'){
        client.commands.get('image').execute(message, args);
    } else if(command == 'play'){
        client.commands.get('play').execute(message, args);
    } else if(command == 'leave'){
        client.commands.get('leave').execute(message, args);
    } else{
        message.channel.send("```\nComando no encontrado, prueba -help para ver la lista de comandos disponibles y que es lo que hacen```")
    }
});

client.login(process.env.token);
//client.login('NzkwOTkwNDQ5MTc1Mjk4MTA4.X-IpQg.yN_9IxYQEcJ3S3S54gSZLrtX3Yo')
