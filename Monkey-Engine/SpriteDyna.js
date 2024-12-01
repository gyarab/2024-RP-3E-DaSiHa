// Autor: Bendl Šimon
import { SpriteAnim } from './SpriteAnim.js';
export class SpriteDyna extends SpriteAnim{
    constructor(x, y, width, height, spritePath = [], color = null){
        super  (x, y, width, height, spritePath, color); 

        //probíhající akce
        this._isGoLeft   = false;
        this._isGoRight  = false;
        this._isGoUp     = false;
        this._isGoDown   = false;
        this._isBothWay  = false;
        //rychlosti 
        this._ySpeed  = 2;
        this._xSpeed  = 2;

        this._timeOfAction = 0;
        this._counterAnim  = 0;
    }
    updatePos(){
        // Update position
        if (this._isGoRight && !this._isGoLeft) {
            this._x     += this._xSpeed;
        }
        else if (this._isGoLeft && !this._isGoRight) {
            this._x     -= this._xSpeed;
        }
        if (this._isGoUp && !this._isGoDown) {
            this._y -= this._ySpeed;
        } else if (this._isGoDown && !this._isGoUp) {
            this._y += this._ySpeed;
        }
    }
    updateAll(){
        this.updateImage();
        this.updatePos();
        this.updateImage();
    }
    colides(Sprite) {
        this._points = [
            { x: this._x, y: this._y },
            { x: this._x + this._width, y: this._y },
            { x: this._x + this._width, y: this._y + this._height },
            { x: this._x, y: this._y + this._height }
        ];
        Sprite._points = [
            { x: Sprite._x, y: Sprite._y },
            { x: Sprite._x + Sprite._width, y: Sprite._y },
            { x: Sprite._x + Sprite._width, y: Sprite._y + Sprite._height },
            { x: Sprite._x, y: Sprite._y + Sprite._height }
        ];
        return super.colides(Sprite);
    }
    /*--------------------------Setters-------------------------------*/ 

    set isGoRight(newIsGoRight) {
        this._isGoRight = newIsGoRight;
    }
    set isGoLeft(newIsGoLeft) {
        this._isGoLeft = newIsGoLeft;
    }
    set isGoUp(newIsGoUp) {
        this._isGoUp = newIsGoUp;
    }
    set isGoDown(newIsGoDown) {
        this._isGoDown = newIsGoDown;
    }
}
/*---------------------------SpriteDyna-------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const bluescreen = new SpriteDyna (10,200,750,500,null,'blue');
const sD1 = new SpriteDyna(20,250,150,150)
sD1.loadImg([
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png",
]);

function SpriteAnimLoop (){
    bluescreen.render(ctx);
    sD1.render(ctx,true);
    sD1.updateImage();
    sD1.updatePos();
    console.log(sD1.colides(bluescreen));
}
window.setInterval(SpriteAnimLoop, 1);

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        'w': () => sD1._isGoUp    = isDown ,
        's': () => sD1._isGoDown  = isDown , 
        'a': () => sD1._isGoLeft  = isDown ,
        'd': () => sD1._isGoRight = isDown ,

    };
    if (actions[key]) actions[key]();
}
/**/
