#!/usr/bin/env node
const chalk = require('chalk');
const AnimeFunc = require('./anime_func/anime_func.js');
const Cli = require('./cli/cli.js');
// const Clui = require('clui');
// const Spinner = Clui.Spinner;

const cli = new Cli();

(async () => {
    cli.inicioCLI();
    let askDir = await cli.askDireccion();
    let anime_func = new AnimeFunc(askDir.animePath);
    let grupos = anime_func.organizarAnime.obtenerGrupos();
    if (Object.keys(grupos).length == 0) {
        console.log(
            chalk.bold.cyan('No hay archivos con las extensiones definidas en la carpeta seleccionada.')
        );
        cli.salidaCLI();
    }
    cli.mostrarGrupos(grupos);
    //preg si desea mover los animes a las carpetas que se van a crear(o que ya existen)
    let askMov = await cli.askMovimiento();
    if (askMov.mover) {
        // let status = new Spinner('Creando carpetas y moviendo animes...');
        // status.start();
        anime_func.organizarAnime.crearCarpetasYMoverAnimes();
        // status.stop();
        console.log(
            chalk.bold.cyan('Se crearon los grupos satifactoriamente.')
        );
    }
    cli.salidaCLI();
})();
