module.exports = {
    name: 'join',
    description: 'El bot se une al canal de voz',
    async execute(message, serverQueue, queue){
        if(!message.member.voice.channel) return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        if(!serverQueue){
            const queueConstructor = {
                txtChannel: message.channel,
                vChannel: message.member.voice.channel,
                connection: null,
                songs: [],
                volume: 10,
                playing: true
            };
            queue.set(message.guild.id, queueConstructor);
            try{
                let connection = await message.member.voice.channel.join(); 
                queueConstructor.connection = connection;
            } catch (err){
                console.log(err);
                queue.delete(message.guild.id);
                    return message.channel.send(`No se puede unir al canal de voz ${err}`);
            }
        } else{
            return message.channel.send("Ya estoy conectado");
        }
        //console.log(message.author.username + "#" + message.author.discriminator);
    }
}