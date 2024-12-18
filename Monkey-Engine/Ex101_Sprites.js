import {Sprite} from './Sprite.js';
import {SpriteAnim} from './SpriteAnim.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
/*-----------------------------Sprite----------------------------------*/ 
const s1 = new Sprite(10,10,150,150,null,'green');
s1.render(ctx);

const s2 = new Sprite(250,10,150,150,"/Game_01_Ledvadva/sprites/stand.png");
s2.render(ctx);


const s3 = new Sprite(500,10,150,150)
s3.render(ctx);
s3.loadImg("/Game_01_Ledvadva/sprites/stand.png");
s3.render(ctx);
/*---------------------------SpriteAnim-------------------------------*/ 
const bluescreen = new Sprite (10,200,750,500,null,'blue');

const s4 = new SpriteAnim(20,250,150,150,[
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png",
])
const s5 = new SpriteAnim(250,250,150,150,["/Game_01_Ledvadva/sprites/runLeft_0.png"])

const s6 = new SpriteAnim(500,250,150,150,null,'red');
/* "opravit" s6 
s6.loadImg([
    "/Game_01_Ledvadva/sprites/runLeft_0.png",
    "/Game_01_Ledvadva/sprites/runLeft_1.png",
    "/Game_01_Ledvadva/sprites/runLeft_2.png",
    "/Game_01_Ledvadva/sprites/runLeft_3.png"
])
*/
function SpriteAnimLoop (){
    bluescreen.render(ctx);
    s4.render(ctx);
    s4.updateImage();

    s5.render(ctx);
    s5.updateImage();

    s6.render(ctx);
    s6.updateImage();
}
window.setInterval(SpriteAnimLoop, 100);