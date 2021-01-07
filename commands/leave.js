module.exports = {
    name: 'leave',
    description: 'Se sale del canal de voz actual',
    async execute(message, serverQueue){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        if(serverQueue.connection != null) return message.channel.send("Tienes que estar adentro para poder salir, duh");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        await message.channel.send("Saliendo del canal de voz");
    }
}