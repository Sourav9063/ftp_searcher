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
app(1);



function app(loop) {


    const command = prompt(chalk.green("Enter Command: (Index/Open/EXIT)"));
    if (command.toLocaleUpperCase().includes("INDEX")) {
        const folder = prompt(chalk.blue("Enter Type: (Media/LiveTV)"));
        console.log(folder);

        if (folder.toLocaleUpperCase().includes("L")) {
            indexLinks("LiveTV", loop, app);
        }
        else if (folder.toLocaleUpperCase().includes("M")) {
            console.log("Indexing Media");
            indexLinks("Media", loop, app);
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

            processLineByLine("LiveTV", start, endIn, loop, app);
        }
        else if (folder.toLocaleUpperCase().includes("M")) {
            const start = prompt(chalk.green("Enter Start: "));
            const endIn = prompt(chalk.green("Enter End: "));
            processLineByLine("Media", start, endIn, loop, app);
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
        app(loop);
    }
    return 'again'

}

