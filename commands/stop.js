module.exports = {
    name: 'stop',
    description: 'Para la reproduccion de la musica',
    async execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        }
        if(!serverQueue){
            return message.channel.send("No hay cancion reproduciendose actualmente");
        } else{
            serverQueue.connection.dispatcher.pause();
        }
        
    }
}