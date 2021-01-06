module.exports = {
    name: 'leave',
    description: 'Se sale del canal de voz actual',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send("Tienes que estar en un canal de voz para usar este comando");
        await voiceChannel.leave();
        await message.channel.send("Saliendo del canal de voz");
    }
}