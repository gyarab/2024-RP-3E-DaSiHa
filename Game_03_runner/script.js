const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const pozadi = new Sprite(0, 0, 1915, 1080);
pozadi.loadImg("hra.jpg");

const character = new CharacterSprite1(120, 690, 185, 210);
const motyl = new CharacterSprite1(1520, 490, 100, 110);

character._id = "pes";
character._framesRunning = [
    "/Game_03_runner/sprites/faze10.png",
    "/Game_03_runner/sprites/faze9.png",
    "/Game_03_runner/sprites/faze8.png",
    "/Game_03_runner/sprites/faze7.png",
    "/Game_03_runner/sprites/faze6.png",
    "/Game_03_runner/sprites/faze5.png",
    "/Game_03_runner/sprites/faze4.png",
    "/Game_03_runner/sprites/faze3.png",
    "/Game_03_runner/sprites/faze2.png",
    "/Game_03_runner/sprites/faze1.png",
]

motyl._id = "motyl";
motyl._framesRunning = [
    "/Game_03_runner/sprites/motyl_faze1.png",
    "/Game_03_runner/sprites/motyl_faze2.png",
]


//hlavní herní smyčka
function Mainloop(){
    pozadi.render(ctx);
    character.render(ctx);
    character.updatePos();
    motyl.render(ctx);
    motyl.updatePos();
}
window.setInterval(Mainloop, 1, true);
