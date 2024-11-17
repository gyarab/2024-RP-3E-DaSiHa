import { DynamicSprite} from './DynamicSprite.js';
export class CharacterSprite2 extends DynamicSprite{
    constructor(x, y, width, height, spritePaths) {
        super(x, y, width, height, spritePaths);

        //probíhající akce
        this._wantGoRight = false;
        this._wantGoLeft = false;
        this._wantJump   = false;
        this._isJumping = false;
        //vlastnosti akcí
        this._yVelocity = 0;
        this._xVelocity = 0;
        this._dirOfJump = 0;
        //
        this._framesStanding = [this._frames[0]];
        this._framesRunRight = this._frames.slice(1, 5);
        this._framesRunLeft = this._frames.slice(5, 9);

        this._floor = y;
    }
    //posouvá objekt podle probíhající akce
    updatePos(){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.3;
        const jumpVelocity = -15;


        this._x += this._xVelocity;
        this._y += this._yVelocity;
        //nad zemí
        if ((this._y <  this._floor) && this._isJumping){this._yVelocity += gravity;}
        //pod zemí
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this._xVelocity = 0;
            this._y = this._floor;
            this._isJumping = false;
        }

        //pokud chce doprava
        if(this._wantGoRight && !this._wantGoLeft){
            if(!this._isJumping){
                this._xVelocity = this._xSpeed;
                this.isGoRight = true;
            }else{
                this._xVelocity += this._xSpeed /90;
            }
        }
        //pokud chce doleva
        if(this._wantGoLeft  && !this._wantGoRight){
            if(!this._isJumping){
                this._xVelocity = -this._xSpeed;
                this.isGoLeft   = true;
            }else{
                this._xVelocity -= this._xSpeed /90;
            }
        }
        //pokud  chci  doprava i doleva
        if(this._wantGoLeft && this._wantGoRight){
            if(this._isJumping){}
            

        }
        //pokud nechci ani doleva ani doprava
        if(!this._wantGoLeft  && !this._wantGoRight && !this._isJumping){
            this._isGoBothWay = true;
            this._isGoLeft  = false;
            this._isGoRight = false;
            this._xVelocity = 0;
        }
        /*-------------------------pokud chce skočit------------------------- */
        //pokud chce skočit
        if(this._wantJump  && !this._isJumping){
            if( this._isGoRight && !this._isGoLeft){this._dirOfJump =  1}
            if(!this._isGoRight &&  this._isGoLeft){this._dirOfJump = -1}
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
        }
        /*---------------------------animace-------------------------- */
        // pokud jde doprava
        if (this._isGoRight) {
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
                this._counterAnim   = 0;
                this._timeOfAction +=  1;
            }
        }
        //pokud jde doleva
        if (this._isGoLeft) {
            this._counterAnim +=  1;
            if (this._counterAnim > 9){
                this._counterAnim   = 0;
                this._timeOfAction +=  1;
              }
        }
    }
    //vykresluje sprite podle probíhající akce  
    render(ctx) {
        if (this._frames.length > 0) {

            let img = null;
            if(this.isFor('GoRight')) { 
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
                //console.log('drawImage');
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
            case 'Jump'   :  return (!this._isJump);
        }
    }
    updateImage(){
        this._currentFrame = (this._currentFrame + 1) % this._frames.length;
    }
}
