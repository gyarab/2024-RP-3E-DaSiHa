import { _00_RENDER , restart_00} from './levels/00_mainHub.js';
import { _01_RENDER , restart_01} from './levels/01_level.js';
import { _02_RENDER , restart_02} from './levels/02_level.js';
import { _03_RENDER , restart_03} from './levels/03_level.js';

import { Sprite } from  '../Monkey-Engine/Sprite.js';
import { Player } from  '../Monkey-Engine/PlatformerLib.js';

//@------------------------> Ledvadva Manager <--------------------@//
const Ledvadva = {
    players : [
        new Player(0, 0,"SKIN-00"),
        new Player(0, 0,"SKIN-01"),
    ],
    Modes : {
        Pause    : false,
        infoMode : false,
        EditMode : false            
    },
    currentlvl : 0,
    shouldRestart : true,
    infoBar : new Sprite(
        0,0,1920,1080,"../Game_01_Ledvadva/sprites/Indicators/infoBar.png"
    ),
};
window.addEventListener('load', () => {
    ////-----------------------canvasSetUp-----------------------////
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false; 
    ////-----------------------KeyBoard-Binds-----------------------////
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
    function handleKeyWasPressed(event){
        const { key } = event;
        const actions = {
            'e'    : () => Ledvadva.players[0]._wantInteract = 'action',
            'f'    : () => Ledvadva.players[0]._wantInteract = 'backward',
            'g'    : () => Ledvadva.players[0]._wantInteract = 'forward',

            'Shift': () => Ledvadva.players[1]._wantInteract = 'action',
            'k'    : () => Ledvadva.players[1]._wantInteract = 'backward',
            'l'    : () => Ledvadva.players[1]._wantInteract = 'forward',

            'i'    : () => Ledvadva.Modes.infoMode = !Ledvadva.Modes.infoMode
        }; 
        if (actions[key]) actions[key]();
    }
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
            case 0: _00_RENDER(); break;
            case 1: _01_RENDER(); break;
            case 2: _02_RENDER(); break;
            case 3: _03_RENDER(); break;
            case 4: _04_RENDER(); break;
            default: console.error("Level not found"); break;
        }
        Ledvadva.players[0]._wantInteract = "none";
        Ledvadva.players[1]._wantInteract = "none";
    }
    window.setInterval(Mainloop, 6, true);
});
export { Ledvadva };