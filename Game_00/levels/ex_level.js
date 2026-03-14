//@-------------------------------RENDER------------------------------------@//

import { RESET_IRIS } from "../main";
import { RESET_PLAYERS } from "../main";

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
////---------//                  Restart                      ////
export function RESTART_N(){ 
    ctx.reset();
    RESET_PLAYERS();
    RESET_IRIS();

    Ledvadva.shouldRestart = false;
}
////---------//                  LvlLoop                      ////
// flags for M
let infoM;
let pauseM;
export function RENDER_N(){
    if (Ledvadva.shouldRestart){ RESTART_N();}
    
    Ledvadva.RENDER_IRIS(ctx);
    Ledvadva.RENDER_PLAYERS(ctx, Structure);
    Ledvadva.RENDER_MODES(ctx, HitBoxes);
    
}