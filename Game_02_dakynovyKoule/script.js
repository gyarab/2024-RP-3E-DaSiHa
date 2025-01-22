const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite } from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

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

const koule = new CharacterSprite1(900, 840, 150, 150);
koule._framesRunning = [
    "/Game_02_dakynovyKoule/foto/gula.png",
    "/Game_02_dakynovyKoule/foto/gula2.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula_zada.png",
    "/Game_02_dakynovyKoule/foto/gula3.png"
];



const sipecka = new CharacterSprite1(900, 840, 150, 200);
sipecka._framesRunning = [
    "/Game_02_dakynovyKoule/foto/sipecka.png",
    "/Game_02_dakynovyKoule/foto/sipecka-1.png",
    "/Game_02_dakynovyKoule/foto/sipecka-2.png",
    "/Game_02_dakynovyKoule/foto/sipecka-3.png",
    "/Game_02_dakynovyKoule/foto/sipecka-4.png",
    "/Game_02_dakynovyKoule/foto/sipecka-3.png",
    "/Game_02_dakynovyKoule/foto/sipecka-2.png",
    "/Game_02_dakynovyKoule/foto/sipecka-1.png",
    "/Game_02_dakynovyKoule/foto/sipecka.png",
    "/Game_02_dakynovyKoule/foto/sipecka1.png",
    "/Game_02_dakynovyKoule/foto/sipecka2.png",
    "/Game_02_dakynovyKoule/foto/sipecka3.png",
    "/Game_02_dakynovyKoule/foto/sipecka4.png",
    "/Game_02_dakynovyKoule/foto/sipecka3.png",
    "/Game_02_dakynovyKoule/foto/sipecka2.png",
    "/Game_02_dakynovyKoule/foto/sipecka1.png",
    "/Game_02_dakynovyKoule/foto/sipecka.png",
];

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
        sipecka.updatePos();
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
let ballSpeed = 0.8;
let ballScale = 1;
let ballShrinkSpeed = 0.0016;

function moveBall() {
    if (showKoule) {
        ballY -= ballSpeed;
        ballScale -= ballShrinkSpeed;
        if (ballY <= 561) {
            showKoule = false;
            ballY = 840;
            ballScale = 1;
        }
        koule._y = ballY;
        koule._width = 150 * ballScale;
        koule._height = 150 * ballScale;
    }
}

window.setInterval(() => {
    Mainloop();
    moveBall();
}, 5);
