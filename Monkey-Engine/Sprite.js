//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { renderPolygon } from './Tetragon.js';
import { renderPoint } from './Point.js';
import { Rectangle } from './Rectangle.js';

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
        
        if (spritePath){
            this.loadImg(spritePath);
        }
    }
    
    //@---functions---@//
    /** /// loadImg() ///
     ** loads the image from the given path 
     * @param {string} spritePath - path to the image
     * @returns {Sprite} itself for chaining
     */
    loadImg(spritePath) {
        this._spritePath = spritePath;
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
        if (rBox) renderCollisionBox(this, ctx);
        if (!this._isLoaded) { 
            console.warn("Sprite " + this._id + " was not able to load");
            return this;
        }
        renderImg(
            this._sprite, ctx,
            {    x: this._x    ,      y: this._y     },
            {width: this._width, height: this._height},
            this._rotation(), this._blur
        );

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

    //@---setters---@//
    set blur(newValue){
        this._blur = newValue;
        return this;
    }
    set rFilter(newValue){
        this._rFilter = newValue;
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadImg(path) instead.
     */
    set spritePath(newValue){
        this.loadImg(newValue);
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadImg(path) instead.
     */
    set sprite(newValue){
        this.loadImg(newValue);
        return this;
    }

}

//@------------------------------helpFunc-----------------------------------@//
/** /// renderSpriteCollisionBox() ///
 ** renders the bounding box of the Sprite
 * @public
 * @param {Sprite} Sprite - the Sprite to render the bounding box for
 * @param {CanvasRenderingContext2D} ctx - the context
 * @param {boolean} rPoint - whether to render the anchor point
 * @returns {void}
 */
export function renderCollisionBox(Sprite, ctx,
    rPoint = _defaultValues.s_renderPointAsWell){
        renderPolygon(Sprite._points, ctx, Sprite._color, Sprite._strokeWidth);
        if (rPoint)renderPoint(Sprite._x, Sprite._y, ctx, Sprite._color, Sprite._strokeWidth);
}

/** /// renderImg() ///
 ** renders image on the given context
 * @public
 * @param {Image} img
 * @param {CanvasRenderingContext2D} ctx - the context
 * @param {Array<{x: number, y: number}>} position to render
 * @param {Array<{width: number, height: number}>} size
 * @param {roation} Rbox - whether to render the bounding box
 * @returns {void}
 * 
 */
export function renderImg(img, ctx, position, size,  rotation = 0, blur = null){
    ctx.save();
    if (blur !== null) ctx.filter = `blur(${blur}px)`;

    if (Math.abs(rotation) > 0.00001) {
        const center = {
            x: position.x + size.width / 2,
            y: position.y + size.height / 2
        }
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);

        ctx.drawImage(
            img,
            -size.width / 2,
            -size.height / 2,
            size.width,
            size.height
        );
    } else {
        ctx.drawImage( img, position.x, position.y, size.width, size.height);
    }
    ctx.restore();
}



//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------
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

s5.rotateBy(Math.PI / 4);
s5.render(ctx,true);

const s6 = new Sprite(1260,10,200, 250);
s6.loadImg(pathToImgs + "rL/6.png");
await wait(1000);

s6.render(ctx,true);

if(s6.doesColideWith(s5)){
    console.log("colide");
}

/**/
