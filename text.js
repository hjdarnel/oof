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
        if (err || !value) return;

        gm('./assets/lines.png').resize(value.width).write('./assets/resized_lines.png', (err) => {
            if (err) return;

            gm(textBuffer).append('./assets/resized_lines.png').toBuffer(function (err, val) {
                if (err || !val) return;

                gm(val).command('convert').in('-virtual-pixel',  'none', '-distort', 'Arc', arcDegrees).write('./assets/out.png', (err) => {
                    if (err) return;

                    gm('./assets/out.png').rotate('none', rotationDegrees).write('./assets/out.png', (err) => {
                        if (!err) console.log('Written composite image.');
                        res.end('hello');
                    });
                });
            });
        });
    });
    res.end('hello')
}

export default createImage;