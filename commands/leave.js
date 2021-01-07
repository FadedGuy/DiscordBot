module.exports = {
    name: 'leave',
    description: 'Se sale del canal de voz actual',
    async execute(message, serverQueue){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        await message.channel.send("Saliendo del canal de voz");
    }
}