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

////-------------------------Walls---------------------------////
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
////-----------------------Interactable---------------------////
/*intance*/const pathToInteractable = "../Game_01_Ledvadva/sprites/Interactable/";
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
            Ledvadva.currentlvl = this._lvlNumber;
            this._isComplete = true;  
        }
        render(ctx){
            for (let p of this._platforms){
                super.render(ctx);
            }

        }
    }
    export class EndOfLevel extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._hasToBeOnGround = true;
        };
        _action(){
            Ledvadva.currentlvl = 0;
        }
    }
    export class Switch extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._isOn = false;
        };;
        _action(objects){
            this._isOn = !this._isOn;
        }
    }
        /*visualisation;*/
        export class Lever extends SpriteAnim{

        }

    export class Selector extends Interactable{
        constructor(x, y, width, height){
            super(x, y, width, height);
            this._hasToBeOnGround = true;
            this._reactToForward  = true;
            this._reactToBackward = true;
            this._reactToAction   = false;

            this._color = "white";
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
        /*visualisation*/ const pathToCloset = pathToInteractable + "Closet/";
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
////-----------------------Pushable-------------------------////
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
    /*intance*/ const pathToPushable = "../Game_01_Ledvadva/sprites/Pushable/";
    export class Box extends Pushable{
        constructor(x, y, skin = 1){
            super  (x, y, 128, 128, [
                pathToPushable + "Box/" + skin +  ".png",
                pathToPushable + "Box/" + skin + "d.png",
            ]);            
        }
    }
    export class Crate extends Pushable{
        constructor(x, y){
            super  (x, y, 128, 128, [
                pathToPushable + "Crate/" + skin +  ".png",
                pathToPushable + "Crate/" + skin + "d.png",
            ]);            
        }
    }
    export class Binder extends Pushable{
        constructor(x, y, skin){
            super  (x, y, 128, 128, [
                pathToPushable + "Binder/" + skin +  ".png",
                pathToPushable + "Binder/" + skin + "d.png",
            ]);            
        }
    }
    //! Broken 
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
            this._isPickable = true;
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
////---------------------Enemies-------------------------////
////
////---------------------Projectiles---------------------////
export class Projectile extends CharacterSprite0 {
    constructor(x, y, width, height, spritePath = []){
        super  (x, y, width, height, spritePath); 
    }
}
    /*intance*/ const pathToProjectiles = "../Game_01_Ledvadva/sprites/Projectiles/";
    export class Scissors  extends Projectile{
        constructor(x, y){
            super  (x, y, 116, 116,[
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
        }
    }
    //! NEEXISTUJÍ png -> Chainsaw nepoužívat
    export class Chainsaw  extends Projectile{
        constructor(x, y){
            super  (x, y, 124, 124,[

            ]);
            this._framesRunUp ;
            this._animSlow = 8;
        }
    }
////
////-------------------CharacterSprite-------------------////

    /*intance*/ const pathToPlayer = "../Game_01_Ledvadva/sprites/Player/";
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
////-----------------InteractableIndicators-------------------////
    /*intance*/ const pathToIndicators = "../Game_01_Ledvadva/sprites/Indicators/";
    
    export class IndicatorKey_Shift extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 124,44,pathToIndicators + "Press-Shift.png");
        }
    }
    export class IndicatorKey_E_Shift extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 200,44, pathToIndicators + "Press-E-Shift.png");
        }
    }
    export class IndicatorKey_E extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44, pathToIndicators + "Press-E.png");
        }
    }

    export class IndicatorKey_F extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-F.png");
        }
    }
    export class IndicatorKey_K extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-K.png");
        }
    }
    ///

    export class IndicatorKey_G extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-G.png");
        }
    }
    export class IndicatorKey_L extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-L.png");
        }
    }
    ///
    
    export class Indicator_ToLeft extends InteractableIndicator{
        moveTo(interactable, widthOfGap = 0, heightOfHover = 0){
            this._x = interactable._x - this._width - (widthOfGap);
            this._y = interactable._y + (interactable._height - this._height) / 2 + heightOfHover;
        }
    }
        export class IndicatorKey_Left extends Indicator_ToLeft{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "To-Left.png");
            }      
        }
        export class IndicatorKey_DiS_Left extends Indicator_ToLeft{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "dis_left.png");
            }
        }
    export class Indicator_ToRight extends InteractableIndicator{
        moveTo(interactable, widthOfGap = 0, heightOfHover = 0){
            this._x = interactable._x + interactable._width + (widthOfGap);
            this._y = interactable._y + (interactable._height - this._height) / 2 + heightOfHover;
        }
    }
        export class IndicatorKey_Right extends Indicator_ToRight{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "To-Right.png");
            }
        }
        export class IndicatorKey_DiS_Right extends Indicator_ToRight{
            constructor(x = 0, y = 0){
                super(x, y, 44,44,pathToIndicators + "dis_right.png");
            }
        }
    

////
