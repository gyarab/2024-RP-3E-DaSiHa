import { DynamicSprite} from './DynamicSprite.js';
export class CharacterSprite0 extends DynamicSprite{
    constructor(x, y, width, height, spritePaths = null) {
        super(x, y, width, height, spritePaths);

        this._framesStanding = [];
        this._framesRunRight = [];
        this._framesRunLeft  = [];
        this._framesRunUp    = [];
        this._framesRunDown  = [];

        const animationSpeed = 1/100;
    }    
    render(ctx) {
        if (this._frames.length > 0) {

            let img = null;

            if (this.isFor('GoRight')) { 
                img =  this._framesRunRight[
                    (this._currentFrame + this._timeOfAction )% this._framesRunRight.length
                ];
            }  
            if (this.isFor('GoLeft') ) {
                 img = this._framesRunLeft[
                    (this._currentFrame + this._timeOfAction )% this._framesRunLeft.length
                ];
            }
            if (this.isFor('GoUp')) {
                img = this._framesRunUp[
                    (this._currentFrame + this._timeOfAction )% this._framesRunUp.length
                ];
           }
           if (this.isFor('GoDown')) {
                img = this._framesRunDown[
                    (this._currentFrame + this._timeOfAction )% this._framesRunDown.length
                ];
           }
            if (this.isFor('Stand')) {
                 img = this._framesStanding[this._currentFrame];
            }
            

            if (img && img.complete) {
                ctx.drawImage(img, this._x, this._y, this._width, this._height);
                console.log('drawImage');
            }
        }else{
            console.log('error _frames is empty');
            super.render(ctx);     
        }   
    }
    isFor(action){
        switch(action){
            case 'GoLeft' :  return (!this._isGoRight  &&  this._isGoLeft);
            case 'GoRight':  return ( this._isGoRight  && !this._isGoLeft);
            case 'GoUp'   :  return (!this._isGoDown   &&  this._isGoUp);
            case 'GoDown' :  return ( this._isGoDown   && !this._isGoUp);
            case 'Stand'  :  return (!this._isGoRight  && !this._isGoLeft)||
                                    ( this._isGoRight  &&  this._isGoLeft);
        }
    }
    updateImage(){
        this._currentFrame = (this._currentFrame + 1) % this._frames.length;
    }
}
