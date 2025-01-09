import { CharacterSprite2 } from  '../Monkey-Engine/CharacterSprite2.js';
import {       SpriteDyna } from  '../Monkey-Engine/SpriteDyna.js';
import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {         Tetragon } from  '../Monkey-Engine/Tetragon.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('herniRozhraní');
    const ctx = canvas.getContext('2d');
    /*-------------------------Obstacles------------------------------*/
    const w1 = new Tetragon(
        {x: 200, y:   0},
        {x: 600, y:   0},
        {x: 600, y: 300},
        {x: 200, y: 300},
        "grey"
    )
    const w2 = new Tetragon(
        {x: 200, y:  50},
        {x: 900, y:  50},
        {x: 900, y: 150},
        {x: 200, y: 150},
        "grey"
    )
    const w3 = new Tetragon(
        {x: 200, y:  50},
        {x: 400, y:  50},
        {x: 400, y: 150},
        {x: 200, y: 150},
        "grey"
    )
    const w4 = new Tetragon(
        {x: 200, y:  50},
        {x: 400, y:  50},
        {x: 400, y: 100},
        {x: 200, y: 100},
        "grey"
    )
    const w5 = new Tetragon(
        {x:   0, y:  0},
        {x:1500, y:  0},
        {x:1500, y:200},
        {x:   0, y:200},
        "grey"
    )
    const w6 = new Tetragon(
        {x:   0, y:   0},
        {x:   0, y: 400},
        {x: 250, y: 400},
        {x: 250, y:   0},
        "grey"
    )

    w1.moveTo(0     ,   400);
    w2.moveTo(650   ,   600);
    w3.moveTo(950   ,   500);
    w4.moveTo(650   ,   320);
    w5.moveTo(0     ,   900);
    w6.moveTo(1500  ,   760);

    const obsticles  = [w1, w2, w3, w4, w5, w6];
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
    /*------------------------player2---------------------------------*/
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
    /*------------------------Bottles---------------------------------*/
    const bottleBLU = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleBLU.moveTo(720, 220);
    const bottleRED = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleRED.moveTo(400, 800);
    const bottleORA = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleORA.moveTo( 1000, 400);
    const bottleGRE = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b1.png"
    );
    bottleGRE.moveTo( 500, 800);
    const bottleGRY = new Sprite( null, null, 64, 64,
        "/Game_01_Ledvadva/sprites/BLU/b7.png"
    );
    bottleGRY.moveTo( 1000, 800);
    const bottles = [bottleBLU, bottleRED, bottleORA, bottleGRE, bottleGRY];
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
    /*--------------------------infoMode--------------------------------*/
    let infoMode = false;
    let infoBox = new Rectangle();
    /*--------------------------selectMode------------------------------*/
    let selectMode = true;
    let selected = 0;
    const none = "none";
    const selectABLE = { none, player1, player2};
    /*------------------------Swiches fo modes--------------------------*/
    window.addEventListener('keypress', event => { handleKeyPressed(event)});
    function handleKeyPressed(event) {
        const { key } = event;
        if (key === 'i') { 
            infoMode = !infoMode;
            selectMode = false;
            selected = 0;
        }
        if (key === 't') { 
            infoMode = false;
            selected = (selected + 1) % Object.keys(selectABLE).length;
            if  (selected === 0){ selectMode = false;}
            else(selectMode = true);
            console.log(`Selected: ${Object.keys(selectABLE)[selected]}`);
        }
    }
    /*------------------------OnClick--------------------------*/
    const rect = canvas.getBoundingClientRect();
    handleClick(event.clientX - rect.left, event.clientY - rect.top);
    function handleClick(mouseX, mouseY) {
        if (selected > 0){
            selectABLE[Object.keys(selectABLE)[selected]].moveTo(mouseX, mouseY);
        }
    }
    /*--------------------------Mainloop--------------------------------*/
    
    function Mainloop() {

        ctx.clearRect(0,0,canvas.width, canvas.height);

        if (infoMode) {
            infoBox.render(ctx, true);
        }
        obsticles.forEach(obsticle => obsticle.render(ctx, true));

        //npc.render(ctx,(selectMode && selected === 3));
        npc.updateAll();
        if (npc._x > 1920) npc._x = -120;

        bottles.forEach(bottles => bottles.render(ctx));
        
        player1.updatePos(obsticles);
        player1.updateImage();
        player1.render(ctx,(selectMode && selected === 1));

        
        player2.updatePos(obsticles);
        player2.updateImage();
        player2.render(ctx, (selectMode && selected === 2));
        
    }
    window.setInterval(Mainloop, 6, true);
});