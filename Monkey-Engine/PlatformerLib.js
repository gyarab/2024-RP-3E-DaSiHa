import { Interactable, InteractableIndicator } from './Interactable.js';
import {  CharacterSprite } from '../Monkey-Engine/CharacterSprite.js';
import { CharacterSprite0 } from '../Monkey-Engine/CharacterSprite0.js';
import {    Rectangle } from './Rectangle.js';


//TODO změnit hitbox u Projektilů na kruh
//TODO přidat další typy Projektilů
//TODO přidat typy Pushable objektů
//TODO přidat Tetragon-Solid
//TODO opravit Pushable

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
export class LevelSelect extends Interactable{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this._isComplete = false;
    }
    _action(objects){
        console.log("Level Select");
        objects._color = "orange";
        this._isComplete = true;
    }
}
export class Pushable  extends CharacterSprite0{
    constructor(x, y, width, height, spritePaths){
        super  (x, y, width, height, spritePaths); 
        this._framesStanding = this._frames;
        this._isPushed = false;
        this._xVelocity = 0
    }
    updatePos(obsticles){
        const nextFrame = new Rectangle(this._x + this._xVelocity, this._y, this._width, this._height);
        let canMoveonX = true;
        for(let ob of obsticles){
            if ( nextFrame.doesColideWith(ob) && (ob._color == "red" || ob instanceof Player)){
                canMoveonX = false;
                this._xVelocity = 0;
                console.log("stop")
            }
        }
        if ((this._xVelocity != 0) && canMoveonX){ 
            this.x = this._x + this._xVelocity;
            if (this._xVelocity > 0 ){this._xVelocity = this._xVelocity - 0.005}
            if (this._xVelocity < 0 ){this._xVelocity = this._xVelocity + 0.005}
        }
        //if (this._isPushed){ this._xVelocity = 0; this._isPushed = false}
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
    //TODO Basketball/Ball
    export class Basketball extends Pushable{
        constructor(x, y){
            super  (x, y, 128, 128, [
                pathToPushable + "Crate/" + skin +  ".png",
                pathToPushable + "Crate/" + skin + "d.png",
            ]);            
        }
    }
    //! NEEXISTUJE png -> Binder nepoužívat
    export class Binder extends Pushable{
        constructor(x, y){
            super  (x, y, 128, 128, [
                pathToPushable + "Binder/" + skin +  ".png",
                pathToPushable + "Binder/" + skin + "d.png",
            ]);            
        }
    }
/*---------------------Projectiles-------------------------*/
export class Projectile extends CharacterSprite0 {
    constructor(x, y, width, height, spritePath = []){
        super  (x, y, width, height, spritePath); 
    }
}
/*intance*/ const pathToProjectiles = "../Game_01_Ledvadva/sprites/Projectiles/";
    //TODO NEEXISTUJÍ png pro všechny směry-> Scissors dodělat
    export class Scissors  extends Projectile{
        constructor(x, y){
            super  (x, y, 124, 124,[
                "../Game_01_Ledvadva/sprites/Scissors/1.png",
                "../Game_01_Ledvadva/sprites/Scissors/2.png",
                "../Game_01_Ledvadva/sprites/Scissors/3.png",
                "../Game_01_Ledvadva/sprites/Scissors/4.png",
                "../Game_01_Ledvadva/sprites/Scissors/5.png",
                "../Game_01_Ledvadva/sprites/Scissors/1.png",
            ]);
            this._framesRunUp = this._frames.slice(0,7)
            this._animSlow = 8;
        
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
/*intance*/ const pathToSkins = "../Game_01_Ledvadva/sprites/";
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
    //! NEEXISTUJE png -> IndicatorKey_R nepoužívat
    export class IndicatorKey_R extends InteractableIndicator{
        constructor(x = 0, y = 0){
            super(x, y, 44,44,pathToIndicators + "Press-R.png");
        }
    }
