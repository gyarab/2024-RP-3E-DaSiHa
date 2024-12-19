const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const background = new Sprite(0, 0, 1920, 1100);
background.loadImg("/Game_02_dakynovyKoule/bowling.png");

const kuzelka1 = new Sprite(896, 155, 100, 90);
kuzelka1.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka2 = new Sprite(857, 152, 100, 90);
kuzelka2.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka3 = new Sprite(935, 152, 100, 90);
kuzelka3.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka4 = new Sprite(818, 150, 100, 90);
kuzelka4.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka7 = new Sprite(974, 150, 100, 90);
kuzelka7.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka8 = new Sprite(779, 145, 100, 90);
kuzelka8.loadImg("/Game_02_dakynovyKoule/kuzelka.png");

const kuzelka10 = new Sprite(1013, 145, 100, 90);
kuzelka10.loadImg("/Game_02_dakynovyKoule/kuzelka.png");


const character = new CharacterSprite1(790, 600, 350, 400);

character._id = "sipka";
character._framesRunning = [
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
    "/Game_02_dakynovyKoule/sipecka.png"

]


function Mainloop(){
    background.render(ctx);
    kuzelka1.render(ctx);
    kuzelka2.render(ctx);
    kuzelka3.render(ctx);
    kuzelka4.render(ctx);
    kuzelka7.render(ctx);
    kuzelka8.render(ctx);
    kuzelka10.render(ctx);
    character.render(ctx);
    character.updatePos();
}
window.setInterval(Mainloop, 6, true);

