module.exports = {
    name: 'queue',
    description: 'Muestra las canciones en cola de reproduccion',
    execute(message, serverQueue){
        if(!message.member.voice.channel){
            return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        }
        try{
            if(serverQueue.songs.length > 0){
                let msg = "```css\n[Canciones en cola]\n";
                for(let song of serverQueue.songs){
                    msg += (".-->" + song.title + "\n");
                }
                msg += "```";
                return message.channel.send(msg);
            }
        } catch(err){
            return message.channel.send("No hay ninguna cancion en cola");
        }
    }
}