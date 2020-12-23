module.exports = {
    name: 'ping',
    description: 'This is a ping command to the bot',
    execute(message, args){
        message.channel.send('Poggers!');
    }
}