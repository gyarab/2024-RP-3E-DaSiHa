//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { renderPoint } from './Point.js';
import {Rectangle} from './Rectangle.js';

//@-------------------------------Sprite------------------------------------@//
export class Sprite extends Rectangle{
    constructor(
        x = 0,  y = 0, width, height,
        spritePath = _defaultValues.s_spritePath
    ) {
        super  (x, y, width, height,null);
        this._sprite   = null;

        this._ctxCache = null; 
        this._isLoaded = false;
        this._color = _defaultValues.s_color;

        this._blur = null;
        this._rFilter = null;

        
        if (spritePath){
            this.loadImg(spritePath);
        }
    }
    
    /** /// loadImg() ///
     ** loads the image from the given path 
     * @param {string} spritePath - path to the image
     * @returns {Sprite} itself for chaining
     */
    loadImg(spritePath) {
        this._sprite = new Image();
        this._sprite.src = spritePath;
        this._sprite.onload = () => {
            this._isLoaded = true;
            if (this._ctxCache) {
                //console.log("Sprite " + this._id + " byl donačten");
                this.render(this._ctxCache);
            }
        };
        return this;
    }

    /** /// render() ///
     ** renders the Sprite on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {Sprite} itself for chaining
     */
    render(ctx , rBox = null) {
        this._ctxCache = ctx;
        if(rBox) renderSpriteCollisionBox(
            this._x, this._y, this._width, this._height,
            ctx, this._color, this._strokeWidth
        );
        if(this._isLoaded){
            ctx.save();
            if (this._blur    !== null) ctx.filter = `blur(${this._blur}px)`;
            if (this._rFilter !== null) ctx.filter = this._rFilter;
            ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
            ctx.restore();
            ctx.filter = 'none';
        }else{
            console.warn("Sprite " + this._id + " was not able to load");
        }
        return this;
    }

    /** /// clone() ///
     ** clone the Sprite, Sprite image can be shared or reloaded
     * @param {boolean} takesMoreSpace - whether to clone will share or reload image
     * @returns {Sprite} cloned Sprite
     */
    clone(takesMoreSpace = false){
        const clone = new Sprite(this._x, this._y, this._width, this._height);
        clone._strokeWidth = this._strokeWidth; clone._color = this._color;
        if (takesMoreSpace){
            clone.loadImg(this._sprite.src);
            return clone;
        }else{
            clone._sprite = this._sprite;
            clone._isLoaded = this._isLoaded;
            return clone;
        }
    }
}

//@------------------------------helpFunc-----------------------------------@//¨
/** /// renderSpriteCollisionBox() ///
** renders the bounding box of the Sprite
* @public
* @param {CanvasRenderingContext2D} ctx - the context
* @param {boolean} rPoint - whether to render the anchor point
* @returns {Sprite} itself for chaining
*/
export function renderSpriteCollisionBox(
    x,y,width,height,ctx,
    color       = _defaultValues.bS_color,
    strokeWidth = _defaultValues.bS_strokeWidth,
    rPoint = _defaultValues.s_renderPointAsWell
){
    const ofset = strokeWidth / 2;
    x += ofset; width  -= strokeWidth; 
    y += ofset; height -= strokeWidth;
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(x, y, width, height);
    if (rPoint) renderPoint(x, y, ctx, color, strokeWidth);
    return this;
}

/*------------------------Sprite-EXAMPLE---------------------------

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const pathToImgs = "/Game_01_Ledvadva/sprites/Player/RED/";

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//správné vytvoření instance Spritu
const s1 = new Sprite(10,10,200, 250, pathToImgs + "stand.png");
await wait(1000);
s1.render(ctx);

//v případě absence obrázku se vykreslí obdélník
const s2 = new Sprite(260,10,200, 250);
await wait(1000);
s2.render(ctx);

//Sprite se načte i v případě donačtení obrázku
const s3 = new Sprite(510,10,200, 250);
await wait(1000);
s3.render(ctx);
await wait(1000);
s3.loadImg(pathToImgs + "stand.png");

const s4 = new Sprite(760,10,200, 250);
s4.loadImg(pathToImgs + "stand.png");
await wait(1000);
s4.render(ctx)


//jde i vykreslit hitbox
const s5 = new Sprite(1010,10,200, 250);
s5.loadImg(pathToImgs + "rR/6.png");
await wait(1000);

s5.render(ctx,true);

const s6 = new Sprite(1260,10,200, 250);
s6.loadImg(pathToImgs + "rL/6.png");
await wait(1000);

s6.render(ctx,true);

if(s6.doesColideWith(s5)){
    console.log("colide");
}

/**/
