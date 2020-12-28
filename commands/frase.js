module.exports = {
    name: 'frase',
    description: 'Da una frase aleatoria en el idioma especificado (es, fr, ru, en), si no se especifica se da en ingles',
    execute(message, args){
        const http = require("https");

        let pathReq = "/quotes/random/";
        let langValid = ["en", "es", "pt", "it", "de", "fr", "cs", "sk", "pl", "hu", "ru"];

        if(args.length > 0){
            for(let lang of langValid){
                if(lang == args[0]){
                    pathReq += ("?language_code=" + args[0]);
                }
            }
        }

        const options = {
            "method": "GET",
            "hostname": "quotes15.p.rapidapi.com",
            "port": null,
            "path": pathReq,
            "headers": {
                "x-rapidapi-key": "c01ccaab10msh431830b1b4fced2p18bba7jsne2c6adb50bf6",
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "useQueryString": true
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                let jsonComplete = JSON.parse(body);
                let frase = '"' + jsonComplete.content + '"\n\t - ' + jsonComplete.originator.name;
                console.log(frase + "\n" + message.author.username + "#" + message.author.discriminator);
                message.channel.send(frase);
            });
        });

        req.end();
    }
}