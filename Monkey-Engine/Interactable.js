// Autor: Bendl Šimon
import {Rectangle} from './Rectangle.js';
import {Sprite} from './Sprite.js'

//default class for interactable objects
export class Interactable extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height,'violet');
        this._isInteractable = false;
        this._interactedWith = [];
    }
    _action(){
        if (this._isInteractable){
            console.log("action");
        }   
    }
}
//class for indicators of interactability
export class InteractableIndicator extends Sprite{
    constructor(x, y, width, height, SpritePath){
        super(x, y, width, height, SpritePath);
        
    }
    moveTo(object, heightOfHover = 1.3){
        super.moveTo(object._x + object._width / 2 - this._width / 2 , object._y - this._height * heightOfHover);
    }

}
//!--------------------classes-that-are-way-too-specific----------------------!//
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
export class IndicatorKey_E extends InteractableIndicator{
    constructor(x = 0, y = 0){
        super(x, y, 44,44,"../Game_01_Ledvadva/sprites/Indicators/Press-E.png");
    }
}