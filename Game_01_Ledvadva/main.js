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
    player1.moveTo(100, 20);
    player1._framesStanding     = [player1._frames[0]];
    player1._framesRunRight     = player1._frames.slice(1, 15);
    player1._framesRunLeft      = player1._frames.slice(15, 29);
    player1._framesJumpFarRight = player1._frames.slice(29, 32);
    player1._framesJumpFarLeft  = player1._frames.slice(32, 35);
    player1._framesPushRight    = [player1._frames[35]];
    player1._framesPushLeft     = [player1._frames[36]];
    /*------------------------nastavení kláves------------------------*/
    let infoMode = true;
    const infoBor = new Sprite (0,0,1920,1080,"../Game_01_Ledvadva/sprites/info.png");
    
    
    /*------------------------nastavení kláves------------------------*/
    window.addEventListener(
        'keydown', event => (
            handleKeyUpAndDown(event,  true),
            handleKeyDown(event)
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
            'w': () => player1._wantJump    = isDown,
            'a': () => player1._wantGoLeft  = isDown,
            'd': () => player1._wantGoRight = isDown,
            's': () => player1._wantGoDown  = isDown,
        };
        if (actions[key]) actions[key]();
    }
    
    function handleKeyDown(event) {
        const { key } = event;
        const actions = {
            'i': () => infoMode = !infoMode,
        };
        if (actions[key]) actions[key]();
    }
    /*-----------------------------Blue Prints----------------------------------- */
    const Blue = new Rectangle(0,0,1920,1080,"grey")
    const Print = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/hub01.png");
    const furniture = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/furniture.png")

    const shelf1 = new Sprite(124,912,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-1.png");
    const shelf2 = new Sprite(124,754,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-2.png");
    const shelf3 = new Sprite(124,600,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-3.png");
    const shelf4 = new Sprite(124,444,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-4.png");
    const shelf5 = new Sprite(124,288,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-5.png");

    const nike = new Sprite(704,972,128,76,"../Game_01_Ledvadva/sprites/Hub/nike.png");
    const control = new Sprite(142,852,92,40,"../Game_01_Ledvadva/sprites/Hub/control.png");
    const games = new Sprite(240,812,152,76,"../Game_01_Ledvadva/sprites/Hub/games.png");
    const fairy = new Sprite(488,516,100,64,"../Game_01_Ledvadva/sprites/Hub/fairytale.png");
    const study = new Sprite(364,676,104,60,"../Game_01_Ledvadva/sprites/Hub/study.png");
    const dark  = new Sprite(324,336,144,88,"../Game_01_Ledvadva/sprites/Hub/dark.png");

    const shadow1 = new Sprite(124,912,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    const shadow2 = new Sprite(124,756,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    const shadow3 = new Sprite(124,600,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    const shadow4 = new Sprite(124,444,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    const shadow5 = new Sprite(124,288,716,136,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    const shadow6 = new Sprite(124,124,716,144,"../Game_01_Ledvadva/sprites/Hub/shadow.png");
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        Blue.render(ctx,true);

        furniture.render(ctx);
        
        shelf1.render(ctx); shadow1.render(ctx);
        shelf2.render(ctx); shadow2.render(ctx);
        shelf3.render(ctx); shadow3.render(ctx);
        shelf4.render(ctx); shadow4.render(ctx);
        shelf5.render(ctx); shadow5.render(ctx);
                            shadow6.render(ctx);

        nike.render(ctx);
        control.render(ctx);
        games.render(ctx);
        fairy.render(ctx);
        study.render(ctx);
        dark.render(ctx);

        player1.updatePos(barriers);
        player1.updateImage();
        player1.render(ctx);

        

        if (infoMode){
            barriers.forEach(
                obsticle => obsticle.render(ctx)
            );
            infoBor.render(ctx);
        }
        
    }
    window.setInterval(Mainloop, 6, true);
});