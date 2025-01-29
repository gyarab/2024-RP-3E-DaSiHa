import { Tetragon } from "./Tetragon.js";
import { Rectangle } from "./Rectangle.js";
import { SpriteDyna } from "./SpriteDyna.js";
import { colides } from "./Tetragon.js";
import { Sprite } from "./Sprite.js";
import { intersectionOfLineSegments } from "./LineSection.js";

export class CharacterSprite extends SpriteDyna{
    constructor(x, y, width, height, spritePaths) {
        super  (x, y, width, height, spritePaths);

        //probíhající akce
        this._wantGoRight = false;
        this._wantGoLeft  = false;
        this._wantJump    = false;
        this._wantGoDown  = false;
        this._wantInteract = false;

        this._isOnGround = false;
        this._isJumping  = false;

        this._isPushRight = false;
        this._isPushLeft  = false;
        //vlastnosti akcí
        this._yVelocity = 0;
        this._xVelocity = 0;
        this._dirOfJump = 0;
        // Initialize points for collision detection
        this._points = [
            { x: this._x, y: this._y },
            { x: this._x + this._width, y: this._y },
            { x: this._x + this._width, y: this._y + this._height },
            { x: this._x, y: this._y + this._height }
        ];

        //jednotlivé pole pro animace
        this._framesStanding = [];
        this._framesRunRight = [];
        this._framesRunLeft  = [];
        this._framesJumpUp   = [];

        this._framesJumpFarLeft  = [];
        this._framesJumpLigLeft  = [];
        this._framesJumpFarRight = [];
        this._framesJumpLigRight = [];

        this._framesPushLeft     = [];
        this._framesPushRight    = [];
        
        this._floor = 1080 - this._height;
    }
    //posouvá objekt podle probíhající akce
    updatePos(obstacles){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.07;
        const jumpVelocity = - 3.7;

        this.y = this._y + this._yVelocity
        const maxRunVelocity = 1.5;
        const maxJumpVelocity   = 2;
        /*-----------------------pokud chce doprava------------------ */
        if(this._wantGoRight && !this._wantGoLeft ){
            if(!this._isJumping){
                this._xVelocity = maxRunVelocity;
                this.isGoRight = true;
            }else if(this._xVelocity < maxJumpVelocity){
                this._xVelocity +=  maxRunVelocity /90;
            }else{
                this._xVelocity = maxJumpVelocity;
            }
        }
        /*-----------------------pokud chce doleva-------------------- */
        if(this._wantGoLeft  && !this._wantGoRight){
            if(!this._isJumping){
                this._xVelocity = -maxRunVelocity;
                this.isGoLeft = true;
            }else if(this._xVelocity > -maxJumpVelocity){
                this._xVelocity -=  maxRunVelocity /90;
            }else{
                this._xVelocity = -maxJumpVelocity;
            }
        }
        /*-------------pokud nechci ani doleva ani doprava------------ */
        if(!this._wantGoLeft  && !this._wantGoRight && !this._isJumping){
            this._isBothWay = true;
            this._isGoLeft  = false;
            this._isGoRight = false;
            this._xVelocity = 0;
        }
        /*------------------pokud chci doleva a doprava--------------- */
        if(this._wantGoLeft  && this._wantGoRight && !this._isJumping){
            this._isBothWay = true;
            this._isGoLeft  = false;
            this._isGoRight = false;
            this._xVelocity = 0;
        }
        /*---------------------pokud chce skočit---------------------- */
        if(this._wantJump  && !this._isJumping && this._isOnGround){

            if( this._isGoRight && !this._isGoLeft){this._dirOfJump =  1}
            if(!this._isGoRight &&  this._isGoLeft){this._dirOfJump = -1}
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
        }

        const ratioOfLegs = 9/10
        //kolize
        //NextFrameDown a NextFrameUp jsous skoro stejné a proto si plete kolizi s podlahou a stropem
        const NextFrameDown  = new CharacterSprite(this._x , this._y + this._yVelocity + gravity, this._width, this._height);
        const NextFrameUp     = new CharacterSprite(this._x , this._y + this._yVelocity - this._ySpeed, this._width, this._height)
        const NextFrameRight = new CharacterSprite(this._x + this._xSpeed, this._y , this._width, this._height * ratioOfLegs );
        const NextFrameLeft  = new CharacterSprite(this._x - this._xSpeed, this._y , this._width, this._height * ratioOfLegs );
        const NextFrameY     = new CharacterSprite(this._x, this._y + this._yVelocity + 1, this._width, this._height);
        
        let canGoRight = true;
        let canGoLeft  = true;
        let canGoUp    = true;
        let canGoDown  = true;
  
        for (let ob of obstacles) {
            if(ob._color == 'orange' && !this._wantGoDown){
                if (NextFrameY.doesColideWith(ob)  && !this.doesColideWith(ob) && (this._yVelocity >= 0)){
                    canGoDown = false;
                } 
            }
            if (ob._color == 'red'){
                if (NextFrameDown.doesColideWith(ob)){
                    canGoDown = false;
                }
                if (NextFrameRight.doesColideWith(ob) && (this._xVelocity > 0)){
                    canGoRight = false;
                }
                if (NextFrameLeft.doesColideWith(ob) && (this._xVelocity < 0)){
                    canGoLeft = false;
                }
                if (NextFrameUp.doesColideWith(ob) && (this._yVelocity < 0)){
                    canGoUp = false;
                }
                if (this.doesColideWith(ob)){
                    this.y = this._y - 0.5;
                    this._xVelocity = this._xVelocity / 10;
                }
            }
            if(ob._color == 'violet'){ 
                if (this.doesColideWith(ob)){
                    ob._isInteractable = true;
                    if(this._wantInteract){
                        ob._action(ob);
                    }
                }else {
                    ob._isInteractable = false;
                }
            }
            
        }
        if(!canGoRight) {
            this._xVelocity = 0
            this._isPushRight = true;
        }
        else if(!canGoLeft)  {
            this._xVelocity = 0
            this._isPushLeft = true;
        }else{
            this.x = this._x + this._xVelocity;
            this._isPushRight = false;
            this._isPushLeft  = false;
        }
        if(canGoDown){
            this._floor = 1080 - this._height;
            this._isOnGround = false;
            this._yVelocity += gravity;
            
        }if (!canGoDown){
            this._floor = Math.floor(this._y) ;
            this._isOnGround = true;
            this._yVelocity = 0;
            this._isJumping = false;
            if(!this._wantGoLeft ){this._isGoLeft = false}
            if(!this._wantGoRight){this._isGoRight = false}
        }  
        if (!canGoUp){
            this._yVelocity = 0; 
            this.y = this._y + gravity;
        } 
        if (this._isOnGround){
            this._isJumping = false;
        }
    }
    // * cyklí mezi jednotlivými snímky animací
    updateImage(){
        if (this._isGoLeft || this._isGoRight) {
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
                this._counterAnim   = 0;
                this._timeOfAction +=  1;
            }
        }
    }
    // * vykresluje sprite podle probíhající akce  
    render(ctx, Rbox = null){
        //
        if(Rbox){super.render_Hitbox(ctx)}
        let img = null;
        /*------------Sprite-for-jumping---------------------- */
        if (this._isJumping) {
            /*---------------------------right-----------------*/
            if (this._dirOfJump == 1){
                if ( this._wantGoRight){
                    img = this._framesJumpFarRight[1];
                }else if(this._wantGoLeft){
                    img = this._framesJumpFarRight[2];
                }else{
                    img = this._framesJumpFarRight[0];
                }  
            }
            /*---------------------------left------------------*/
            if (this._dirOfJump == -1){
                if (this._wantGoLeft){
                    img = this._framesJumpFarLeft[1];
                }else if(this._wantGoRight){
                    img = this._framesJumpFarLeft[2];
                }else{
                    img = this._framesJumpFarLeft[0];
                }  
            }
            /*---------------------------up--------------------*/
            if (this._dirOfJump == 0){
                img = this._framesStanding[0];
            }
        }
        /*------------Sprite-for-nonjumping--------------------*/
        else{
            /*----------------------------running-right--------*/
            if(this._isGoRight && !this._isPushRight){  
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
            }
            /*----------------------------pushing-right--------*/
            else if (this._isPushRight){
                img = this._framesPushRight[0];
            }
            /*----------------------------running-left---------*/
            else if(this._isGoLeft && !this._isPushLeft){ 
                img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            }
            /*----------------------------pushing-left----------*/
            else if (this._isPushLeft){
                img = this._framesPushLeft[0];
            }
            /*----------------------------standing------------- */
            else{
                img = this._framesStanding[0];
            }
        }
        if (img && img.complete) {
            ctx.drawImage(img, this._x -8, this._y, this._width +16, this._height);
        }
    }
    // ! USELESS (was used for getting info about the object)
    renderInfo(ctx, numOfInfo = 0){
        console.log("renderInfo() is useless and should be deleted.")
        /* 
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText( this._id + ' :', 10 + numOfInfo * 200,  20);
        ctx.font = '20px Arial';
        ctx.fillText('----------------------------'      , 10 + numOfInfo * 200,  35);

        ctx.fillText('isGoRight   = ' + this._isGoRight  , 10 + numOfInfo * 200,  50);
        ctx.fillText('isPushRight = ' + this._isPushRight, 10 + numOfInfo * 200,  75);
        ctx.fillText('isGoLeft  = ' + this._isGoLeft   , 10 + numOfInfo * 200, 100);
        ctx.fillText('isPushLeft  = ' + this._isPushLeft , 10 + numOfInfo * 200, 125);
        
        ctx.fillText('----------------------------'      , 10 + numOfInfo * 200, 135);
        */
    }
    // * WORKS FLAWLESSLY (for other = Tetragon) 
    doesColideWith(other) {
        if (other instanceof Tetragon) {
            for (let j = 0; j < other._points.length; j++) {
                for (let i = 0; i < this._points.length; i++) {
                    let A = this._points[i];
                    let B = this._points[(i + 1) % this._points.length];
                    let C = other._points[j];
                    let D = other._points[(j + 1) % other._points.length]


                    const intersection = intersectionOfLineSegments(A, B, C, D);
                    if (intersection) {
                        if (intersection === null) {throw new Error("intersectionOfLineSegments() returned null.")}
                        return true;
                    }
                    if (colides(this, other)){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
/*---------------------------CharacterSprite----------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

/*-------------------------player1-------------------------------
const player1 = new CharacterSprite(100, 150, 68 - 16, 124,[
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
/*------------------------nastavení kláves------------------------
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
const w0 = new Rectangle(  1600, 400, 200, 50, "orange"); w0.id = "w0";
const w1 = new Rectangle(  10, 300, 500, 500, "red"); w1.id = "w1";
const w2 = new Rectangle(  10, 1000, 1900, 16, "red"); w2.id = "w2";
const w3 = new Rectangle( 600, 800, 200, 200, "grey"); w3.id = "w3";
const w5 = new Rectangle( 800, 950, 200, 50, "orange"); w5.id = "w5"; 
const w6 = new Rectangle( 1200, 950 -124, 200, 50, "orange"); w6.id = "w6";
const w7 = new Rectangle( 1600, 950, 200, 50, "orange"); w7.id = "w7";
const w8 = new Rectangle( 1600, 756, 200 , 50, "orange"); w8.id = "w8";
const w4 = new Tetragon(
    {x: 200, y: 150},
    {x: 900, y:  0},
    {x: 900, y: 150},
    {x: 200, y: 150},
    "grey"
)
w4.moveTo(1000,1000)
let walls = [w0,w1, w2, w3, w4,w5,w6,w7,w8];
    function Mainloop() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        for (let wall of walls){wall.render(ctx, true);}
        player1.updatePos(walls);
        player1.updateImage();
        player1.render(ctx, true);
    }
window.setInterval(Mainloop,6,true);
/**/ 