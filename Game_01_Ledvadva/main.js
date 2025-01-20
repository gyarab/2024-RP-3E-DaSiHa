import { CharacterSprite } from  '../Monkey-Engine/CharacterSprite.js';
import {       SpriteDyna } from  '../Monkey-Engine/SpriteDyna.js';
import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';
import {         barriers } from  './levels/00_main_hub.js';


window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');

    /*-------------------------player1--------------------------------*/
    const player1 = new CharacterSprite(150, 100, 68 - 16, 124,[
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
    player1.moveTo(1500, 1080 - 124);
    player1._framesStanding     = [player1._frames[0]];
    player1._framesRunRight     = player1._frames.slice(1, 15);
    player1._framesRunLeft      = player1._frames.slice(15, 29);
    player1._framesJumpFarRight = player1._frames.slice(29, 32);
    player1._framesJumpFarLeft  = player1._frames.slice(32, 35);
    player1._framesPushRight    = [player1._frames[35]];
    player1._framesPushLeft     = [player1._frames[36]];
    /*------------------------nastavení kláves------------------------*/
    window.addEventListener('keydown', event => handleKeyUpAndDown(event,  true));
    window.addEventListener('keyup'  , event => handleKeyUpAndDown(event, false));
    
    function handleKeyUpAndDown(event, isDown) {
        const { key } = event;
        const actions = {
            'w': () => player1._wantJump    = isDown,
            'a': () => player1._wantGoLeft  = isDown,
            'd': () => player1._wantGoRight = isDown,
            's': () => player1._wantGoDown  = isDown,
        };
        if (actions[key]) actions[key]();
    }
    /*-----------------------------Blue Print----------------------------------- */
    const Blue = new Rectangle(0,0,1920,1080,"blue")
    const Print = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/hub01.png")
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //Blue.render(ctx,true)
        //Print.render(ctx)
        barriers.forEach(obsticle => obsticle.render(ctx, true));

        player1.updatePos(barriers);
        player1.updateImage();
        player1.render(ctx, true);
    }
    window.setInterval(Mainloop, 6, true);
});