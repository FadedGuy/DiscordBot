module.exports = {
    name: 'help',
    description: 'Lista de comandos disponibles de Lil Peep',
    execute(message, args, commandsList){
        msg = "::: info\nLista de ==comandos== disponibles\n";
        commands = JSON.parse(commandsList[1])
        for(let comd of commands){
            console.log(comd);
        }

        msg += "\n:::";
        message.channel.send(msg);
    }
}