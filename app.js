const { indexLinks, processLineByLine } = require('./appFunc.js');
const chalk = require('chalk');
const prompt = require('prompt-sync')({
    // history: require('prompt-sync-history')(),
    // autocomplete: complete(['Index', 'Open', 'Media', 'LiveTV', '1', '5']),

    sigint: true
});;

// indexLinks();
// processLineByLine('Media', 1, 5);

// runApp();
// async function runApp() {

//     let again = 'again';
//     while (again === 'again') {
//         again = await app();
//     }

// };
app();



async function app() {


    const command = prompt(chalk.green("Enter Command: (Index/Open)"));
    if (command.toLocaleUpperCase().includes("INDEX")) {
        const folder = prompt(chalk.blue("Enter Type: (Media/LiveTV)"));
        console.log(folder);

        if (folder.toLocaleUpperCase().includes("L")) {
            await indexLinks("LiveTV");
        }
        else if (folder.toLocaleUpperCase().includes("M")) {
            console.log("Indexing Media");
            await indexLinks("Media");
        }
        else {
            console.log("Invalid Type");
        }
    }
    else if (command.toLocaleUpperCase().includes("OPEN")) {
        const folder = prompt(chalk.blue("Enter Type: (Media/LiveTV)"));
        if (folder.toLocaleUpperCase().includes("L")) {
            const start = prompt(chalk.green("Enter Start: "));
            const endIn = prompt(chalk.green("Enter End: "));

            await processLineByLine("LiveTV", start, endIn);
        }
        else if (folder.toLocaleUpperCase().includes("M")) {
            const start = prompt(chalk.green("Enter Start: "));
            const endIn = prompt(chalk.green("Enter End: "));
            await processLineByLine("Media", start, endIn);
        }
        else {
            console.log("Invalid Type");
        }
    }
    else if (command.toLocaleUpperCase().includes("EXIT")) {
        return 'exit';
        process.exit();
    }
    else {
        console.log("Invalid Command");
    }
    return 'again'

}

