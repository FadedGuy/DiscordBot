module.exports = {
    name: 'image',
    description: 'Regresa una imagen random de google o sobre un tema si especificado',
    execute(message, args){
        const request = require('request');
        const cheerio = require('cheerio');
        if(args.length == 0){
            args = "random shit";
        }
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + args,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function(error, response, responseBody){
            if(error){
                return;
            }

            $ = cheerio.load(responseBody);
            var links = $(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            if(!urls.length){
                return;
            }
            //console.log(message.author.username + "#" + message.author.discriminator);
            message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
        });
    }
}