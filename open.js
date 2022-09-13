const open = require('open');

const fs = require('fs');
const readline = require('readline');

// import open from 'open';
// import fs from 'fs';
// import readline from 'readline';

let folder = "Media"
if (process.argv.length > 2) {
    if (process.argv[2].toLocaleUpperCase().includes("L")) {
        folder = "LiveTV"
    }
}


var start = process.argv[3];
const endIn = process.argv[4];

async function processLineByLine(folder = 'Media', start = 0, endIn = 0) {
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

        console.log("No file found. Index first");
        return;
    }

}

if (start && endIn && start <= endIn) {
    processLineByLine(folder, start, endIn);
}
else {
    console.log("Please enter valid start and end number");
}

module.exports = { processLineByLine };