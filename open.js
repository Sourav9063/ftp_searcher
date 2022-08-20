const open = require('open');

const fs = require('fs');
const readline = require('readline');

let folder = "Media"
if (process.argv.length > 2) {
    if (process.argv[2].toLocaleUpperCase().includes("L")) {
        folder = "LiveTV"
    }
}


var start = process.argv[3];
const endIn = process.argv[4];

async function processLineByLine() {
    const fileStream = fs.createReadStream(folder + '/All_working_links.txt');

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

if (start && endIn && start <= endIn) {
    processLineByLine();
}
else {
    console.log("Please enter valid start and end number");
}
