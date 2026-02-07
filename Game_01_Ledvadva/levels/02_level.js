//@------------------------------IMPORTS----------------------------------@//
import { SpriteStack } from "../../Monkey-Engine/SpriteStack.js";
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import { Rectangle } from "../../Monkey-Engine/Rectangle.js";
import { SpriteDyna } from "../../Monkey-Engine/SpriteDyna.js";
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
import { Platform, SemiSolid, Solid, PointerToHub, PointerToHubSprite }
from "../../Monkey-Engine/PlatformerLib.js";
import { RENDER_PLAYERS , RENDER_IRIS, RENDER_MODES, 
         Ledvadva, RESET_PLAYERS, RESET_IRIS, playersColideWith,      }
from "../../Game_01_Ledvadva/main.js";

//@------------------------------STRUCTURE---------------------------------@//
////---------//                 Arrows                        ////
const arrows = new SpriteStack();
for (let i = 0; i < 16; i++) {
    const arrow = new SpriteDyna(50 + (i * 120), -800, 12, 12, [
        "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/1.png",
        "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/2.png",
        "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/3.png",
        "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/2.png",
    ]);
    arrow._renderWidth =   20  ; arrow._renderHeight = 100;
    arrow._renderDir   = "top" ; arrow._ySpeed = 6;
    arrows.push(arrow);
}
////---------//                 Warnings                      ////
const warnings = new SpriteStack();
for (let i = 0; i < 16; i++) {
    const warn = new SpriteAnim(0,0,20,100,[
        "../Game_01_Ledvadva/sprites/Indicators/warn-0.png",
        "../Game_01_Ledvadva/sprites/Indicators/warn-1.png"
    ]);
warn.animSlow = 20;
warnings.push(warn);
}
////---------//                 Solid                         ////
const _0001 = new Solid(   16, 1032, 1888,    32); //ground
const _0007 = new Solid( 1916,    0,    12, 1080); //left wall
const _0008 = new Solid(    8,    0,    12, 1080); //right wall

const _1007 = new Rectangle(  708,  780,  376,   12); _1007._color = "grey";
const _1008 = new Rectangle( 1136,  780,  376,   12); _1008._color = "grey";
const _1009 = new Rectangle(  610,  608,  476,   12); _1009._color = "grey";
const _1010 = new Rectangle( 1136,  608,  476,   12); _1010._color = "grey";
////---------//               SemiSolid                       ////
const _s001 = new SemiSolid(  600,  620,  10,  160);
const _s002 = new SemiSolid( 1084,  620,  10,  160);
const _s003 = new SemiSolid( 1126,  620,  10,  160);
const _s004 = new SemiSolid( 1610,  620,  10,  160);
////---------//                 Platform                      ////
const _1001 = new Platform(  628,  820,  60,   12); _1001._color = "grey";
const _1002 = new Platform(  628,  800,  60,   12); _1002._color = "grey";
const _1003 = new Platform(  628,  780,  60,   12); _1003._color = "grey";

const _1004 = new Platform(  1534,  820,  60,   12); _1004._color = "grey";
const _1005 = new Platform(  1534,  800,  60,   12); _1005._color = "grey";
const _1006 = new Platform(  1534,  780,  60,   12); _1006._color = "grey";

const platforms = [_1001, _1002, _1003, _1004, _1005, _1006,];
////---------//                 Cacti                         ////
const _0002 = new Rectangle( 216,  908,   68, 124, 'green');
const _0003 = new Rectangle( 588,  984,   60,  48, 'green');
const _0004 = new Rectangle(1056,  908,   88, 124, 'green');
const _0005 = new Rectangle(1448,  984,   60,  48, 'green');
const _0006 = new Rectangle(1808,  908,   72, 124, 'green');
////---------//               Endlevel                 ////
const endOfLevel0 = new PointerToHub( 820, 704, 152, 76,);
const endOfLevel1 = new PointerToHub(1248, 704, 152, 76);
const HitBoxes = [
_s001, _s002, _s003, _s004,
_0001, _0002, _0003, _0004, _0005, _0006, _0007, _0008,
_1001, _1002, _1003, _1004, _1005, _1006, _1007, _1008, _1009, _1010,
endOfLevel0, endOfLevel1
];

//@-------------------------------VISUALS----------------------------------@//
const pathTolvl = "../Game_01_Ledvadva/sprites/Lvl-02/";
const Backgrnd = new Sprite(0, 0, 1920, 1080,pathTolvl + "Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,pathTolvl + "Farground-2.png");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,pathTolvl + "Midground-2.png");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,pathTolvl + "Forground-2.png");
const Game_0   = new PointerToHubSprite(  820, 704, 152, 73,[
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games_d.png",
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games.png"
], endOfLevel0 );
const Game_1   = new PointerToHubSprite(1248, 704, 152, 76,[
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games_d.png",
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games.png"
], endOfLevel1 );
const Train    = new SpriteDyna(0, 536, 3332, 332, [
    pathTolvl + "train-blueprint-3.png",
    pathTolvl + "train-blueprint-0.png",
    pathTolvl + "train-blueprint-1.png",
    pathTolvl + "train-blueprint-2.png",
]);
Train._xSpeed = 0.35 * 5; 

//@-------------------------------RENDER-----------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
    export function RESTART_02(){
        ctx.reset();
        
        Train.moveTo(-3332, 536);
        Train.isGoRight = true;

        relWawe = 1; 
        absWawe = 1; 
        activ = 0; 

        arrows.y = defArrY;
        arrows.isGoDown = false;
        arrows.isGoRight = false;
        arrows.isGoLeft = false;
        arrows.xSpeed = 0;

        arrows.forEach((arr, i) => {
            arr.x = 50 + (i * 120);
        });

        warnings.y = -2000;

        RESET_PLAYERS( {X:1000, Y:900}, {X:1300, Y:900} );
        RESET_IRIS();
    }
////---------//                  Wawe_01                      ////
    let activ = 0;
    let relWawe = 1;
    let absWawe = 1;
    const defArrY = -800;
    const wind = 0.3;

    function RENDER_ARROWS(lastOne = false){
        if (!Ledvadva.modes.pause){
            arrows.forEach(arrow => {
                //const under = arrow._y > 1080;
                //const onScreen = arrow._y >= 0 && arrow._y <= 1080;
                //const above = arrow._y + arrow._height < 0;            

                // above the screen
                if (arrow._y > defArrY && arrow._y < (- arrow._height)) {
                    //const distance = Math.abs(arrow._y + arrow._height); 
                    //arrow._animSlow = Math.max(2, 10 - Math.floor(distance));
                    warnings[arrows.indexOf(arrow)].moveTo(arrow._x, 0);
                    warnings[arrows.indexOf(arrow)].updateImage();
                }else
                // falling down the screen
                if (arrow._isGoDown == true) { 
                    if (arrow._isGoDown == true){
                        warnings[arrows.indexOf(arrow)].y = -2000;
                        arrow.xSpeed = wind;
                        arrow.isGoRight = wind > 0;
                        arrow.isGoLeft  = wind < 0;
                    }
                }
                // under the screen (already fallen)
                if (arrow._y > 1080 + arrow._renderHeight) { 
                    arrow._isGoDown = false;
                    if (arrows.every(a => !a._isGoDown)) {
                        if (!lastOne){relWawe += 1; absWawe += 1;} 
                        else relWawe = 1;
                        arrows.forEach((arrow, index) => {     
                            let ofset = (Math.random() * 100) - 40;
                            arrow.x = 50 + (index * 120) + ofset; 
                            arrow.y = defArrY;
                            arrow._isGoDown = false;
                            arrow._isGoRight = false;
                            arrow._isGoLeft = false;
                            activ = 0;
                        });
                    }
                }
                arrow.updatePos();
            });
        }
        //randomly animated arrows
        if (Math.random() > 0.5) { arrows.updateImage(); }
        arrows.render(ctx, infoM); warnings.render(ctx);
        
    }
    function wawe_type(type, lastOne = false){
        const lineOfActiv = 1080 / 8 + defArrY;
        switch (type){
            case "wawe-forward":
                if (activ < arrows.length) {
                    if (arrows[activ]._y > lineOfActiv) { activ = (activ + 1); }
                    else { arrows[activ]._isGoDown = true; }
                }
            break;
            case "wawe-backward":
                if (activ < arrows.length) {
                    if (arrows[arrows.length - 1 - activ]._y > lineOfActiv) { activ = (activ + 1); }
                    else { arrows[arrows.length - 1 - activ]._isGoDown = true; }
                }
            break;
            case "umbrella":
                if (activ < arrows.length / 2) {
                    if (arrows[activ]._y > lineOfActiv) { activ = (activ + 1); }
                    else { arrows[activ]._isGoDown = true; arrows[arrows.length - 1 - activ]._isGoDown = true;}
                }
            break;
            case "arrow":
                if (activ <= arrows.length / 2) {
                    const middleIndex = Math.floor(arrows.length / 2);
                    if (arrows[middleIndex + activ] && arrows[middleIndex + activ]._y >lineOfActiv) { activ = (activ + 1); }
                    else { 
                        if (arrows[middleIndex + activ]) arrows[middleIndex + activ]._isGoDown = true; 
                        if (middleIndex - activ >= 0 && arrows[middleIndex - activ]) {
                            arrows[middleIndex - activ]._isGoDown = true;
                        }
                    }
                }
            break;
        }
        RENDER_ARROWS(lastOne);
    }
////---------//                  LvlLoop                      ////
    //* flags for Mainloop *//
    let infoM;
    let pauseM;

    export function RENDER_02(){
        infoM = Ledvadva.modes.infoMode;
        pauseM = Ledvadva.modes.pause;
        
        if (Ledvadva.shouldRestart){
            Ledvadva.iris.zoomDir = 1;
            Ledvadva.iris.lockedOn = Ledvadva.players[0];
            Ledvadva.modes.pause = true;
            RESTART_02();
        }
        RENDER_IRIS(ctx);

        arrows.forEach(arrow => {
            const spike = new Rectangle(arrow._x , arrow._y , arrow._width , arrow._height);
            spike.color = "white";
            spike.render(ctx);
            //*
            if (Ledvadva.players[0].doesColideWith(arrow) || Ledvadva.players[1].doesColideWith(arrow)) {
                Ledvadva.shouldRestart = true;
            }
            /**/
        });


        Backgrnd.render(ctx);
        Fargrnd.render(ctx);

        let renderInside = [];
        if (Train._x >= 0) { 
            Train._isGoRight = false;
            platforms.forEach(platform => platform._color = "orange");
            const play0 = Ledvadva.players[0]._pointOfJump.y < 780;
            const play1 = Ledvadva.players[1]._pointOfJump.y < 780;

            if (play0){_1007._color = "red"; _1009._color = "red";}
            else { _1007._color = "grey"; _1009._color = "grey"; }
            if (play1){_1008._color = "red"; _1010._color = "red";}
            else { _1008._color = "grey"; _1010._color = "grey"; }
            
            if ((play0 && !play1)) {
                Train._currentFrame = 1;
                renderInside[0] = true;
            } else 
            if ((play1 && !play0)) {
                Train._currentFrame = 2;
                renderInside[1] = true;
            } else
            if ((play0 &&  play1)) { 
                Train._currentFrame = 3;
                renderInside[0] = true;
                renderInside[1] = true;
            } else
                Train._currentFrame = 0;
                Train.render(ctx);
        }
        Train.render(ctx); Train.updatePos();
        if(renderInside[0]){Game_0.render(ctx);}
        if(renderInside[1]){Game_1.render(ctx);}

        RENDER_PLAYERS(ctx, HitBoxes);

        Midgrnd.render(ctx);

        //RENDER ARROWS AND WARNINGS
        switch (relWawe) {
            case 1: wawe_type("wawe-forward"); break;
            case 2: wawe_type("wawe-backward"); break;
            case 3: wawe_type("umbrella"); break;
            case 4: wawe_type("arrow", Train._isGoRight); break;  
        }

        if(!infoM)Forgrnd.render(ctx);
        RENDER_MODES(ctx, HitBoxes);
    }
    