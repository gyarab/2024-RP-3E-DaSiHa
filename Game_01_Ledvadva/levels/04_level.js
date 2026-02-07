//@-------------------------------IMPORTS-----------------------------------@//

import { Ledvadva, RENDER_IRIS, RENDER_MODES, RENDER_PLAYERS, RESET_IRIS, RESET_PLAYERS } from "../../Game_01_Ledvadva/main.js";
import { Solid, Platform } from "../../Monkey-Engine/PlatformerLib.js";
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { SpriteDyna } from "../../Monkey-Engine/SpriteDyna.js";
import { SpriteStack } from "../../Monkey-Engine/SpriteStack.js";
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
import { Tetragon } from "../../Monkey-Engine/Tetragon.js";
//@------------------------------STRUCTURE----------------------------------@//


//@-------------------------------VISUALS-----------------------------------@//
const pathToLvl   = "../Game_01_Ledvadva/sprites/Lvl-04/";

////---------//                    Clock                   ////
const pathToHub = "../Game_01_Ledvadva/sprites/Hub/";
const cSize = 4;
class Clock extends Sprite {
    
    constructor(x, y) {

        super(x, y, 45 * cSize, 45 * cSize, pathToHub + "dial.png");

        this.size = cSize;
        this.lastUpdate = 0;   

        this._radius = 20 * cSize;
        this._armPos = {
            _hour:   0,
            _minute: 0,
            _second: 0
        }
    }

    /** /// updatePos() ///
     * 
     * @param {number} animSlow 
     */
    updatePos(animSlow = 10){
       this.lastUpdate += 1;
        if (this.lastUpdate <  animSlow) return;
        else this.lastUpdate = 0;

        const now = new Date();
        console.log(now.getSeconds());
        
        const seconds = now.getSeconds();
        const minutes = now.getMinutes() + seconds / 60;
        const hours   = (now.getHours() % 12) + minutes / 60;
        
        this._armPos._second  = seconds * (Math.PI * 2 / 60);
        this._armPos._minute  = minutes * (Math.PI * 2 / 60);
        this._armPos._hour    = hours   * (Math.PI * 2 / 12);
    
    }

    /** /// render() ///
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {boolean} rBox 
     */
    render(ctx, rBox) {
        super.render(ctx, rBox);
        const centerX = this._x + (this._width / 2) - (cSize / 2);
        const centerY = this._y + (this._height / 2) - (cSize / 2);

        ctx.fillStyle = "#2f2f2f"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius,   'hour',   this._armPos._hour, this.size);
        ctx.fillStyle = "#515151"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius, 'minute', this._armPos._minute, this.size);
        ctx.fillStyle = "#717171"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius, 'second', this._armPos._second, this.size);
        
    }
}

/** /// drawClockHand() ///
 * 
 * @param {CanvasRenderingContext2D} ctx - convest context
 * @param {{x: number, y: number}} cPoint - center point
 * @param {number} radius - length of the clock hand
 * @param {'hour' | 'minute' | 'second'} type - type of hand to draw 
 * @param {number} angle - (0 to 2pi) clockwise from 12 o'clock
 */
function drawClockHand(ctx, cPoint, radius, type, angle) {
    const styles = {
        hour:   { length: 0.5, width: 2 },
        minute: { length: 0.7, width: 2 },
        second: { length: 0.8, width: 2 }
    };

    const a = angle - Math.PI / 2;
    const s = styles[type].length;

    const ex = cPoint.x + Math.cos(a) * radius * s;
    const ey = cPoint.y + Math.sin(a) * radius * s;

    drawPixelLine(ctx, { x: cPoint.x, y: cPoint.y}, { x: ex , y: ey  }, styles[type].width * cSize);
}

/** /// drawPixelLine() ///
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {{x: number, y: number}} start 
 * @param {{x: number, y: number}} end 
 * @param {number} size 
 * @returns 
 */
function drawPixelLine(ctx, start, end, size) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

        const steps = Math.max(Math.abs(dx), Math.abs(dy))/ (size * 0.5);

    if (steps === 0) return;

    const xInc = dx / steps;
    const yInc = dy / steps;

    let x = start.x;
    let y = start.y;

    for (let i = 0; i <= steps; i++) {
        ctx.fillRect(
            Math.round(x),
            Math.round(y),
            cSize,
            cSize
        );
        x += xInc;
        y += yInc;
    }
}


const c = new Clock(0, 0);
////---------//                    Train                   ////
const pathToTrain = "../Game_01_Ledvadva/sprites/Lvl-02/Train/";
const tSize = 4;
const engine = new SpriteStack();
const cart   = new SpriteStack();
const trainBlueprint = new Sprite(0, 0, 833*tSize, 83*tSize, pathToTrain + "train-blueprint-3.png");
////---------//                   Engine                   ////

const wheels = new SpriteStack();
const fenders = new SpriteStack();
const undercarriage = new SpriteStack();
const base  = new Sprite(0,0,223*tSize, 82*tSize, pathToTrain + "base.png");

const bW = new SpriteAnim(0, 0, 23*tSize, 23*tSize, [ 
    pathToTrain +  "wheel/1.png", pathToTrain + "wheel/2.png" ,
    pathToTrain +  "wheel/3.png", pathToTrain + "wheel/4.png" ,
    pathToTrain +  "wheel/5.png",
]); 
bW._animSlow = 20;
const sW  = new SpriteAnim(0, 0, 17*tSize, 17*tSize, [
    pathToTrain +  "wheelie/1.png", pathToTrain + "wheelie/2.png"
]);
sW._animSlow = 16 ;

wheels.push(
    bW.clone().moveTo(  0*tSize,  4*tSize),
    bW.clone().moveTo( 33*tSize,  4*tSize),
    bW.clone().moveTo( 60*tSize,  4*tSize),
    bW.clone().moveTo( 91*tSize,  4*tSize),
    sW.clone().moveTo(124*tSize, 11*tSize),
    sW.clone().moveTo(141*tSize, 11*tSize)
);

const piston = new SpriteAnim( 0, 0, 138*tSize, 27*tSize,[
    pathToTrain + "piston/1.png", pathToTrain + "piston/2.png", 
    pathToTrain + "piston/3.png", pathToTrain + "piston/4.png",
    pathToTrain + "piston/5.png", pathToTrain + "piston/6.png", 
    pathToTrain + "piston/7.png", pathToTrain + "piston/8.png",
]);
piston._animSlow = 32;

const bF = new Sprite(0,0, 21*tSize, 9*tSize, pathToTrain + "fender.png");
fenders.push(
    bF.clone().moveTo( 34*tSize,  1*tSize),
    bF.clone().moveTo( 61*tSize,  1*tSize)
);

undercarriage.push(wheels, piston, fenders);


engine.push(
    base, undercarriage.moveTo(42*tSize, 55*tSize)
);

/*
////---------//                Cart                       ////
const cWheel = new SpriteStack();
const cWheels = new SpriteStack();  
const cart    = new SpriteStack();
const cTop    = new SpriteStack();
const cMiddle = new SpriteStack();
const cBottom = new SpriteStack();

const cRoof = new Sprite(0, 0, 126*tSize, 10*tSize, pathToTrain + "roof/s.png");
cTop.push(cRoof); cTop.moveTo(3*tSize, 0*tSize);

const cMidBase = new SpriteAnim(0, 0, 124*tSize, 46*tSize,[pathToTrain + "cart/t1.png"       , pathToTrain + "cart/t2.png"       ]);
const cDoor    = new SpriteAnim(0, 0,  30*tSize, 46*tSize,[pathToTrain + "cart/door/t1.png"  , pathToTrain + "cart/door/t2.png"  ]);
const cWin1    = new SpriteAnim(0, 0,  11*tSize,  7*tSize,[pathToTrain + "cart/window/t1.png", pathToTrain + "cart/window/t2.png"]);
const topRail  = new SpriteAnim(0, 0, 126*tSize,  5*tSize,[pathToTrain + "topRail/1.png"     , pathToTrain + "topRail/2.png"     ]);
const botRail  = new SpriteAnim(0, 0, 126*tSize,  7*tSize,[pathToTrain + "botRail/1.png"]);
const cInside  = new SpriteAnim(0, 0, 124*tSize, 46*tSize,[pathToTrain + "cart/1.png"   ]);
const cShadow  = new Sprite    (0, 0, 124*tSize, 46*tSize,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
const cBars    = new SpriteAnim(0, 0,  18*tSize, 15*tSize,[
    pathToTrain + "cart/bars/1.png", pathToTrain + "cart/bars/2.png", 
    pathToTrain + "cart/bars/3.png", pathToTrain + "cart/bars/4.png", 
    pathToTrain + "cart/bars/5.png", pathToTrain + "cart/bars/6.png",
]);

botRail.moveTo(0, 43*tSize); cDoor.moveTo(72*tSize, 1*tSize); cBars.moveTo( 78*tSize, 5*tSize);
const cWin2 = cWin1.clone(); cWin1.moveTo(57*tSize, 7*tSize); cWin2.moveTo(107*tSize, 7*tSize);


cMiddle.push(cInside, cShadow, cMidBase, botRail, cDoor, cWin1, cWin2, cBars, topRail); 
cMiddle.moveTo(4*tSize, 10*tSize);
cMiddle.forEach(part => {part._animSlow = 8;});  


const cg = new Sprite(17*tSize, 2*tSize,  28*tSize, 12*tSize, pathToTrain + "gear.png");
const cBotBase = new Sprite( 0,      0, 132*tSize,  9*tSize, pathToTrain + "undercarriage/s.png");
sw3.moveTo( 11*tSize, 3*tSize); sw4.moveTo( 33*tSize, 3*tSize); cWheel.push(sw3,sw4,cg);
cWheels.push(cWheel, cWheel.clone().moveTo(81*tSize, 2*tSize));
cBottom.push(cBotBase, cWheels); cBottom.moveTo(0,52*tSize);





cart.push(cBottom, cMiddle, cTop, topRail);

*/
//@-------------------------------RENDER------------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function RESTART_04(){ 
        ctx.reset();

        RESET_PLAYERS( {X:100, Y:960}, {X:100, Y:960} );
        RESET_IRIS();   
    }
////---------//                  LvlLoop                      ////
    //* flags for Mainloop *//
    let infoM;
    let pauseM;

    export function RENDER_04(){
        infoM = Ledvadva.modes.infoMode;
        pauseM = Ledvadva.modes.pause;

        if (Ledvadva.shouldRestart){
            Ledvadva.iris.zoomDir = 1;
            Ledvadva.iris.lockedOn = Ledvadva.players[0];
            Ledvadva.modes.pause = true;
            RESTART_04();
        }
        RENDER_IRIS(ctx);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        c.render(ctx, infoM);
        c.updatePos();

        //cart.render(ctx, infoM);
        //cart.updateImage();
        engine.moveTo(50, 500);
        //engine.render(ctx, infoM);
        undercarriage.updateImage();

        RENDER_MODES(ctx, );
    }
