const AnimeFunc = require('./anime_func/anime_func.js');

// const animePath = process.cwd();
const animePath = 'D:/Videos/';
let anime_func = new AnimeFunc(animePath);

anime_func.organizarAnime.obtenerGrupos();
