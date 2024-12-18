const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';

const pozadi = new Sprite(0, 0, 1080, 720);
pozadi.loadImg("bowling.png");

const character = new   CharacterSprite1(120, 480, 75, 110);


//hlavní herní smyčka
function Mainloop(){
    pozadi.render(ctx);
}
window.setInterval(Mainloop, 1, true);
