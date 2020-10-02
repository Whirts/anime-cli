const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Table = require('cli-table3');

class Cli {
    constructor() {
        clear();
    }

    inicioCLI() {
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

    askDireccion() {
        let question = [
            {
                name: 'animePath',
                type: 'input',
                message: 'Entre la direccion de la carpeta donde desea agrupar',
                default: process.cwd(),
                validate: function (value) {
                    var a = path.parse(value);
                    if (!a.dir) {
                        return 'Entre una direccion correcta.';
                    }
                    if (fs.existsSync(path.format(a))) {
                        return true;
                    } else {
                        return 'Entre una direccion que exista.';
                    }
                },
                filter: function (value) {
                    return path.normalize(value);
                }
            }
        ];
        return inquirer.prompt(question);
    }

    mostrarGrupos(animesAgrupados) {
        console.log(
            chalk.bold.cyan('GRUPOS A CREAR:')
        );
        _.forIn(animesAgrupados, (value, key, obj) => {
            let table = new Table({
                head:[`Grupo: ${key}`],
                colWidths: [100],
                wordWrap:true
            });
            _.forIn(value, (anime, k, o) => {
                table.push([anime.base]);
            });

            console.log(table.toString());
        });

    }


}

module.exports = Cli;
