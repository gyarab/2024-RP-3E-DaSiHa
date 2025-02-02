const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';
import { SpriteAnim }       from '../Monkey-Engine/SpriteAnim.js';
import { SpriteDyna }       from '../Monkey-Engine/SpriteDyna.js';

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const hrib = new SpriteDyna(600,750,200,220, [ 
    "/Game_03_runner/sprites/hrib.png",
]);
hrib.id = "hrib"
hrib._isGoLeft = true;
hrib._xSpeed = 3;

const pozadi = new Sprite(0, 0, 1915, 1080);
pozadi.loadImg("/Game_03_runner/sprites/pozadi_les.jpg");
pozadi._xSpeed = 2;

const pozadi2 = new Sprite(pozadi._width, 0, 1915, 1080);
pozadi2.loadImg("/Game_03_runner/sprites/pozadi_les.jpg");
pozadi2._xSpeed = 2;

const character = new CharacterSprite1(100, 690, 250, 310);

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
character._framesJumping = [
    "/Game_03_runner/sprites/faze10.png",
];

const motyl = new SpriteDyna(1300,400,150,110,[ 
    "/Game_03_runner/sprites/motyl_faze1.png",
    "/Game_03_runner/sprites/motyl_faze2.png",
 ])
 motyl._animSlow = 35;



const muchomurka = new SpriteDyna(1400,750,200,220, [ 
    "/Game_03_runner/sprites/muchomurka.png",
])
muchomurka.id = "muchomurka"
muchomurka._xSpeed = 3;

const kost = new SpriteDyna(1100,820,100,110, [ 
    "/Game_03_runner/sprites/kost.png",
])
kost.id = "kost"

const tlacitko = new Sprite(100, 100, 200, 100, [
    "/Game_03_runner/sprites/button.png"
])
tlacitko.id = "tlacitko"

let isCityBackground = false;

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    if (mouseX >= tlacitko._x && mouseX <= tlacitko._x + tlacitko._width &&
        mouseY >= tlacitko._y && mouseY <= tlacitko._y + tlacitko._height) {

        if (isCityBackground) {
            pozadi.loadImg("/Game_03_runner/sprites/pozadi_les.jpg");
            pozadi2.loadImg("/Game_03_runner/sprites/pozadi_les.jpg");
        } else {
            pozadi.loadImg("/Game_03_runner/sprites/pozadi_mesto.jpg");
            pozadi2.loadImg("/Game_03_runner/sprites/pozadi_mesto.jpg");
        }
        isCityBackground = !isCityBackground;
    }
});


//hlavní herní smyčka
function Mainloop(){
    pozadi._x -= pozadi._xSpeed;
    pozadi2._x -= pozadi2._xSpeed;

    if (pozadi._x <= -pozadi._width) {
        pozadi._x = pozadi2._x + pozadi2._width;
    }
    if (pozadi2._x <= -pozadi2._width) {
        pozadi2._x = pozadi._x + pozadi._width;
    }

    pozadi.render(ctx);
    pozadi2.render(ctx);
    character.render(ctx, true);
    character.updatePos();
    motyl.render(ctx, true);
    motyl.updateImage();
    tlacitko.render(ctx);
    hrib._x -= hrib._xSpeed;
    muchomurka._x -= muchomurka._xSpeed;
    kost._x = (hrib._x + muchomurka._x) / 2;
    hrib.render(ctx,true);
    hrib.updateImage();
    muchomurka.render(ctx,true);
    muchomurka.updateImage();
    kost.render(ctx,true);
    kost.updateImage();

    if(hrib._x < (0 - hrib._width)){
        hrib._x = 1500;
    }
    if (muchomurka._x < (0 - muchomurka._width)) {
        muchomurka._x = 1500;
    }
    if (kost._x < (0 - kost._width)) {
        kost._x = (hrib._x + muchomurka._x) / 2;
    }
      
}
window.setInterval(Mainloop, 5, true);
function handleKey(event, isDown) {
    const { key } = event;
    if (key === ' ') {
        event.preventDefault();
    }
    const actions = {
        ' ': () => character._wantJump = isDown
    };
    if (isDown && key === ' ') {
        character._currentFrame = 0;
        character._frames = character._framesJumping;
    } else if (!isDown && key === ' ') {
        character._frames = character._framesRunning;
    }
    if (actions[key]) actions[key]();
}