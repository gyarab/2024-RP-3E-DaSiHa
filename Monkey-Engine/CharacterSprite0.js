import { SpriteDyna } from "./SpriteDyna.js";
export class CharacterSprite0 extends SpriteDyna{
    constructor(x, y, width, height, spritePaths) {
        super(x, y, width, height, spritePaths);
        this._renderWidth = width;
        this._renderHeight = height;

        this._framesStanding = [];
        this._framesRunRight = [];
        this._framesRunLeft  = [];
        this._framesRunUp    = [];
        this._framesRunDown  = [];

        this._animStandingSlow = 10;
        this._animMovingSlow   = 10;
    }    
    
    isFor(action){
        switch(action){
            case 'GoLeft' :  return (!this._isGoRight  &&  this._isGoLeft);
            case 'GoRight':  return ( this._isGoRight  && !this._isGoLeft);
            case 'GoUp'   :  return (!this._isGoDown   &&  this._isGoUp);
            case 'GoDown' :  return ( this._isGoDown   && !this._isGoUp);
            case 'Stand'  :  return(
                (!this._isGoRight && !this._isGoLeft) && 
                (!this._isGoUp && !this._isGoDown)
            ); 
        }
    }
    render(ctx, Rbox){ 
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
            const renderX = this._x - ((this._renderWidth - this._width) / 2 );
            const renderY = this._y - ((this._renderHeight - this._height) / 2);
            ctx.drawImage( img, renderX, renderY, this._renderWidth, this._renderHeight );
        }
        if (Rbox) {
            ctx.strokeStyle = 'magenta';
            ctx.strokeRect(this._x, this._y, this._width, this._height );
        }
    }
    updateImage() {
        this._animTick += 1;
        if (this.isFor('Stand')) {
            if (this._animTick > this._animStandingSlow) {
                this._currentFrame = (this._currentFrame + 1) % this._framesStanding.length;
                this._animTick = 0;
            }
        } else {
            if (this._animTick > this._animMovingSlow) {
                if (this.isFor('GoRight')) {
                    this._currentFrame = (this._currentFrame + 1) % this._framesRunRight.length;
                } else if (this.isFor('GoLeft')) {
                    this._currentFrame = (this._currentFrame + 1) % this._framesRunLeft.length;
                } else if (this.isFor('GoUp')) {
                    this._currentFrame = (this._currentFrame + 1) % this._framesRunUp.length;
                } else if (this.isFor('GoDown')) {
                    this._currentFrame = (this._currentFrame + 1) % this._framesRunDown.length;
                }
                this._animTick = 0;
            }
        }
    }
}
//TODO: Example udělám až mě o to někdo z vás požádá :), nikdo z týmu to zatím nepotřebuje

