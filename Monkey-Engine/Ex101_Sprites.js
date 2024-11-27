import {Sprite} from './Sprite.js';
import {SpriteAnim} from './SpriteAnim.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const s1 = new Sprite(10,10,500,500,null,'green');
s1.render(ctx);

const s2 = new Sprite(700,20,100,100,"/Game_01_Ledvadva/sprites/stand.png");

s2.render(ctx);

const s3 = new SpriteAnim(20,20,100,100,[
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png",
])

function s3loop (){
    s1.render(ctx);
    s3.render(ctx);
    s3.updateImage();
}
window.setInterval(s3loop, 80);