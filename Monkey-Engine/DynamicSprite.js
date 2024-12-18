import { SpriteAnim } from './SpriteAnim.js';
export class DynamicSprite extends SpriteAnim{
    constructor(x, y, width, height, color = null, spritePath = null){
        super  (x, y, width, height, color , spritePath); 

        //probíhající akce
        this._isGoLeft   = false;
        this._isGoRight  = false;
        this._isGoUp     = false;
        this._isGoDown   = false;
        this._isBothWay  = false;
        //rychlosti 
        this._ySpeed  = 0.1;
        this._xSpeed  = 2;

        this._timeOfAction = 0;
        this._counterAnim  = 0;
    }
    
    updatePos(){
        // Update position
        if (this._isGoRight && !this._isGoLeft) {
            this._x     += this._xSpeed;
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
              this._counterAnim   = 0;
              this._timeOfAction +=  1;
            }
        } else if (this._isGoLeft && !this._isGoRight) {
            this._x     -= this._xSpeed;
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
                this._counterAnim   = 0;
                this._timeOfAction +=  1;
              }
        }
        if (this._isGoUp && !this._isGoDown) {
            this._y -= this._ySpeed;
        } else if (this._isGoDown && !this._isGoUp) {
            this._y += this._ySpeed;
        }
    }
    /*--------------------------Setters-------------------------------*/ 

    set isGoRight(newIsGoRight) {
        this._isGoRight = newIsGoRight;
    }
    set isGoLeft(newIsGoLeft) {
        this._isGoLeft = newIsGoLeft;
    }
    set isGoUp(newIsGoUp) {
        this._isGoUp = newIsGoUp;
    }
    set isGoDown(newIsGoDown) {
        this._isGoDown = newIsGoDown;
    }

}
