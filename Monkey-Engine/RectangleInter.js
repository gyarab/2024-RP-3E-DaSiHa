// Autor: Bendl Šimon
import {Rectangle} from './Rectangle.js';
export class RectangleInter extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height,'violet');
        this._isInteractable = false;
        this._interactedWith = [];
    }
    _action(objects){
        if (this._isInteractable){
            console.log("action");
            objects._color = "orange";

        }
        
    }
}
export class LevelSelect extends RectangleInter{
    constructor(x, y, width, height){
        this._isInteractable = true;
        super(x, y, width, height);
    }
    _action(){
        console.log("Level Select");
    }
}