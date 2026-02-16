// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { renderSpriteCollisionBox } from './Sprite.js';
import { Sprite } from './Sprite.js';

//@-------------------------------SpriteAnim--------------------------------@//
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height, spritePaths = []){
        super  (x, y, width, height, null); 
        
        this._frames = [];
        this._animTick = 0;
        this._animSlow = _defaultValues.sA_animSlow;
        this._currentFrame = 0;
        
        // ? not sure if I want it here (maybe push to Sprite) ? //
        this._renderWidth = width;
        this._renderHeight = height;
        this._renderDir = null;

        if (spritePaths){
            this.loadImg(spritePaths);
        }
    }

    /** /// loadImg() ///
     ** loads the images from the given paths
     * @param {string[]} spritePaths 
     * @returns {SpriteAnim} itself for chaining
     */
    loadImg(spritePaths) {
        spritePaths.forEach(path => {
            const img = new Image();
            img.src = path;
            this._frames.push(img);
        });
        return this;
    }

    /** /// updateImage() ///
     ** updates the current frame based on the animation speed  
     * @returns {SpriteAnim} itself for chaining
     */
    updateImage(){
        this._animTick += 1;
        if (this._animTick > this._animSlow){
            this._currentFrame = (this._currentFrame + 1) % this._frames.length;
            this._animTick = 0;
        }
        return this;
    }

    /** /// render() ///
     ** renders the SpriteAnim on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {SpriteAnim} itself for chaining
     */
    render(ctx,Rbox) {
        // even if calling super it should return {SpriteAnim}
        if (!this._frames.length > 0) return super.render(ctx);
        ctx.save();
        const img = this._frames[this._currentFrame];
        let renderX;
        let renderY;
        if (img.complete) {
            const offsets = {
                top:    {x: - (this._renderWidth - this._width) / 2, y: -this._renderHeight                      },
                left:   {x: -  this._renderWidth,                    y: - (this._renderHeight - this._height) / 2},
                bottom: {x: - (this._renderWidth - this._width) / 2, y:                       + this._height     },
                default:{x: - (this._renderWidth - this._width) / 2, y: - (this._renderHeight - this._height) / 2},
                right:  {x:                      + this._width,      y: - (this._renderHeight - this._height) / 2}
                
            };
            const {x: dx, y: dy} = offsets[this._renderDir] || offsets.default;
            renderX = this._x + dx;
            renderY = this._y + dy;
    
            ctx.drawImage(img, renderX, renderY, this._renderWidth, this._renderHeight);
        }
        if (Rbox){
            renderSpriteCollisionBox(
                renderX, renderY, this._renderWidth, this._renderHeight,
                ctx, this._color, this._strokeWidth
            );
        }
        ctx.restore(); 
        return this;
    }

    /** /// clone() ///
     ** clones the SpriteAnim, Sprite images can be shared or reloaded 
     * @param {boolean} takesMoreSpace - whether to clone will share or reload images
     * @returns {SpriteAnim} cloned SpriteAnim
     */
    clone(takesMoreSpace = false) {
        const clone = new SpriteAnim(this._x, this._y, this._width, this._height);
        clone._animSlow = this._animSlow;
        clone._currentFrame = this._currentFrame;
        clone._renderWidth = this._renderWidth;
        clone._renderHeight = this._renderHeight;
        clone._renderDir = this._renderDir;

        if (takesMoreSpace){
            clone.loadImg(this._frames.map(img => img.src));
        }else{
            clone._frames = this._frames;
        }
        return clone;
    }

    /*--------------------------Setters--------------------------*/
    set currentFrame(newValue){
        this.__currentFrame = newValue;
        return this;
    }
    set frames(newValue){
        console.error("použij loadImg() degeši")
        // ? not sure if I want to tolerate this ? //
        this.loadImg(newValue);
        return this
    }
    set animSlow(newValue){
        this._animSlow = newValue;
        return this;
    }
    set width(newValue){
        if (this._renderWidth == this._width){
            this._renderWidth = newValue;
        }
        this._width = newValue;
        return this;
    }
    set height(newValue){
        if (this._renderHeight == this._height){
            this._renderHeight = newValue;
        }
        this._height = newValue;
        return this;
    }
}
//@-------------------------------Animator-----------------------------------@//
export class Animator {
    constructor(frames = []) {
        this._frames = [];
        this._animTick = 0;
        this._animSlow = _defaultValues.sA_animSlow;
        this._currentFrame = 0;

        if (frames.length) {
            this.load(frames);
        }
    }

    /** Loads image paths */
    load(paths) {
        this._frames = [];
        paths.forEach(path => {
            const img = new Image();
            img.src = path;
            this._frames.push(img);
        });
        return this;
    }

    /** Updates animation frame */
    update() {
        if (this._frames.length === 0) return this;

        this._animTick++;
        if (this._animTick > this._animSlow) {
            this._currentFrame =
                (this._currentFrame + 1) % this._frames.length;
            this._animTick = 0;
        }

        return this;
    }

    /** Returns current image */
    getFrame() {
        if (this._frames.length === 0) return null;
        return this._frames[this._currentFrame];
    }

    /** Clone (share frames by default) */
    clone(deep = false) {
        const clone = new Animator([], this._animSlow);
        clone._currentFrame = this._currentFrame;

        if (deep) {
            clone.load(this._frames.map(img => img.src));
        } else {
            clone._frames = this._frames;
        }

        return clone;
    }

    /*--------------------------Setters--------------------------*/

    set animSlow(value) {
        this._animSlow = value;
        return this;
    }

    set currentFrame(value) {
        this._currentFrame = value;
        return this;
    }
}
//@------------------------------examples----------------------------------@// 
/*-------------------------------------------------------------------------
import { Tetragon } from '../Monkey-Engine/Tetragon.js';

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const pathToImgs = "/Game_01_Ledvadva/sprites/Player/RED/";


const bluescreen = new Tetragon(
    {x:0,y:0},
    {x:800,y:0},
    {x:800,y:400},
    {x:0,y:400}
)
const sA = new SpriteAnim(10,150,90,160, [ 
    pathToImgs + "stand.png",
    pathToImgs + "rR/5.png"
])

sA.id = "spriteAnim"
sA.animSlow = 40;
function SpriteAnimLoop (){
    bluescreen.render(ctx,true)
    sA.render(ctx,true);
    sA.updateImage();
}
window.setInterval(SpriteAnimLoop, 1);
/**/ 