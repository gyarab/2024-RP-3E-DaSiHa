import { CharacterSprite2} from '../Monkey-Engine/CharacterSprite2.js';
import { colides, Tetragon } from '../Monkey-Engine/Tetragon.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const player1 = new CharacterSprite2(50, 100, 68, 124,[
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
    //15-28
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
    "/Game_01_Ledvadva/sprites/BLU/rL/2.png",
    //29-31
    "/Game_01_Ledvadva/sprites/BLU/jR/1.png",
    "/Game_01_Ledvadva/sprites/BLU/jR/2.png",
    "/Game_01_Ledvadva/sprites/BLU/jR/3.png",
    //32-34
    "/Game_01_Ledvadva/sprites/BLU/jL/1.png",
    "/Game_01_Ledvadva/sprites/BLU/jL/2.png",
    "/Game_01_Ledvadva/sprites/BLU/jL/3.png",

]);

player1._id = "player1";
player1._framesStanding = [player1._frames[0]];
player1._framesRunRight = player1._frames.slice(1, 15);
player1._framesRunLeft  = player1._frames.slice(15, 29);
player1._framesJumpFarRight = player1._frames.slice(29, 32);
player1._framesJumpFarLeft  = player1._frames.slice(32, 35);


const wall = new Tetragon(
    {x: 200, y:  50},
    {x: 600, y:  50},
    {x: 600, y: 500},
    {x: 200, y: 500},
    "orange"
)

wall.moveTo(50, 400);

//hlavní herní smyčka
 function Mainloop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    wall.render(ctx , true);
    player1.updatePos(wall);
    player1.updateImage();
    player1.render(ctx,0);
}
window.setInterval(Mainloop, 10, true);

//nastavení kláves
function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        ' ': () => player1._wantJump    = isDown,
        'a': () => player1._wantGoLeft  = isDown ,
        'd': () => player1._wantGoRight = isDown ,
    };
    if (actions[key]) actions[key]();
}