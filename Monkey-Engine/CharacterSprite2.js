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
        const gravity = 0.3;
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
        const maxRunVelocity = 2;
        const maxJumpVelocity   = 4;
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
        if(this._wantJump  && !this._isJumping){
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

        const maxJumpVelocity   = 4;

        if(Rbox  != null){
            super.render_Hitbox(ctx)
        }
        if(Rinfo != null){this.renderInfo (ctx, Rinfo)}  
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
            }else{
            /*---------------------pokud neni ve skoku---------------------- */
                if(this._isGoRight){  
                    img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
                }else if(this._isGoLeft){ 
                    img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
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
        ctx.fillText('wantGoRight = ' + this._wantGoRight, 10 + numOfInfo * 200,  75);
        ctx.fillText('isGoLeft  = ' + this._isGoLeft   , 10 + numOfInfo * 200, 100);
        ctx.fillText('wantGoLeft  = ' + this._wantGoLeft , 10 + numOfInfo * 200, 125);
        
        ctx.fillText('----------------------------'      , 10 + numOfInfo * 200, 135);
        
    }
}
/*---------------------------CharacterSprite2-------------------------------
podívejte se do mainu Game_01_Ledvadva na ukázku použití
/**/