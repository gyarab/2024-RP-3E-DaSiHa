//@-------------------------------IMPORTS-----------------------------------@//
import { SpriteStack } from "../../Monkey-Engine/SpriteStack.js";
import { Sprite }     from '../../Monkey-Engine/Sprite.js';
import { Ledvadva } from "../main.js";

//@------------------------------STRUCTURE----------------------------------@//
////---------//                      Solid                     ////
////---------//                    SemiSolid                   ////
////---------//                    Platforms                   ////
////---------//                   Projectiles                  ////
////---------//                    Pushable                    ////
////---------//                  Interactable                  ////
    ////---------//          Endlevel / LevelSelect        ////
    ////---------//      Selectors / Switchs / Buttons     ////

let HitBoxes  = new SpriteStack();
let Structure = new SpriteStack();
//@-------------------------------VISUALS-----------------------------------@//
const pathTolvl = "../Game_01_Ledvadva/sprites/Lvl-N/";
const Backgrnd = new Sprite(0, 0, 1920, 1080,"");
const Fargrnd  = new Sprite(0, 0, 1920, 1080,"");
const Midgrnd  = new Sprite(0, 0, 1920, 1080,"");
const Forgrnd  = new Sprite(0, 0, 1920, 1080,"");

//@-------------------------------RENDER------------------------------------@//

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function RESTART_N(){ 
        ctx.reset();
        Ledvadva.players[0].moveTo(0,0);
        Ledvadva.players[1].moveTo(0,0);
        Ledvadva.shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function RENDER_N(){
        if (Ledvadva.shouldRestart){ RESTART_N();}
        Ledvadva.RENDER_IRIS(ctx);
        Ledvadva.RENDER_PLAYERS(ctx, Structure);
        Ledvadva.RENDER_MODES(ctx, HitBoxes);
        
    }
