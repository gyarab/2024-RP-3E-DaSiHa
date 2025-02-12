import { CharacterSprite } from  '../Monkey-Engine/CharacterSprite.js';
import { InteractableIndicator } from  '../Monkey-Engine/Intractable.js';
import { SpriteAnim } from  '../Monkey-Engine/SpriteAnim.js';
import { Rectangle } from './Rectangle.js';
import { Tetragon } from './Tetragon.js';



window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');

    /*-------------------------player1--------------------------------*/
    const player1 = new CharacterSprite(1920/2 - 100, 1080 /2 , 68 - 16, 124,[
        //0
        "/Game_01_Ledvadva/sprites/SKIN-00/stand.png",
        //1-14
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/1.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/2.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/3.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/4.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/5.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/6.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/7.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/8.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/7.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/6.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/5.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/4.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/3.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rR/2.png",
        //15-28
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/1.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/2.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/3.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/4.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/5.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/6.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/7.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/8.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/7.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/6.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/5.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/4.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/3.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/rL/2.png",
        //29-31
        "/Game_01_Ledvadva/sprites/SKIN-00/jR/1.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/jR/2.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/jR/3.png",
        //32-34
        "/Game_01_Ledvadva/sprites/SKIN-00/jL/1.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/jL/2.png",
        "/Game_01_Ledvadva/sprites/SKIN-00/jL/3.png",
        //35
        "/Game_01_Ledvadva/sprites/SKIN-00/pR.png",
        //36
        "/Game_01_Ledvadva/sprites/SKIN-00/pL.png",

    ]);

    player1._id = "player1";
    player1._framesStanding     = [player1._frames[0]];
    player1._framesRunRight     = player1._frames.slice(1, 15);
    player1._framesRunLeft      = player1._frames.slice(15, 29);
    player1._framesJumpFarRight = player1._frames.slice(29, 32);
    player1._framesJumpFarLeft  = player1._frames.slice(32, 35);
    player1._framesPushRight    = [player1._frames[35]];
    player1._framesPushLeft     = [player1._frames[36]];
    /*-------------------------player1--------------------------------*/
    const player2 = new CharacterSprite(1920/2 + 100, 1080 /2, 68 - 16, 124,[
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
        //35
        "/Game_01_Ledvadva/sprites/BLU/pR.png",
        //36
        "/Game_01_Ledvadva/sprites/BLU/pL.png",

    ]);

    player2._id = "player1";
    player2._framesStanding     = [player2._frames[0]];
    player2._framesRunRight     = player2._frames.slice(1, 15);
    player2._framesRunLeft      = player2._frames.slice(15, 29);
    player2._framesJumpFarRight = player2._frames.slice(29, 32);
    player2._framesJumpFarLeft  = player2._frames.slice(32, 35);
    player2._framesPushRight    = [player2._frames[35]];
    player2._framesPushLeft     = [player2._frames[36]];
    /*------------------------nastavení kláves------------------------*/
    const Enemy = new SpriteAnim(10,10,124,124,[
        "../Game_01_Ledvadva/sprites/Scissors/1.png",
        "../Game_01_Ledvadva/sprites/Scissors/2.png",
        "../Game_01_Ledvadva/sprites/Scissors/3.png",
        "../Game_01_Ledvadva/sprites/Scissors/4.png",
        "../Game_01_Ledvadva/sprites/Scissors/5.png",
        /*
        "../Game_01_Ledvadva/sprites/Scissors/4.png",
        "../Game_01_Ledvadva/sprites/Scissors/3.png",
        "../Game_01_Ledvadva/sprites/Scissors/2.png",
        /**/
        "../Game_01_Ledvadva/sprites/Scissors/1.png",
    ]);
    Enemy._animSlow = 10;
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

    //const E = new InteractableIndicator(0,0,44,44,"../Game_01_Ledvadva/sprites/Indicators/Press-E.png");
    const floor    = new Rectangle(0, 1080 - 44, 1920, 44,'red');
    
    let walls = [
        floor, 
    ]
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        ctx.clearRect(0,0,1920, 1080);

        for (let wall of walls) {
            wall.render(ctx, true);
        }

        Enemy.render(ctx);
        Enemy.updateImage();

        player1.updatePos(walls);
        player1.updateImage();
        player1.render(ctx);

        player2.updatePos(walls);
        player2.updateImage();
        player2.render(ctx);
        
        
    }
    window.setInterval(Mainloop, 6, true);
});