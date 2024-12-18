/*
zkuste si to sami napsat pomocí Ex_102_CharS2.js
snad CharacterSprite1 funguje ani jsem to nezkoušel
*/

import { CharacterSprite1} from './CharacterSprite1.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const EX = new CharacterSprite1(50, 500, 85, 155);
EX._framesRunning = [
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png"
]
function Mainloop(){
    EX.updatePos();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    EX.render(ctx);       
}
window.setInterval(Mainloop, 10 , true);

function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        ' ': () => EX._wantJump = isDown
    };
    if (actions[key]) actions[key]();
}