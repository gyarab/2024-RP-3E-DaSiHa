// @Autor: Bendl Šimon
import { SpriteAnim } from './SpriteAnim.js';

export class SpriteDyna extends SpriteAnim{
    constructor(x, y, width, height, spritePath = []){
        super  (x, y, width, height, spritePath); 

        //movement flags
        this._isGoLeft   = false;
        this._isGoRight  = false;
        this._isGoUp     = false;
        this._isGoDown   = false;
        this._isBothWay  = false;
        //speeds 
        this._ySpeed  = 2;
        this._xSpeed  = 2;
        //counters (used in objects with more animations for different actions)
        //? maybe best to move to those more complex objects ?//
        this._timeOfAction = 0;
        this._counterAnim  = 0;
    }

    /** /// updatePos() ///
     ** updates the positions of SpriteDyna
     ** based on their movement flags and speeds
     ** @returns {SpriteDyna} itself for chaining
     */
    updatePos(){
        if (this._isGoRight && !this._isGoLeft) {
            this.x = this._x + this._xSpeed;
        }
        if (this._isGoLeft && !this._isGoRight) {
            this.x = this._x - this._xSpeed;
        }
        if (this._isGoUp && !this._isGoDown) {
            this.y = this._y - this._ySpeed;
        }
        if (this._isGoDown && !this._isGoUp) {
            this.y = this._y + this._ySpeed;
        }
        return this;
    }

    /** /// updateAll() ///
    ** updates both images and positions of SpriteDyna
    *? not well kept up ?
    ** @returns {SpriteDyna} itself for chaining
    */
    updateAll(){
        this.updateImage();
        this.updatePos();
        return this;
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
    set ySpeed(newYSpeed) {
        this._ySpeed = newYSpeed;
    }
    set xSpeed(newXSpeed) {
        this._xSpeed = newXSpeed;
    }
}


/*----------------SpriteDyna EXAMPLE----------------
import { Tetragon } from './Tetragon.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const bluescreen = new Tetragon(
    {x:0,y:0},
    {x:800,y:0},
    {x:800,y:400},
    {x:0,y:150}
);
const c = new SpriteDyna(10,10,90,160,[ 
   "/Game_01_Ledvadva/sprites/Player/BLU/rR/1.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/2.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/3.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/4.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/5.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/6.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/7.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/8.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/7.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/6.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/5.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/4.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/3.png",
    "/Game_01_Ledvadva/sprites/Player/BLU/rR/2.png"
]);
c._animSlow = 4;
function SpriteAnimLoop (){

    bluescreen.render(ctx,true)
    c.render(ctx,true);
    c.updateImage();
    c.updatePos();
    if (c.doesColideWith(bluescreen)){
        bluescreen.color = 'blue'
    }else{
        bluescreen.color = 'red'
    }

}
window.setInterval(SpriteAnimLoop, 1);

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));
function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        'w': () => c.isGoUp    = isDown ,
        's': () => c.isGoDown  = isDown , 
        'a': () => c.isGoLeft  = isDown ,
        'd': () => c.isGoRight = isDown ,

    };
    if (actions[key]) actions[key]();
}
/**/
