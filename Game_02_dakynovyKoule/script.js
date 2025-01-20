const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite } from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

// Load background and sprites
const background = new Sprite(0, 0, 1920, 1100);
background.loadImg("/Game_02_dakynovyKoule/bowling.png");

const kuzelka1 = new Sprite(920, 594, 100, 90);
kuzelka1.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka2 = new Sprite(900, 583, 100, 90);
kuzelka2.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka3 = new Sprite(940, 583, 100, 90);
kuzelka3.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka4 = new Sprite(880, 572, 100, 90);
kuzelka4.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka5 = new Sprite(920, 572, 100, 90);
kuzelka5.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka6 = new Sprite(960, 572, 100, 90);
kuzelka6.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka7 = new Sprite(860, 561, 100, 90);
kuzelka7.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka8 = new Sprite(900, 561, 100, 90);
kuzelka8.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka9 = new Sprite(940, 561, 100, 90);
kuzelka9.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka10 = new Sprite(980, 561, 100, 90);
kuzelka10.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const cudlik = new Sprite(1300, 770, 1200, 1200);
cudlik.loadImg("/Game_02_dakynovyKoule/cudlas.png");

const koule = new Sprite(1150, 700, 150, 150);
koule.loadImg("/Game_02_dakynovyKoule/gula.png");

const sipecka = new CharacterSprite1(900, 840, 150, 200);
sipecka._id = "sipka";
sipecka._framesRunning = [
    "/Game_02_dakynovyKoule/sipecka.png",
    "/Game_02_dakynovyKoule/sipecka-1.png",
    "/Game_02_dakynovyKoule/sipecka-2.png",
    "/Game_02_dakynovyKoule/sipecka-3.png",
    "/Game_02_dakynovyKoule/sipecka-4.png",
    "/Game_02_dakynovyKoule/sipecka-3.png",
    "/Game_02_dakynovyKoule/sipecka-2.png",
    "/Game_02_dakynovyKoule/sipecka-1.png",
    "/Game_02_dakynovyKoule/sipecka.png",
    "/Game_02_dakynovyKoule/sipecka1.png",
    "/Game_02_dakynovyKoule/sipecka2.png",
    "/Game_02_dakynovyKoule/sipecka3.png",
    "/Game_02_dakynovyKoule/sipecka4.png",
    "/Game_02_dakynovyKoule/sipecka3.png",
    "/Game_02_dakynovyKoule/sipecka2.png",
    "/Game_02_dakynovyKoule/sipecka1.png",
    "/Game_02_dakynovyKoule/sipecka.png",
];

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

function isMouseOverButton() {
    return (
        mouseX >= cudlik.x &&
        mouseX <= cudlik.x + cudlik.width &&
        mouseY >= cudlik.y &&
        mouseY <= cudlik.y + cudlik.height
    );
}

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
    sipecka.render(ctx);
    sipecka.updatePos();
}

canvas.addEventListener('click', () => {
    if (isMouseOverButton()) {
        koule.render(ctx);
    }
});


window.setInterval(Mainloop, 5, true);
