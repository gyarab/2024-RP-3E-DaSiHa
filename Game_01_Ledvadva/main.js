// @Autor: Bendl Šimon
//@------------------------------IMPORTS----------------------------------@//
import { RENDER_00, RESTART_00} from './levels/00_mainHub.js';
import { RENDER_01, RESTART_01} from './levels/01_level.js';
import { RENDER_02, RESTART_02} from './levels/02_level.js';  
import { RENDER_03, RESTART_03} from './levels/03_level.js';
import { RENDER_04, RESTART_04} from './levels/04_level.js';

import { Sprite } from  '../Monkey-Engine/Sprite.js';
import { Iris }   from  '../Monkey-Engine/Circle.js';
import { Player } from  '../Monkey-Engine/PlatformerLib.js';
//@------------------------------MAIN-------------------------------------@//
////------------------------> Ledvadva Manager <--------------------////
const Ledvadva = {
    players : [
        new Player(0, 0,"SKIN-00"),
        new Player(0, 0,"SKIN-01")
    ],
    modes : {
        pause    : false,
        infoMode : false,
        editMode : false            
    },
    currentlvl : 4,
    shouldRestart : true,
    infoBar : new Sprite(
        0,0,1920,1080,"../Game_01_Ledvadva/sprites/Indicators/infoBar.png"
    ),
    iris : new Iris(0, 0, 0),
};
export { Ledvadva };
////------------------------>  Keyboard Binds  <--------------------////
window.addEventListener('load', () => {
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
    ////-----------------------canvasSetUp--------------------------////
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; 
    const _reset = ctx.reset.bind(ctx);
    ctx.reset = function () {
        _reset();
        this.imageSmoothingEnabled = false;
    };
    ////----------------------- Clicked keys -----------------------////
    function handleKeyWasPressed(event){
        const { key } = event;
        const actions = {
            'e'    : () => Ledvadva.players[0]._wantInteract = 'action',
            'f'    : () => Ledvadva.players[0]._wantInteract = 'backward',
            'g'    : () => Ledvadva.players[0]._wantInteract = 'forward',

            'Shift': () => Ledvadva.players[1]._wantInteract = 'action',
            'k'    : () => Ledvadva.players[1]._wantInteract = 'backward',
            'l'    : () => Ledvadva.players[1]._wantInteract = 'forward',

            'i'    : () => Ledvadva.modes.infoMode = !Ledvadva.modes.infoMode,
            'p'    : () => Ledvadva.modes.pause    = !Ledvadva.modes.pause,
            'r'    : () => Ledvadva.shouldRestart = true,
        }; 
        if (actions[key]) actions[key]();
    }
    ////----------------------- Pressed keys -----------------------////
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

            '>'    : () => {Ledvadva.currentlvl = 0; Ledvadva.shouldRestart = true},
        };
        if (actions[key]) {
            event.preventDefault();
            actions[key]();
        }
        if (actions[key]) actions[key]();
    }
    ////--------------------------Mainloop---------------------------////
    let lastTime = performance.now();
    function Mainloop(time) {
        let dt = (time - lastTime) / 1000;
        lastTime = time;
        dt = Math.min(dt, 0.05);
        
        switch (Ledvadva.currentlvl) {
            case 0: RENDER_00(dt); break;
            case 1: RENDER_01(dt); break;
            case 2: RENDER_02(dt); break;
            case 3: RENDER_03(dt); break;
            case 4: RENDER_04(dt); break;
            default: console.error("Level not found"); break;
        }
        Ledvadva.players[0]._wantInteract = "none";
        Ledvadva.players[1]._wantInteract = "none";

         requestAnimationFrame(Mainloop);
    }
    requestAnimationFrame(Mainloop);

});
//@---------------------------Ledvadva functions--------------------------------@//

/** /// playersColideWith() ///
 *  Checks if any of the players colides with the given object
 *  TODO: doesColide works only for Tetragons so far
 *  @param {Point} object - object to check colision with
 *  ? returns are a bit funky clunky ?
 *  @returns the index of the player coliding or false
 */
export function playersColideWith(object){
    if (Ledvadva.players[0].doesColideWith(object)) return 0;
    if (Ledvadva.players[1].doesColideWith(object)) return 1;
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
        Ledvadva.players[1].updatePos(LvlStructure);
        Ledvadva.players[1].updateImage();
        Ledvadva.players[0].updatePos(LvlStructure);
        Ledvadva.players[0].updateImage();
        
    }
    Ledvadva.players[1].render(ctx, Ledvadva.modes.infoMode);
    Ledvadva.players[0].render(ctx, Ledvadva.modes.infoMode);  
}

/** /// RESET_PLAYERS() ///
 * resets both players to given positions and stops their movement
 * @param {x: number, y: number}
 * @param {x: number, y: number}
 * @return void
 */
export function RESET_PLAYERS({X:x0, Y:y0}, {X:x1, Y:y1}){
    x0  &&   y0  && Ledvadva.players[0].moveTo(x0, y0);
    Ledvadva.players[0]._xVelocity = 0; 
    Ledvadva.players[0]._yVelocity = 0;
    Ledvadva.players[1]._currentFrame = 0;
    x1  &&   y1  && Ledvadva.players[1].moveTo(x1, y1);
    Ledvadva.players[1]._xVelocity = 0; 
    Ledvadva.players[1]._yVelocity = 0;
    Ledvadva.players[1]._currentFrame = 0;
}

/** /// RENDER_MODES() ///
 * renders info mode related stuff if active
 * @param {CanvasRenderingContext2D} ctx - context
 * @param {SpriteStack} HitBoxes 
 */
export function RENDER_MODES(ctx, HitBoxes){
    if (Ledvadva.modes.infoMode){
        if (HitBoxes.length > 0) HitBoxes.render(ctx, true);
        Ledvadva.infoBar.render(ctx);
    }
}

/** /// RENDER_IRIS() ///
 * renders the iris effect if active
 * @param {CanvasRenderingContext2D} ctx - context
 * @returns void
 */
export function RENDER_IRIS(ctx){
    if (Ledvadva.iris._isZoomin){
        Ledvadva.iris.render(ctx);
        Ledvadva.iris.updatePos();
    }
}
    
/** /// RESET_IRIS() ///
 * resets the iris to default state
 * @return void
 */
export function RESET_IRIS(){
    if (Ledvadva.iris._radius >= Ledvadva.iris._MAX_RADIUS){
        Ledvadva.shouldRestart = false;
        Ledvadva.modes.pause = false;
        Ledvadva.iris.zoomDir = 0;
        Ledvadva.iris.radius = Ledvadva.iris._MIN_RADIUS;
    }
}