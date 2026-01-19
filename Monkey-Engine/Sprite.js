// @Autor: Bendl Šimon
import { _defaultValues } from './_defaultValues.js';
import { renderPoint } from './Point.js';
import {Rectangle} from './Rectangle.js';


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
        if(rBox) this.rBox(ctx, true);
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

    /** /// rBox() ///
     ** renders the bounding box of the Sprite
     * @param {CanvasRenderingContext2D} ctx - the context
     * @param {boolean} rPoint - whether to render the anchor point
     * @returns {Sprite} itself for chaining
     */
    rBox(ctx, rPoint = _defaultValues.s_renderPointAsWell){
        super.render(ctx);
        if (rPoint) renderPoint(this, ctx);
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


/*------------------------Sprite-EXAMPLE---------------------------

import { colides } from './Tetragon.js';
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

//správné vytvoření instance Spritu
const s1 = new Sprite(10,10,100,100,
    "/Game_01_Ledvadva/sprites/stand.png"
);
s1.render(ctx);

//v případě absence obrázku se vykreslí obdélník
const s2 = new Sprite(150,10,100,100);
s2.render(ctx);

//Sprite se načte i v případě donačtení obrázku
const s3 = new Sprite(290,10,100,100);
s3.render(ctx);
s3.loadImg("/Game_01_Ledvadva/sprites/stand.png")

const s4 = new Sprite(430,10,100,100);
s4.loadImg("/Game_01_Ledvadva/sprites/stand.png")
s4.render(ctx)


//jde i vykreslit hitbox
const s5 = new Sprite(570,10,100,100);
s5.loadImg("/Game_01_Ledvadva/sprites/RED/rR/6.png");
s5.render(ctx,true);

const s6 = new Sprite(670,10,100,100);
s6.loadImg("/Game_01_Ledvadva/sprites/BLU/rL/6.png");
console.log(colides(s5,s6))
if(colides(s5,s6)){s6.render(ctx,true);}

/**/
