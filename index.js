var https = require('https');
var http = require('http');
var fs = require('fs');
var parser = require('node-html-parser');

let folder = "Media"
if (process.argv.length > 2) {
    if (process.argv[2].toLocaleUpperCase().includes("L")) {
        folder = "LiveTV"
    }
}

const all_links = fs.mkdir(folder, (err) => {
    if (err) console.log(err);
});


var file = folder + '/All_links.txt';
var file2 = folder + '/All_working_links.txt';
https.get(folder.includes("M") ? 'https://sites.google.com/view/bdixftpserverlist/media-ftp-servers' : 'https://sites.google.com/view/bdixftpserverlist/live-tv-servers', function (res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function (chunk) { body += chunk });
    res.on('end', function () {
        var dom = parser.parse(body);
        var links = dom.querySelectorAll('a div p');
        console.log("processing links");
        console.log(`There are ${links.length} links`);
        links.forEach(function (link) {
            // if (!link.textContent.toString().includes('facebook')) {
            //     fs.appendFile(file, link.textContent + '\n', function (err) {
            //         if (err) console.log("Err ocurred");

            //     });
            // }
            if (!link.textContent.toString().includes('facebook')) {
                fs.appendFile(file, link.textContent + '\n', function (err) {
                    if (err) console.log("Err ocurred");
                }
                );

                var client = http;
                var url = new URL(link.textContent);

                client = (url.protocol == "https:") ? https : client;
                client.get(url, function (res) {
                    // console.log(link.textContent);
                    // console.log(res.statusCode);
                    if (res.statusCode == 200) {
                        fs.appendFile(file2, link.textContent + '\n', function (err) {
                            if (err) console.log("Err ocurred");
                        });
                    }

                }
                ).on('error', function (e) {
                    // console.log("Got error: " + e.message);
                }

                );
            }
        }
        );



    });
});
console.log("done");