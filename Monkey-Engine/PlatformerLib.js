import { Interactable, InteractableIndicator } from './Interactable.js';
import { SpriteAnim } from  '../Monkey-Engine/SpriteAnim.js';
import {  CharacterSprite } from '../Monkey-Engine/CharacterSprite.js';
import { CharacterSprite0 } from '../Monkey-Engine/CharacterSprite0.js';
import {  Rectangle } from './Rectangle.js';
import { Ledvadva } from '../Game_01_Ledvadva/main.js';

//TODO změnit hitbox u Projektilů na kruh
//TODO přidat Tetragon-Solid
//TODO Pushable má hodně mušek
//TODO: EndOfLevel, Switch,LevelSelect
//TODO: generizuj Selector a Closet

const pathToIndicators = "../Game_01_Ledvadva/sprites/Indicators/";
const  indicatorKey_Shift  = new InteractableIndicator(0,0,124,44, pathToIndicators + "Press-Shift.png"   );
const indicatorKey_E_Shift = new InteractableIndicator(0,0,200,44, pathToIndicators + "Press-E-Shift.png" );
const    indicatorKey_E    = new InteractableIndicator(0,0, 44,44, pathToIndicators + "Press-E.png"       );

////------------------------Walls--------------------------////

export class Platform  extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height, "orange");
    }
}
export class Solid    extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height, "red");
    }
}
export class SemiSolid extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height, "yellow");
    }
}
export class Ladder extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height, "green");
    }
}
////
////----------------------Interactable--------------------////
const pathToInteractable = "../Game_01_Ledvadva/sprites/Interactable/";
// typeOf Interactable     LevelSelect              
    //TODO: /*visualisation*/
    export class LevelSelect extends Interactable{
        constructor(x, y, width, height, numberOfLevel){
            super(x, y, width, height);
            this._hasToBeOnGround = true;

            this._lvlNumber  = numberOfLevel
            this._platforms  = [this];
            this._isComplete = false;
        }
        _addPlatform(platform){
            this._platforms.push(platform);
        }
        _action(){
            for (let pform of this._platforms) {pform._color = "orange";}
            console.log("Should change level to " + this._lvlNumber);
            Ledvadva.currentlvl = this._lvlNumber;
            Ledvadva.shouldRestart = true;
            this._isComplete = true;  
        }
        render(ctx){
            for (let p of this._platforms){
                super.render(ctx);
            }

        }
    }
// typeOf Interactable     PointerToHub
    export class PointerToHub extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._hasToBeOnGround = true;
        };
        _action(){
            Ledvadva.currentlvl = 0;
            Ledvadva.shouldRestart = true;
        }
    }
    // visualisation
        export class PointerToHubSprite extends SpriteAnim{
            constructor(x, y, width, height, spritePaths, EndOfLevel){
                super(x, y, width, height, spritePaths);
                this._Interactable = EndOfLevel;
            }
            render(ctx){
                this._currentFrame = 0;
                let wasd  = (this._Interactable._isInteractableWith[Ledvadva.players[0]._id]);
                let arrow = (this._Interactable._isInteractableWith[Ledvadva.players[1]._id]);
                if(wasd || arrow){
                    this._currentFrame = 1;
                    if(wasd && arrow){ indicatorKey_E_Shift.moveTo(this) ; indicatorKey_E_Shift.render(ctx); }
                    else if ( arrow ){ indicatorKey_Shift.moveTo(this)   ; indicatorKey_Shift.render(ctx)  ; }
                    else if (  wasd ){ indicatorKey_E.moveTo(this)       ; indicatorKey_E.render(ctx)      ; }     
                }
                super.render(ctx);
            }
        }
// typeOf Interactable      Switch
    //TODO: /*visualisation*/
    export class Switch extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._isOn = false;
        };;
        _action(objects){
            this._isOn = !this._isOn;
        }
    }
//typeOf Interactable      Selector
    export class Selector extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._hasToBeOnGround = true;
            this._reactToForward  = true;
            this._reactToBackward = true;
            this._reactToAction   = false;

            this._field = ["RED", "BLU", "SKIN-00", "SKIN-01"];

        }
        _action(player, index){
            const oldIndex = this._field.indexOf(player._skins[player._currentSkin]);
            const newIndex = oldIndex + index;
            this._updateReactsTo(player);
            player.loadAndChangeSkin(this._field[newIndex]);

        }
        _updateReactsTo(player){
            const index = this._field.indexOf(player._skins[player._currentSkin]);
            if((index + 1) > this._field.length - 1){
                this._reactToForward  = false;
                console.log("Forward is off");
            }else{
                this._reactToForward  = true;
            }
            if((index - 1) < 0 ){
                console.log("Backward is off");
                this._reactToBackward = false;
            }else{
                this._reactToBackward = true;
            }
        }
        _canGo(N_ward){
            switch(N_ward){
                case "forward" : return this._reactToForward;
                case "backward": return this._reactToBackward;
                default: return false;
            }
        }
    }
    // visualisation 
    const pathToCloset = pathToInteractable + "Closet/";
    export class Closet extends SpriteAnim{
            constructor(x, y){
                super(x, y, 200, 100, [
                    // 0-10
                    pathToCloset + "Backward/12.png", pathToCloset + "Backward/11.png",
                    pathToCloset + "Backward/10.png", pathToCloset + "Backward/9.png" ,
                    pathToCloset + "Backward/8.png" , pathToCloset + "Backward/7.png" ,
                    pathToCloset + "Backward/6.png" , pathToCloset + "Backward/5.png" ,
                    pathToCloset + "Backward/4.png" , pathToCloset + "Backward/3.png" ,
                    pathToCloset + "Backward/2.png" , 
                    // 11-21 
                    pathToCloset + "Forward/1.png" , pathToCloset + "Forward/2.png" ,     
                    pathToCloset + "Forward/3.png" , pathToCloset + "Forward/4.png" ,
                    pathToCloset + "Forward/5.png" , pathToCloset + "Forward/6.png" ,
                    pathToCloset + "Forward/7.png" , pathToCloset + "Forward/8.png" ,
                    pathToCloset + "Forward/9.png" , pathToCloset + "Forward/10.png",
                    pathToCloset + "Forward/11.png", pathToCloset + "Forward/12.png",
                ]);
                // @  0 = stay
                // @  1 = forward
                // @ -1 = backward
                this._triggered = 0;
                this._animSlow  = 7;
                this._currentFrame = 11;
                
            }
            updateImage(direction, canBeTriggered){
                if(canBeTriggered){
                    if(direction =='backward'){ this._triggered =  1; this._currentFrame = 11;}
                    if(direction == 'forward'){ this._triggered = -1; this._currentFrame = 11;}
                }
                if(this._triggered != 0){
                    this._animTick += 1;
                    if (this._animTick > this._animSlow){
                        this._currentFrame = (this._currentFrame + this._triggered)
                        this._animTick = 0;
                        if( this._currentFrame == this._frames.length || this._currentFrame == -1){
                            this._currentFrame = 11;
                            this._triggered = 0;
                        }
                    }
                }else{
                    ///console.log("cannot be triggered");
                }
            }
                
    }
////
////-----------------------Pushable------------------------////

const pathToPushable = "../Game_01_Ledvadva/sprites/Pushable/";
export class Pushable  extends CharacterSprite0{
    constructor(x, y, width, height, spritePaths){
        super  (x, y, width, height, spritePaths); 
        this._framesStanding = this._frames;
        this._isPushed = false;
        this._xVelocity = 0;
        this._yVelocity = 0;

        this._drag = 0.005;
        this._gravity = 0.05;
        this._isPickable = false;
    }
    cantPassThru(ob){
        return (
            ob instanceof Solid ||
            ob instanceof Player||
            (ob instanceof Pushable && ob._id != this._id)
        );
    };
    cantFallThru(ob){
        return (
            ob instanceof Solid  ||
            ob instanceof Player ||
            ob instanceof Platform ||
            (ob instanceof Pushable && ob._id != this._id)
        );
    };
    render(ctx, hitboxes){
        let img = this._frames[this._currentFrame];
        if (img && img.complete) {
            ctx.drawImage(img, this._x, this._y, this._width, this._height);
        }
        if(hitboxes){
            ctx.strokeStyle = "magenta";
            ctx.strokeRect(this._x, this._y, this._width, this._height);
        }
    }
    updatePos(obsticles){
        const nextFrameX = new Rectangle(this._x + this._xVelocity, this._y, this._width, this._height);
        const nextFrameY = new Rectangle(this._x , this._y +  this._yVelocity + this._ySpeed, this._width, this._height);

        let canMoveonX = true;
        let canMoveonY = true;

        for(let ob of obsticles){
            if ( nextFrameX.doesColideWith(ob) && this.cantPassThru(ob)){
                canMoveonX = false;
                this._xVelocity = 0;
            }
            if( nextFrameY.doesColideWith(ob) && this.cantFallThru(ob)){
                if(nextFrameY.doesColideWith(ob) && ob instanceof Player){console.error("Player gets smashed with pushable");}
                canMoveonY = false
                this._yVelocity = 0;
            }
        }
        if (canMoveonX){ 
            this.x = this._x + this._xVelocity;
            if (Math.abs(this._xVelocity) < this._drag) { this._xVelocity = 0; }
            if (this._xVelocity > 0 ){this._xVelocity = this._xVelocity - this._drag; this.isGoRight = true; this.isGoLeft  = false;}
            if (this._xVelocity < 0 ){this._xVelocity = this._xVelocity + this._drag; this.isGoLeft  = true; this.isGoRight = false;}
        }
        if (canMoveonY && (!this._isPickable || !this._isPushed)){
            this._yVelocity = this._yVelocity + this._gravity;
            this.y = this._y + this._yVelocity;
        }
    }
}
// typeOf Pushable          Box
    export class Box extends Pushable{
        constructor(x, y, skin = 1){
            super  (x, y, 128, 128, [
                pathToPushable + "Box/" + skin +  ".png",
                pathToPushable + "Box/" + skin + "d.png",
            ]);            
        }
    }
//typeOf Pushable          Crate
    export class Crate extends Pushable{
        constructor(x, y){
            super  (x, y, 128, 128, [
                pathToPushable + "Crate/" + skin +  ".png",
                pathToPushable + "Crate/" + skin + "d.png",
            ]);            
        }
    }
//typeOf Pushable          Binder
    export class Binder extends Pushable{
        constructor(x, y, skin){
            super  (x, y, 128, 128, [
                pathToPushable + "Binder/" + skin +  ".png",
                pathToPushable + "Binder/" + skin + "d.png",
            ]);            
        }
    }
//typeOf Pushable           Ball
    //! needs to be checked
    export class Ball extends Pushable{
        constructor(x, y){
            super  (x, y, 64, 64, [
                pathToPushable + "Basketball/0.png",
                pathToPushable + "Basketball/1.png",
                pathToPushable + "Basketball/2.png",
                pathToPushable + "Basketball/3.png",
                pathToPushable + "Basketball/4.png",
                pathToPushable + "Basketball/5.png",
                pathToPushable + "Basketball/6.png",
                pathToPushable + "Basketball/7.png",
            ]); 
            this._drag = 0.0025;         
        }
        updateImage(){
            this._animMovingSlow = 1 / (Math.abs(this._xVelocity) + 0.1) * 15;
            this._animTick += 1;
            if (this._animTick > this._animMovingSlow) {
                if(this._xVelocity > 0){
                    this._currentFrame = (this._currentFrame + 1) % this._frames.length;
                }
                if(this._xVelocity < 0){
                    this._currentFrame = (this._currentFrame - 1 + this._frames.length) % this._frames.length;
                }
                this._animTick = 0;
            }
        }
        render(ctx, Rbox){
            let img = this._frames[this._currentFrame];
            if (img && img.complete) {
                ctx.drawImage(img, this._x, this._y, this._width, this._height);
            }
        }      
    }
////
////----------------------Enemies-----------------------////

////
////--------------------Projectiles---------------------////

const pathToProjectiles = "../Game_01_Ledvadva/sprites/Projectiles/";
export class Projectile extends CharacterSprite0 {
    constructor(x, y, width, height, spritePath = []){
        super  (x, y, width, height, spritePath); 
    }
}
// typeOf Projectile     Scissors
    export class Scissors  extends Projectile{
        constructor(x, y){
            super  (x, y, 96, 88,[
                //0-5
                pathToProjectiles + "Scissors/UP/1.png",
                pathToProjectiles + "Scissors/UP/2.png",
                pathToProjectiles + "Scissors/UP/3.png",
                pathToProjectiles + "Scissors/UP/4.png",
                pathToProjectiles + "Scissors/UP/5.png",
                pathToProjectiles + "Scissors/UP/1.png",
                //6-11
                pathToProjectiles + "Scissors/DOWN/1.png",
                pathToProjectiles + "Scissors/DOWN/2.png",
                pathToProjectiles + "Scissors/DOWN/3.png",
                pathToProjectiles + "Scissors/DOWN/4.png",
                pathToProjectiles + "Scissors/DOWN/5.png",
                pathToProjectiles + "Scissors/DOWN/1.png",
                //12-17
                pathToProjectiles + "Scissors/LEFT/1.png",
                pathToProjectiles + "Scissors/LEFT/2.png",
                pathToProjectiles + "Scissors/LEFT/3.png",
                pathToProjectiles + "Scissors/LEFT/4.png",
                pathToProjectiles + "Scissors/LEFT/5.png",
                pathToProjectiles + "Scissors/LEFT/1.png",
                //18-23
                pathToProjectiles + "Scissors/RIGHT/1.png",
                pathToProjectiles + "Scissors/RIGHT/2.png",
                pathToProjectiles + "Scissors/RIGHT/3.png",
                pathToProjectiles + "Scissors/RIGHT/4.png",
                pathToProjectiles + "Scissors/RIGHT/5.png",
                pathToProjectiles + "Scissors/RIGHT/1.png"
            ]);
            this._framesRunUp = this._frames.slice(0,6);
            this._framesRunDown = this._frames.slice(6,12);
            this._framesRunLeft = this._frames.slice(12,18);
            this._framesRunRight = this._frames.slice(18,24);

            this._renderWidth = 116;
            this._renderHeight = 116;
        }
    }
// typeOf Projectile     Scissors
    //! its fuged up
    export class Arrow  extends Projectile{
        constructor(x, y){
            super  (x, y, 20, 100,[
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/1.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/2.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/3.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/DOWN/2.png",
                /*
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/UP/1.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/UP/2.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/UP/3.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/UP/2.png",

                "../Game_01_Ledvadva/sprites/Pushable/Arrow/LEFT/1.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/LEFT/2.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/LEFT/3.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/LEFT/2.png",

                "../Game_01_Ledvadva/sprites/Pushable/Arrow/RIGHT/1.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/RIGHT/2.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/RIGHT/3.png",
                "../Game_01_Ledvadva/sprites/Pushable/Arrow/RIGHT/2.png",
                */
            ]);
            this._framesRunDown = this._frames.slice(0,4);
            this._renderWidth = 20;
            this._animSlow = 8;
        }
    }
////
////----------------------------CharacterSprite-------------------------////
// typeOf CharacterSprite           Player
    const pathToPlayer = "../Game_01_Ledvadva/sprites/Player/";
    export class Player    extends CharacterSprite { 
        constructor(x, y, skin){
            super  (x, y, 52, 124);

            this._currentSkin = 0; 
            this._skins = [skin];

            this.loadSkin(skin);            
            this.changeSkin(skin);
        }
        static framesTypes = [
            //0
            "/stand.png",
            //1-14
            "/rR/1.png", "/rR/2.png","/rR/3.png","/rR/4.png","/rR/5.png","/rR/6.png","/rR/7.png",
            "/rR/8.png", "/rR/7.png","/rR/6.png","/rR/5.png","/rR/4.png","/rR/3.png","/rR/2.png",
            //15-28
            "/rL/1.png", "/rL/2.png","/rL/3.png","/rL/4.png","/rL/5.png","/rL/6.png","/rL/7.png",
            "/rL/8.png", "/rL/7.png","/rL/6.png","/rL/5.png","/rL/4.png","/rL/3.png","/rL/2.png",
            //29-31
            "/jR/1.png", "/jR/2.png","/jR/3.png",
            //32-34
            "/jL/1.png", "/jL/2.png","/jL/3.png",
            //35-36
            "/pR.png", "/pL.png",
            //37-38
            //"/cL.png", "/cR.png",
        ]  
        loadSkin(skin){
            if(skin == ""){this._id + " Skin not found"}
            else{
                this._frames = []; // Clear the frames array before loading new skin images
                Player.framesTypes.forEach(type => {
                    const img = new Image();
                    img.src = pathToPlayer + skin + type;
                    this._frames.push(img);
                });
                this._skins.push(skin);
            }
        }
        changeSkin(skin){
            if(this._skins.includes(skin)){
                this._currentSkin = this._skins.indexOf(skin);
                const shiftIndex = 0 // this._currentSkin * Player.framesTypes.length;

                this._framesStanding     = [this._frames[0 + shiftIndex]];
                this._framesRunRight     =  this._frames.slice(1 + shiftIndex, 15 + shiftIndex);
                this._framesRunLeft      =  this._frames.slice(15 + shiftIndex, 29 + shiftIndex);
                this._framesJumpFarRight =  this._frames.slice(29 + shiftIndex, 32 + shiftIndex);
                this._framesJumpFarLeft  =  this._frames.slice(32 + shiftIndex, 35 + shiftIndex);
                this._framesPushRight    = [this._frames[35 + shiftIndex]];
                this._framesPushLeft     = [this._frames[36 + shiftIndex]];
            }
        }
        loadAndChangeSkin(skin){
            this.loadSkin(skin);
            this.changeSkin(skin);
        }
    }
// typeOf CharacterSprite           Mario
    //! PNG nejsou v adresáři -> Mario nepoužívat
    export class Mario    extends CharacterSprite{
        constructor(x, y){
            super  (x, y, 52, 124, [
                //0
                "/Game_01_Ledvadva/sprites/Mario/stand.png",
                //1-14
                "/Game_01_Ledvadva/sprites/Mario/rR/1.png",
            ]);
        }
    }
////
////----------------------------InteractableIndicators------------------////

// typeOf InteractableIndicators           Shift
    export class IndicatorKey_Shift extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 124,44,pathToIndicators + "Press-Shift.png");
        }
    }
// typeOf InteractableIndicators           E/Shift
    export class IndicatorKey_E_Shift extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 200,44, pathToIndicators + "Press-E-Shift.png");
        }
    }
// typeOf InteractableIndicators             E
    export class IndicatorKey_E extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44, pathToIndicators + "Press-E.png");
        }
    }
// typeOf InteractableIndicators             F
    export class IndicatorKey_F extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-F.png");
        }
    }
// typeOf InteractableIndicators             K
    export class IndicatorKey_K extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-K.png");
        }
    }
// typeOf InteractableIndicators             G
    export class IndicatorKey_G extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-G.png");
        }
    }
// typeOf InteractableIndicators             L
    export class IndicatorKey_L extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-L.png");
        }
    }
// typeOf InteractableIndicators            ToLeft
    export class Indicator_ToLeft extends InteractableIndicator{
        moveTo(interactable, widthOfGap = 0, heightOfHover = 0){
            this._x = interactable._x - this._width - (widthOfGap);
            this._y = interactable._y + (interactable._height - this._height) / 2 + heightOfHover;
        }
    }
    //typeOf Indicator_ToLeft                   Left
        export class IndicatorKey_Left extends Indicator_ToLeft{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "To-Left.png");
            }      
        }
    //typeOf Indicator_ToLeft                   DiS_Left
        export class IndicatorKey_DiS_Left extends Indicator_ToLeft{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "dis_left.png");
            }
        }
// typeOf InteractableIndicators           ToRight
    export class Indicator_ToRight extends InteractableIndicator{
        moveTo(interactable, widthOfGap = 0, heightOfHover = 0){
            this._x = interactable._x + interactable._width + (widthOfGap);
            this._y = interactable._y + (interactable._height - this._height) / 2 + heightOfHover;
        }
    }
    //typeOf Indicator_ToRight                  Right
        export class IndicatorKey_Right extends Indicator_ToRight{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "To-Right.png");
            }
        }
    //typeOf Indicator_ToRight                  DiS_Right
        export class IndicatorKey_DiS_Right extends Indicator_ToRight{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "dis_right.png");
            }
        }
    

////
