import { CharacterSprite2} from '../Monkey-Engine/CharacterSprite2.js';
import { colides, Tetragon } from '../Monkey-Engine/Tetragon.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const player1 = new CharacterSprite2(50, 500, 85, 155,[
    //0
    "/Game_01_Ledvadva/sprites/BLU/stand.png",
    //1-14
    "/Game_01_Ledvadva/sprites/BLU/rR/1.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/2.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/3.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/4.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/5.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/6.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/7.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/8.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/7.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/6.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/5.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/4.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/3.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/2.png",
    //15-29
    "/Game_01_Ledvadva/sprites/BLU/rL/1.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/2.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/3.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/4.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/5.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/6.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/7.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/8.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/7.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/6.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/5.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/4.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/3.png",
    "/Game_01_Ledvadva/sprites/BLU/rL/2.png"

]);
const player2 = new CharacterSprite2(250, 500, 85, 155,[
    //0
    "/Game_01_Ledvadva/sprites/RED/stand.png",
    //1-14
    "/Game_01_Ledvadva/sprites/RED/rR/1.png",
    "/Game_01_Ledvadva/sprites/RED/rR/2.png",
    "/Game_01_Ledvadva/sprites/RED/rR/3.png",
    "/Game_01_Ledvadva/sprites/RED/rR/4.png",
    "/Game_01_Ledvadva/sprites/RED/rR/5.png",
    "/Game_01_Ledvadva/sprites/RED/rR/6.png",
    "/Game_01_Ledvadva/sprites/RED/rR/7.png",
    "/Game_01_Ledvadva/sprites/RED/rR/8.png",
    "/Game_01_Ledvadva/sprites/RED/rR/7.png",
    "/Game_01_Ledvadva/sprites/RED/rR/6.png",
    "/Game_01_Ledvadva/sprites/RED/rR/5.png",
    "/Game_01_Ledvadva/sprites/RED/rR/4.png",
    "/Game_01_Ledvadva/sprites/RED/rR/3.png",
    "/Game_01_Ledvadva/sprites/RED/rR/2.png",
    //15-29
    "/Game_01_Ledvadva/sprites/RED/rL/1.png",
    "/Game_01_Ledvadva/sprites/RED/rL/2.png",
    "/Game_01_Ledvadva/sprites/RED/rL/3.png",
    "/Game_01_Ledvadva/sprites/RED/rL/4.png",
    "/Game_01_Ledvadva/sprites/RED/rL/5.png",
    "/Game_01_Ledvadva/sprites/RED/rL/6.png",
    "/Game_01_Ledvadva/sprites/RED/rL/7.png",
    "/Game_01_Ledvadva/sprites/RED/rL/8.png",
    "/Game_01_Ledvadva/sprites/RED/rL/7.png",
    "/Game_01_Ledvadva/sprites/RED/rL/6.png",
    "/Game_01_Ledvadva/sprites/RED/rL/5.png",
    "/Game_01_Ledvadva/sprites/RED/rL/4.png",
    "/Game_01_Ledvadva/sprites/RED/rL/3.png",
    "/Game_01_Ledvadva/sprites/RED/rL/2.png"
]);

player1._id = "player1";
player1._framesStanding = [player1._frames[0]];
player1._framesRunRight = [player1._frames[0]];
player1._framesRunLeft  = [player1._frames[0]];

player2._id = "player2";
player2._framesStanding = [player2._frames[0]];
player2._framesRunRight = player2._frames.slice(1, 15);
player2._framesRunLeft = player2._frames.slice(15, 30);

const screen = new Tetragon(
    {x:0   , y:0   },
    {x:750 , y:0   },
    {x:750 , y:400 },
    {x:0   , y:400 }
)
//hlavní herní smyčka
 function Mainloop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    screen.render(ctx,true)
    player1.updatePos();
    player1.render(ctx, 0);    
    console.log(player1._xVelocity)
}
window.setInterval(Mainloop, 1, true);

//nastavení kláves
function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        'w': () => player1.isGoUp    = isDown ,
        's': () => player1.isGoDown  = isDown , 
        'a': () => player1._wantGoLeft  = isDown ,
        'd': () => player1._wantGoRight = isDown ,
        ' ': () => player1._wantJump = isDown,   

        'ArrowUp':   () => player2.isGoUp    = isDown ,
        'ArrowDown': () => player2.isGoDown  = isDown , 
        'ArrowLeft': () => player2._wantGoLeft  = isDown ,
        'ArrowRight':() => player2._wantGoRight = isDown ,
        'Control':   () => player2._wantJump = isDown

    };
    if (actions[key]) actions[key]();
}