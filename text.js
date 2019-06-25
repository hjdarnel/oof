const fs = require('fs');
const text2png = require('text2png');
const gm = require('gm').subClass({ imageMagick: true });;

const opts = {
    color: 'rgb(187, 26, 52)',
    font: '50px Hiruko',
    localFontPath: './fonts/HirukoPro-Regular.otf',
    localFontName: 'Hiruko'
};

const rotationDegrees = -7;
const arcDegrees = '20';

const createImage = (text = 'yeet', res) => {
    const textBuffer = text2png(text, opts);

    gm(textBuffer).size((err, value) => {
        if (err || !value) {
            res.writeHead(404);
            return res.end("File not found.");
        }

        gm('./assets/lines.png').resize(value.width).write('/tmp/resized_lines.png', (err) => {
            if (err) {
                res.writeHead(404);
                return res.end("File not found.");
            }

            gm(textBuffer).append('/tmp/resized_lines.png').toBuffer(function (err, val) {
                if (err || !val) {
                    res.writeHead(404);
                    return res.end("File not found.");
                }

                gm(val).command('convert').in('-virtual-pixel',  'none', '-distort', 'Arc', arcDegrees).write('/tmp/out.png', (err) => {
                    if (err) {
                        res.writeHead(404);
                        return res.end("File not found.");
                    }

                    gm('/tmp/out.png').rotate('none', rotationDegrees).toBuffer((err, value) => {
                        if (!err) console.log('Written composite image.');
                        fs.unlink('/tmp/out.png', () => {});
                        fs.unlink('/tmp/resized_lines.png', () => {});
                        res.setHeader('Content-Type', 'image/png');
                        res.end(value);
                    });
                });
            });
        });
    });
}

module.exports = createImage;