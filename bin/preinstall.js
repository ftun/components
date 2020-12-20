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
    if (!fs.existsSync(join(modPath, 'package.json'))) return;

    // fs.createReadStream('../.npmrc').pipe(fs.createWriteStream(modPath + '/.npmrc'));
    fs.copyFile(__dirname + '/../.npmrc', modPath +'/.npmrc', (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.info('.npmrc was copied to ' + modPath);
    });

    // install folder
    cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
  })
