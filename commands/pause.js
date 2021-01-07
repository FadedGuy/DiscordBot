module.exports = {
    name: 'pause',
    description: 'Para la reproduccion de la musica',
    execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        }
        if(!serverQueue){
            return message.channel.send("No hay cancion reproduciendose actualmente");
        } else{
            message.channel.send("Se ha pausado la cancion, para reanudar utiliza resume");
            serverQueue.connection.dispatcher.pause();
        }
        
    }
}