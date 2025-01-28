const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite } from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';
import { SpriteAnim } from '../Monkey-Engine/SpriteAnim.js';

const background = new Sprite(0, 0, 1920, 1100);
background.loadImg("/Game_02_dakynovyKoule/foto/bowling.png");

const kuzelka1 = new Sprite(920, 594, 100, 90);
kuzelka1.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka2 = new Sprite(900, 583, 100, 90);
kuzelka2.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka3 = new Sprite(940, 583, 100, 90);
kuzelka3.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka4 = new Sprite(880, 572, 100, 90);
kuzelka4.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka5 = new Sprite(920, 572, 100, 90);
kuzelka5.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka6 = new Sprite(960, 572, 100, 90);
kuzelka6.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka7 = new Sprite(860, 561, 100, 90);
kuzelka7.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka8 = new Sprite(900, 561, 100, 90);
kuzelka8.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka9 = new Sprite(940, 561, 100, 90);
kuzelka9.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const kuzelka10 = new Sprite(980, 561, 100, 90);
kuzelka10.loadImg("/Game_02_dakynovyKoule/foto/kuzelka.png");

const cudlik = new Sprite(1450, 850, 420, 180);
cudlik.loadImg("/Game_02_dakynovyKoule/foto/cudlas.png");

const koule = new CharacterSprite1(900, 890, 150, 150);
koule._framesRunning = [
    "/Game_02_dakynovyKoule/foto/gula.png",
    "/Game_02_dakynovyKoule/foto/gula2.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula3.png"
];

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
let showKoule = false;

function Mainloop() {
    background.render(ctx);
    cudlik.render(ctx);
    kuzelka10.render(ctx);
    kuzelka9.render(ctx);
    kuzelka8.render(ctx);
    kuzelka7.render(ctx);
    kuzelka6.render(ctx);
    kuzelka5.render(ctx);
    kuzelka4.render(ctx);
    kuzelka3.render(ctx);
    kuzelka2.render(ctx);
    kuzelka1.render(ctx);
    if (showKoule == false) {
        sipecka.render(ctx);
        sipecka.updateImage();
    }
    if (showKoule) {
        koule.render(ctx);
        koule.updatePos();
    }
}

window.addEventListener('click', event => handleClick(event));

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    if (mouseX >= cudlik._x && mouseX <= cudlik._x + cudlik._width &&
        mouseY >= cudlik._y && mouseY <= cudlik._y + cudlik._height) {
        showKoule = true;
    }

}

let ballY = koule._y;
let ballX = koule._x;
let ballSpeed = 0.8;
let ballScale = 1;
let ballShrinkSpeed = 0.0018;

function moveBall() {
    if (showKoule) {
        ballY -= ballSpeed;
        ballScale -= ballShrinkSpeed;
        ballX += 0.14;
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

        //console.log(sipecka._currentFrame);

        //zkusebni
        /*if (sipecka._currentFrame == 1) {
        ballX += 0.89;
        }*/

        //console.log(ballX);
        //console.log(ballY);

        if (ballY <= 561) {
            showKoule = false;
            ballY = 890;
            ballX = 900;
            ballScale = 1;
        }
        koule._y = ballY;
        koule._x = ballX;
        koule._width = 150 * ballScale;
        koule._height = 150 * ballScale;
    }
}

window.setInterval(() => {
    Mainloop();
    moveBall();
}, 1);

