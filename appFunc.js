const chalk = require('chalk');
const https = require('https');
const http = require('http');
const fs = require('fs');
const parser = require('node-html-parser');
const open = require('open');
const readline = require('readline');

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
            links.forEach(async function (link) {

                if (!link.textContent.toString().includes('facebook')) {
                    fs.appendFile(all_links, link.textContent + '\n', function (err) {
                        if (err)
                            console.log("Err ocurred");
                    }
                    );

                    await checkLink(link.textContent, all_working_links, all_links);
                }

            }
            );



        });
    });
}

async function checkLink(link, all_working_links, all_links) {
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

async function processLineByLine(folder = 'Media', start = 0, endIn = 0) {
    start = parseInt(start);
    endIn = parseInt(endIn);
    let fileStream;
    try {
        fileStream = fs.createReadStream(folder + '/All_working_links.txt');


        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // console.dir(rl)
        let count = 1;

        for await (const line of rl) {
            if (count >= start && count <= endIn) {

                open(line);
            }
            else if (count > endIn || rl.length == 0) {
                break;
            }
            count++;
        }
    }
    catch (err) {

        console.log("No file found. Indexing links");
        indexLinks(folder);

    }

}


module.exports = { indexLinks, processLineByLine };