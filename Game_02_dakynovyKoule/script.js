import { Sprite } from '../Monkey-Engine/Sprite.js';
import { SpriteAnim } from '../Monkey-Engine/SpriteAnim.js';
import { Tetragon } from '../Monkey-Engine/Tetragon.js';
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

const scoreBoard = new Sprite(252, 20, 1416, 156);
scoreBoard.loadImg("/Game_02_dakynovyKoule/foto/score_board.png");


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

const X = new Sprite(280, 43, 49, 49);
X.loadImg("/Game_02_dakynovyKoule/foto/strike.png");

const spare = new Sprite(280, 43, 49, 49);
spare.loadImg("/Game_02_dakynovyKoule/foto/spare.png");

const devet = new Sprite(280, 43, 49, 49);
devet.loadImg("/Game_02_dakynovyKoule/foto/devet.png");

const osm = new Sprite(280, 43, 49, 49);
osm.loadImg("/Game_02_dakynovyKoule/foto/osm.png");

const sedm = new Sprite(280, 43, 49, 49);
sedm.loadImg("/Game_02_dakynovyKoule/foto/sedm.png");

const sest = new Sprite(280, 43, 49, 49);
sest.loadImg("/Game_02_dakynovyKoule/foto/sest.png");

const pet = new Sprite(280, 43, 49, 49);
pet.loadImg("/Game_02_dakynovyKoule/foto/pet.png");

const ctyri = new Sprite(280, 43, 49, 49);
ctyri.loadImg("/Game_02_dakynovyKoule/foto/ctyri.png");

const tri = new Sprite(280, 43, 49, 49);
tri.loadImg("/Game_02_dakynovyKoule/foto/tri.png");

const dva = new Sprite(280, 43, 49, 49);
dva.loadImg("/Game_02_dakynovyKoule/foto/dva.png");

const jedna = new Sprite(280, 43, 49, 49);
jedna.loadImg("/Game_02_dakynovyKoule/foto/jedna.png");

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

const cudlikR = new Sprite(1450, 850, 420, 180);
cudlikR.loadImg("/Game_02_dakynovyKoule/foto/cudlasR.png");

const kouleR = new SpriteAnim(900, 890, 150, 150, [
    "/Game_02_dakynovyKoule/foto/gulaR.png",
    "/Game_02_dakynovyKoule/foto/gula2R.png",
    "/Game_02_dakynovyKoule/foto/gula_zadaR.png",
    "/Game_02_dakynovyKoule/foto/gula_zadaR.png",
    "/Game_02_dakynovyKoule/foto/gula_zadaR.png",
    "/Game_02_dakynovyKoule/foto/gula3R.png"
]);
kouleR.animSlow = 10;

const sipeckaR = new SpriteAnim(850, 840, 250, 250, [
    "/Game_02_dakynovyKoule/foto/sipkaR.png",
    "/Game_02_dakynovyKoule/foto/sipka-1R.png",
    "/Game_02_dakynovyKoule/foto/sipka-2R.png",
    "/Game_02_dakynovyKoule/foto/sipka-3R.png",
    "/Game_02_dakynovyKoule/foto/sipka-4R.png",
    "/Game_02_dakynovyKoule/foto/sipka-5R.png",
    "/Game_02_dakynovyKoule/foto/sipka-6R.png",
    "/Game_02_dakynovyKoule/foto/sipka-7R.png",
    "/Game_02_dakynovyKoule/foto/sipka-8R.png",
    "/Game_02_dakynovyKoule/foto/sipka-9R.png",
    "/Game_02_dakynovyKoule/foto/sipka-8R.png",
    "/Game_02_dakynovyKoule/foto/sipka-7R.png",
    "/Game_02_dakynovyKoule/foto/sipka-6R.png",
    "/Game_02_dakynovyKoule/foto/sipka-5R.png",
    "/Game_02_dakynovyKoule/foto/sipka-4R.png",
    "/Game_02_dakynovyKoule/foto/sipka-3R.png",
    "/Game_02_dakynovyKoule/foto/sipka-2R.png",
    "/Game_02_dakynovyKoule/foto/sipka-1R.png",
    "/Game_02_dakynovyKoule/foto/sipkaR.png",
    "/Game_02_dakynovyKoule/foto/sipka1R.png",
    "/Game_02_dakynovyKoule/foto/sipka2R.png",
    "/Game_02_dakynovyKoule/foto/sipka3R.png",
    "/Game_02_dakynovyKoule/foto/sipka4R.png",
    "/Game_02_dakynovyKoule/foto/sipka5R.png",
    "/Game_02_dakynovyKoule/foto/sipka6R.png",
    "/Game_02_dakynovyKoule/foto/sipka7R.png",
    "/Game_02_dakynovyKoule/foto/sipka8R.png",
    "/Game_02_dakynovyKoule/foto/sipka9R.png",
    "/Game_02_dakynovyKoule/foto/sipka8R.png",
    "/Game_02_dakynovyKoule/foto/sipka7R.png",
    "/Game_02_dakynovyKoule/foto/sipka6R.png",
    "/Game_02_dakynovyKoule/foto/sipka5R.png",
    "/Game_02_dakynovyKoule/foto/sipka4R.png",
    "/Game_02_dakynovyKoule/foto/sipka3R.png",
    "/Game_02_dakynovyKoule/foto/sipka2R.png",
    "/Game_02_dakynovyKoule/foto/sipka1R.png"
]);
sipeckaR.animSlow = 5;


let hrac = 1;
function Mainloop() {
    background.render(ctx);
    if (hrac % 2 == 1) {
        cudlik.render(ctx);
    } else {
        cudlikR.render(ctx);
    }
    if (showKuzelka10) {
        kuzelka10.render(ctx);
    
    }
    if (showKuzelka9) {
        kuzelka9.render(ctx);

    }
    if (showKuzelka8) {
        kuzelka8.render(ctx);

    }
    if (showKuzelka7) {
        kuzelka7.render(ctx);

    }
    if (showKuzelka6) {
        kuzelka6.render(ctx);

    }
    if (showKuzelka5) {
        kuzelka5.render(ctx);

    }
    if (showKuzelka4) {
        kuzelka4.render(ctx);

    }
    if (showKuzelka3) {
        kuzelka3.render(ctx);

    }
    if (showKuzelka2) {
        kuzelka2.render(ctx);

    }
    if (showKuzelka1) {
        kuzelka1.render(ctx);

    }
    if (showKoule == false) {
        if (hrac % 2 == 1) {
            sipecka.render(ctx);
            if (sipeckaStop == false) {
                sipecka.updateImage();
            }
        }
        if (hrac % 2 == 0) {
            sipeckaR.render(ctx);
            if (sipeckaStop == false) {
                sipeckaR.updateImage();
            }
        }
    }
    if (showpower) {
        power.render(ctx);
        power.updateImage();
    }
    if (showKoule) {
        if (hrac % 2 == 1) {
            koule.render(ctx);
            koule.updateImage();
        }
        if (hrac % 2 == 0) {
            kouleR.render(ctx);
            kouleR.updateImage();
        }
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

window.addEventListener('keypress', event => handleKeyPress(event));

function handleKeyPress(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (!showKoule) {
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
let strike = false;
let pocet_kuzelek_dole = 0;

function moveBall() {
    let ballSpeed = 0.8;
    let ballShrinkSpeed = 0.0018;

    const hibox_zlabek = new Rectangle(koule._points[3].x + koule._width / 2 - 10, koule._points[3].y, 10, 10, 'red');
    const hibox_kuzelky = new Rectangle(koule._points[3].x + koule._width / 2 - 13, koule._points[3].y - koule._height, 26, 10, 'green');

    if (hibox_zlabek.doesColideWith(zlabekL)) {
        zlabek = true;
        ballX += 0.07;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    } else if (hibox_zlabek.doesColideWith(zlabekR)) {
        zlabek = true;
        ballX -= 0.29;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    }

    if (!zlabek) {
        if (power._currentFrame == 0) {
            ballSpeed = 0.31;
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
            ballSpeed = 0.62;
            ballShrinkSpeed = 0.0014;
        }
        if (power._currentFrame == 4 || power._currentFrame == 10) {
            ballSpeed = 0.69;
            ballShrinkSpeed = 0.0016;
        }
        if (power._currentFrame == 5 || power._currentFrame == 9) {
            ballSpeed = 0.75;
            ballShrinkSpeed = 0.0018;
        }
        if (power._currentFrame == 6 || power._currentFrame == 8) {
            ballSpeed = 0.89;
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

        if (sipecka._currentFrame == 0) {
            if (pokus == 0) {
                if (power._currentFrame >= 4 && power._currentFrame <= 10) {
                    strike = true;
                    if (strike) {
                        if (ballY <= 634) showKuzelka1 = false;
                        if (ballY <= 623) {
                            showKuzelka2 = false;
                            showKuzelka3 = false;
                        }
                        if (ballY <= 612) {
                            showKuzelka4 = false;
                            showKuzelka5 = false;
                            showKuzelka6 = false;
                        }
                        if (ballY <= 601) {
                            showKuzelka7 = false;
                            showKuzelka8 = false;
                            showKuzelka9 = false;
                            showKuzelka10 = false;
                            pokus = 2;
                        }
                        pocet_kuzelek_dole = 10;
                    }
                }
            }
        }

        if (!strike) {
            if (hibox_kuzelky.doesColideWith(pin1) && showKuzelka1) {
                showKuzelka1 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin2) && showKuzelka2) {
                showKuzelka2 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin3) && showKuzelka3) {
                showKuzelka3 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin4) && showKuzelka4) {
                showKuzelka4 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin5) && showKuzelka5) {
                showKuzelka5 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin6) && showKuzelka6) {
                showKuzelka6 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin7) && showKuzelka7) {
                showKuzelka7 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin8) && showKuzelka8) {
                showKuzelka8 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin9) && showKuzelka9) {
                showKuzelka9 = false;
                pocet_kuzelek_dole++;
            }
            if (hibox_kuzelky.doesColideWith(pin10) && showKuzelka10) {
                showKuzelka10 = false;
                pocet_kuzelek_dole++;
            }
        }

        if (!zlabek) {
            if (sipecka._currentFrame == 1 || sipecka._currentFrame == 17) ballX -= 0.07;
            if (sipecka._currentFrame == 2 || sipecka._currentFrame == 16) ballX -= 0.14;
            if (sipecka._currentFrame == 3 || sipecka._currentFrame == 15) ballX -= 0.21;
            if (sipecka._currentFrame == 4 || sipecka._currentFrame == 14) ballX -= 0.31;
            if (sipecka._currentFrame == 5 || sipecka._currentFrame == 13) ballX -= 0.43;
            if (sipecka._currentFrame == 6 || sipecka._currentFrame == 12) ballX -= 0.54;
            if (sipecka._currentFrame == 7 || sipecka._currentFrame == 11) ballX -= 0.68;
            if (sipecka._currentFrame == 8 || sipecka._currentFrame == 10) ballX -= 0.79;
            if (sipecka._currentFrame == 9) ballX -= 0.89;
            if (sipecka._currentFrame == 19 || sipecka._currentFrame == 35) ballX += 0.07;
            if (sipecka._currentFrame == 20 || sipecka._currentFrame == 34) ballX += 0.14;
            if (sipecka._currentFrame == 21 || sipecka._currentFrame == 33) ballX += 0.21;
            if (sipecka._currentFrame == 22 || sipecka._currentFrame == 32) ballX += 0.31;
            if (sipecka._currentFrame == 23 || sipecka._currentFrame == 31) ballX += 0.43;
            if (sipecka._currentFrame == 24 || sipecka._currentFrame == 30) ballX += 0.54;
            if (sipecka._currentFrame == 25 || sipecka._currentFrame == 29) ballX += 0.68;
            if (sipecka._currentFrame == 26 || sipecka._currentFrame == 28) ballX += 0.79;
            if (sipecka._currentFrame == 27) ballX += 0.89;
        }
        if (ballY <= 579.99 || (hibox_zlabek.doesColideWith(zlabekL) && ballY <= 579.99) || (hibox_zlabek.doesColideWith(zlabekR) && ballY <= 579.99)) {
            showKoule = false;
            pokus++;
            tryB++;
            if (pokus >= 2) {
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
                }, 1000);
                pokus = 0;
                setTimeout(() => {
                    hrac++;
                }, 1000);
            }
            ballY = 890;
            ballX = 900;
            ballScale = 1;
            zlabek = false;
            strike = false;
            sipecka._currentFrame = 0;
            power._currentFrame = 0;
            pocet_kuzelek_dole = 0;
        }


        koule.y = ballY;
        koule.x = ballX;
        koule.width = 150 * ballScale;
        koule.height = 150 * ballScale;
    }
}

let ballRX = kouleR._x;
let ballRY = kouleR._y;

function moveBallR() {
    let ballSpeed = 0.8;
    let ballShrinkSpeed = 0.0018;

    const hiboxR_zlabek = new Rectangle(kouleR._points[3].x + kouleR._width / 2 - 10, kouleR._points[3].y, 10, 10, 'red');
    const hiboxR_kuzelky = new Rectangle(kouleR._points[3].x + kouleR._width / 2 - 13, kouleR._points[3].y - kouleR._height, 26, 10, 'green');

    if (hiboxR_zlabek.doesColideWith(zlabekL) || hiboxR_zlabek.doesColideWith(zlabekL)) {
        zlabek = true;
        ballRX += 0.09;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    } else if (hiboxR_zlabek.doesColideWith(zlabekR) || hiboxR_zlabek.doesColideWith(zlabekR)) {
        zlabek = true;
        ballRX -= 0.29;
        ballSpeed = 0.15;
        ballShrinkSpeed = 0.0005;
    }

    if (!zlabek) {
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
        ballRY -= ballSpeed;
        ballScale -= ballShrinkSpeed;
        ballRX += 0.14;

        if (sipecka._currentFrame == 0) {
            if (pokus == 0) {
                if (power._currentFrame == 4 ||
                    power._currentFrame == 5 ||
                    power._currentFrame == 6 ||
                    power._currentFrame == 7 ||
                    power._currentFrame == 8 ||
                    power._currentFrame == 9 ||
                    power._currentFrame == 10) {
                    strike = true;
                    if (strike == true) {
                        if (ballRY <= 594) {
                            showKuzelka1 = false;
                        }

                        if (ballRY <= 583) {
                            showKuzelka2 = false;
                            showKuzelka3 = false;
                        }

                        if (ballRY <= 572) {
                            showKuzelka4 = false;
                            showKuzelka5 = false;
                            showKuzelka6 = false;
                        }

                        if (ballRY <= 561) {
                            showKuzelka7 = false;
                            showKuzelka8 = false;
                            showKuzelka9 = false;
                            showKuzelka10 = false;
                            pokus = 2;
                        }
                        pocet_kuzelek_dole = 10;
                    }
                }
            }
        }

        if (strike == false) {
            if (hiboxR_kuzelky.doesColideWith(pin1)) {
            showKuzelka1 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin2)) {
            showKuzelka2 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin3)) {
            showKuzelka3 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin4)) {
            showKuzelka4 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin5)) {
            showKuzelka5 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin6)) {
            showKuzelka6 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin7)) {
            showKuzelka7 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin8)) {
            showKuzelka8 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin9)) {
            showKuzelka9 = false;
            pocet_kuzelek_dole++;
            }
            if (hiboxR_kuzelky.doesColideWith(pin10)) {
            showKuzelka10 = false;
            pocet_kuzelek_dole++;
            }
        }

        if (!zlabek) {
            if (sipeckaR._currentFrame == 1 || sipeckaR._currentFrame == 17) {
            ballRX -= 0.07;
            }
            if (sipeckaR._currentFrame == 2 || sipeckaR._currentFrame == 16) {
            ballRX -= 0.14;
            }
            if (sipeckaR._currentFrame == 3 || sipeckaR._currentFrame == 15) {
            ballRX -= 0.21;
            }
            if (sipeckaR._currentFrame == 4 || sipeckaR._currentFrame == 14) {
            ballRX -= 0.31;
            }
            if (sipeckaR._currentFrame == 5 || sipeckaR._currentFrame == 13) {
            ballRX -= 0.43;
            }
            if (sipeckaR._currentFrame == 6 || sipeckaR._currentFrame == 12) {
            ballRX -= 0.54;
            }
            if (sipeckaR._currentFrame == 7 || sipeckaR._currentFrame == 11) {
            ballRX -= 0.68;
            }
            if (sipeckaR._currentFrame == 8 || sipeckaR._currentFrame == 10) {
            ballRX -= 0.79;
            }
            if (sipeckaR._currentFrame == 9) {
            ballRX -= 0.89;
            }
            if (sipeckaR._currentFrame == 19 || sipeckaR._currentFrame == 35) {
            ballRX += 0.07;
            }
            if (sipeckaR._currentFrame == 20 || sipeckaR._currentFrame == 34) {
            ballRX += 0.14;
            }
            if (sipeckaR._currentFrame == 21 || sipeckaR._currentFrame == 33) {
            ballRX += 0.21;
            }
            if (sipeckaR._currentFrame == 22 || sipeckaR._currentFrame == 32) {
            ballRX += 0.31;
            }
            if (sipeckaR._currentFrame == 23 || sipeckaR._currentFrame == 31) {
            ballRX += 0.43;
            }
            if (sipeckaR._currentFrame == 24 || sipeckaR._currentFrame == 30) {
            ballRX += 0.54;
            }
            if (sipeckaR._currentFrame == 25 || sipeckaR._currentFrame == 29) {
            ballRX += 0.68;
            }
            if (sipeckaR._currentFrame == 26 || sipeckaR._currentFrame == 28) {
            ballRX += 0.79;
            }
            if (sipeckaR._currentFrame == 27) {
            ballRX += 0.89;
            }
        }

        if (ballRY <= 560 || (hiboxR_zlabek.doesColideWith(zlabekL) && ballRY <= 600) || (hiboxR_zlabek.doesColideWith(zlabekR) && ballRY <= 600)) {
            showKoule = false;
            pokus++;
            tryR++;
            if (pokus >= 2) {
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
            }, 1000);
            pokus = 0;
            setTimeout(() => {
                hrac++;
                }, 1000);
            }
            ballRY = 890;
            ballRX = 900;
            ballScale = 1;
            zlabek = false;
            strike = false;
            sipecka._currentFrame = 0;
            power._currentFrame = 0;
            pocet_kuzelek_dole = 0;
        }
        kouleR.y = ballRY;
        kouleR.x = ballRX;
        kouleR.width = 150 * ballScale;
        kouleR.height = 150 * ballScale;
    }
}

let tryB = 0;
let tryR = 0;
let strikes = [];
let zazemi = false;

function counter() {
    scoreBoard.render(ctx);

    if (ballY <= 580.32) zazemi = true;
    else zazemi = false;

    if (pocet_kuzelek_dole === 10 && zazemi)  {
            strikes.push({ x: X._x + (tryB * 64) + 64, y: X._y, type: 'strike' });
    } 
    if (pocet_kuzelek_dole === 9 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: devet._x + (tryB * 64), y: devet._y, type: 'devet' });
        } else {
            strikes.push({ x: devet._x + (tryR * 64) + 4, y: devet._y, type: 'devet' });
        }
    } 
    if (pocet_kuzelek_dole === 8 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: osm._x + (tryB * 64), y: osm._y, type: 'osm' });
        } else {
            strikes.push({ x: osm._x + (tryR * 64) + 4, y: osm._y, type: 'osm' });
        }
    } 
    if (pocet_kuzelek_dole === 7 && zazemi) {
        if(pokus % 2 == 1 || tryB > 0) {
            strikes.push({ x: sedm._x + (tryB * 64), y: sedm._y, type: 'sedm' });
        } else {
            strikes.push({ x: sedm._x + (tryR * 64) + 4, y: sedm._y, type: 'sedm' });
        }
    } 
    if (pocet_kuzelek_dole === 6 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: sest._x + (tryB * 64), y: sest._y, type: 'sest' });
        } else {
            strikes.push({ x: sest._x + (tryR * 64) + 4, y: sest._y, type: 'sest' });
        }
    } 
    if (pocet_kuzelek_dole === 5 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: pet._x + (tryB * 64), y: pet._y, type: 'pet' });
        } else {
            strikes.push({ x: pet._x + (tryR * 64) + 4, y: pet._y, type: 'pet' });
        }
    } 
    if (pocet_kuzelek_dole === 4 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: ctyri._x + (tryB * 64), y: ctyri._y, type: 'ctyri' });
        } else {
            strikes.push({ x: ctyri._x + (tryR * 64) + 4, y: ctyri._y, type: 'ctyri' });
        }
    } 
    if (pocet_kuzelek_dole === 3 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: tri._x + (tryB * 64), y: tri._y, type: 'tri' });
        } else {
            strikes.push({ x: tri._x + (tryR * 64) + 4, y: tri._y, type: 'tri' });
        }
    } 
    if (pocet_kuzelek_dole === 2 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: dva._x + (tryB * 64), y: dva._y, type: 'dva' });
        } else {
            strikes.push({ x: dva._x + (tryR * 64) + 4, y: dva._y, type: 'dva' });
        }
    } 
    if (pocet_kuzelek_dole === 1 && zazemi) {
        if(pokus % 2 == 1 || tryB <= 0) {
            strikes.push({ x: jedna._x + (tryB * 64), y: jedna._y, type: 'jedna' });
        } else {
            strikes.push({ x: jedna._x + (tryR * 64) + 4, y: jedna._y, type: 'jedna' });
        }
    }

    strikes.forEach(strike => {
        switch (strike.type) {
            case 'strike':
                X.x = strike.x;
                X.y = strike.y;
                X.render(ctx);
                break;
            case 'spare':
                spare.x = strike.x;
                spare.y = strike.y;
                spare.render(ctx);
                break;
            case 'devet':
                devet.x = strike.x;
                devet.y = strike.y;
                devet.render(ctx);
                break;
            case 'osm':
                osm.x = strike.x;
                osm.y = strike.y;
                osm.render(ctx);
                break;
            case 'sedm':
                sedm.x = strike.x;
                sedm.y = strike.y;
                sedm.render(ctx);
                break;
            case 'sest':
                sest.x = strike.x;
                sest.y = strike.y;
                sest.render(ctx);
                break;
            case 'pet':
                pet.x = strike.x;
                pet.y = strike.y;
                pet.render(ctx);
                break;
            case 'ctyri':
                ctyri.x = strike.x;
                ctyri.y = strike.y;
                ctyri.render(ctx);
                break;
            case 'tri':
                tri.x = strike.x;
                tri.y = strike.y;
                tri.render(ctx);
                break;
            case 'dva':
                dva.x = strike.x;
                dva.y = strike.y;
                dva.render(ctx);
                break;
            case 'jedna':
                jedna.x = strike.x;
                jedna.y = strike.y;
                jedna.render(ctx);
                break;
        }
    });
    //console.log("sl - " + strikes.length);
    console.log("tryB - " + tryB);

    //console.log(pocet_kuzelek_dole);

    //console.log(ballY)
    
    //console.log(zazemi)
    
    //console.log(power._currentFrame);
}




    window.setInterval(() => {
        Mainloop();
        if(hrac % 2 == 1) {
            moveBall();
        } else {    
            moveBallR();
        }
        counter();
    }, 1);
});
