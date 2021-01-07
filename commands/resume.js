module.exports = {
    name: 'resume',
    description: 'Sigue reproduciendo la musica',
    async execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        }
        if(!serverQueue){
            return message.channel.send("No hay cancion reproduciendose actualmente");
        } else{
            message.channel.send("Se ha resumido la cancion");
            serverQueue.connection.dispatcher.resume();
        }
        
    }
}