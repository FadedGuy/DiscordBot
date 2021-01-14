module.exports = {
    name: 'skip',
    description: 'Salta a la siguiente cancion disponible',
    execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un chat de voz para utilizar este comando");
        }
        if(!serverQueue){
            return message.channel.send("No hay cancion para skipear");
        }
        serverQueue.connection.dispatcher.end();queue.delete(guild.id);
    }
}