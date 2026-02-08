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

////---------//                    Train                   ////
const pathToTrain = "../Game_01_Ledvadva/sprites/Lvl-02/Train/";
const tSize = 4;
const engine = new SpriteStack();
const cart   = new SpriteStack();
const test = new SpriteStack();
const trainBlueprint = new Sprite(0, 0, 833*tSize, 83*tSize, pathToTrain + "train-blueprint-3.png");
////---------//                   Engine                   ////
const pathToEngine = pathToTrain + "engine/";;

const bTop = new Sprite(44*tSize,  0*tSize, 106*tSize, 47*tSize, pathToEngine + "baseTop.png");
const bMid = new Sprite( 6*tSize, 46*tSize, 142*tSize, 10*tSize, pathToEngine + "baseMid.png");
const bBot = new Sprite( 0*tSize, 54*tSize, 131*tSize, 15*tSize, pathToEngine + "baseBot.png");
test.push(bBot,bMid,bTop).moveTo(0, 25*tSize);

const lantern = new Sprite(  0*tSize,  0*tSize, 16*tSize, 28*tSize, pathToEngine + "lantern.png");
const cabin   = new Sprite( 0*tSize,  0*tSize, 75*tSize, 45*tSize, pathToEngine + "cabin.png"  );
const wheeler = new Sprite(131*tSize, 81*tSize, 40*tSize, 13*tSize, pathToEngine + "wheeler.png");
const chimney = new Sprite(133*tSize, 16*tSize, 19*tSize, 37*tSize, pathToEngine + "chimney.png");
const bell    = new Sprite( 95*tSize, 36*tSize, 11*tSize, 17*tSize, pathToEngine + "bell.png"   );
const plow    = new Sprite(149*tSize, 67*tSize, 43*tSize, 27*tSize, pathToEngine + "plow.png"   );

test.push(wheeler, plow, bell, chimney, lantern);

const wheels = new SpriteStack();
const fenders = new SpriteStack();
const undercarriage = new SpriteStack();
const eBase  = new Sprite(0,0,223*tSize, 82*tSize, pathToTrain + "base.png");

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
    eBase, undercarriage.moveTo(42*tSize, 55*tSize)
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
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        //cart.render(ctx, infoM);
        //cart.updateImage();
        engine.moveTo(50, 500);
        engine.render(ctx, infoM);
        undercarriage.updateImage();

        test.render(ctx, infoM);

        RENDER_MODES(ctx, );
    }
