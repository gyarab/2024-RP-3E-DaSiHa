import { DynamicSprite} from './DynamicSprite.js';
export class CharacterSprite1 extends DynamicSprite{
    constructor(x, y, width, height, spritePaths = null) {
        super(x, y, width, height, null,spritePaths );

        this._yVelocity = 0;
        this._wantJump  = false;
        this._isJumping = false;

        this._framesRunning = [];

        this._floor = y;

    }    
    render(ctx) {

    let img = new Image();
    img.src = this._framesRunning[(this._timeOfAction) % this._framesRunning.length];
    ctx.drawImage(img, this._x, this._y, this._width, this._height);
            
    }
    updatePos(){
        const gravity = 0.3;
        const jumpVelocity = -15;

        this._y += this._yVelocity;

        if ((this._y <  this._floor) && this._isJumping){
            this._yVelocity += gravity;
            
        }
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this._y = this._floor;
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
