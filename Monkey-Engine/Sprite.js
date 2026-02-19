//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { renderPolygon,  centroidOfPolygon } from './Tetragon.js';
import { renderPoint } from './Point.js';
import { Rectangle, rotationOfRectangle } from './Rectangle.js';

//@-------------------------------Sprite------------------------------------@//
export class Sprite extends Rectangle{
    constructor( x = 0,  y = 0, width, height, spritePath = _defaultValues.s_spritePath){
        super  (x, y, width, height,null);
        //* new properties
        this._blur = null;
        this._sprite = null;
        this._spritePath = spritePath;

        //* old properties
        this._color = _defaultValues.s_color;
        
    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of Sprite to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @returns {void} 
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._sprite;
        target._blur = this._blur;
        target._spritePath = this._spritePath;
        
        if(this._ignoreLogsOf["Sprite"]) return;
        if (target._spritePath == null){
            target._isDeepClone = false;
            this._errOf(
                '! COPYING A SPRITE WITHOUT A PATH! (-_- )···' + "\n" +
                "is being copied shallowly to " + target.constructor.name + 
                "(" + target._id + "), sprite will be shared"
            );
        }
        if (!target._isDeepClone){
            this._sprite.addEventListener('load', () => {                
                target._sprite = this._sprite; 
            });
        }
    }

    /** /// _initializeFunc() ///
     ** all operation called in constructor, used for cloning 
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        if(this._isDeepClone){
            if (this._sprite != null) return;
            Sprite.prototype.loadImg.call(this, this._spritePath);
        }
    }

    //@---publicFunctions---@//
    /** /// loadImg() ///
     ** loads the image from the given path 
     * @param {string} spritePath - path to the image
     * @returns {Sprite} itself for chaining
     */
    loadImg(spritePath) {
        this._spritePath = spritePath;
        this._sprite = new Image();
        this._sprite.src = spritePath;

        return this;
    }

    /** /// render() ///
     ** renders the Sprite on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {Sprite} itself for chaining
     */
    render(ctx , rBox = false) {
        if (rBox) renderCollisionBox(this, ctx);
        if (!this._isLoaded) return this;
        renderImg( this._sprite, ctx, this._points, this._blur);
        return this;
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

    //@---getters---@//
    get _isLoaded(){
        if(isImgLoaded(this._sprite)) return true;
        console.warn(
            "Sprite(" + this._id + ")<" + this._spritePath + "> isn't loaded yet"
        );
        return false;
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
 ** renders rectangle shapeimage on the given context
 * @public
 * @param {Image} img
 * @param {CanvasRenderingContext2D} ctx - the context
 * @param {{x: number, y: number}} ptsOfImg - points of the image to render
 * @param {number|null} blur - blur value in pixels or null for no blur
 * @returns {void}
 */
export function renderImg(img, ctx, ptsOfImg, blur = null){
    if (!img || !img.complete) {
        console.warn("Image ("+ img?.src +") was not able to load");
        return;
    }

    ctx.save();
    if (blur !== null) ctx.filter = `blur(${blur}px)`;

    const rotation = rotationOfRectangle(ptsOfImg);

    if (Math.abs(rotation) > 0.00001) {
        const center  = centroidOfPolygon(ptsOfImg);
         const width = Math.hypot(
            ptsOfImg[1].x - ptsOfImg[0].x, ptsOfImg[1].y - ptsOfImg[0].y
        );
        const height = Math.hypot(
            ptsOfImg[3].x - ptsOfImg[0].x, ptsOfImg[3].y - ptsOfImg[0].y
        );
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);

        ctx.drawImage(
            img,
            -width / 2, -height / 2,
            width, height
        );

    } else {
        ctx.drawImage(
            img, ptsOfImg[0].x, ptsOfImg[0].y,
            ptsOfImg[1].x - ptsOfImg[0].x,
            ptsOfImg[2].y - ptsOfImg[0].y
        );
    }
    ctx.restore();
}

/** /// isImgLoaded() ///
 ** checks if the image is loaded
 * @public
 * @param {Image} img
 * @returns {boolean}
 */
export function isImgLoaded(img){
    if (img && img.complete)return true;
    return false;
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
const s2 = new Sprite(260,10,200, 250);
const s3 = new Sprite(510,10,200, 250).loadImg(pathToImgs + "stand.png");
await wait(1000);
const s4 = s3.clone().moveBy(250,0); s3.color = "blue"; s4.color = "green";
const s5 = new Sprite(1010,10,200, 250).loadImg(pathToImgs + "rR/6.png");
console.log(s1._id, s2._id, s3._id, s4._id, s5._id);

window.setInterval(SpriteLoop, 8);
function SpriteLoop (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    s1.render(ctx);
    s2.render(ctx);
    s3.render(ctx, true);
    s4.render(ctx);
    s5.render(ctx,true);
    s5.render(ctx,true);
    s5.rotateBy(Math.PI / 400);
    
}

await wait(10000000);
/**/
