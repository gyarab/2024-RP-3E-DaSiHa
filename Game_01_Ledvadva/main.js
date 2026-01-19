// @Autor: Bendl Šimon

import { RENDER_00, RESTART_00} from './levels/00_mainHub.js';
import { RENDER_01, RESTART_01} from './levels/01_level.js';
import { RENDER_02, RESTART_02} from './levels/02_level.js';

import { Sprite } from  '../Monkey-Engine/Sprite.js';
import { Iris }   from  '../Monkey-Engine/Circle.js';
import { Player } from  '../Monkey-Engine/PlatformerLib.js';

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
    currentlvl : 0,
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
    function Mainloop() {
        switch (Ledvadva.currentlvl) {
            case 0: RENDER_00(); break;
            case 1: RENDER_01(); break;
            case 2: RENDER_02(); break;
            default: console.error("Level not found"); break;
        }
        Ledvadva.players[0]._wantInteract = "none";
        Ledvadva.players[1]._wantInteract = "none";
    }
    window.setInterval(Mainloop, 6, true);

});    
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

/** /// RENDER_MODES() ///
 * renders info mode related stuff if active
 * @param {CanvasRenderingContext2D} ctx - context
 * @param {SpriteStack} HitBoxes 
 */
export function RENDER_MODES(ctx, HitBoxes){
    if (Ledvadva.modes.infoMode){
        HitBoxes.forEach(hitbox => hitbox.render(ctx));
        Ledvadva.infoBar.render(ctx);
    }
}