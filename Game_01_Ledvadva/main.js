import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';
import {          Player, IndicatorKey_E, IndicatorKey_Shift} from  '../Monkey-Engine/PlatformerLib.js';
import {         barriers } from  './levels/00_main_hub.js';


window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');
    /*-------------------------player1--------------------------------*/
    const player1 = new Player(1920/2, 1080 - 400,"SKIN-00");
    const player2 = new Player(1920/2, 1080 - 400,"BLU");
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
            'w': () => player1._wantJump     = isDown,
            'a': () => player1._wantGoLeft   = isDown,
            'd': () => player1._wantGoRight  = isDown,
            's': () => player1._wantGoDown   = isDown,
            
            'e': () => player1._wantInteract = isDown,

            'ArrowUp'   : () => player2._wantJump     = isDown,
            'ArrowLeft' : () => player2._wantGoLeft   = isDown,
            'ArrowRight': () => player2._wantGoRight  = isDown,
            'ArrowDown' : () => player2._wantGoDown   = isDown,

            'Shift'     : () => player2._wantInteract = isDown,
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

    const E     = new IndicatorKey_E();
    const Shift = new IndicatorKey_Shift();

    const furniture = new Sprite(0,0,1920,1080,"../Game_01_Ledvadva/sprites/Hub/furniture.png")
    

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
    const Level_01 = barriers.find(barrier => barrier._id === 'i001');
    const Level_02 = barriers.find(barrier => barrier._id === 'i002');
    const Level_03 = barriers.find(barrier => barrier._id === 'i006');
    const Level_04 = barriers.find(barrier => barrier._id === 'i004');
    const Level_05 = barriers.find(barrier => barrier._id === 'i008');

    /*--------------------------Mainloop--------------------------------*/
    function isPlayersInterac(interactable){
        if(interactable._isInteractableWith[player1._id]){return true}
        if(interactable._isInteractableWith[player2._id]){return true}
        return false;
        
    }
    function showIndicators(interactable, heightOfHover = 1.3){
        if (interactable._isInteractableWith[player1._id]){
            E.moveTo(interactable, heightOfHover);
            E.render(ctx);
        }else
        if (interactable._isInteractableWith[player2._id]){
            Shift.moveTo(interactable, heightOfHover);
            Shift.render(ctx);
        }else{console.log("error")}
    }
    function Mainloop() {
        Blue.render(ctx,true);
        furniture.render(ctx);
        
        shelf1.render(ctx); shadow1.render(ctx);
        shelf2.render(ctx); shadow2.render(ctx);
        shelf3.render(ctx); shadow3.render(ctx);
        shelf4.render(ctx); shadow4.render(ctx);
        shelf5.render(ctx); shadow5.render(ctx);
                            shadow6.render(ctx);

        if (Level_01._isComplete){ nike.render(ctx); }
        if (isPlayersInterac(Level_01)){
            showIndicators(Level_01);
            nike.render(ctx);   
        }
        if (Level_02._isComplete){ games.render(ctx); control.render(ctx);}
        if (isPlayersInterac(Level_02)){
            showIndicators(Level_02);
            control.render(ctx);
            games.render(ctx);
        }
        if (Level_03._isComplete){ study.render(ctx); }
        if (isPlayersInterac(Level_03)){
            showIndicators(Level_03);
            study.render(ctx);
        }
        if (Level_04._isComplete){ fairy.render(ctx);  }
        if (isPlayersInterac(Level_04)){
            showIndicators(Level_04);
            fairy.render(ctx);
        }
        if (Level_05._isComplete){ dark.render(ctx);  }
        if (isPlayersInterac(Level_05)){
            showIndicators(Level_05, 1.6);
            dark.render(ctx);
        }

        player1.updatePos(barriers);
        player1.updateImage();
        player1.render(ctx);

        player2.updatePos(barriers);
        player2.updateImage();
        player2.render(ctx);

        //!NEFUNGUJE
        if (player1._points[2].y < dark2._points[2].y){
            dark2.render(ctx);
        }
        
        

        if (infoMode){
            barriers.forEach(
                obstacle => obstacle.render(ctx)
            );
            infoBor.render(ctx);
        }
        
    }
    window.setInterval(Mainloop, 6, true);
});