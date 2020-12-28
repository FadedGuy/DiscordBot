const { fileURLToPath } = require("url");

module.exports = {
    name: 'wiki',
    description: 'Regresa una imagen random de wikihow o pasos si especificas (steps)',
    execute(message, args){
        if(args.length > 0){
            if(args[0] == "steps"){
                const http = require("https");

                const options = {
                    "method": "GET",
                    "hostname": "hargrimm-wikihow-v1.p.rapidapi.com",
                    "port": null,
                    "path": "/steps?count=3",
                    "headers": {
                        "x-rapidapi-key": "3961db7fd0mshd712ed2f0314f33p1cfcd6jsn2c102bbc88b0",
                        "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
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
                        let msg = "";
                        for(var i = 1; i <= 3; i++){
                            msg += (i + ".- " + jsonComplete[i] + "\n");
                        }
                        console.log(msg + "\n" + message.author.username + "#" + message.author.discriminator);
                        message.channel.send(msg);
                    });
                });

                req.end();
            } else{
                message.channel.send("```Comando wiki no encontrado```")
            }
        }else{
            const http = require("https");

            const options = {
                "method": "GET",
                "hostname": "hargrimm-wikihow-v1.p.rapidapi.com",
                "port": null,
                "path": "/images?count=3",
                "headers": {
                    "x-rapidapi-key": "3961db7fd0mshd712ed2f0314f33p1cfcd6jsn2c102bbc88b0",
                    "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
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
                    let num = Math.floor(Math.random() * 3) + 1;
                    console.log(jsonComplete[num] + "\n" + message.author.username + "#" + message.author.discriminator);
                    message.channel.send(jsonComplete[num]);
                });
            });

            req.end();
        }
    }
}