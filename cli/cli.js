const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

class Cli {
    constructor() {
        clear();
        console.log(
            chalk.bold.whiteBright(
                figlet.textSync('ANIME-CLI', {
                    font: 'ANSI Shadow',
                    horizontalLayout: 'full',
                    verticalLayout: 'default'
                })
            )
        );
    }
}

module.exports = Cli;
