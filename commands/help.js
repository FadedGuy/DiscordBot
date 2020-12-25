module.exports = {
    name: 'help',
    description: 'Lista de comandos disponibles de Lil Peep',
    execute(message, args, commandsList){
        msg = "::: info\nLista de ==comandos== disponibles\n";

        for(let comd of commandsList){
            console.log(comd[1]);
        }

        msg += "\n:::";
        message.channel.send(msg);
    }
}