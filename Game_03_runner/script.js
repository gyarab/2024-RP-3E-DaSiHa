const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';
import { SpriteDyna }       from '../Monkey-Engine/SpriteDyna.js';
import { SpriteAnim }       from '../Monkey-Engine/SpriteAnim.js';
import { Rectangle }       from  '../Monkey-Engine/Rectangle.js';

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));
let score = 0;
let startTime = Date.now();

//const audio = new Audio('/Game_03_runner/sprites/hra.wav');
//audio.loop = true;

//audio.play();

//-----------------Překážky-----------------------
const obstic_1 = new SpriteDyna(600,750,200,220,[ 
    "/Game_03_runner/sprites/hrib.png",
    "/Game_03_runner/sprites/auto.png",
]);
obstic_1._isGoLeft = true;
obstic_1._xSpeed = 3;
obstic_1._animSlow = 0;
const obstic_2 = new SpriteDyna(1400,750,200,220,[ 
    "/Game_03_runner/sprites/muchomurka.png",
    "/Game_03_runner/sprites/mic.png",
]);
obstic_2._isGoLeft = true;
obstic_2._xSpeed = 3;
obstic_2._animSlow = 0;
//-----------------Colectables-----------------------
const bone_1 = new SpriteDyna(1100,820,100,110, [ 
    "/Game_03_runner/sprites/kost.png",
])
bone_1._isGoLeft = true;
bone_1._xSpeed = 3;
const bone_2 = new SpriteDyna(1100,820,100,110, [ 
    "/Game_03_runner/sprites/kost.png",
])
bone_2._isGoLeft = true;
bone_2._xSpeed = 3;
//-----------------Pozadí-----------------------
const pozadi = new SpriteDyna( 0, 0, 1915, 1080,[
    "/Game_03_runner/sprites/pozadi_les.jpg",
    "/Game_03_runner/sprites/pozadi_mesto.jpg"
]);
pozadi._xSpeed = 3;
pozadi._animSlow = 0;
pozadi._isGoLeft = true;
const pozadi2 = new SpriteDyna(1915, 0, 1915, 1080,[
    "/Game_03_runner/sprites/pozadi_les.jpg",
    "/Game_03_runner/sprites/pozadi_mesto.jpg"
]);
pozadi2._xSpeed = 3;
pozadi2._animSlow = 0;
pozadi2._isGoLeft = true;
//-----------------Pes-----------------------
const character = new CharacterSprite1(100, 690, 250, 310, [
    "/Game_03_runner/sprites/faze10.png",
    "/Game_03_runner/sprites/faze9.png",
    "/Game_03_runner/sprites/faze8.png",
    "/Game_03_runner/sprites/faze7.png",
    "/Game_03_runner/sprites/faze6.png",
    "/Game_03_runner/sprites/faze5.png",
    "/Game_03_runner/sprites/faze4.png",
    "/Game_03_runner/sprites/faze3.png",
    "/Game_03_runner/sprites/faze2.png",
    "/Game_03_runner/sprites/faze1.png"
]);
character._framesRunning = character._frames;
character._framesJumping = character._frames.slice(0,1);
//-----------------motýl-----------------------
const motyl = new SpriteAnim(1300,400,150,110,[ 
    "/Game_03_runner/sprites/motyl_faze1.png",
    "/Game_03_runner/sprites/motyl_faze2.png",
 ])
 motyl._animSlow = 35;
//-----------------UI-----------------------
const tlacitko = new Sprite(10, 10, 450, 350, [
    "/Game_03_runner/sprites/switch.png"
])


let isSwitched = false;
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    if (mouseX >= tlacitko._x && mouseX <= tlacitko._x + tlacitko._width &&
        mouseY >= tlacitko._y && mouseY <= tlacitko._y + tlacitko._height
        ){
            if(!gameOver){
                isSwitched = !isSwitched;
                pozadi.updateImage();
                pozadi2.updateImage();
                obstic_1.updateImage();
                obstic_2.updateImage();  
            }
            

        }
});

let gameOver = false;

const scoreContainer = null;

//hlavní herní smyčka
function Mainloop(){
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pozadi.render(ctx);
        pozadi2.render(ctx);
        
        const text = 'Game Over';
        const textWidth = ctx.measureText(text).width;
        const textHeight = 200;
        const padding = 240;
        ctx.fillStyle = 'white';
        ctx.fillRect(
            (canvas.width - textWidth) / 2 - padding, 
            (canvas.height - textHeight) / 2 - padding, 
            textWidth + padding * 2, 
            textHeight + padding * 2
        );

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeRect(
            (canvas.width - textWidth) / 2 - padding, 
            (canvas.height - textHeight) / 2 - padding, 
            textWidth + padding * 2, 
            textHeight + padding * 2
        );

        ctx.fillStyle = 'black';
        ctx.font = '200px Sheriff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 50);

        ctx.font = '90px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 100);

        return;
    }

    const currentTime = Date.now();
    score = Math.floor((currentTime - startTime) / 500);

    pozadi.render(ctx); 
    pozadi.updatePos();
    pozadi2.render(ctx);
    pozadi2.updatePos();

    const scoreWidth = 250;
    const scoreHeight = 80;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(canvas.width - scoreWidth - 30, 30, scoreWidth, scoreHeight);

    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Score: ${score}`, canvas.width - 50, 70);

    if (pozadi._x <=  -pozadi._width){ pozadi._x = pozadi2._x + pozadi2._width;}
    if (pozadi2._x <= -pozadi2._width){pozadi2._x =  pozadi._x +  pozadi._width;}

    character.render(ctx);
    character.updatePos();

    motyl.render(ctx);
    motyl.updateImage();

    tlacitko.render(ctx);

    obstic_1.render(ctx,isSwitched);
    obstic_1.updatePos();

    obstic_2.render(ctx,isSwitched);
    obstic_2.updatePos();

    bone_1.render(ctx);
    bone_1.updatePos();

   

    if(obstic_1._x < (0 - obstic_1._width)){
        obstic_1.x = pozadi._width;
    }
    if (obstic_2._x < (0 - obstic_2._width)) {
        obstic_2.x = pozadi._width;
    }
    if (bone_1._x < (0 - bone_1._width)) {
        bone_1.x = (obstic_1._x + obstic_2._x) / 2
    }

    const characterHitbox = new Rectangle(character._x + 60, character._y + 60, character._width - 120, character._height - 120);
    if (characterHitbox.doesColideWith(obstic_1) || characterHitbox.doesColideWith(obstic_2)){
        console.log('Kolize');
        gameOver = true;
    }
    if (isSwitched) {
        characterHitbox.render();
    }  
}
window.setInterval(Mainloop, 6, true);
function handleKey(event, isDown) {
    const { key } = event;
    if (key === ' ') {
        event.preventDefault();
    }
    const actions = {
        ' ': () =>{
           
            if(gameOver){
                gameOver = false;
                startTime = Date.now();
                character._x = 100;
                character._y = 690;
                obstic_1._x = 600;
                obstic_2._x = 1400;
            }else{
                character._wantJump = isDown
            }
        } 

    };
    if (actions[key]) actions[key]();
}