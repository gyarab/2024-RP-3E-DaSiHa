//@------------------------------imports------------------------------------@//
import { Effects, Ledvadva, RENDER_IRIS, RESET_PLAYERS, RENDER_PLAYERS, pathTo } from "../main.js";
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import { Clock } from "../assets/Clock.js";
//@------------------------------STRUCTURE----------------------------------@//

//@------------------------------ VISUALS----------------------------------@//
const spPath = "../../Game_00/sprites/Lvl-00/";
//                          ( 0  *4, 0  *4, 0  *4, 0  *4, spPath + "            "  );
const backgrnd  = new Sprite( 0  *4, 0  *4, 480*4, 270*4, spPath + "backgrnd.png"  );
const blueprint = new Sprite( 0  *4, 0  *4, 480*4, 270*4, spPath + "blueprint.png" );
const desk      = new Sprite( 270*4, 177*4, 182*4,  91*4, spPath + "desk.png"      );
const computer  = new Sprite( 407*4, 117*4,  30*4,  62*4, spPath + "computer.png"  );
const monitor   = new Sprite( 329*4, 131*4,  70*4,  49*4, spPath + "monitor.png"   );
const clock     = new  Clock( 408*4, 20*4);

//@-------------------------------RENDER------------------------------------@//
////---------//                  Restart                      ////
export function RESTART_00(){
    

    //RESET_PLAYERS();
}
////---------//                Initialize                     ////
// flags for LvlLoop
let infoM;
let pauseM;
// structure of the level
let structure;

////---------//                  LvlLoop                      ////


export function RENDER_00(dt){
    infoM = Ledvadva.modes.info;
    pauseM = Ledvadva.modes.pause;
    ctx.reset();
    if (Ledvadva.shouldRestart){ 
        if (Effects.iris._zoomDir === 0){
            Effects.iris.radius = 0;
            Effects.iris.zoomDir = 1;
            Effects.iris.lockedOn = desk;
            Ledvadva.modes.pause = true;
        }
        
    }
    RENDER_IRIS(ctx, dt);

    //if (pauseM) return;
    backgrnd.render(ctx);
    blueprint.render(ctx);
    desk.render(ctx);
    computer.render(ctx);
    monitor.render(ctx);
    clock.render(ctx, infoM).updatePos();

    //Ledvadva.RENDER_PLAYERS(ctx, structure);
    // Ledvadva.RENDER_MODES(ctx, HitBoxes);
    
}