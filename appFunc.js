const chalk = require('chalk');
const https = require('https');
const http = require('http');
const fs = require('fs');
const parser = require('node-html-parser');
const open = require('open');
const readline = require('readline');

async function indexLinks(folder = 'Media', loop, callback) {

    checked_links = 0;


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


            total_links = links.length;
            links.forEach((link) => {
                if (link.textContent.toString().includes('facebook')) {
                    total_links--;
                }
            });
            console.log(`There are ${total_links} links`);

            links.forEach(async function (link) {

                if (!link.textContent.toString().includes('facebook')) {
                    fs.appendFile(all_links, link.textContent + '\n', function (err) {
                        if (err)
                            console.log("Err ocurred");
                    }
                    );

                    await checkLink(link.textContent, all_working_links, all_links, loop, callback);

                }


            }
            );




        });
    });
}
let checked_links = 0;
let total_links = 0;
async function checkLink(link, all_working_links, all_links, loop = 1, callback = () => { }) {
    var client = http;
    var url = new URL(link);
    // console.log(length);
    let status = chalk.bgBlueBright.black('Checking');

    client = (url.protocol == "https:") ? https : client;
    const req = client.get(url, function (res) {

        if (res.statusCode == 200) {
            status = chalk.bgGreenBright.black('Working');
            fs.appendFile(all_working_links, link + '\n', function (err) {
                if (err) {
                    status = chalk.bgRedBright.black('Error');
                }



            }
            );

        }
        else if (res.statusCode > 400 && res.statusCode < 500) {
            status = chalk.bgRedBright.black('Not Found');
        }
        else if (res.statusCode > 500) {
            status = chalk.bgRedBright.black('Server Error');
        }
        else {
            status = chalk.bgYellowBright.black('Unknown');
        }


    }
    );
    req.on('error', (e) => {
        status = chalk.bgRedBright.black('not working');


    }
    );

    req.setTimeout(15000, () => {
        // console.log('timeout')
        status = chalk.bgYellow('timeout');
        req.destroy();


    }

    )

    req.on('close', () => {
        checked_links++;
        console.log(chalk.white(`Checking ${checked_links} of ${total_links} links.`));
        console.log(`${link} ` + status);
        if (checked_links == total_links) {
            console.log("All links checked");
            callback(loop);

        }
    });
}

async function processLineByLine(folder = 'Media', start = 0, endIn = 0, loop, callback) {
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

                await open(line);
            }
            else if (count > endIn || rl.length == 0) {
                break;
            }
            count++;
        }
        callback(loop);
    }
    catch (err) {

        console.log("No file found. Indexing links");
        indexLinks(folder, loop, callback);

    }


}


module.exports = { indexLinks, processLineByLine };