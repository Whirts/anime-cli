const OrganizarAnime = require('./organizar/organizar.js');

class AnimeFunc {
    constructor(pathAnimes) {
        this.organizarAnime = new OrganizarAnime(pathAnimes);
    }
}

module.exports = AnimeFunc;
