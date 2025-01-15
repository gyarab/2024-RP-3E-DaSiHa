import { CharacterSprite2 } from  '../Monkey-Engine/CharacterSprite2.js';
import {       SpriteDyna } from  '../Monkey-Engine/SpriteDyna.js';
import {        Rectangle } from  '../Monkey-Engine/Rectangle.js';
import {         Tetragon } from  '../Monkey-Engine/Tetragon.js';
import {           Sprite } from  '../Monkey-Engine/Sprite.js';
import {             Menu } from '../Monkey-Engine/Menu.js';

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
    bottleORA.moveTo(1000, 800);
    const bottles = [bottleBLU, bottleRED, bottleORA];
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
    /*--------------------------infoMode--------------------------------*/
    
    let object = [player1, player2, npc, bottleBLU, bottleRED, bottleORA, basketball];

    let ObjMenu   = new Menu(0, 0, 360, 80, 4);
        ObjMenu.rearange("socket");
        ObjMenu.fontSize = 50;
        ObjMenu._boxes[0].text = "select";    
        ObjMenu._boxes[1].text = "info";
        ObjMenu._boxes[2].text = "refactor";
        ObjMenu._boxes[3].text = "delete";
        ObjMenu._boxes[0].foldable = true
        ObjMenu._boxes[1].foldable = true
        ObjMenu._boxes[2].foldable = true

    let NonObjMenu = new Menu(0, 0, 360, 80, 2);
        NonObjMenu.rearange("socket");
        NonObjMenu.fontSize = 50;
        NonObjMenu._boxes[0].text = "new";    
        NonObjMenu._boxes[1].text = "...";
        NonObjMenu._boxes[0].foldable = true

    let SelectMenu = new Menu(0,0,180,40,2);
        SelectMenu.rearange("socket");
        SelectMenu.fontSize = 25;
        SelectMenu._boxes[0].text = "drag";
        SelectMenu._boxes[1].text = "moveTo";

    let InfoMenu   = new Menu(0, 0, 300, 40, 4);
        InfoMenu.rearange("plain");
        InfoMenu.fontSize = 25;

    let RefactMenu  = new Menu(0,0,180,40,2);
        RefactMenu.rearange("socket");  
        RefactMenu._boxes[0].text = "rename";
        RefactMenu._boxes[1].text = "recolor";
    
    let NewMenu     = new Menu(0,0,180,40,6);
        NewMenu.rearange("socket");
        NewMenu._boxes[0].text = "player1";
        NewMenu._boxes[1].text = "...";


    let AllMenus     = [];
    let pressedObj = null;

    window.addEventListener('click', event => handleClick(event));
    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        SelectMenu.isVisable = false;
        InfoMenu.isVisable   = false;
        RefactMenu.isVisable = false;
        NewMenu.isVisable    = false;
        let pressedBox = null;
            
        let menusBoxes = [];

        if (ObjMenu._isVisable && !NonObjMenu._isVisable) {
            for (let i = 0; i < ObjMenu._boxes.length; i++) {
                menusBoxes.push(ObjMenu._boxes[i]);
            }
            menusBoxes.forEach(box => {
                if (
                    mouseX >= box._x && mouseX <= box._x + box._width &&
                    mouseY >= box._y && mouseY <= box._y + box._height
                ) {
                    pressedBox = box;
                }
            });
        }
        if (NonObjMenu._isVisable  && !ObjMenu._isVisable) {
            for (let i = 0; i < NonObjMenu._boxes.length; i++) {
                menusBoxes.push(NonObjMenu._boxes[i]);
            }
            menusBoxes.forEach(box => {
                if (
                    mouseX >= box._x && mouseX <= box._x + box._width &&
                    mouseY >= box._y && mouseY <= box._y + box._height
                ) {
                    pressedBox = box;
                    console.log(pressedBox)
                }
            });
        }
        
        if (pressedBox) {
            switch (pressedBox._text) {
            case "select":
                SelectMenu.isVisable = true;
                SelectMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            case "info":
                InfoMenu.isVisable = true;
                InfoMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                InfoMenu._boxes[0].text = "ID: " + pressedObj._id;
                InfoMenu._boxes[1].text = "Type: " + pressedObj.constructor.name;
                InfoMenu._boxes[2].text = "Position: " + Math.floor(pressedObj._x) + "x" + Math.floor(pressedObj._y);
                InfoMenu._boxes[3].text = "Size: " + Math.floor(pressedObj._width) + "x" + Math.floor(pressedObj._height);
                break;
            case "refactor":
                RefactMenu.isVisable = true;
                RefactMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            case "delete":
                console.log("delete")
                break;
            case "new":
                NewMenu.isVisable = true;
                NewMenu.moveTo(pressedBox._x + pressedBox._width, pressedBox._y)
                break;
            default:
            }
        }else{
            ObjMenu.isVisable = false;
            NonObjMenu.isVisable = false;
        }
    }
    /*------------------------------------------------------------------*/
    window.addEventListener('contextmenu', event => {
        event.preventDefault();
        handleRClick(event);
    });
    
    function handleRClick(event){
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;
        const canvasX = Math.min(Math.max(mouseX, 0), canvas.width);
        const canvasY = Math.min(Math.max(mouseY, 0), canvas.height);
        let isObject = false
        object.forEach(obj => {
            if(
                mouseX >= obj._x && mouseX <= obj._x + obj._width &&
                mouseY >= obj._y && mouseY <= obj._y + obj._height
              ){
                isObject   = true;
                pressedObj = obj;
            }
        });
        if (isObject){
            ObjMenu.moveTo(canvasX, canvasY);
            ObjMenu.isVisable = true;
            NonObjMenu.isVisable = false;
        }else{
            NonObjMenu.moveTo(canvasX, canvasY);
            NonObjMenu.isVisable = true;
            ObjMenu.isVisable = false;
        }
    }

    /*--------------------------Mainloop--------------------------------*/
    
    function Mainloop() {

        ctx.clearRect(0,0,canvas.width, canvas.height);

        
        obsticles.forEach(obsticle => obsticle.render(ctx, true));

        //npc.render(ctx);
        //npc.updateAll();
        //if (npc._x > 1920) npc._x = -120;

        bottles.forEach(bottles => bottles.render(ctx));

        basketball.render(ctx);
        basketball.updateAll();
        if (basketball._x > 1920) basketball._x = -100;

        player1.updatePos(obsticles);
        player1.updateImage();
        player1.render(ctx);

        
        player2.updatePos(obsticles);
        player2.updateImage();
        player2.render(ctx);

        if (    ObjMenu._isVisable ) {    ObjMenu.render(ctx) };
        if ( NonObjMenu._isVisable ) { NonObjMenu.render(ctx) };
        if ( SelectMenu._isVisable ) { SelectMenu.render(ctx) };
        if (   InfoMenu._isVisable ) {   InfoMenu.render(ctx) };
        if ( RefactMenu._isVisable ) { RefactMenu.render(ctx) };
        if (    NewMenu._isVisable ) {    NewMenu.render(ctx) };

    }
    window.setInterval(Mainloop, 6, true);
});