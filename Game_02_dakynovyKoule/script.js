import { Sprite } from '../Monkey-Engine/Sprite.js';
import { SpriteAnim } from '../Monkey-Engine/SpriteAnim.js';
import { pointInPolygon, Tetragon } from '../Monkey-Engine/Tetragon.js';
import { Rectangle } from '../Monkey-Engine/Rectangle.js';


window.addEventListener('load', () => {
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const background = new Sprite(0, 0, 1920, 1100);
background.loadImg("/Game_02_dakynovyKoule/foto/bowling.png");

const zlabekL = new Tetragon(
    {x:   0, y:   600},
    {x: 925, y:   600},
    {x: 423, y: 1100},
    {x: 0, y: 1100}, 
    'red'
);
const zlabekR = new Tetragon(
    {x:   1025, y:   600},
    {x: 1920, y:   600},
    {x: 1920, y: 1100},
    {x:   1520, y: 1100},
     'yellow'
);


const kuzelka1 = new Sprite(920, 594, 100, 90);
kuzelka1.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka1 = true;
const pin1 = new Rectangle(kuzelka1._x + kuzelka1._width / 2 - 22, kuzelka1._y + kuzelka1._height - 38, 44, 20, 'green');

const kuzelka2 = new Sprite(900, 583, 100, 90);
kuzelka2.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka2 = true;
const pin2 = new Rectangle(kuzelka2._x + kuzelka2._width / 2 - 22, kuzelka2._y + kuzelka2._height - 38, 44, 20, 'green');

const kuzelka3 = new Sprite(940, 583, 100, 90);
kuzelka3.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka3 = true;
const pin3 = new Rectangle(kuzelka3._x + kuzelka3._width / 2 - 22, kuzelka3._y + kuzelka3._height - 38, 44, 20, 'green');

const kuzelka4 = new Sprite(880, 572, 100, 90);
kuzelka4.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka4 = true;
const pin4 = new Rectangle(kuzelka4._x + kuzelka4._width / 2 - 22, kuzelka4._y + kuzelka4._height - 38, 44, 20, 'green');

const kuzelka5 = new Sprite(920, 572, 100, 90);
kuzelka5.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka5 = true;
const pin5 = new Rectangle(kuzelka5._x + kuzelka5._width / 2 - 22, kuzelka5._y + kuzelka5._height - 38, 44, 20, 'green');

const kuzelka6 = new Sprite(960, 572, 100, 90);
kuzelka6.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka6 = true;
const pin6 = new Rectangle(kuzelka6._x + kuzelka6._width / 2 - 22, kuzelka6._y + kuzelka6._height - 38, 44, 20, 'green');

const kuzelka7 = new Sprite(860, 561, 100, 90);
kuzelka7.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka7 = true;
const pin7 = new Rectangle(kuzelka7._x + kuzelka7._width / 2 - 22, kuzelka7._y + kuzelka7._height - 38, 44, 20, 'green');

const kuzelka8 = new Sprite(900, 561, 100, 90);
kuzelka8.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka8 = true;
const pin8 = new Rectangle(kuzelka8._x + kuzelka8._width / 2 - 22, kuzelka8._y + kuzelka8._height - 38, 44, 20, 'green');

const kuzelka9 = new Sprite(940, 561, 100, 90);
kuzelka9.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka9 = true;
const pin9 = new Rectangle(kuzelka9._x + kuzelka9._width / 2 - 22, kuzelka9._y + kuzelka9._height - 38, 44, 20, 'green');

const kuzelka10 = new Sprite(980, 561, 100, 90);
kuzelka10.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");
let showKuzelka10 = true;
const pin10 = new Rectangle(kuzelka10._x + kuzelka10._width / 2 - 22, kuzelka10._y + kuzelka10._height - 38, 44, 20, 'green');

const cudlik = new Sprite(1450, 850, 420, 180);
cudlik.loadImg("/Game_02_dakynovyKoule/foto/cudlas.png");

const koule = new SpriteAnim(900, 890, 150, 150, [
    "/Game_02_dakynovyKoule/foto/gula.png",
    "/Game_02_dakynovyKoule/foto/gula2.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula3.png"
]);
koule.animSlow = 10;
let showKoule = false;

const power = new SpriteAnim(1451, 660, 420, 180, [
    "/Game_02_dakynovyKoule/foto/power.png",
    "/Game_02_dakynovyKoule/foto/power1.png",
    "/Game_02_dakynovyKoule/foto/power2.png",
    "/Game_02_dakynovyKoule/foto/power3.png",
    "/Game_02_dakynovyKoule/foto/power4.png",
    "/Game_02_dakynovyKoule/foto/power5.png",
    "/Game_02_dakynovyKoule/foto/power6.png",
    "/Game_02_dakynovyKoule/foto/power7.png", 
    "/Game_02_dakynovyKoule/foto/power6.png",
    "/Game_02_dakynovyKoule/foto/power5.png",
    "/Game_02_dakynovyKoule/foto/power4.png",
    "/Game_02_dakynovyKoule/foto/power3.png",
    "/Game_02_dakynovyKoule/foto/power2.png",
    "/Game_02_dakynovyKoule/foto/power1.png",
]);

power.animSlow = 25;
let showpower = false;

const sipecka = new SpriteAnim(850, 840, 250, 250, [
    "/Game_02_dakynovyKoule/foto/sipka.png",
    "/Game_02_dakynovyKoule/foto/sipka-1.png",
    "/Game_02_dakynovyKoule/foto/sipka-2.png",
    "/Game_02_dakynovyKoule/foto/sipka-3.png",
    "/Game_02_dakynovyKoule/foto/sipka-4.png",
    "/Game_02_dakynovyKoule/foto/sipka-5.png",
    "/Game_02_dakynovyKoule/foto/sipka-6.png",
    "/Game_02_dakynovyKoule/foto/sipka-7.png",
    "/Game_02_dakynovyKoule/foto/sipka-8.png",
    "/Game_02_dakynovyKoule/foto/sipka-9.png",
    "/Game_02_dakynovyKoule/foto/sipka-8.png",
    "/Game_02_dakynovyKoule/foto/sipka-7.png",
    "/Game_02_dakynovyKoule/foto/sipka-6.png",
    "/Game_02_dakynovyKoule/foto/sipka-5.png",
    "/Game_02_dakynovyKoule/foto/sipka-4.png",
    "/Game_02_dakynovyKoule/foto/sipka-3.png",
    "/Game_02_dakynovyKoule/foto/sipka-2.png",
    "/Game_02_dakynovyKoule/foto/sipka-1.png",
    "/Game_02_dakynovyKoule/foto/sipka.png",
    "/Game_02_dakynovyKoule/foto/sipka1.png",
    "/Game_02_dakynovyKoule/foto/sipka2.png",
    "/Game_02_dakynovyKoule/foto/sipka3.png",
    "/Game_02_dakynovyKoule/foto/sipka4.png",
    "/Game_02_dakynovyKoule/foto/sipka5.png",
    "/Game_02_dakynovyKoule/foto/sipka6.png",
    "/Game_02_dakynovyKoule/foto/sipka7.png",
    "/Game_02_dakynovyKoule/foto/sipka8.png",
    "/Game_02_dakynovyKoule/foto/sipka9.png",
    "/Game_02_dakynovyKoule/foto/sipka8.png",
    "/Game_02_dakynovyKoule/foto/sipka7.png",
    "/Game_02_dakynovyKoule/foto/sipka6.png",
    "/Game_02_dakynovyKoule/foto/sipka5.png",
    "/Game_02_dakynovyKoule/foto/sipka4.png",
    "/Game_02_dakynovyKoule/foto/sipka3.png",
    "/Game_02_dakynovyKoule/foto/sipka2.png",
    "/Game_02_dakynovyKoule/foto/sipka1.png"
]);
sipecka.animSlow = 5;
let sipeckaStop = false;


function Mainloop() {
    background.render(ctx);
    //zlabekL.render(ctx, true);
    //zlabekR.render(ctx, true);
    cudlik.render(ctx);
    if (showKuzelka10) {
        kuzelka10.render(ctx);
        pin10.render(ctx, true);
    }
    if (showKuzelka9) {
        kuzelka9.render(ctx);
        pin9.render(ctx, true);
    }
    if (showKuzelka8) {
        kuzelka8.render(ctx);
        pin8.render(ctx, true);
    }
    if (showKuzelka7) {
        kuzelka7.render(ctx);
        pin7.render(ctx, true);
    }
    if (showKuzelka6) {
        kuzelka6.render(ctx);
        pin6.render(ctx, true);
    }
    if (showKuzelka5) {
        kuzelka5.render(ctx);
        pin5.render(ctx, true);
    }
    if (showKuzelka4) {
        kuzelka4.render(ctx);
        pin4.render(ctx, true);
    }
    if (showKuzelka3) {
        kuzelka3.render(ctx);
        pin3.render(ctx, true);
    }
    if (showKuzelka2) {
        kuzelka2.render(ctx);
        pin2.render(ctx, true);
    }
    if (showKuzelka1) {
        kuzelka1.render(ctx);
        pin1.render(ctx, true);
    }
    if (showKoule == false) {
        sipecka.render(ctx);
        if (sipeckaStop == false) {
            sipecka.updateImage();
        }
    }
    if (showpower) {
        power.render(ctx);
        power.updateImage();
    }
    if (showKoule) {
        koule.render(ctx);
        koule.updateImage();
    }
}

window.addEventListener('click', event => handleClick(event));

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    if(!showKoule){
        if (mouseX >= cudlik._x && mouseX <= cudlik._x + cudlik._width &&
            mouseY >= cudlik._y && mouseY <= cudlik._y + cudlik._height) {
            if (!showpower) {
                showpower = true;
                sipeckaStop = true;
            } else if (showpower) {
                showKoule = true;
                showpower = false;
                sipeckaStop = false;
            }
        }
    }
}

let ballY = koule._y;
let ballX = koule._x;
let ballScale = 1;
let pokus = 0;
let zlabek = false;

function moveBall() {
    let ballSpeed = 0.8;
    let ballShrinkSpeed = 0.0018;

    const hibox_zlabek = new Rectangle(koule._points[3].x + koule._width / 2 - 10, koule._points[3].y, 10, 10, 'red');
    const hibox_kuzelky = new Rectangle(koule._points[3].x + koule._width / 2 - 10, koule._points[3].y - koule._height, 20, 10, 'green');
    hibox_kuzelky.render(ctx, true);

    if (hibox_zlabek.doesColideWith(zlabekL)) {
        zlabek = true;
        ballX += 0.09;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    } else if (hibox_zlabek.doesColideWith(zlabekR)) {
        zlabek = true;
        ballX -= 0.29;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    }

    if(!zlabek) {
        if (power._currentFrame == 0) {
            ballSpeed = 0.3;
            ballShrinkSpeed = 0.0008;
        }
        if (power._currentFrame == 1 || power._currentFrame == 13) {
            ballSpeed = 0.4;
            ballShrinkSpeed = 0.0010;
        }
        if (power._currentFrame == 2 || power._currentFrame == 12) {
            ballSpeed = 0.5;
            ballShrinkSpeed = 0.0012;
        }
        if (power._currentFrame == 3 || power._currentFrame == 11) {
            ballSpeed = 0.6;
            ballShrinkSpeed = 0.0014;
        }
        if (power._currentFrame == 4 || power._currentFrame == 10) {
            ballSpeed = 0.7;
            ballShrinkSpeed = 0.0016;
        }
        if (power._currentFrame == 5 || power._currentFrame == 9) {
            ballSpeed = 0.8;
            ballShrinkSpeed = 0.0018;
        }
        if (power._currentFrame == 6 || power._currentFrame == 8) {
            ballSpeed = 0.9;
            ballShrinkSpeed = 0.002;
        }
        if (power._currentFrame == 7) {
            ballSpeed = 1;
            ballShrinkSpeed = 0.0022;
        }
    }
        if (showKoule) {
            ballY -= ballSpeed;
            ballScale -= ballShrinkSpeed;            
            ballX += 0.14;

            if (sipecka._currentFrame == 0 ){
                if(pokus == 0) {
                    if (power._currentFrame == 4 ||
                        power._currentFrame == 5 || 
                        power._currentFrame == 6 || 
                        power._currentFrame == 7 || 
                        power._currentFrame == 8 || 
                        power._currentFrame == 9 || 
                        power._currentFrame == 10) { 
                        if (ballY <= 594) {
                            showKuzelka1 = false;
                        }

                        if (ballY <= 583) {
                            showKuzelka2 = false;
                            showKuzelka3 = false;
                        }

                        if (ballY <= 572) {
                            showKuzelka4 = false;
                            showKuzelka5 = false;
                            showKuzelka6 = false;
                        }
                        
                        if (ballY <= 561) {
                            showKuzelka7 = false;
                            showKuzelka8 = false;
                            showKuzelka9 = false;
                            showKuzelka10 = false;
                            pokus = 2;
                        }
                    }
                }
            }

            if (hibox_kuzelky.doesColideWith(pin1)) {
                showKuzelka1 = false;
            } else if (hibox_kuzelky.doesColideWith(pin2)) {
                showKuzelka2 = false;
            } else if (hibox_kuzelky.doesColideWith(pin3)) {
                showKuzelka3 = false;
            } else if (hibox_kuzelky.doesColideWith(pin4)) {
                showKuzelka4 = false;
            } else if (hibox_kuzelky.doesColideWith(pin5)) {
                showKuzelka5 = false;
            } else if (hibox_kuzelky.doesColideWith(pin6)) {
                showKuzelka6 = false;
            } else if (hibox_kuzelky.doesColideWith(pin7)) {
                showKuzelka7 = false;
            } else if (hibox_kuzelky.doesColideWith(pin8)) {
                showKuzelka8 = false;
            } else if (hibox_kuzelky.doesColideWith(pin9)) {
                showKuzelka9 = false;
            } else if (hibox_kuzelky.doesColideWith(pin10)) {
                showKuzelka10 = false;
            }

        if(!zlabek) {
            if (sipecka._currentFrame == 1 || sipecka._currentFrame == 17) {
                ballX -= 0.07;
            }
            if (sipecka._currentFrame == 2 || sipecka._currentFrame == 16) { 
                ballX -= 0.14;
            }
            if (sipecka._currentFrame == 3 || sipecka._currentFrame == 15) {
                ballX -= 0.21;
            }
            if (sipecka._currentFrame == 4 || sipecka._currentFrame == 14) {
                ballX -= 0.31;
            }
            if (sipecka._currentFrame == 5 || sipecka._currentFrame == 13) {
                ballX -= 0.43;
            }
            if (sipecka._currentFrame == 6 || sipecka._currentFrame == 12) {
                ballX -= 0.54;
            }
            if (sipecka._currentFrame == 7 || sipecka._currentFrame == 11) {
                ballX -= 0.68;
            }
            if (sipecka._currentFrame == 8 || sipecka._currentFrame == 10) {
                ballX -= 0.79;
            }
            if (sipecka._currentFrame == 9) {
                ballX -= 0.89;
            }
            if (sipecka._currentFrame == 19 || sipecka._currentFrame == 35) {
                ballX += 0.07;
            }
            if (sipecka._currentFrame == 20 || sipecka._currentFrame == 34) {
                ballX += 0.14;
            }
            if (sipecka._currentFrame == 21 || sipecka._currentFrame == 33) {
                ballX += 0.21;
            }
            if (sipecka._currentFrame == 22 || sipecka._currentFrame == 32) {
                ballX += 0.31;
            }
            if (sipecka._currentFrame == 23 || sipecka._currentFrame == 31) {
                ballX += 0.43;
            }
            if (sipecka._currentFrame == 24 || sipecka._currentFrame == 30) {
                ballX += 0.54;
            }
            if (sipecka._currentFrame == 25 || sipecka._currentFrame == 29) {
                ballX += 0.68;
            }
            if (sipecka._currentFrame == 26 || sipecka._currentFrame == 28) {
                ballX += 0.79;
            }
            if (sipecka._currentFrame == 27) {
                ballX += 0.89;
            }
        }

            if (ballY <= 560 || (hibox_zlabek.doesColideWith(zlabekL) && ballY <= 600) || (hibox_zlabek.doesColideWith(zlabekR) && ballY <= 600)) {
                showKoule = false;
                pokus++;
                if(pokus >= 2) {
                    showKoule = false;
                    setTimeout(() => {
                        showKuzelka1 = true;
                        showKuzelka2 = true;
                        showKuzelka3 = true;
                        showKuzelka4 = true;
                        showKuzelka5 = true;
                        showKuzelka6 = true;
                        showKuzelka7 = true;
                        showKuzelka8 = true;
                        showKuzelka9 = true;
                        showKuzelka10 = true;
                        }, 500);
                    pokus = 0;
                }
                    ballY = 890;
                    ballX = 900;
                    ballScale = 1;
                    zlabek = false;
                    sipecka._currentFrame = 0;
                    power._currentFrame = 0;
            }
            koule.y = ballY;
            koule.x = ballX;
            koule.width = 150 * ballScale;
            koule.height = 150 * ballScale;
        }
}

    window.setInterval(() => {
        Mainloop();
        moveBall();
    }, 1);
});
