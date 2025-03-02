import { CharacterSprite } from   '../Monkey-Engine/CharacterSprite.js';
import { CharacterSprite0 } from  '../Monkey-Engine/CharacterSprite0.js';
import { Rectangle } from './Rectangle.js';
import { Sprite } from './Sprite.js';
import { Tetragon } from './Tetragon.js';


export class Projectile extends CharacterSprite0 {
    constructor(x, y, width, height, spritePath = []){
        super  (x, y, width, height, spritePath); 
    }
    //TODO: změnit hitbox na na kruh
    //doesColideWith(){}
}
export class Scissors extends Projectile{
    constructor(x, y, width, height){
        super  (x, y, width, height,[
            "../Game_01_Ledvadva/sprites/Scissors/1.png",
            "../Game_01_Ledvadva/sprites/Scissors/2.png",
            "../Game_01_Ledvadva/sprites/Scissors/3.png",
            "../Game_01_Ledvadva/sprites/Scissors/4.png",
            "../Game_01_Ledvadva/sprites/Scissors/5.png",
            "../Game_01_Ledvadva/sprites/Scissors/1.png",
        ]);
        this._framesRunUp = this._frames.slice(0,7)
        this._animSlow = 8;
    
    }
}
export class Player extends CharacterSprite {
    constructor(x, y, skin){
        super  (x, y, 52, 124, [
            //0
            "/Game_01_Ledvadva/sprites/" + skin + "/stand.png",
            //1-14
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/1.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/2.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/3.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/4.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/5.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/6.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/7.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/8.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/7.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/6.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/5.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/4.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/3.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rR/2.png",
            //15-28
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/1.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/2.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/3.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/4.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/5.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/6.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/7.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/8.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/7.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/6.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/5.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/4.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/3.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/rL/2.png",
            //29-31
            "/Game_01_Ledvadva/sprites/" + skin + "/jR/1.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/jR/2.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/jR/3.png",
            //32-34
            "/Game_01_Ledvadva/sprites/" + skin + "/jL/1.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/jL/2.png",
            "/Game_01_Ledvadva/sprites/" + skin + "/jL/3.png",
            //35
            "/Game_01_Ledvadva/sprites/" + skin + "/pR.png",
            //36
            "/Game_01_Ledvadva/sprites/" + skin + "/pL.png",
        ]); 
        this._framesStanding     = [this._frames[0]];
        this._framesRunRight     = this._frames.slice(1, 15);
        this._framesRunLeft      = this._frames.slice(15, 29);
        this._framesJumpFarRight = this._frames.slice(29, 32);
        this._framesJumpFarLeft  = this._frames.slice(32, 35);
        this._framesPushRight    = [this._frames[35]];
        this._framesPushLeft     = [this._frames[36]];
    }
}
export class Pushable extends Sprite{
    constructor(x, y, width, height, spritePath){
        super  (x, y, width, height, spritePath); 
        this._xVelocity = 0;
    }
    updatePos(obsticles){
        console.log(this._xVelocity);
        const nextFrame = new Rectangle(this._x + this._xVelocity, this._y, this._width, this._height);
        let canMoveonX = true;
        for(let ob of obsticles){
            if ((ob._color == "red" || ob instanceof Player ) &&  nextFrame.doesColideWith(ob)){
                canMoveonX = false;
                console.log(ob._id);

            }
        }
        if ((this._xVelocity != 0) && canMoveonX){ 
            this.x = this._x + this._xVelocity;
        }   
    }
}

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
    
    const w5 = new Rectangle( 300, 920, 200, 16, "orange");
    const w6 = new Rectangle( 300, 830, 200, 16, "orange");
    const w7 = new Rectangle( 300, 740, 200, 16, "orange");
    const w8 = new Rectangle( 300, 650, 200 ,16, "orange");
    const w0 = new Rectangle( 300, 560, 200, 16, "orange");

    const ceiling  = new Rectangle(0, 0, 1920, 16, "red");
    const floor    = new Rectangle(0, 1000, 1920, 80,'red');

    const box = new Pushable(0, 0, 100, 100, "../Game_01_Ledvadva/sprites/BOX/1.png");
    box.moveTo(900, 899);
    box.id = "box";
    
    let walls = [
        b1,
        w0,w3,w4,w5,w6,w7,w8,
        floor, ceiling,box,
        player1, player2

    ]
    /*--------------------------Mainloop--------------------------------*/

    function Mainloop() {
        ctx.clearRect(0,0,1920, 1080);

        for (let wall of walls) {
            wall.render(ctx, true);
        }

        player1.updatePos(walls);
        player1.updateImage();
        player1.render(ctx);
        box.updatePos(walls);

        player2.updatePos(walls);
        player2.updateImage();
        player2.render(ctx);

        Enemy.render(ctx);
        Enemy.updatePos();
        Enemy.updateImage()
        if (Enemy._y + Enemy._height < 0 ){
            Enemy._y = 1080;
        }
        
        
    }
    window.setInterval(Mainloop, 6, true);
});
