module.exports = {
    name: 'ping',
    description: 'Comprueba que el bot esta activo',
    execute(message, args){
        message.channel.send('Wassup!');
        console.log(message.author);
    }
}