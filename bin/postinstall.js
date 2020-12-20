var fs = require('fs')
var resolve = require('path').resolve
var join = require('path').join
var cp = require('child_process')

// get library path
var lib = resolve(__dirname, '../packages/')

fs.readdirSync(lib)
  .forEach(function (mod) {
    var modPath = join(lib, mod)

    // ensure path has package.json
    if (!fs.existsSync(join(modPath, '/.npmrc'))) return;


    fs.unlink(modPath +'/.npmrc', (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.info('was deleted ' + modPath + '/.npmrc');
    });
  })
