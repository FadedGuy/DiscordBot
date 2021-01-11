//async convert_audio()
//

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';

const queue = new Map();
let witAPIKEY = process.env.witKEY;

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

    const serverQueue = queue.get(message.guild.id);

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'wiki':
            client.commands.get('wiki').execute(message, args);
            break;
        case 'frase':
            client.commands.get('frase').execute(message, args);
            break;
        case 'help':
            client.commands.get('help').execute(message, args, client.commands);
            break;
        case 'image':
            client.commands.get('image').execute(message, args);
            break;
        case 'play':
            client.commands.get('play').execute(message, args, serverQueue, queue);
            break;
        case 'queue':
            client.commands.get('queue').execute(message, serverQueue);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, serverQueue);
            break;
        case 'resume':
            client.commands.get('resume').execute(message, serverQueue);
            break;
        case 'pause':
            client.commands.get('pause').execute(message, serverQueue);
            break;
        case 'leave':
            client.commands.get('leave').execute(message, serverQueue);
            break;
        default:
            message.channel.send("```\nComando no encontrado, prueba -help para ver la lista de comandos disponibles y que es lo que hacen```");
            break;
    }
});

client.login(process.env.token);
//client.login('NzkwOTkwNDQ5MTc1Mjk4MTA4.X-IpQg.yN_9IxYQEcJ3S3S54gSZLrtX3Yo')
