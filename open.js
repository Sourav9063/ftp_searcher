const open = require('open');

const fs = require('fs');
const readline = require('readline');


var start = process.argv[2];
const endIn = process.argv[3];

async function processLineByLine() {
    const fileStream = fs.createReadStream('All_working_links.txt');

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
        else if (count > endIn) {
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
