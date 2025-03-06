import { SpriteDyna } from "./SpriteDyna.js";
import { Interactable } from "./Interactable.js";
import { Basketball, Platform, Pushable, SemiSolid, Solid } from "./PlatformerLib.js";
import { Rectangle } from "./Rectangle.js";

export class CharacterSprite extends SpriteDyna{
    constructor(x, y, width, height, spritePaths) {
        super  (x, y, width, height, spritePaths);

        //probíhající akce
        this._wantGoRight = false;
        this._wantGoLeft  = false;
        this._wantJump    = false;
        this._wantGoDown  = false;
        this._wantInteract = false;

        this._isOnGround  = false;
        this._isJumping   = false;


        // 0 = none, 1 = solid, 2 = platform, else = dynamic_id
        this._typeOfGround = 0; 

        this._isPushRight = false;
        this._isPushLeft  = false;
        //vlastnosti akcí
        this._yVelocity = 0;
        this._xVelocity = 0;
        this._dirOfJump = 0;
        // Initialize points for collision detection
        this._points = [
            { x: this._x, y: this._y },
            { x: this._x + this._width, y: this._y },
            { x: this._x + this._width, y: this._y + this._height },
            { x: this._x, y: this._y + this._height }
        ];
        this._pointOfJump = { x: this._x + this._width, y: this._y + this._height };

        //jednotlivé pole pro animace
        this._framesStanding = [];
        this._framesRunRight = [];
        this._framesRunLeft  = [];
        this._framesJumpUp   = [];

        this._framesJumpFarLeft  = [];
        this._framesJumpLigLeft  = [];
        this._framesJumpFarRight = [];
        this._framesJumpLigRight = [];

        this._framesPushLeft     = [];
        this._framesPushRight    = [];
        
        this._floor = 1080 - this._height;
    }
    //posouvá objekt podle probíhající akce
    updatePos(obstacles){
        // poměr gravity:jumpVelocity určuje výší a délku skoku 
        const gravity = 0.07;
        const jumpVelocity = - 3.7;

        this.y = this._y + this._yVelocity
        const maxRunVelocity  = 1.5;
        const maxJumpVelocity = 2;
        /*-----------------------pokud chce doprava------------------ */
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
        if(this._wantJump  && !this._isJumping && this._isOnGround){

            if( this._isGoRight && !this._isGoLeft){this._dirOfJump =  1}
            if(!this._isGoRight &&  this._isGoLeft){this._dirOfJump = -1}
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
            this._pointOfJump = {x: this._x, y: this._y + this._height};
        }

        const ratioOfLegs = 9/10
        const ratioOfPushLegsm = 5/10
        //kolize
        //NextFrameDown a NextFrameUp jsous skoro stejné a proto si plete kolizi s podlahou a stropem
        const NextFrameDown  = new CharacterSprite(this._x , this._y + this._yVelocity + gravity, this._width, this._height);
        const NextFrameUp     = new CharacterSprite(this._x , this._y + this._yVelocity - this._ySpeed, this._width, this._height)
        const NextFrameRight = new CharacterSprite(this._x + this._xSpeed, this._y , this._width, this._height * ratioOfLegs );
        const NextFrameLeft  = new CharacterSprite(this._x - this._xSpeed, this._y , this._width, this._height * ratioOfLegs );
        const NextFrameY     = new CharacterSprite(this._x, this._y + this._yVelocity + 1, this._width, this._height);

        const nextFrameRightBox = new Rectangle(this._x + this._xSpeed + 5 , this._y, this._width, this._height * ratioOfLegs);
        const nextFrameLeftBox  = new Rectangle(this._x - this._xSpeed - 5 , this._y, this._width, this._height * ratioOfLegs);

        let canGoRight = true;
        let canGoLeft  = true;
        let canGoUp    = true;
        let canGoDown  = true;

        for (let ob of obstacles) {
            //! = act as solid
            //! don't forget to assaign what type of obstacle should use the propretese of red
            //! 0 = none, 1 = solid, 2 = platform, else = dynamic_id
            let actAsRed  = null;

            if(ob instanceof Platform && !this._wantGoDown){
                if (NextFrameY.doesColideWith(ob)  && !this.doesColideWith(ob) && (this._yVelocity >= 0)){
                    canGoDown = false;
                    this._typeOfGround = 2;
                } 
            }
            if(ob instanceof SemiSolid){
                if (
                        (!this._isJumping && this._points[3].y < ob._points[3].y) 
                        ||( this._isJumping && this._pointOfJump.y < ob._points[3].y)
                    ){
                    if (!this.doesColideWith(ob)){
                    actAsRed = 1;
                    }
                }
            }
            if(ob instanceof Pushable){
                actAsRed = true; 
                if (!this._isJumping && this._typeOfGround != ob._id){
                    if  (nextFrameRightBox.doesColideWith(ob) && (this._xVelocity >= 0)||
                         (nextFrameLeftBox.doesColideWith(ob) && (this._xVelocity <= 0))){
                        ob._xVelocity = this._xVelocity;
                        ob._isPushed = true;
                        
                    }
                }
                if (this._typeOfGround == ob._id){
                    this._xVelocity = this._xVelocity + ob._xVelocity;
                }
            }
            if(ob instanceof Solid || actAsRed){
                if (NextFrameDown.doesColideWith(ob)){
                    canGoDown = false;
                    this._typeOfGround = 1;
                    if (actAsRed){ this._typeOfGround = ob._id; }
                }
                if (NextFrameRight.doesColideWith(ob) && (this._xVelocity > 0)){
                    canGoRight = false;
                }
                if (NextFrameLeft.doesColideWith(ob) && (this._xVelocity < 0)){
                    canGoLeft = false;
                }
                if (NextFrameUp.doesColideWith(ob) && (this._yVelocity < 0)){
                    canGoUp = false;
                }
                if (this.doesColideWith(ob)){
                    this.y = this._y - 0.5;
                    this._xVelocity = this._xVelocity / 10;
                }
            }
            if(ob instanceof Interactable){ 
                if (this.doesColideWith(ob)){
                    ob._isInteractable = true;
                    if(this._wantInteract){
                        ob._action(ob);
                    }
                }else {
                    ob._isInteractable = false;
                }
            }
            
        }
        if(!canGoRight) {
            this._xVelocity = 0
            this._isPushRight = true;
        }
        else if(!canGoLeft)  {
            this._xVelocity = 0
            this._isPushLeft = true;
        }else{
            this.x = this._x + this._xVelocity;
            this._isPushRight = false;  
            this._isPushLeft  = false;
        }
        if(canGoDown){
            this._floor = 1080 - this._height;
            this._isOnGround = false;
            this._typeOfGround = 0;
            this._yVelocity += gravity;
            
        }if (!canGoDown){
            this._floor = Math.floor(this._y) ;
            this._isOnGround = true;
            this._yVelocity = 0;
            this._isJumping = false;
            if(!this._wantGoLeft ){this._isGoLeft = false}
            if(!this._wantGoRight){this._isGoRight = false}
        }  
        if (!canGoUp){
            this._yVelocity = 0; 
            this.y = this._y + gravity;
        } 
        if (this._isOnGround){
            this._isJumping = false;
        }
    }
    // * vykresluje sprite podle probíhající akce  
    render(ctx, Rbox = null){
        //
        if(Rbox){super.render_Hitbox(ctx)}
        let img = null;
        /*------------Sprite-for-jumping---------------------- */
        if (this._isJumping) {
            /*---------------------------right-----------------*/
            if (this._dirOfJump == 1){
                if ( this._wantGoRight){
                    img = this._framesJumpFarRight[1];
                }else if(this._wantGoLeft){
                    img = this._framesJumpFarRight[2];
                }else{
                    img = this._framesJumpFarRight[0];
                }  
            }
            /*---------------------------left------------------*/
            if (this._dirOfJump == -1){
                if (this._wantGoLeft){
                    img = this._framesJumpFarLeft[1];
                }else if(this._wantGoRight){
                    img = this._framesJumpFarLeft[2];
                }else{
                    img = this._framesJumpFarLeft[0];
                }  
            }
            /*---------------------------up--------------------*/
            if (this._dirOfJump == 0){
                img = this._framesStanding[0];
            }
        }
        /*------------Sprite-for-nonjumping--------------------*/
        else{
            /*----------------------------running-right--------*/
            if(this._isGoRight && !this._isPushRight){  
                img =  this._framesRunRight[(this._currentFrame + this._timeOfAction )% this._framesRunRight.length];
            }
            /*----------------------------pushing-right--------*/
            else if (this._isPushRight){
                img = this._framesPushRight[0];
            }
            /*----------------------------running-left---------*/
            else if(this._isGoLeft && !this._isPushLeft){ 
                img = this._framesRunLeft [(this._currentFrame + this._timeOfAction )% this._framesRunLeft.length];
            }
            /*----------------------------pushing-left----------*/
            else if (this._isPushLeft){
                img = this._framesPushLeft[0];
            }
            /*----------------------------standing------------- */
            else{
                img = this._framesStanding[0];
            }
        }
        if (img && img.complete) {
            ctx.drawImage(img, this._x -8, this._y, this._width +16, this._height);
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
}
//TODO: Example je basicly moje ročníkovka CharacterSprite je natolik komplexní že ho nevyužije nikdo jiný