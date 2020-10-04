const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectory: () => {
    return path.normalize(process.cwd());
  },

  directoryExists: (filePath) => {
      try {
          fs.accessSync(filePath);
          return true;
      } catch (e) {
          if (e.code === 'ENOENT') {
              return false;
          } else {
              console.log(e);
              process.exit();
          }
      }
  },

  readDirectory: (dirPath) => {
      let opt = {
          encoding: 'utf8',
          withFileTypes: true,
      };
      return fs.readdirSync(dirPath, opt);
  },

  mkDirectory: (dirPath) => {
      fs.mkdirSync(dirPath);
  },

  mvFile: (oldPath, newPath) => {
      fs.renameSync(oldPath, newPath);
  }

};
