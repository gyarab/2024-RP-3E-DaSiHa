const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const background = new Sprite(0, 0, 1920, 1100);
background.loadImg("/Game_02_dakynovyKoule/bowling.png");

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
    character.render(ctx);
    character.updatePos();
}
window.setInterval(Mainloop, 6, true);

