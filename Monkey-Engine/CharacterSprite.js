import { Tetragon } from "./Tetragon.js";
import { Rectangle } from "./Rectangle.js";
import { SpriteDyna } from "./SpriteDyna.js";
import { colides } from "./Tetragon.js";
import { intersectionOfLineSegments } from "./LineSection.js";

export class CharacterSprite extends SpriteDyna{
    constructor(x, y, width, height, spritePaths) {
        super  (x, y, width, height, spritePaths);

        //probíhající akce
        this._wantGoRight = false;
        this._wantGoLeft  = false;
        this._wantJump    = false;

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
    updatePos(obsticles){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.07;
        const jumpVelocity = - 3.5;
        this.y = this._y + this._yVelocity
        //kolize
        const NextFrameX = new CharacterSprite(this._x + this._xVelocity, this._y, this._width, this._height);
        const NextFrameY = new CharacterSprite(this._x, this._y + this._yVelocity, this._width, this._height);
        let canGoRight = true;
        let canGoLeft  = true;
        let canGoUp    = true;
        let canGoDown  = true;
        
        for (let ob of obsticles) {
            if (NextFrameX.doesColideWith(ob)){
                if (this._xVelocity > 0){
                    canGoRight = false;
                }
                if(this._xVelocity < 0){
                    canGoLeft = false; 
                }
            }else
            if (NextFrameY.doesColideWith(ob)){
                if (this._yVelocity > 0){
                    canGoDown = false;
                }
                if (this._yVelocity < 0){
                    canGoUp = false;
                }
            }
        }
        
        if(!canGoRight) {
            this._xVelocity = 0
            this._isPushRight = true;
        }else 
        if(!canGoLeft)  {
            this._xVelocity = 0
            this._isPushLeft = true;
        }else           {
            this.x = this._x + this._xVelocity;
            this._isPushRight = false;
            this._isPushLeft  = false;
        }
        if(!canGoDown){
            this._floor = Math.floor(this._y) -1;
            this._isOnGround = true;
            this._yVelocity = 0;
        }else           {
            this._floor = 1080 - this._height;
            this._isOnGround = false;
            this._yVelocity += gravity;
        }  
        if (!canGoUp){
            this._yVelocity = 0; 
        } 
        /* padání
        if (this._isOnGround){
        console.log(this._yVelocity)
            
        }else{
            this._yVelocity = 0;
            this._xVelocity = 0;
            this._isJumping  = false;
            this._isOnGround = true ;
            this.y = this._floor;
            if(!this._wantGoLeft ){this._isGoLeft = false}
            if(!this._wantGoRight){this._isGoRight = false}
        }
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
        if(Rbox){
            super.render_Hitbox(ctx)
        }

        //pokud CharacterSprite má pole Spritů
        let img = null;
        /*---------------------pokud je ve skoku---------------------- */
        if (this._isJumping) {
            /*----------------skok doprava---------------------------- */
            if (this._dirOfJump == 1){
                if ( this._wantGoRight){
                    img = this._framesJumpFarRight[1];
                }else if(this._wantGoLeft){
                    img = this._framesJumpFarRight[2];
                }else{
                    img = this._framesJumpFarRight[0];
                }  
            }
            /*-----------------skok doleva---------------------------- */
            if (this._dirOfJump == -1){
                if (this._wantGoLeft){
                    img = this._framesJumpFarLeft[1];
                }else if(this._wantGoRight){
                    img = this._framesJumpFarLeft[2];
                }else{
                    img = this._framesJumpFarLeft[0];
                }  
            }
            /*-----------------skok nahoru---------------------------- */
            if (this._dirOfJump == 0){
                img = this._framesStanding[0];
            }
        }
        /*---------------------pokud neni ve skoku---------------------- */
        else{
            if(this._isGoRight && !this._isPushRight){  
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
            }else if (this._isPushRight){
                img = this._framesPushRight[0];
            }else if(this._isGoLeft && !this._isPushLeft){ 
                img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            }else if (this._isPushLeft){
                img = this._framesPushLeft[0];
            }else{
                img = this._framesStanding[0];
            }
        }

        if (img && img.complete) {
            ctx.drawImage(img, this._x, this._y, this._width, this._height);
        }
    }
    // ! USELESS
    renderInfo(ctx, numOfInfo = 0){
        //info o CharacterSprite
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
    }
    // * WORKS FLAWLESSLY (for other = Tetragon) 
    doesColideWith(other) {
        if (other instanceof Tetragon) {
            for (let j = 0; j < other._points.length; j++) {
                for (let i = 0; i < this._points.length; i++) {
                    let A = this._points[i];
                    let B = this._points[(i + 1) % this._points.length];

                    const intersection = intersectionOfLineSegments(A, B, other._points[j], other._points[(j + 1) % other._points.length]);
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
/*---------------------------CharacterSprite-------------------------------*/
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

/*-------------------------player1--------------------------------*/
const player1 = new CharacterSprite(150, 100, 68, 124,[
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


const w1 = new Rectangle(10, 300, 500, 500, "grey");

let walls = [w1];
    function Mainloop() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        w1.render(ctx, true);
        player1.updatePos(walls);
        player1.updateImage();
        player1.render(ctx, true);
        

        
    }
window.setInterval(Mainloop, 60, true);
