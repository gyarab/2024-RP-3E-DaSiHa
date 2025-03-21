import { Ledvadva } from "../../Game_01_Ledvadva/main.js";
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import { Solid } from "../../Monkey-Engine/PlatformerLib.js";
//@-------------------------------VISUALS----------------------------------@//
const Backgrnd = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Background.png");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Farground-2.png");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Midground.png");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"../Game_01_Ledvadva/sprites/Lvl-02/Forground.png");
//@------------------------------STRUCTURE---------------------------------@//
////---------//                 Solid                         ////
    const _0001 = new Solid(  16, 1032, 1888,  32); //ground
////---------//                 Cacti                         ////
    const _0002 = new Solid( 216,  908,   68, 124);
    const _0003 = new Solid( 588,  984,   60,  48);
    const _0004 = new Solid(1056,  908,   68, 124);
const HitBoxes = [
    _0001, _0002, _0003, _0004
];
//@-------------------------------RENDER-----------------------------------@//
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
    export function restart_02(){ 
        Ledvadva.players[0].moveTo(1000,680);
        Ledvadva.players[1].moveTo(1300,680);

        Ledvadva.shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function _02_RENDER(){
        if (Ledvadva.shouldRestart){ restart_02();}
        Backgrnd.render(ctx);
        Fargrnd.render(ctx);
        
        Ledvadva.players[0].updatePos(HitBoxes);
        Ledvadva.players[0].updateImage();
        Ledvadva.players[0].render(ctx, Ledvadva.Modes.infoMode);

        Ledvadva.players[1].updatePos(HitBoxes);
        Ledvadva.players[1].updateImage();
        Ledvadva.players[1].render(ctx, Ledvadva.Modes.infoMode);


        Midgrnd.render(ctx);
        Forgrnd.render(ctx);

        if (Ledvadva.Modes.infoMode) {
            HitBoxes.forEach(hitbox => hitbox.render(ctx));
            Ledvadva.infoBar.render(ctx);
        }
    }