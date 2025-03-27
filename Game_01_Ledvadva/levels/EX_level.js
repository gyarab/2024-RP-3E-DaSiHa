//@-------------------------------IMPORTS-----------------------------------@//

import { Ledvadva } from "../main.js";
import { Sprite }     from '../../Monkey-Engine/Sprite.js';

//@------------------------------STRUCTURE----------------------------------@//
////---------//                      Solid                     ////
////---------//                    SemiSolid                   ////
////---------//                    Platforms                   ////
////---------//                   Projectiles                  ////
////---------//                    Pushable                    ////
////---------//                  Interactable                  ////
    ////---------//          Endlevel / LevelSelect        ////
    ////---------//      Selectors / Switchs / Buttons     ////
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
export function restart_N(){ 

        Ledvadva.players[0].moveTo(0,0);
        Ledvadva.players[1].moveTo(0,0);
        Ledvadva.shouldRestart = false;
    }
////---------//                  LvlLoop                      ////
    export function _N_RENDER(){
        if (Ledvadva.shouldRestart){ restart_N();}

    }
