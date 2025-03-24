import { Ledvadva } from "../../Game_01_Ledvadva/main.js";
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import { Rectangle } from "../../Monkey-Engine/Rectangle.js";
import { 
    Platform, SemiSolid, Solid, PointerToHub, PointerToHubSprite
    } from "../../Monkey-Engine/PlatformerLib.js";
import { SpriteDyna } from "../../Monkey-Engine/SpriteDyna.js";
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
//@------------------------------STRUCTURE---------------------------------@//
////---------//                 Arrows                        ////
const arrows = [];
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
const warnings = [];
for (let i = 0; i < 16; i++) {
    const warn = new SpriteAnim(0,0,20,100,[
        "../Game_01_Ledvadva/sprites/Indicators/warn-0.png",
        "../Game_01_Ledvadva/sprites/Indicators/warn-1.png"
    ]);
warn._animSlow = 20;
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
const Backgrnd = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Farground-2.png");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Midground-2.png");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Forground-2.png");
const Game_0   = new PointerToHubSprite(  820, 704, 152, 73,[
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games_d.png",
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games.png"
], endOfLevel0 );
const Game_1   = new PointerToHubSprite(1248, 704, 152, 76,[
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games_d.png",
    "../Game_01_Ledvadva/sprites/Interactable/LevelSelect/games.png"
], endOfLevel1 );
const Train    = new SpriteDyna(0, 536, 3332, 332, [
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-3.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-0.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-1.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-2.png",
]);
Train._xSpeed = 0.35 * 2; 

//@-------------------------------RENDER-----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
    export function restart_02(){ 
        Train._x = -3332; Train.y = 536;
        Train._isGoRight = true;
        relWawe = 1; absWawe = 1; activ = 0; 
        arrows.forEach((arrow, index) => {
            arrow.y = defY;
            arrow.x = 50 + (index * 120);
            arrow._isGoDown = false;
            arrow._isGoRight = false;
            arrow._isGoLeft = false;
            arrow._xSpeed = 0;
        });
        warnings.forEach(warn => {
            warn.x = 0;
        });
        Ledvadva.players[0].moveTo(1000,900);
        Ledvadva.players[1].moveTo(1300,900);
        Ledvadva.shouldRestart = false;
    }
////---------//                  Wawe_01                      ////
    let activ = 0;
    let relWawe = 1;
    let absWawe = 1;
    const defY = -800;
    const wind = 0.3;

    function arrowsRenderAndColisons(lastOne = false){
        arrows.forEach(arrow => {
            if (arrow._y > defY && arrow._y < (- arrow._height)) {
                const distance = Math.abs(arrow._y + arrow._height);
                arrow._animSlow = Math.max(2, 10 - Math.floor(distance));
                warnings[arrows.indexOf(arrow)].x = arrow._x;
                warnings[arrows.indexOf(arrow)].y = 0;
                warnings[arrows.indexOf(arrow)].render(ctx);
                warnings[arrows.indexOf(arrow)].updateImage();
            }
            if (arrow._y > 1080 + arrow._renderHeight) { 
                arrow._isGoDown = false;
                if (arrows.every(a => !a._isGoDown)) {
                    if (!lastOne){relWawe += 1; absWawe += 1;} 
                    else relWawe = 1;
                    arrows.forEach((arrow, index) => {     
                        let ofset = (Math.random() * 100) - 40;
                        arrow.x = 50 + (index * 120) + ofset; 
                        arrow.y = defY;
                        arrow._isGoDown = false;
                        arrow._isGoRight = false;
                        arrow._isGoLeft = false;
                        activ = 0;
                    });
                }
            }else if (wind && arrow._isGoDown == true){
                arrow._isGoRight = wind > 0;
                arrow._isGoLeft = wind < 0;
                arrow._xSpeed = wind;
            }
            arrow.render(ctx, Ledvadva.Modes.infoMode);
            if (Math.random() > 0.5) { arrow.updateImage(); }
            arrow.updatePos();
        });
    }
    function wawe_type(type, lastOne = false){
        const lineOfActiv = 1080 / 8 + defY;
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
        arrowsRenderAndColisons(lastOne);
    }
////---------//                  LvlLoop                      ////
    export function _02_RENDER(){
        arrows.forEach(arrow => {
            const spike = new Rectangle(arrow._x , arrow._y , arrow._width , arrow._height);
            spike.color = "white";
            spike.render(ctx);
            if (Ledvadva.players[0].doesColideWith(arrow) || Ledvadva.players[1].doesColideWith(arrow)) {
                Ledvadva.shouldRestart = true;
            }
        });
        if (Ledvadva.shouldRestart){ restart_02();}
        
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

        Ledvadva.players[0].updatePos(HitBoxes);
        Ledvadva.players[0].updateImage();
        Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);

        Ledvadva.players[1].updatePos(HitBoxes);
        Ledvadva.players[1].updateImage();
        Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);

        Midgrnd.render(ctx);
        if(!Ledvadva.Modes.infoMode)Forgrnd.render(ctx);

        switch (relWawe) {
            case 1: wawe_type("wawe-forward"); break;
            case 2: wawe_type("wawe-backward"); break;
            case 3: wawe_type("umbrella"); break;
            case 4: wawe_type("arrow", Train._isGoRight); break;
            
        }
        if (Ledvadva.Modes.infoMode) {
            /*
            const pointOfJ = new Rectangle(
                Ledvadva.players[0]._pointOfJump.x -5,
                Ledvadva.players[0]._pointOfJump.y -5,
                10,10, "GREEN"
            );pointOfJ.render(ctx);
            */
            HitBoxes.forEach(hitbox => hitbox.render(ctx));
            Ledvadva.infoBar.render(ctx);
        }        
    }