//@-------------------------------IMPORTS-----------------------------------@//

import { Ledvadva, RENDER_IRIS, RENDER_MODES, RENDER_PLAYERS, RESET_IRIS, RESET_PLAYERS } from "../../Game_01_Ledvadva/main.js";
import { Solid, Platform } from "../../Monkey-Engine/PlatformerLib.js";
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { SpriteDyna } from "../../Monkey-Engine/SpriteDyna.js";
import { SpriteStack } from "../../Monkey-Engine/SpriteStack.js";
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
import { Tetragon } from "../../Monkey-Engine/Tetragon.js";

//@------------------------------STRUCTURE----------------------------------@//
////---------//                      Solid                     ////
    const _0001 = new Solid(  92,    8,  708,   24);
    const _0002 = new Solid(  68,   32,   24, 1028);
    const _0003 = new Solid(  92, 1060, 1428,   12);
    const _0004 = new Solid( 852,   68,  832,   24);
    const _0005 = new Solid(  92,  748,  696,   12);
    const _0006 = new Solid(  92,  904,  576,   12);  
    const _0007 = new Solid( 252,  592, 1460,   12);
    const _0008 = new Solid( 252,  436, 1272,   12);
    const _0009 = new Solid( 252,  388,   24,   48);
    const _0010 = new Solid( 932,  844,  592,   12);
    const _0011 = new Solid( 620,  236, 1064,   12);
    const _0012 = new Solid(1684,   92,   24,  500);
    const _0013 = new Solid(1008,  386,  420,   52);
    const _0014 = new Solid(1800,  668,   24,  196); _0012._color = 'black'

    const _7014 = new Tetragon(
        {x: 1522,y: 1064},{x: 1800, y: 866},
        {x: 1814,y:  866},{x: 1520, y: 1070},
        'red'
    ); _7014._strokeWidth = 4;
    const _7015 = new Tetragon(
        {x:  790, y: 750},{x:  930, y: 848},
        {x: 930, y: 854},{x:   790, y: 756},
        'red'
    ); _7015._strokeWidth = 4;  

////---------//                    Platforms                   ////
    const _3001 = new Platform( 1524, 844, 280, 12);

////---------//                    Pushable                    ////
////---------//                  Interactable                  ////
    ////---------//          Endlevel / LevelSelect        ////
    ////---------//      Selectors / Switchs / Buttons     ////
    const hitboxes = [
        _0001, _0002, _0003, _0004, _0005, _0006,
        _0007, _0008, _0009, _0010, _0011, _0012,
        _0013, _0014,
        _3001,
        _7014, _7015,
    ]
//@-------------------------------VISUALS-----------------------------------@//
const pathTolvl   = "../Game_01_Ledvadva/sprites/Lvl-03/";
const Backgrnd = new Sprite(68, 0, 1760, 1080, pathTolvl +"Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"");

const barrel = new SpriteAnim(964, 964, 264, 112, [ 
    pathTolvl +  "spil/1.png", pathTolvl + "spil/2.png" ,
    pathTolvl +  "spil/3.png", pathTolvl + "spil/4.png" ,
    pathTolvl +  "spil/5.png", pathTolvl + "spil/6.png" ,
    pathTolvl +  "spil/7.png", pathTolvl + "spil/8.png" ,
    pathTolvl +  "spil/9.png", pathTolvl + "spil/10.png",
    pathTolvl + "spil/11.png", pathTolvl + "spil/12.png",
]);
barrel._animSlow = 5;

////---------//                    Train                   ////
    const pathToTrain = "../Game_01_Ledvadva/sprites/Lvl-02/Train/";
    const tSize = 4; 
    const base  = new Sprite(0,0,223*tSize, 82*tSize, pathToTrain + "base.png");
    const train = new SpriteStack();

    ////---------//             wheelsAndPiston            ////
    const trainBlueprint = new SpriteDyna(0, 0, 833*tSize, 83*tSize, [
        "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-3.png"
    ]);
    const wheels = new SpriteStack();
    const wheelsAndPiston = new SpriteStack();

    for (let i = 0; i < 4; i++) {
        const w = new SpriteAnim(0, 0, 23*tSize, 23*tSize, [ 
            pathToTrain +  "wheel/1.png", pathToTrain + "wheel/2.png" ,
            pathToTrain +  "wheel/3.png", pathToTrain + "wheel/4.png" ,
            pathToTrain +  "wheel/5.png",
        ]);
        w._animSlow = 20;
        wheels.push(w);
    }

    const sw1  = new SpriteAnim(0, 0, 17*tSize, 17*tSize, [pathToTrain +  "wheelie/1.png", pathToTrain + "wheelie/2.png"]);
    sw1._animSlow = 16 ;
    const sw2 = sw1.clone(); const sw3 = sw1.clone(); const sw4 = sw1.clone();
    sw1.moveTo(124*tSize, 11*tSize);    wheels.push(sw1);
    sw2.moveTo(141*tSize, 11*tSize);    wheels.push(sw2);

    wheels[0].moveTo(  0*tSize, 4*tSize); wheels[0]._currentFrame = 1;
    wheels[1].moveTo( 33*tSize, 4*tSize); wheels[1]._currentFrame = 1;
    wheels[2].moveTo( 60*tSize, 4*tSize); wheels[2]._currentFrame = 1;
    wheels[3].moveTo( 91*tSize, 4*tSize); wheels[3]._currentFrame = 1;

    const piston = new SpriteAnim( 0, 0, 138*tSize, 27*tSize,[
        pathToTrain + "piston/1.png", pathToTrain + "piston/2.png", pathToTrain + "piston/3.png", pathToTrain + "piston/4.png",
        pathToTrain + "piston/5.png", pathToTrain + "piston/6.png", pathToTrain + "piston/7.png", pathToTrain + "piston/8.png",
    ]);
    piston._animSlow = 32;

    const fenders = new SpriteStack();
    for (let i = 0; i < 2; i++) {const f = new Sprite(0,0, 21*tSize, 9*tSize, pathToTrain + "fender.png"); fenders.push(f);}
    fenders[0].moveTo( 34*tSize,  1*tSize);
    fenders[1].moveTo( 61*tSize,  1*tSize);


    wheelsAndPiston.push(wheels, piston, fenders);
    wheelsAndPiston.moveTo(42*tSize, 55*tSize);
    train.push(base, wheelsAndPiston);

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


//@-------------------------------RENDER------------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function RESTART_03(){ 
        ctx.reset();

        RESET_PLAYERS( {X:100, Y:960}, {X:100, Y:960} );
        RESET_IRIS();   
    }
////---------//                  LvlLoop                      ////
    //* flags for Mainloop *//
    let infoM;
    let pauseM;

    export function RENDER_03(){
        infoM = Ledvadva.modes.infoMode;
        pauseM = Ledvadva.modes.pause;

        if (Ledvadva.shouldRestart){
            Ledvadva.iris.zoomDir = 1;
            Ledvadva.iris.lockedOn = Ledvadva.players[0];
            Ledvadva.modes.pause = true;
            RESTART_03();
        }
        RENDER_IRIS(ctx);

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        Backgrnd.render(ctx);
+
        barrel.render(ctx);
        barrel.updateImage();

        RENDER_PLAYERS(ctx, hitboxes);

        cart.render(ctx, infoM);
        cart.updateImage();
        train.moveTo(50, 500);
        train.render(ctx, infoM);
        wheelsAndPiston.updateImage();

        RENDER_MODES(ctx);
    }
