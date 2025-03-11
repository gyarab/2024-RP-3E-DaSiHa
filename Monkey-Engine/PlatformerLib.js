import { Interactable, InteractableIndicator } from './Interactable.js';
import {  CharacterSprite } from '../Monkey-Engine/CharacterSprite.js';
import { CharacterSprite0 } from '../Monkey-Engine/CharacterSprite0.js';
import {    Rectangle } from './Rectangle.js';


//TODO změnit hitbox u Projektilů na kruh
//TODO přidat Tetragon-Solid
//TODO Pushable má hodně much
//TODO: EndOfLevel, Switch,LevelSelect

/*--------------------------Walls---------------------------*/
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
/*---------------------Interactable-------------------------*/
//TODO: vyzobrazovat různé stavy dodělanosti
export class LevelSelect extends Interactable{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this._platforms = [this];
        this._isComplete = false;
    }
    _addPlatform(platform){
        this._platforms.push(platform);
    }
    _action(objects){
        console.log("Level Select");
        for (let pform of this._platforms) {
            pform._color = "orange";
        }
        this._isComplete = true;
        
    }
}
//TODO: vyzobrazovat různé stavy dodělanosti
export class Switch extends Interactable{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this._isOn = false;
    };;
    _action(objects){
        console.log("Switch");
        this._isOn = !this._isOn;
    }
}
export class EndOfLevel extends Interactable{
    constructor(x, y, width, height){
        super(x, y, width, height);
    };;
    _action(objects){
        console.log("EndOfLevel");
    }
};
/*---------------------Pushable-------------------------*/
export class Pushable  extends CharacterSprite0{
    constructor(x, y, width, height, spritePaths){
        super  (x, y, width, height, spritePaths); 
        this._framesStanding = this._frames;
        this._isPushed = false;
        this._xVelocity = 0;
        this._yVelocity = 0;

        this._drag = 0.005;
        this._gravity = 0.05;
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
    render(ctx){
        let img = this._frames[this._currentFrame];
        if (img && img.complete) {
            ctx.drawImage(img, this._x, this._y, this._width, this._height);
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
        if (canMoveonY){
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
    export class Basketball extends Pushable{
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
            console.log(this._xVelocity)
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
    
/*---------------------Projectiles-------------------------*/
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
/*---------------------CharacterSprite-------------------------*/
/*intance*/ const pathToSkins = "../Game_01_Ledvadva/sprites/Player/";
    export class Player    extends CharacterSprite {
        constructor(x, y, skin){
            super  (x, y, 52, 124, [
                //0
                pathToSkins + skin + "/stand.png",
                //1-14
                pathToSkins + skin + "/rR/1.png",
                pathToSkins + skin + "/rR/2.png",
                pathToSkins + skin + "/rR/3.png",
                pathToSkins + skin + "/rR/4.png",
                pathToSkins + skin + "/rR/5.png",
                pathToSkins + skin + "/rR/6.png",
                pathToSkins + skin + "/rR/7.png",
                pathToSkins + skin + "/rR/8.png",
                pathToSkins + skin + "/rR/7.png",
                pathToSkins + skin + "/rR/6.png",
                pathToSkins + skin + "/rR/5.png",
                pathToSkins + skin + "/rR/4.png",
                pathToSkins + skin + "/rR/3.png",
                pathToSkins + skin + "/rR/2.png",
                //15-28
                pathToSkins + skin + "/rL/1.png",
                pathToSkins + skin + "/rL/2.png",
                pathToSkins + skin + "/rL/3.png",
                pathToSkins + skin + "/rL/4.png",
                pathToSkins + skin + "/rL/5.png",
                pathToSkins + skin + "/rL/6.png",
                pathToSkins + skin + "/rL/7.png",
                pathToSkins + skin + "/rL/8.png",
                pathToSkins + skin + "/rL/7.png",
                pathToSkins + skin + "/rL/6.png",
                pathToSkins + skin + "/rL/5.png",
                pathToSkins + skin + "/rL/4.png",
                pathToSkins + skin + "/rL/3.png",
                pathToSkins + skin + "/rL/2.png",
                //29-31
                pathToSkins + skin + "/jR/1.png",
                pathToSkins + skin + "/jR/2.png",
                pathToSkins + skin + "/jR/3.png",
                //32-34
                pathToSkins + skin + "/jL/1.png",
                pathToSkins + skin + "/jL/2.png",
                pathToSkins + skin + "/jL/3.png",
                //35
                pathToSkins + skin + "/pR.png",
                //36
                pathToSkins + skin + "/pL.png",
            ]); 
            this._framesStanding     = [this._frames[0]];
            this._framesRunRight     = this._frames.slice(1, 15);
            this._framesRunLeft      = this._frames.slice(15, 29);
            this._framesJumpFarRight = this._frames.slice(29, 32);
            this._framesJumpFarLeft  = this._frames.slice(32, 35);
            this._framesPushRight    = [this._frames[35]];
            this._framesPushLeft     = [this._frames[36]];
            this._skin = skin;
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
/*-----------------InteractableIndicators-------------------*/
/*intance*/ const pathToIndicators = "../Game_01_Ledvadva/sprites/Indicators/";

    export class IndicatorKey_E extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44, pathToIndicators + "Press-E.png");
        }
    }
    export class IndicatorKey_R extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-R.png");
        }
    }
    export class IndicatorKey_A extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-A.png");
        }
    }
    export class IndicatorKey_Shift extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 124,44,pathToIndicators + "Press-Shift.png");
        }
    }
