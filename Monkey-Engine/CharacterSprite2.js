import { DynamicSprite} from './DynamicSprite.js';
export class CharacterSprite2 extends DynamicSprite{
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
        this._framesStanding = [this._frames[0]];
        this._framesRunRight = this._frames.slice(1, 5);
        this._framesRunLeft  = this._frames.slice(5, 9);
        this._framesJumpUp   = this._frames.slice(1, 5)
        //
        this._framesJumpFarLeft  = this._frames.slice(5, 5);
        this._framesJumpLigLeft  = this._frames.slice(1, 5);
        this._framesJumpLeft     = this._frames.slice(1, 5);
        this._framesJumpFarRight = this._frames.slice(1, 5);
        this._framesJumpLigRight = this._frames.slice(1, 5);
        this._framesJumpRight    = this._frames.slice(1, 5);

        this._floor = y;
    }
    //posouvá objekt podle probíhající akce
    updatePos(){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.3;
        const jumpVelocity = -15;

        //vždy
        this._x += this._xVelocity;
        this._y += this._yVelocity;
        //nad zemí
        if ((this._y <  this._floor) && this._isJumping){
            this._yVelocity += gravity;
        }
        //pod zemí (kontola dopadu)
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this._xVelocity = 0;
            this._y = this._floor;
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
    render(ctx) {
        //info o CharacterSprite
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('isGoLeft  = ' + this._isGoLeft,  10,  50);
        ctx.fillText('isGoRight = ' + this._isGoRight, 10,  75);
        ctx.fillText('isJumping = ' + this._isJumping, 10, 100);
        ctx.fillText('isBothWay = ' + this._isBothWay, 10, 125);
        
        //pokud CharacterSprite má pole Spritů
        if (this._frames.length > 0) {
            let img = null;
            if(this._isGoRight) { 
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
            }  
            if (this._isGoLeft) {
                 img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            } 
            if (this._isBothWay) {
                 img = this._framesStanding[this._currentFrame];
            }

            if (img && img.complete) {
                ctx.drawImage(img, this._x, this._y, this._width, this._height);
            }
        //pokud CharacterSprite nemá pole Spritů
        } else {
            super.render(ctx);
            console.log("něco se posralo");
        } 
    }
    updateImage(){
        this._currentFrame = (this._currentFrame + 1) % this._frames.length;
    }
}
