module.exports = {
    name: 'help',
    description: 'Lista de comandos disponibles de Lil Peep',
    execute(message, args, commandsList){
        msg = "```css\n[Lista de comandos disponibles.]\n";

        for(let comd of commandsList){
            if(comd[1].name != "help"){
                msg += ("." + comd[1].name + ": " + comd[1].description + "\n");
            }
        }

        msg += "\n```";
        console.log(message.author.username + "#" + message.author.discriminator);
        message.channel.send(msg);
    }
}