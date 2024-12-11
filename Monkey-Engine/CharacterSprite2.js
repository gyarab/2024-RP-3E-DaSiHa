import { Rectangle } from "./Rectangle.js";
import { SpriteDyna } from "./SpriteDyna.js";
import { colidesBottom, colidesLeft , colidesRight, colidesTop} from "./Tetragon.js";
export class CharacterSprite2 extends SpriteDyna{
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
        
        
        this._floor = 720 - this._height;
    }
    //posouvá objekt podle probíhající akce
    updatePos(obsticles){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.14;
        const jumpVelocity = -7;
        //vždy
        this.y = this._y + this._yVelocity
        //kolize
        const NextFrame = new Rectangle(this._x + this._xVelocity,this._y + this._yVelocity,this._width, this._height,null);
        let canGoRight = true;
        let canGoLeft  = true;
        let canGoUp    = true;
        let canGoDown  = true;
        for (let ob of obsticles) {
            if (colidesRight(NextFrame , ob, 15)){
                canGoRight = false;
            }
            if (colidesLeft(NextFrame , ob, 15)){
                canGoLeft = false;
            }
            if(colidesBottom(NextFrame, ob, 10)){
                canGoDown = false;
            }
            if(colidesTop(NextFrame, ob, 30)){
                canGoUp = false;
            }
        }
        let isInWallLeft  = false;
        let isInWallRight = false;
        let isInCeiling   = false;
        for (let ob of obsticles) {
            if (colidesRight(this, ob, 15 )){isInWallRight = true;}
            if (colidesLeft (this, ob, 15 )){isInWallLeft  = true;}
            if (colidesTop  (this, ob, 30 )){isInCeiling   = true;}
        }
        if(!canGoRight) {
            this._xVelocity = 0
            this._isPushRight = true;
            if (isInWallRight){
                this.x = this._x - 1;
            }
        }else 
        if(!canGoLeft)  {
            this._xVelocity = 0
            this._isPushLeft = true;
            if (isInWallLeft){
                this.x = this._x + 1;
            }
        }else           {
            this.x = this._x + this._xVelocity;
            this._isPushRight = false;
            this._isPushLeft  = false;
        }
        if(!canGoDown){
            let floorOb = null;
            floorOb = obsticles.find(ob => colidesBottom(NextFrame, ob, 10));
            this._floor = floorOb._points[0].y - this._height;
            this._isOnGround = true;
        }else           {
            this._floor = 720 - this._height;
            this._isOnGround = false;
        }  
        if (!canGoUp){
            this._yVelocity = 0; 
            if (isInCeiling){
                this.y = this._y + 5
            }
        } 
        //padání
        if (this._y <  this._floor){
            this._yVelocity += gravity;
        }else{
            this._yVelocity = 0;
            this._xVelocity = 0;
            this._isJumping  = false;
            this._isOnGround = true ;
            this.y = this._floor;
            if(!this._wantGoLeft ){this._isGoLeft = false}
            if(!this._wantGoRight){this._isGoRight = false}
        }
        const maxRunVelocity = 2;
        const maxJumpVelocity   = 4;
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
    updateImage(){
        if (this._isGoLeft || this._isGoRight) {
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
                this._counterAnim   = 0;
                this._timeOfAction +=  1;
            }
        }
    }
    //vykresluje sprite podle probíhající akce  
    render(ctx, Rinfo = null, Rbox = null){
        if(Rbox  != null){
            super.render_Hitbox(ctx)
        }
        if(Rinfo != null){
            this.renderInfo (ctx, Rinfo)
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
}
/*---------------------------CharacterSprite2-------------------------------
podívejte se do mainu Game_01_Ledvadva na ukázku použití
/**/