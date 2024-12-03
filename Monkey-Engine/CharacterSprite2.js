import { SpriteDyna } from "./SpriteDyna.js";
export class CharacterSprite2 extends SpriteDyna{
    constructor(x, y, width, height, spritePaths) {
        super  (x, y, width, height, spritePaths);

        //probíhající akce
        this._wantGoRight = false;
        this._wantGoLeft  = false;
        this._wantJump    = false;
        this._isJumping  = false;
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
        this._framesJumpLeft     = [];
        this._framesJumpFarRight = [];
        this._framesJumpLigRight = [];
        this._framesJumpRight    = [];
        
        this._floor = y;
    }
    //posouvá objekt podle probíhající akce
    updatePos(Obsticles = []){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.1;
        const jumpVelocity = -10;

        //vždy
        this.x = this._x + this._xVelocity;
        this.y = this._y + this._yVelocity;
        //nad zemí
        if ((this._y <  this._floor) && this._isJumping){
            this._yVelocity += gravity;
        }
        //pod zemí (kontola dopadu)
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this._xVelocity = 0;
            this.y = this._floor;
            this._isJumping = false;
            if(!this._wantGoLeft ){this._isGoLeft = false}
            if(!this._wantGoRight){this._isGoRight = false}
        }
        /*-----------------------pokud chce doprava------------------ */
        if(this._wantGoRight && !this._wantGoLeft){
            this._isBothWay = false;
            if(!this._isJumping){
                this._xVelocity = this._xSpeed;
                this.isGoRight = true;
            }else{
                this._xVelocity += this._xSpeed /90;
                this.isGoRight = true;
            }
        }
        /*-----------------------pokud chce doleva-------------------- */
        if(this._wantGoLeft  && !this._wantGoRight){
            this._isBothWay = false;
            if(!this._isJumping){
                this._xVelocity = -this._xSpeed;
                this.isGoLeft   = true;
            }else{
                this._xVelocity -= this._xSpeed /90;
                this.isGoLeft   = true;
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
        if(this._wantJump  && !this._isJumping){
            if( this._isGoRight && !this._isGoLeft){this._dirOfJump =  1}
            if(!this._isGoRight &&  this._isGoLeft){this._dirOfJump = -1}
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
        }
        /*---------------------------animace-------------------------- */
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
        if(Rinfo != null){this.renderInfo (ctx, Rinfo)}  
        //pokud CharacterSprite má pole Spritů
            let img = null;
            if(this._isGoRight) { 
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
            }else  
            if (this._isGoLeft) {
                 img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            }else 
            if (this._isBothWay) {
                 img = this._framesStanding[this._currentFrame];
            }else{
                console.log("zmizel")
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
        ctx.fillText('----------------------------'  , 10 + numOfInfo * 200,  35);
        ctx.fillText('isGoLeft  = ' + this._isGoLeft , 10 + numOfInfo * 200,  50);
        ctx.fillText('isGoRight = ' + this._isGoRight, 10 + numOfInfo * 200,  75);
        ctx.fillText('isJumping = ' + this._isJumping, 10 + numOfInfo * 200, 100);
        ctx.fillText('isBothWay = ' + this._isBothWay, 10 + numOfInfo * 200, 125);
        ctx.fillText('----------------------------'  , 10 + numOfInfo * 200, 135);
        
    }
}
/*---------------------------CharacterSprite2-------------------------------
podívejte se do mainu Game_01_Ledvadva na ukázku použití
/**/