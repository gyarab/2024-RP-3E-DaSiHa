const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

import { Sprite }           from '../Monkey-Engine/Sprite.js';
import { CharacterSprite1 } from '../Monkey-Engine/CharacterSprite1.js';
import { SpriteAnim }       from '../Monkey-Engine/SpriteAnim.js';
import { SpriteDyna }       from '../Monkey-Engine/SpriteDyna.js';

const pozadi = new Sprite(0, 0, 1915, 1080);
pozadi.loadImg("/Game_03_runner/sprites/pozadi_les.jpg");

const character = new CharacterSprite1(100, 590, 250, 310);

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

const motyl = new SpriteDyna(1300,400,150,110,[ 
    "/Game_03_runner/sprites/motyl_faze1.png",
    "/Game_03_runner/sprites/motyl_faze2.png",
 ])
 motyl._animSlow = 35;

 const hrib = new SpriteDyna(500,650,200,220, [ 
    "/Game_03_runner/sprites/hrib.png",
])
hrib.id = "hrib"

const muchomurka = new SpriteDyna(1100,650,200,220, [ 
    "/Game_03_runner/sprites/muchomurka.png",
])
muchomurka.id = "muchomurka"

const kost = new SpriteDyna(850,720,100,110, [ 
    "/Game_03_runner/sprites/kost.png",
])
kost.id = "kost"


//hlavní herní smyčka
function Mainloop(){
    pozadi.render(ctx);
    character.render(ctx);
    character.updatePos();
    motyl.render(ctx, true);
    motyl.updateImage();
    hrib.render(ctx,true);
    hrib.updateImage();
    muchomurka.render(ctx,true);
    muchomurka.updateImage();
    kost.render(ctx,true);
    kost.updateImage();
}
window.setInterval(Mainloop, 1, true);
