// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { Sprite, renderImg,renderCollisionBox } from './Sprite.js';

//@-------------------------------SpriteAnim--------------------------------@//
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height, spritePaths = []){
        super  (x, y, width, height, null); 
        
        this.Anim = new Animator(spritePaths);
        if (spritePaths){
            this.loadImg(spritePaths);
        }
    }

    //@---getters---@//
    //: proxi to Animator function
    //  /// _currentSprite() ///  
    _currentSprite(){
         return this.Anim._currentSprite(); 
    }
    //@---functions---@//
    //: proxi to Animator function
    /** /// loadImg() ///
     ** loads the images from the given paths
     * @param {string[]} spritePaths 
     * @returns {SpriteAnim} itself for chaining
     */
    loadImg(spritePaths) {
        this.Anim.loadImg(spritePaths);
        return this;
    }

    //: proxi to Animator functions
    /** /// updateImage() ///
     ** updates the current frame based on the animation speed  
     * @returns {SpriteAnim} itself for chaining
     */
    updateImage(){
        this.Anim.updateImage();
        return this;
    }

    //: proxi to Animator functions
    /** /// clone() ///
     ** clones the SpriteAnim, Sprite images can be shared or reloaded 
     * @param {boolean} takesMoreSpace - whether to clone will share or reload images
     * @returns {SpriteAnim} cloned SpriteAnim
     */
    clone(takesMoreSpace = false) {
        const clone = new SpriteAnim(this._x, this._y, this._width, this._height);
        clone.Anim = this.Anim.clone(takesMoreSpace);
        return clone;
    }

    /** /// render() ///
     ** renders the SpriteAnim on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {SpriteAnim} itself for chaining
     */
    render(ctx,Rbox) {
        // even if calling super it should return {SpriteAnim}
        if (!this.Anim._frames.length > 0) return super.render(ctx);
        const img = this.Anim._frames[this.Anim._currentFrame];
        if (img.complete) {
            renderImg(
                img, ctx,
                {    x: this._x    ,      y: this._y     },
                {width: this._width, height: this._height},
                this._rotation(), this._blur
            )
        }
        if (Rbox) renderCollisionBox( this, ctx);
        
        ctx.restore(); 
        return this;
    }

    //@---setters---@//
    set currentFrame(newValue){
        this.Anim.currentFrame = newValue;
    }
    set animTick (newValue){
        this.Anim.animTick = newValue;
        return this;
    }
    set animSlow(newValue){
        this.Anim.animSlow = newValue;
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadImg(paths) instead.
     */
    set frames(newValue){
        this.Anim.loadImg(newValue);
        return this
    }
}

//@-------------------------------helpClass----------------------------------@//
//TODO: add frameWeight for more control over animation speed
//TODO: add animation loop control (ping-pong, reverse, etc.)
export class Animator {
    constructor(frames = []) {
        this._frames = [];
        this._animTick = 0;
        this._currentFrame = 0;
        this._animSlow = _defaultValues.sA_animSlow;

        if (frames.length) {this.loadImg(frames);}
    }
    //@---getters---@//
    /** Returns the current sprite*/
    _currentSprite() {
        return this._frames[this._currentFrame];
    }

    //@---functions---@//
    /** Loads image paths */
    loadImg(paths) {
        this._frames = [];
        paths.forEach(path => {
            const img = new Image();
            img.src = path;
            this._frames.push(img);
        });
        return this;
    }

    /** Updates animation frame */
    updateImage() {
        if (this._frames.length === 0) return this;

        this._animTick++;
        if (this._animTick > this._animSlow) {
            this._currentFrame =
                (this._currentFrame + 1) % this._frames.length;
            this._animTick = 0;
        }
        return this;
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

    //@---setters---@//
    set currentFrame(newValue) {
        this._currentFrame = newValue;
        return this;
    }
    set animTick(newValue) {
        this._animTick = newValue;
        return this;
    }
    set animSlow(newValue) {
        this._animSlow = newValue;
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadImg(paths) instead.
     * */
    set frames(newValue) {
        this.loadImg(newValue);
        return this;
    }
}
//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------
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