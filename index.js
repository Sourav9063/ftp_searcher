const chalk = require('chalk');
const https = require('https');
const http = require('http');
const fs = require('fs');
const parser = require('node-html-parser');
// convert all require to import

// import chalk from 'chalk';
// import https from 'https';
// import http from 'http';
// import fs from 'fs';
// import parser from 'node-html-parser';




if (process.argv.length > 2) {
    if (process.argv[2].toLocaleUpperCase().includes("L")) {
        indexLinks("LiveTV");
    }
    else {
        indexLinks("Media");
    }
}
else {
    indexLinks("Media");
}



async function indexLinks(folder = 'Media') {



    if (!fs.existsSync(folder)) {
        const all_links = fs.mkdir(folder, (err) => {
            if (err) console.log(err);
        });
    }

    const all_links_text = fs.createWriteStream(folder + '/All_links.txt');

    const all_links_working_text = fs.createWriteStream(folder + '/All_working_links.txt');

    var all_links = folder + '/All_links.txt';
    var all_working_links = folder + '/All_working_links.txt';
    https.get(folder.includes("M") ? 'https://sites.google.com/view/bdixftpserverlist/media-ftp-servers' : 'https://sites.google.com/view/bdixftpserverlist/live-tv-servers', function (res) {
        res.setEncoding('utf8');
        var body = '';
        res.on('data', function (chunk) { body += chunk; });
        res.on('end', function () {
            var dom = parser.parse(body);
            var links = dom.querySelectorAll('a div p');
            console.log("processing links");
            console.log(`There are ${links.length} links`);
            links.forEach(function (link) {

                if (!link.textContent.toString().includes('facebook')) {
                    fs.appendFile(all_links, link.textContent + '\n', function (err) {
                        if (err)
                            console.log("Err ocurred");
                    }
                    );

                    checkLink(link.textContent, all_working_links, all_links);
                }

            }
            );



        });
    });
}

function checkLink(link, all_working_links, all_links) {
    var client = http;
    var url = new URL(link);

    client = (url.protocol == "https:") ? https : client;
    const req = client.get(url, function (res) {

        if (res.statusCode == 200) {
            console.log(`${link} ->` + chalk.bgGreenBright.white('working'));
            fs.appendFile(all_working_links, link + '\n', function (err) {
                if (err) console.log(chalk.red("Err ocurred"));
            }
            );
        }
    }
    );
    req.on('error', (e) => {
        console.log(`${link} ->` + chalk.bgRed('not working'));
    }
    )
    req.setTimeout(15000, () => {
        // console.log('timeout')
        console.log(`${link} ->` + chalk.bgYellow('timeout'));
        req.destroy();
    }
    )
}



// var client = http;
//                 var url = new URL(link.textContent);

//                 client = (url.protocol == "https:") ? https : client;
//                 const req = client.get(url, function (res) {

//                     if (res.statusCode == 200) {
//                         console.log(`${link.textContent} working`);
//                         fs.appendFile(all_working_links, link.textContent + '\n', function (err) {
//                             if (err) console.log("Err ocurred");
//                         });
//                     }


//                 }
//                 );
//                 req.on('error', (e) => {
//                     console.log(`${link.textContent} error`);
//                 })


//                 req.setTimeout(15000, () => {
//                     // console.log('timeout')
//                     console.log(`${link.textContent} timeout`);
//                     req.destroy();
//                 })


module.exports = { indexLinks };