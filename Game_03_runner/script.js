const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const pozadi = new Sprite(0, 0, 1915, 1080);
pozadi.loadImg("hra.jpg");

const character = new CharacterSprite1(120, 690, 185, 210);

character._id = "dinosaurus";
character._framesRunning = [
    "/Game_03_runner/sprites/faze1.png",
]

//hlavní herní smyčka
function Mainloop(){
    pozadi.render(ctx);
    character.render(ctx);
    character.updatePos();
}
window.setInterval(Mainloop, 1, true);
