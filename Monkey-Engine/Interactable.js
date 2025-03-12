// Autor: Bendl Šimon
import {Rectangle} from './Rectangle.js';
import {Sprite} from './Sprite.js'

//default class for interactable objects
export class Interactable extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height);

        this._isInteractableWith = [];
        this._hasToBeOnGround = false;

        //Types of actions this object should react to
        this._reactToAction   = true;
        this._reactToForward  = false;
        this._reactToBackward = false;
        this._reactToOther = [];
        
    }
    _action(){
        if (this._isInteractable()){
            //...
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
