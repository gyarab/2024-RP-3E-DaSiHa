import { SpriteDyna } from "./SpriteDyna.js";
export class CharacterSprite1 extends SpriteDyna{
    constructor(x, y, width, height, spritePaths = []) {
        super(x, y, width, height, spritePaths);

        this._yVelocity = 0;
        this._wantJump  = false;
        this._isJumping = false;

        this._framesRunning = [];
        this._framesJumping = [];

        this._floor = y;

    }    
    render(ctx, Rbox){ 
        const ofset = ctx.lineWidth / 2;
        if (Rbox){ctx.strokeRect(this._x + ofset, this._y + ofset, this._width - ctx.lineWidth, this._height - ctx.lineWidth);}
        let img = null;
        if (this._isJumping) {
            img = this._framesJumping[
                ((this._currentFrame + this._timeOfAction )% this._framesJumping.length)
            ];
        }else{
            img = this._framesRunning[
                ((this._currentFrame + this._timeOfAction )% this._framesRunning.length)
            ];
        }
        ctx.drawImage(img, this._x, this._y, this._width, this._height);      
    }
    updatePos(){
        const gravity = 0.1;
        const jumpVelocity = -10;

        this.y = this._y + this._yVelocity;

        if ((this._y <  this._floor) && this._isJumping){
            this._yVelocity += gravity;
            
        }
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this.y = this._floor;
            this._isJumping = false;
        }
        if(this._wantJump  && !this._isJumping){
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
        }
        
        this._counterAnim +=  1;
        if (this._counterAnim > 9){
            this._counterAnim   = 0;
            this._timeOfAction +=  1;
        }
    }
}
//TODO: jako example prozatím slouží ../Game_03_runner/scipt.js
