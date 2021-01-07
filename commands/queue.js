module.exports = {
    name: 'queue',
    description: 'Muestra las canciones en cola de reproduccion',
    async execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        }
        if(serverQueue.songs.length >= 1){
            return message.channel.send("Canciones en cola: ");
        } else{
            return message.channel.send("No hay ninguna cancion en cola");
        }
        
    }
}