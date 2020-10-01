const fs = require('fs');
const path = require('path');
const similarity = require('string-similarity');
const _ = require('lodash');
//estensiones que tengo que buscar en el directorio
const extensiones = [
    '.mp4',
    '.mpg',
    '.mpeg',
    '.flv',
    '.webm',
    '.mkv',
    '.rmvb',
    '.avi'
];
//palabras a filtrar para obtener el nombre correcto de la carpeta que se va a crear
const contiene = [
    'episode',
    'ova',
    'sub',
    'esp',
    'episodio',
    'tv',
    'Capítulo'
];

class OrganizarAnime {
    constructor(pathAnimes) {
        this.pathAnimes = pathAnimes;
    }

    obtenerArrFicheros() {
        let opt = {
            encoding: 'utf8',
            withFileTypes: true,
        };
        let archivos = fs.readdirSync(this.pathAnimes, opt);
        archivos = _.filter(archivos, obj => obj.isFile());//filtro los ficheros
        archivos = _.map(archivos, obj => {
            return path.parse(path.join(this.pathAnimes, obj.name));
        });
        console.log('Los ficheros:\n', archivos);
        return archivos;
    }
    //recive el nombre del fichero sin extension y lo devuelve estandarizado
    agrupar(val) {
        let newVal = val;
        newVal = _.replace(newVal, /\[[A-Z0-9.-_,\s]*\]/i, '');//quita lo que este entre []
        newVal = _.replace(newVal, /\([A-Z0-9.-_,\s]*\)/i, '');//quita lo que este entre ()
        newVal = _.replace(newVal, '-', ' ');
        newVal = _.replace(newVal, '.', ' ');
        newVal = _.replace(newVal, '`', ' ');

        let arrWords = _.split(newVal, ' ');
        arrWords = _.filter(arrWords, word => {
            //1 prueba que sea un numero de hasta 4 digitos
            //2 prueba que sea de este formato 1x2000
            //3 si es vacio
            return !(/\b\d{1,4}\b/.test(word) || /[0-9][x]\d{1,4}/.test(word) || !word);
        });

        if (arrWords.length >= 1) {
            arrWords = _.map(arrWords, word => _.capitalize(word));
            return _.join(arrWords, ' ');
        } else {
            return 'Sin clasificacion';
        }
    }
    //funcion que devuelve un array de objetos que dentro tiene los datos
    //de la carpeta a crear con los mangas a mover
    obtenerGrupos() {
        let archivos = this.obtenerArrFicheros();

        let test = _.groupBy(archivos, (obj) => {
            return this.agrupar(obj.name);
        });
        console.log('Agrupados: \n', test);
        // console.log(path.join(this.pathAnimes, archivos[0].name));

    }
}

module.exports = OrganizarAnime;
