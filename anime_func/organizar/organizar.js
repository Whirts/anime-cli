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
    'Capítulo',
    ''
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
        archivos = _.filter(archivos, obj => {
            return (obj.isFile() && _.includes(extensiones, path.extname(obj.name)));
        });//filtro los ficheros que tengan las extensiones del array
        archivos = _.map(archivos, obj => {
            return path.parse(path.join(this.pathAnimes, obj.name));
        });
        // console.log('Los ficheros:\n', archivos);
        return archivos;
    }
    //recive el nombre del fichero sin extension y lo devuelve estandarizado
    agrupar(val) {
        let newVal = val;
        newVal = _.replace(newVal, /\[[A-Z0-9.-_,\s]*\]/i, '');//quita lo que este entre []
        newVal = _.replace(newVal, /\([A-Z0-9.-_,\s]*\)/i, '');//quita lo que este entre ()
        newVal = _.replace(newVal, /-/g, ' ');
        newVal = _.replace(newVal, /\./g, ' ');
        newVal = _.replace(newVal, /`/g, ' ');

        let arrWords = _.split(newVal, ' ');
        arrWords = _.filter(arrWords, word => {
            //1 prueba que sea un numero de hasta 4 digitos
            //2 prueba que sea de este formato 1x2000
            //3 si word esta en el arreglo contiene
            return !(/\b\d{1,4}\b/.test(word) || /[0-9][x]\d{1,4}/.test(word) || _.includes(contiene, word));
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

        let animesAgrupados = _.groupBy(archivos, (obj) => {
            // return this.agrupar(obj.name);
            return obj.ext;
        });
        return animesAgrupados;
    }

    crearCarpetasYMoverAnimes() {
        // console.log('Iteracion:');
        // _.forIn(animesAgrupados, (value, key, obj) => {
        //     console.log(key);
        // });
        // console.log('Finn');
    }
}

module.exports = OrganizarAnime;
