import { CharacterSprite } from  '../Monkey-Engine/CharacterSprite.js';
import { InteractableIndicator } from  '../Monkey-Engine/Interactable.js';
import {        SpriteAnim } from  '../Monkey-Engine/SpriteAnim.js';
import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';
import {         barriers } from  './levels/00_main_hub.js';


window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');

    /*-------------------------player1--------------------------------*/
    const player1 = new CharacterSprite(1920/2, 1080 - 124, 68 - 16, 124,[
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
    player1.moveTo(1920/2, 1080 - 124);
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
    
    /*----------------------------------------------------------------*/
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
            'w': () => player1._wantJump     = isDown,
            'a': () => player1._wantGoLeft   = isDown,
            'd': () => player1._wantGoRight  = isDown,
            's': () => player1._wantGoDown   = isDown,
            
            'e': () => player1._wantInteract = isDown,
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
    const E = new InteractableIndicator(0,0,44,44,"../Game_01_Ledvadva/sprites/Indicators/Press-E.png")

    const shelf1 = new Sprite(124,912,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-1.png");
    const shelf2 = new Sprite(124,754,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-2.png");
    const shelf3 = new Sprite(124,600,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-3.png");
    const shelf4 = new Sprite(124,444,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-4.png");
    const shelf5 = new Sprite(124,288,716,136,"../Game_01_Ledvadva/sprites/Hub/shelf-5.png");

    const nike = new Sprite(704,970,128,76,"../Game_01_Ledvadva/sprites/Hub/nike.png");
    const control = new Sprite(142,850,92,40,"../Game_01_Ledvadva/sprites/Hub/control.png");
    const games = new Sprite(240,812,152,76,"../Game_01_Ledvadva/sprites/Hub/games.png");
    const fairy = new Sprite(488,514,100,64,"../Game_01_Ledvadva/sprites/Hub/fairytale.png");
    const study = new Sprite(364,674,104,60,"../Game_01_Ledvadva/sprites/Hub/study.png");
    const dark  = new Sprite(324,334,144,88,"../Game_01_Ledvadva/sprites/Hub/dark.png");
    const dark2 = new Sprite(416,330,28,64,"../Game_01_Ledvadva/sprites/Hub/dark2.png");

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

        const ShoeBox = barriers.find(barrier => barrier._id === '3014');
        if (ShoeBox){
            if (ShoeBox._isInteractable){
                nike.render(ctx);
                E.moveTo(ShoeBox);
                E.render(ctx)
            } else
            if (ShoeBox._isComplete){
                nike.render(ctx);
            }
        }
        const GameBox = barriers.find(barrier => barrier._id === '3016');
        if (GameBox) {
            if (GameBox._isInteractable) {
            games.render(ctx);
            E.moveTo(GameBox); 
            E.render(ctx);
            } else if (GameBox._isComplete) {
            games.render(ctx);
            }
        }
        const StudyBox = barriers.find(barrier => barrier._id === '3017');
        if (StudyBox) {
            if (StudyBox._isInteractable) {
            study.render(ctx);
            E.moveTo(StudyBox); 
            E.render(ctx);
            } else if (StudyBox._isComplete) {
            study.render(ctx);
            }
        }
        const FairyBox = barriers.find(barrier => barrier._id === '3011');
        if (FairyBox) {
            if (FairyBox._isInteractable) {
            fairy.render(ctx);
            E.moveTo(FairyBox);
            E.render(ctx);
            } else if (FairyBox._isComplete) {
            fairy.render(ctx);
            }
        }
        const DarkBox = barriers.find(barrier => barrier._id === '3019');
        if (DarkBox) {
            if (DarkBox._isInteractable) {
            dark.render(ctx);
            E.moveTo(DarkBox, 1.6);
            E.render(ctx);
            } else if (DarkBox._isComplete) {
            dark.render(ctx);
            }
        }

        Enemy.render(ctx);
        Enemy.updateImage();

        player1.updatePos(barriers);
        player1.updateImage();
        player1.render(ctx);

        if (player1._points[2].y < dark2._points[2].y){
            dark2.render(ctx);
        }
        
        

        if (infoMode){
            barriers.forEach(
                obsticle => obsticle.render(ctx)
            );
            infoBor.render(ctx);
        }
        
    }
    window.setInterval(Mainloop, 6, true);
});