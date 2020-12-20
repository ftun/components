var fs = require('fs'),
    resolve = require('path').resolve,
    join = require('path').join,
    path = require('path')
;

// get library path
var lib = resolve(__dirname, '../packages/'),
    ext = 'md',
    pathBase = __dirname + '/../docmd',
    indexMD = pathBase + '/index.md'
;

fs.mkdir(pathBase, { recursive: true }, (err) => {
    if (err) throw err;
    fs.appendFile(indexMD, '', (err) => {
        if (err) throw err;
        console.info('Valid Path');
    });
    fs.writeFile(indexMD, '# Componentes V3\n', (err) => {
        if (err) throw err;
        console.info('Reset Content');
    });

    fs.readdirSync(lib)
        .forEach(function (mod) {
            var modPath = join(lib, mod);
            var files = fs.readdirSync(modPath);
            var result = [];

            files.forEach(function (file) {
                var newbase = path.join(modPath, file);
                if (file.substr(-1*(ext.length+1)) == '.' + ext && !fs.statSync(newbase).isDirectory()) {
                    if (fs.existsSync(join(newbase))) {
                        var origen = newbase;
                        var destino = __dirname + '/../docmd/' + mod + '.md';
                        fs.copyFile(origen, destino, (err) => {
                            if (err) {
                                console.error(err);
                                throw err;
                            }

                            var contentIndexMD = "\n- [" + mod + "](./" + mod + ".md)";
                            fs.appendFile(indexMD, contentIndexMD, (err) => {
                                if (err) throw err;
                                console.info('Generated Document for ' + origen);
                            });
                        });
                    }
                }
            });
        });
});
