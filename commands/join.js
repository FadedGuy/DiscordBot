module.exports = {
    name: 'join',
    description: 'Joins the voice channel',
    async execute(message, serverQueue, queue){
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('Tienes que estar en un canal de voz para usar este comando');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No tienes los permisos necesarios');
        if (!permissions.has('SPEAK')) return message.channel.send('No tienes los permisos necesarios');

        if(!serverQueue){
            const queueConstructor = {
                txtChannel: message.channel,
                vChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 10,
                playing: true
            };
            queue.set(message.guild.id, queueConstructor);

            try{
                let connection = await voiceChannel.join();
                queueConstructor.connection = connection;
                const dispatcher = connection;
            } catch (err){
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(`No se puede unir al canal de voz ${err}`);
            }
        }
    } 
}  