module.exports = {
    name: 'phrase',
    description: 'This command returns a random quote',
    execute(message, args){
        const http = require("https");

        const options = {
            "method": "GET",
            "hostname": "quotes15.p.rapidapi.com",
            "port": null,
            "path": "/quotes/random/",
            "headers": {
                "x-rapidapi-key": "c01ccaab10msh431830b1b4fced2p18bba7jsne2c6adb50bf6",
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "language_code": "es",
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
                console.log(frase);
                message.channel.send(frase);
            });
        });

        req.end();
    }
}