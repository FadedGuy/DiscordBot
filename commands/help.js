module.exports = {
    name: 'help',
    description: 'Lista de comandos disponibles de Lil Peep',
    execute(message, args){
        msg = "::: info\nLista de ==comandos== disponibles\n";

        for(let comd of client.commands){
            console.log(comd);
        }

        msg += "\n:::";
        message.channel.send(msg);
    }
}