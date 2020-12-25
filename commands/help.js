module.exports = {
    name: 'help',
    description: 'Lista de comandos disponibles de Lil Peep',
    execute(message, args){
        msg = "```\n";
        msg += "### Comandos disponibles!\n";

        message.channel.send(msg);
    }
}