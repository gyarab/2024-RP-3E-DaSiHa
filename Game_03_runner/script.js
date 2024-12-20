const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const pozadi = new Sprite(0, 0, 1080, 720);
pozadi.loadImg("hra.jpg");

const character = new CharacterSprite1(120, 480, 75, 110);

character._id = "dinosaurus";
character._framesRunning = [
    "/Game_03_runner/sprites/runner1.png",
    "/Game_03_runner/sprites/runner2.png",
    "/Game_03_runner/sprites/runner3.png",
    "/Game_03_runner/sprites/runner4.png",
    "/Game_03_runner/sprites/runner5.png",
]

//hlavní herní smyčka
function Mainloop(){
    pozadi.render(ctx);
    character.render(ctx);
    character.updatePos();
}
window.setInterval(Mainloop, 1, true);
