import { Player, Scissors, Pushable, Solid, Platform } from '../Monkey-Engine/PlatformerLib.js';
import { Rectangle } from './Rectangle.js';
import { Tetragon } from './Tetragon.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');

    /*-------------------------players--------------------------------*/
    const player1 = new Player(1920/2 - 100, 1080 /2 , "SKIN-00");
    const player2 = new Player(1920/2 + 100, 1080 /2, "BLU");
     
    /*------------------------nastavení kláves------------------------*/
    const Enemy = new Scissors(200,1080,124,124);
    Enemy._animSlow = 8;
    Enemy._isGoUp = true
    /*------------------------nastavení kláves------------------------*/
    window.addEventListener(
        'keydown', event => (
            handleKeyUpAndDown(event,  true)
        )
    ); 
    window.addEventListener(
        'keyup'  , event => (
            handleKeyUpAndDown(event, false)
        )
    );
    
    function handleKeyUpAndDown(event, isDown) {
        const { key } = event;
        const actions = {
            'w': () => player1._wantJump     = isDown,
            'a': () => player1._wantGoLeft   = isDown,
            'd': () => player1._wantGoRight  = isDown,
            's': () => player1._wantGoDown   = isDown,
            
            'e': () => player1._wantInteract = isDown,

            'ArrowUp'   : () => player2._wantJump     = isDown,
            'ArrowLeft' : () => player2._wantGoLeft   = isDown,
            'ArrowRight': () => player2._wantGoRight  = isDown,
            'ArrowDown' : () => player2._wantGoDown   = isDown,

            'Enter'     : () => player2._wantInteract = isDown,
        };
        if (actions[key]) actions[key]();
    }
    
    /*-----------------------------Blue Prints----------------------------------- */
 
    const b1 = new Rectangle( 100, 500, 500, 500, "purple"); 
    const w3 = new Rectangle( 600, 800, 200, 200, "purple"); 
    const w4 = new Tetragon(
    {x: 200, y: 150},
    {x: 900, y:  0},
    {x: 900, y: 150},
    {x: 200, y: 150},
    "purple"
    ); w4.moveTo(1000,1000)
    
    const w5 = new Platform( 300, 920, 200, 16);
    const w6 = new Platform( 300, 830, 200, 16);
    const w7 = new Platform( 300, 740, 200, 16);
    const w8 = new Platform( 300, 650, 200 ,16);
    const w0 = new Platform( 300, 560, 200, 16);

    const ceiling  = new Solid(0, 0, 1920, 16);
    const floor    = new Solid(0, 1000, 1920, 80);

    const box = new Pushable(0, 0, 100, 100, ["../Game_01_Ledvadva/sprites/BOX/1.png"]);
    box.moveTo(900, 899);
    box.id = "box";
    
    let walls = [
        b1,
        w0,w3,w4,w5,w6,w7,w8,
        floor, ceiling,box,
        player2, player1

    ]
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        ctx.clearRect(0,0,1920, 1080);

        for (let wall of walls) {
            wall.render(ctx, true);
        }
        player2.updatePos(walls);
        player2.updateImage();
        player2.render(ctx);

        player1.updatePos(walls);
        player1.updateImage();
        player1.render(ctx);


        
        box.updatePos(walls);




        Enemy.render(ctx);
        Enemy.updatePos();
        Enemy.updateImage()
        if (Enemy._y + Enemy._height < 0 ){
            Enemy._y = 1080;
        };
        box.render(ctx);      
    }
    window.setInterval(Mainloop, 6, true);
});
