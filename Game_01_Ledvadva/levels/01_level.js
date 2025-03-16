import { Scissors, Solid, Platform, Box, Ball } from '../../Monkey-Engine/PlatformerLib.js';
import { Rectangle} from '../../Monkey-Engine/Rectangle.js';
import {  Player  } from '../../Monkey-Engine/PlatformerLib.js';
import { Ledvadva } from '../main.js';

//@------------------------------ VISUALS----------------------------------@//

//@------------------------------STRUCTURE----------------------------------@//
const Enemy = new Scissors(200,1080);
Enemy._isGoUp = true

const b1 = new Rectangle( 100, 500, 500, 500, "purple"); 
const w3 = new Rectangle( 600, 800, 200, 200, "purple"); 

const w5 = new Platform( 300, 920, 200, 16);
const w6 = new Platform( 300, 830, 200, 16);
const w7 = new Platform( 300, 740, 200, 16);
const w8 = new Platform( 300, 650, 200 ,16);
const w0 = new Platform( 300, 560, 200, 16);


const floor = new Solid(0, 1000, 1920, 80);
const cell  = new Solid(0, 0, 1920, 16);
const box   = new Box(750, 871, 2);
let walls;

//@------------------------------ RENDER----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

export function _01_RENDER(){
    ctx.clearRect(0,0,1920, 1080);

    walls = [
        b1, 
        w0,w3,w5,w6,w7,w8,
        floor, cell,box,
        Ledvadva.players[0], Ledvadva.players[1]
    ];

    for (let wall of walls) {
        wall.render(ctx, true);
    }
    

    Ledvadva.players[1].updatePos(walls);
    Ledvadva.players[1].updateImage();
    Ledvadva.players[1].render(ctx);

    Ledvadva.players[0].updatePos(walls);
    Ledvadva.players[0].updateImage();
    Ledvadva.players[0].render(ctx);

    box.updatePos(walls);

    Enemy.render(ctx,true);
    Enemy.updatePos();
    Enemy.updateImage()

    if (Enemy._y + Enemy._height < 0 ){
        Enemy._y = 1080;
    };
    Ledvadva.players[0]._wantInteract = "none";
    Ledvadva.players[1]._wantInteract = "none";
}
