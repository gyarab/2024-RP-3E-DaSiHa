import { Ledvadva } from "../../Game_01_Ledvadva/main.js";
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import { Rectangle } from "../../Monkey-Engine/Rectangle.js";
import { Platform, Solid } from "../../Monkey-Engine/PlatformerLib.js";
import { SpriteDyna } from "../../Monkey-Engine/SpriteDyna.js";
import { SpriteAnim } from "../../Monkey-Engine/SpriteAnim.js";
//@-------------------------------VISUALS----------------------------------@//
const Backgrnd = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Farground-2.png");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Midground-2.png");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Forground-2.png");
const Train    = new SpriteDyna(-3332, 536, 3332, 332, [
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-3.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-0.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-1.png",
    "../Game_01_Ledvadva/sprites/Lvl-02/train-blueprint-2.png",
]);
Train._xSpeed = 0.35;
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
    const _0001 = new Solid(   16, 1032, 1888,   32); //ground
    const _0007 = new Solid( 1916,    0,    12, 1080); //left wall
    const _0008 = new Solid(    8,    0,    12, 1080); //right wall
////---------//                 Platform                      ////
    const _1001 = new Platform(  200,  900,  200,   32); //platform
    const _1002 = new Platform(  500,  900,  200,   32); //platform
////---------//                 Cacti                         ////
    const _0002 = new Rectangle( 216,  908,   68, 124, 'green');
    const _0003 = new Rectangle( 588,  984,   60,  48, 'green');
    const _0004 = new Rectangle(1056,  908,   88, 124, 'green');
    const _0005 = new Rectangle(1448,  984,   60,  48, 'green');
    const _0006 = new Rectangle(1808,  908,   72, 124, 'green');
const HitBoxes = [
    _0001, _0002, _0003, _0004, _0005, _0006, _0007, _0008
];
//@-------------------------------RENDER-----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
    export function restart_02(){ 
        Train._x = -3332; Train._isGoRight = true;
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
                //Ledvadva.shouldRestart = true;
            }
        });
        if (Ledvadva.shouldRestart){ restart_02();}
        

        Backgrnd.render(ctx);
        Fargrnd.render(ctx);

        if (Train._x >= 0) { Train._isGoRight = false;}
        Train.render(ctx); Train.updatePos();


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
            HitBoxes.forEach(hitbox => hitbox.render(ctx));
            Ledvadva.infoBar.render(ctx);
        }
    }