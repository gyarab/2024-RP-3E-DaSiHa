import { CharacterSprite2} from '../Monkey-Engine/CharacterSprite2.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const player1 = new CharacterSprite2(50, 500, 85, 155,[
    "/Game_01_Ledvadva/sprites/stand.png",

    "/Game_01_Ledvadva/sprites/rR/1.png",
    "/Game_01_Ledvadva/sprites/rR/2.png",
    "/Game_01_Ledvadva/sprites/rR/3.png",
    "/Game_01_Ledvadva/sprites/rR/4.png",
    "/Game_01_Ledvadva/sprites/rR/5.png",
    "/Game_01_Ledvadva/sprites/rR/6.png",
    "/Game_01_Ledvadva/sprites/rR/7.png",
    "/Game_01_Ledvadva/sprites/rR/8.png",

    "/Game_01_Ledvadva/sprites/rL/1.png",
    "/Game_01_Ledvadva/sprites/rL/2.png",
    "/Game_01_Ledvadva/sprites/rL/3.png",
    "/Game_01_Ledvadva/sprites/rL/4.png",
    "/Game_01_Ledvadva/sprites/rL/5.png",
    "/Game_01_Ledvadva/sprites/rL/6.png",
    "/Game_01_Ledvadva/sprites/rL/7.png",
    "/Game_01_Ledvadva/sprites/rL/8.png",

]);
//
player1._framesStanding = [player1._frames[0]];
player1._framesRunRight = player1._frames.slice(1, 9);
player1._framesRunLeft  = player1._frames.slice(9, 17);
player1._framesJumpUp   = player1._frames.slice(17, 20);


//hlavní herní smyčka
 function Mainloop(){
    player1.updatePos();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    player1.render(ctx);       
}
window.setInterval(Mainloop, 2 , true);

//nastavení kláves
function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        'w': () => player1.isGoUp    = isDown ,
        's': () => player1.isGoDown  = isDown , 
        'a': () => player1._wantGoLeft  = isDown ,
        'd': () => player1._wantGoRight = isDown ,
        ' ': () => player1._wantJump = isDown,   

        'ArrowUp':   () => player1.isGoUp    = isDown ,
        'ArrowDown': () => player1.isGoDown  = isDown , 
        'ArrowLeft': () => player1._wantGoLeft  = isDown ,
        'ArrowRight':() => player1._wantGoRight = isDown ,
        'Control':   () => player1._wantJump = isDown

    };
    if (actions[key]) actions[key]();
}