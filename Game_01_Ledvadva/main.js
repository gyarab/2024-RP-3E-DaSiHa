import { CharacterSprite2 } from  '../Monkey-Engine/CharacterSprite2.js';
import {       SpriteDyna } from  '../Monkey-Engine/SpriteDyna.js';
import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';
import {         barriers } from  './levels/00_main_hub.js';


window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');

    /*-------------------------player1--------------------------------*/
    const player1 = new CharacterSprite2(150, 100, 68, 124,[
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

    player1._id = "player1";
    player1._framesStanding     = [player1._frames[0]];
    player1._framesRunRight     = player1._frames.slice(1, 15);
    player1._framesRunLeft      = player1._frames.slice(15, 29);
    player1._framesJumpFarRight = player1._frames.slice(29, 32);
    player1._framesJumpFarLeft  = player1._frames.slice(32, 35);
    player1._framesPushRight    = [player1._frames[35]];
    player1._framesPushLeft     = [player1._frames[36]];
    /*------------------------player2---------------------------------
    const player2 = new CharacterSprite2(200, 100, 68, 124,[
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
        //15-28
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
        "/Game_01_Ledvadva/sprites/RED/rL/2.png",
        //29-31
        "/Game_01_Ledvadva/sprites/RED/jR/1.png",
        "/Game_01_Ledvadva/sprites/RED/jR/2.png",
        "/Game_01_Ledvadva/sprites/RED/jR/3.png",
        //32-34
        "/Game_01_Ledvadva/sprites/RED/jL/1.png",
        "/Game_01_Ledvadva/sprites/RED/jL/2.png",
        "/Game_01_Ledvadva/sprites/RED/jL/3.png",
        //35
        "/Game_01_Ledvadva/sprites/RED/pR.png",
        //36
        "/Game_01_Ledvadva/sprites/RED/pL.png",
    ]);

    player2._id = "player2"
    player2._framesStanding     = [player2._frames[0]];
    player2._framesRunRight     = player2._frames.slice(1, 15);
    player2._framesRunLeft      = player2._frames.slice(15, 29);
    player2._framesJumpFarRight = player2._frames.slice(29, 32);
    player2._framesJumpFarLeft  = player2._frames.slice(32, 35);
    player2._framesPushRight    = [player2._frames[35]];
    player2._framesPushLeft     = [player2._frames[36]];
    /*--------------------------NPC--------------------------------*/
    const npc = new SpriteDyna( 0, 1080 - 168, 90, 168, [
        "/Game_01_Ledvadva/sprites/Alexa/1.png",
        "/Game_01_Ledvadva/sprites/Alexa/2.png",
        "/Game_01_Ledvadva/sprites/Alexa/3.png",
        "/Game_01_Ledvadva/sprites/Alexa/4.png",
        "/Game_01_Ledvadva/sprites/Alexa/5.png",
        "/Game_01_Ledvadva/sprites/Alexa/6.png",
        "/Game_01_Ledvadva/sprites/Alexa/7.png",
        "/Game_01_Ledvadva/sprites/Alexa/8.png",
    ]);
    npc.animSlow = 30;
    npc._isGoRight= true;

    /*----------------------------Basketball--------------------------*/
    const basketball = new SpriteDyna( 0, 1080 - 64, 64, 64, [
        "/Game_01_Ledvadva/sprites/Basketball/1.png",
        "/Game_01_Ledvadva/sprites/Basketball/2.png",
        "/Game_01_Ledvadva/sprites/Basketball/3.png",
        "/Game_01_Ledvadva/sprites/Basketball/4.png",
        "/Game_01_Ledvadva/sprites/Basketball/5.png",
        "/Game_01_Ledvadva/sprites/Basketball/6.png",
        "/Game_01_Ledvadva/sprites/Basketball/7.png",
        "/Game_01_Ledvadva/sprites/Basketball/8.png"
    ]);
    basketball.animSlow = 50;
    basketball.isGoRight = true;
    basketball._xSpeed = 1;
    /*------------------------nastavení kláves------------------------*/
    window.addEventListener('keydown', event => handleKeyUpAndDown(event,  true));
    window.addEventListener('keyup'  , event => handleKeyUpAndDown(event, false));
    
    function handleKeyUpAndDown(event, isDown) {
        const { key } = event;
        const actions = {
            'w': () => player1._wantJump    = isDown,
            'a': () => player1._wantGoLeft  = isDown,
            'd': () => player1._wantGoRight = isDown,

            'ArrowUp'   : () => player2._wantJump    = isDown,   
            'ArrowLeft' : () => player2._wantGoLeft  = isDown,
            'ArrowRight': () => player2._wantGoRight = isDown,
        };
        if (actions[key]) actions[key]();
    }
    /*-----------------------------Blue Print----------------------------------- */
    const Blue = new Rectangle(0,0,1920,1080,"blue")
    const Print = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/hub01.png")
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        Blue.render(ctx,true)
        Print.render(ctx)
        barriers.forEach(obsticle => obsticle.render(ctx, true));

        //npc.render(ctx);
        //npc.updateAll();
        //if (npc._x > 1920) npc._x = -120;

        basketball.render(ctx);
        basketball.updateAll();
        if (basketball._x > 1920) basketball._x = -100;

        player1.updatePos(barriers);
        player1.updateImage();
        player1.render(ctx);
     
        //player2.updatePos(barriers);
        //player2.updateImage();
        //player2.render(ctx);
    }
    window.setInterval(Mainloop, 6, true);
});