import { DynamicSprite} from './DynamicSprite.js';
export class CharacterSprite extends DynamicSprite{
    constructor(x, y, width, height, spritePaths) {
        super(x, y, width, height, spritePaths);

        this._framesStanding = [this._frames[0]];
        this._framesRunRight = this._frames.slice(1, 5);
        this._framesRunLeft = this._frames.slice(5, 9);
        const animationSpeed = 1/100;
    }    
    render(ctx) {
        if (this._frames.length > 0) {

            let img = null;

            if         (this.isFor('GoRight')) { 
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];

            } else  
            if (this.isFor('GoLeft') ) {
                 img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            } else
            if (this.isFor('Stand')) {
                 img = this._framesStanding[this._currentFrame];
            }

            if (img && img.complete) {
                ctx.drawImage(img, this._x, this._y, this._width, this._height);
                console.log('drawImage');
            }
        }else{
            super.render(ctx)
            
        }   
    }
    isFor(action){
        switch(action){
            case 'GoLeft' :  return (!this._isGoRight  &&  this._isGoLeft);
            case 'GoRight':  return ( this._isGoRight  && !this._isGoLeft);
            case 'Stand'  :  return (!this._isGoRight  && !this._isGoLeft)||
                                    ( this._isGoRight  &&  this._isGoLeft);
        }
    }
    updateImage(){
        this._currentFrame = (this._currentFrame + 1) % this._frames.length;
    }
}
