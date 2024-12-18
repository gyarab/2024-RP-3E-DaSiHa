import { CharacterSprite2} from './CharacterSprite2.js';
//inicializace canvasu a ctx
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
//inicializace EventListeneru
window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));
//inicializace všech objektů
const SA = new CharacterSprite2(50, 500, 85, 155,[
    "/Game_01_Ledvadva/sprites/stand.png",
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png",
    "/Game_01_Ledvadva/sprites/runLeft_0.png",
    "/Game_01_Ledvadva/sprites/runLeft_1.png",
    "/Game_01_Ledvadva/sprites/runLeft_2.png",
    "/Game_01_Ledvadva/sprites/runLeft_3.png"
]);
//hlavní herní smyčka
 function Mainloop(){
    SA.updatePos();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    SA.render(ctx);       
}
window.setInterval(Mainloop, 2 , true);
//nastavení kláves
function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        'w': () => SA.isGoUp    = isDown ,
        's': () => SA.isGoDown  = isDown , 
        'a': () => SA._wantGoLeft  = isDown ,
        'd': () => SA._wantGoRight = isDown ,
        ' ': () => SA._wantJump = isDown
    };
    if (actions[key]) actions[key]();
}