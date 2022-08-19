var https = require('https');
var http = require('http');
var fs = require('fs');
var parser = require('node-html-parser');

const all_links = fs.createWriteStream('All_links.txt');
const all_working_links = fs.createWriteStream('All_working_links.txt');

var file = 'All_links.txt';
var file2 = 'All_working_links.txt';
https.get('https://sites.google.com/view/bdixftpserverlist/media-ftp-servers', function (res) {
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function (chunk) { body += chunk });
    res.on('end', function () {
        var dom = parser.parse(body);
        var links = dom.querySelectorAll('a div p');
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