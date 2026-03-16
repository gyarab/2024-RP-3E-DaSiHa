//@-------------------------------RENDER------------------------------------@//

import { Ledvadva, RESET_IRIS, RESET_PLAYERS } from "../main.js";

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function RESTART_N(){
    Ledvadva.iris.zoomDir = 1;
    Ledvadva.iris.lockedOn = Ledvadva.players[0];
    Ledvadva.modes.pause = true;
    ctx.reset();

    RESET_PLAYERS();
    RESET_IRIS();
    Ledvadva.shouldRestart = false;
}
////---------//                Initialize                     ////
// flags for LvlLoop
let infoM;
let pauseM;
// structure of the level
let structure;

////---------//                  LvlLoop                      ////


export function RENDER_N(){
    infoM = Ledvadva.modes.info;
    pauseM = Ledvadva.modes.pause;

    if (Ledvadva.shouldRestart){ 
        
        RESTART_N();
    }
    
    Ledvadva.RENDER_IRIS(ctx);
    Ledvadva.RENDER_PLAYERS(ctx, Structure);
    Ledvadva.RENDER_MODES(ctx, HitBoxes);
    
}