const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args, serverQueue, queue){
        function play(guild, song){
            const serverQueue = queue.get(guild.id);
            if(!song){
                serverQueue.vChannel.leave();
                queue.delete(guild.id);
                return message.channel.send("No hay cancion en cola, saliendo del chat de voz");;
            }

            message.channel.send(`Reproduciendo actualmente <${song.title}>`);
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url))
                .on('finish', () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
        }

        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('Tienes que estar en un canal de voz para usar este comando');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('No tienes los permisos necesarios');
        if (!permissions.has('SPEAK')) return message.channel.send('No tienes los permisos necesarios');
        if (!args.length) return message.channel.send('Debes de agregar una url o algo mas');
        
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }
 
        const video = await videoFinder(args.join(' '));

        if(video){
            let song = {
                title: video.title,
                url: video.url
            };
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
                queueConstructor.songs.push(song);

                try{
                    let connection = await voiceChannel.join(); 
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                } catch (err){
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`No se puede unir al canal de voz ${err}`);
                }
            } else{
                serverQueue.songs.push(song);
                return message.channel.send(`La cancion <${song.title}> ha sido añadida`);
            }
        }
    } 
}  