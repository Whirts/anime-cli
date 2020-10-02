const AnimeFunc = require('./anime_func/anime_func.js');
const Cli = require('./cli/cli.js');

const cli = new Cli();
const animePath = 'D:/Videos/';

(async () => {
    cli.inicioCLI();
    let respuesta = await cli.askDireccion();
    // console.log(respuesta);
    let anime_func = new AnimeFunc(animePath);
    // let anime_func = new AnimeFunc(respuesta.animePath);
    let grupos = anime_func.organizarAnime.obtenerGrupos();
    // console.log('Agrupados: \n', grupos);
    cli.mostrarGrupos(grupos);
    //preg si desea mover los animes a las carpetas que se van a crear(o que ya existen)
    //fs.mkdir(path[, options], callback) //crear archivo
    //fs.renameSync(oldPath, newPath) //mueve archivos
})();
