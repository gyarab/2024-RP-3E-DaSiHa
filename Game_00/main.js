// @Autor: Bendl Šimon
//@------------------------------imports----------------------------------@//
import { Sprite } from "../../Monkey-Engine/Sprite.js";
import {  Iris  } from "../../Monkey-Engine/Circle.js";
import { RENDER_00, RESTART_00 } from "../../Game_00/levels/00_lobby.js";
import { Player } from "../../Game_00/assets/PlatformerLib2.0.js";
import { RectSolid, DynaBisc } from "../../Monkey-Engine/2.0.js";
//@------------------------------exports-----------------------------------@//
/// pathTo ///
const pathToGame = "../../Game_00/";
const pathTo =  {
    game   : pathToGame              ,
    engine : "../../Monkey-Engine/"  ,
    levels  : pathToGame + "levels/" ,
    assets  : pathToGame + "assets/" ,
    sounds  : pathToGame + "sounds/" ,
    sprites : pathToGame + "sprites/",
    hints   : pathToGame + "sprites/hints/"  ,

}
export { pathTo };

/// Ledvadva ///
const Ledvadva =  {
    shouldRestart : true,
    currentlvl : 0,
    modes : {
        pause : false,
        info  : false,
        edit  : false            
    },
    bars : {
        pause : new Sprite( 0, 0, 1920, 1080,
            pathTo.hints + "pauseMode.png"
        ),
        info : new Sprite( 0, 0, 1920, 1080,
            pathTo.hints + "infoMode.png"
        ),
        edit : new Sprite( 0, 0, 1920, 1080,
            pathTo.hints + "editMode.png"
        )
    },

};
export { Ledvadva };

/// Players ///
const Players =  {
    RED : {
        skin : new Player(0,0,"SKIN-00"),
        body : new RectSolid(0, 0, 14*4, 31*4)  //todo: player rig 
    },
    BLU :{
        skin : new Player(0,0,"SKIN-01"),
        body : new RectSolid(0, 0, 14*4, 31*4) //todo: player rig
    }
}
Players.RED.body.Dyna = Players.RED.skin.Dyna = new DynaBisc();
Players.BLU.body.Dyna = Players.BLU.skin.Dyna = new DynaBisc();

export { Players };

/// Effects ///
const Effects =  {
    iris : new Iris(0,0,0),
}
export { Effects };

/// LevelRestarts ///
const LevelRestarts = {
    0: RESTART_00,
    // add more as you add levels
};
export { LevelRestarts };

//@-------------------------------helpFunc---------------------------------@//

/// switchMode() ///
function switchMode(mode){
    Ledvadva.modes[mode] = !Ledvadva.modes[mode];
}
/// backToLobby() ///
function backToLobby(){
    Ledvadva.currentlvl = 0;
    Ledvadva.shouldRestart = true;
}

//@---------------------------------main-----------------------------------@//
window.addEventListener('load', () => {

    //// Keyboard ////

    /// setup ///
    const pressedKeys = new Set();
    window.addEventListener('keydown' , event => {
        handleKeyUpAndDown(event,  true);
        handleKeyDown(event);
    });
    window.addEventListener('keyup', event => {
        handleKeyUpAndDown(event, false);
        handleKeyUp(event);
    });
    function handleKeyDown (event){ 
        if(!pressedKeys.has(event.key)){
            pressedKeys.add(event.key);
        }
    }
    function handleKeyUp (event){
        pressedKeys.delete(event.key);
        handleKeyWasPressed(event); 
    }

    /// clicked keys ///
    function handleKeyWasPressed(event){
        const { key } = event;
        const actions = {
            'e'    : () => Ledvadva.players[0]._wantInteract = 'action',
            'f'    : () => Ledvadva.players[0]._wantInteract = 'backward',
            'g'    : () => Ledvadva.players[0]._wantInteract = 'forward',

            'Shift': () => Ledvadva.players[1]._wantInteract = 'action',
            'k'    : () => Ledvadva.players[1]._wantInteract = 'backward',
            'l'    : () => Ledvadva.players[1]._wantInteract = 'forward',

            'i'    : () => switchMode("info"),
            'p'    : () => switchMode("pause"),
            '>'    : () => backToLobby(),

            'r'    : () => Ledvadva.shouldRestart = true,
        }; 
        if (actions[key]) actions[key]();
    }

    /// pressed keys ///
    function handleKeyUpAndDown(event, isDown){
        const { key } = event;
        const actions = {
            'w': () => Ledvadva.players[0]._wantJump     = isDown,
            'a': () => Ledvadva.players[0]._wantGoLeft   = isDown,
            'd': () => Ledvadva.players[0]._wantGoRight  = isDown,
            's': () => Ledvadva.players[0]._wantGoDown   = isDown,

            'ArrowUp'   : () => Ledvadva.players[1]._wantJump     = isDown,
            'ArrowLeft' : () => Ledvadva.players[1]._wantGoLeft   = isDown,
            'ArrowRight': () => Ledvadva.players[1]._wantGoRight  = isDown,
            'ArrowDown' : () => Ledvadva.players[1]._wantGoDown   = isDown,
        };
        if (actions[key]) {
            event.preventDefault();
            actions[key]();
        }
        if (actions[key]) actions[key]();
    }

    //// Canvas setup  ////
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');
    
    /// @Override default canvas reset function  
    const _reset = ctx.reset.bind(ctx);
    ctx.reset = function () {
        _reset();
        this.imageSmoothingEnabled = false;
    };
    
    ////  Mainloop()  ////
    let lastTime = performance.now();
    function Mainloop(time) {
        let dt = (time - lastTime) / 1000;
        lastTime = time;
        dt = Math.min(dt, 0.05);
        
        switch (Ledvadva.currentlvl) {
            case 0: RENDER_00(dt); break;
            //case 1: RENDER_01(dt); break;
            //case 2: RENDER_02(dt); break;
            //case 3: RENDER_03(dt); break;
            //case 4: RENDER_04(dt); break;
            default: console.error("Level not found"); break;
        }
        //Ledvadva.players[0]._wantInteract = "none";
        //Ledvadva.players[1]._wantInteract = "none";

        requestAnimationFrame(Mainloop);
    }
    requestAnimationFrame(Mainloop);

});
//@---------------------------Ledvadva functions--------------------------------@//

/** /// playersColideWith() ///
 *  Checks if any of the players colides with the given object
 *  @param {Point} object - object to check colision with
 *  @returns the index of the player coliding or false
 */
export function playersColideWith(object){
    if (Players.RED.body.doesColideWith(object)) return 0;
    if (Players.BLU.body.doesColideWith(object)) return 1;
    return false;
}

/** /// RENDER_PLAYERS() ///
 * renders and updates both players if not paused 
 * @param {CanvasRenderingContext2D} ctx - context
 * @param {*} LvlStructure
 * @returns void
 */
export function RENDER_PLAYERS(ctx, LvlStructure){
    if (!Ledvadva.modes.pause){
        Players.BLU.skin.updateImage();
        Players.RED.skin.updateImage();
    }
    Players.BLU.skin.render(ctx, Ledvadva.modes.info);
    Players.RED.skin.render(ctx, Ledvadva.modes.info);  
}

/** /// RESET_PLAYERS() ///
 * resets both players to given positions and stops their movement
 * @param {x: number, y: number}
 * @param {x: number, y: number}
 * @return void
 */
export function RESET_PLAYERS({x:x0, y:y0}, {x:x1, y:y1}){
    x0  &&   y0  && Players.RED.body.moveTo(x0, y0);
    Players.RED.body.Dyna._velocity = {x:0, y:0};
    Players.RED.skin.Graphic._setCurrentNamed("stand")

    x1  &&   y1  && Players.BLU.moveTo(x1, y1);
    Players.BLU.body.Dyna._velocity = {x:0, y:0};
    Players.BLU.skin.Graphic._setCurrentNamed("stand")
}

/** /// RENDER_MODES() ///
 * renders info mode related stuff if active
 * @param {CanvasRenderingContext2D} ctx - context
 * @param {SpriteStack} HitBoxes 
 */
export function RENDER_MODES(ctx, HitBoxes){
    if (Ledvadva.modes.info){
        if (HitBoxes.length > 0) HitBoxes.render(ctx, true);
        Ledvadva.infoBar.render(ctx);
    }
}

/** /// RENDER_IRIS() ///
 * renders the iris effect if active
 * @param {CanvasRenderingContext2D} ctx - context
 * @returns void
 */
export function RENDER_IRIS(ctx, dt){
    Effects.iris.updatePos(dt);
    if (Effects.iris._zoomDir !== 0){
        Effects.iris.render(ctx);
    }
    if ( Effects.iris._zoomDir === -1){
        if (Effects.iris._radius <= Effects.iris._MIN_RADIUS){
            Effects.iris.zoomDir = 1;        }
    }
    if ( Effects.iris._zoomDir === 1){
        if(Effects.iris._radius >= Effects.iris._MAX_RADIUS ){
            Effects.iris.zoomDir = 0;
            Ledvadva.modes.pause = false;
            Ledvadva.shouldRestart = false;
        }
       
    }
}
