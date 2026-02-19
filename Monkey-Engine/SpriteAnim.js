// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import { Sprite, renderImg,renderCollisionBox, isImgLoaded } from './Sprite.js';

//@-------------------------------SpriteAnim--------------------------------@//
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height, spritePaths  =  [], animSlow){
        super  (x, y, width, height, null);
        //* new properties
        this.Anim = new Animator(spritePaths, animSlow);
        this._ignoreLogsOf["Sprite"] = true;
    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of SpriteAnim to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @returns {void} 
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        target.Anim = this.Anim.clone(target._isDeepClone);
    }

    /** /// _initializeFunc() ///
     ** all operation called in constructor, used for cloning 
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();
    }

    //@---publicFunctions---@//
    //: proxi to Animator function
    /** /// loadImg() ///
     ** loads the images from the given paths
     * @param {string[]} spritePaths 
     * @returns {SpriteAnim} itself for chaining
     */
    loadImg(spritePaths = []) {
        this.Anim.loadFrame(spritePaths);
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

    /** /// render() ///
     ** renders the SpriteAnim on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {SpriteAnim} itself for chaining
     */
    render(ctx, Rbox = false) {
        // even if calling super it should return {SpriteAnim}
        ctx.save();
        
        if (this.Anim._frames.length === 0) {
            super.render(ctx, Rbox);
            ctx.restore();
            return this;
        }

        if (Rbox) renderCollisionBox( this, ctx);
        const img = this.Anim._currentSprite;
        renderImg( img, ctx, this._points, this._blur);

        ctx.restore(); 
        return this;
    }

    //@---setters---@//
    set currentFrame(newValue){
        this.Anim.currentFrame = newValue;
    }
    set animTick (newValue){
        this.Anim.animTick = newValue;
    }
    set animSlow(newValue){
        this.Anim.animSlow = newValue;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadImg(paths) instead.
     */
    set frames(newValue){
        //this.Anim.loadFrame(newValue);
    }
    //@---getters---@//
    get _currentSprite(){
        return this.Anim._currentFrame;
    }
    get _currentSpritePos(){
        return this.Anim._currentFramePos;
    }
    get _isLoaded(){
        return this.Anim._isLoaded;
    }
    get _frames(){
        return this.Anim._frames;
    }
    get _animSlow(){
        return this.Anim._animSlow;
    }
    get _animTick(){
        return this.Anim._animTick;
    }
    get _framesPaths(){
        return this.Anim._framesPaths;
    }
        

}

//@-------------------------------helpClass----------------------------------@//
//TODO: add frameWeight for more control over animation speed
//TODO: add animation loop control (ping-pong, reverse, etc.)
export class Animator {
    constructor(framesPaths = [], animSlow = _defaultValues.sA_animSlow) {
        this._frames = [];
        this._animTick = 0;
        this._currentFramePos = 0;
        this._animSlow = animSlow;

  
        if (framesPaths && framesPaths.length > 0) {this.loadFrame(framesPaths);}
    }
    //@---functions---@//
    loadFrame(spritePaths) {
        this._frames = [];
        this._framesPaths = spritePaths;
        spritePaths.forEach((Spritepath, index) => {
            const img = new Image();
            img.src = Spritepath;
            this._frames.push(img);
        });
        return this;
    }

    /** Updates animation frame */
    updateImage() {
        if (this._frames.length === 0) return this;

        this._animTick++;
        if (this._animTick > this._animSlow) {
            this._currentFramePos =
                (this._currentFramePos + 1) % this._frames.length;
            this._animTick = 0;
        }
        return this;
    }

    /** Clone (share frames by default) */
    clone(deep = false){
        const clone = Object.create(this.constructor.prototype);
        clone._frames = [];
        clone._animSlow = this._animSlow;
        clone._animTick = this._animTick; 
        clone._framesPaths = this._framesPaths;
        clone._currentFramePos = this._currentFramePos;

        if (!deep){
            if(this._frames && this._frames._isLoadedd){
                clone._framesPaths = this._framesPaths;
                clone._frames = this._frames;
                return clone;
            } else {
                this._frames.forEach((frame, index) => {
                    frame.addEventListener('load', () => {     
                        clone._frames[index] = frame;
                    });
                });
                return clone;
            }
       }
        clone.loadFrame(this._framesPaths);
        return clone;
    }

    //@---setters---@//

    set animTick(newValue) {
        this._animTick = newValue;
        return this;
    }
    set animSlow(newValue) {
        this._animSlow = newValue;
        return this;
    }
    set currentFramePos(newValue) {
        this._currentFramePos = newValue;
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated sets current frame index, if you want load frames use loadFrame(paths) instead.
     * */
    set currentFrame(newValue) {
        this._currentFramePos = newValue;
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadFrame(paths) instead.
     * */
    set frames(newValue) {
        this.loadFrame(newValue);
        return this;
    }
    /** //? not sure if I want to tolerate this ?
     * @deprecated Use loadFrame(paths) instead.
     * */
    set framesPaths(newValue) {
        this.loadFrame(newValue);
        return this;
    }

    //@---getters---@//
    get _currentFrame() {
        return this._frames[this._currentFramePos];
    }
    get _isLoaded() {
        return this._frames.every(frame => isImgLoaded(frame));
    }

}
//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------*/
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
const sA = new SpriteAnim(
    10,150,90,160, [ 
        pathToImgs + "stand.png",
        pathToImgs + "rR/5.png"
    ], 
    40
)
const sAs = sA.clone()

console.log(sAs._animSlow);
sAs.animSlow = 10;
function SpriteAnimLoop (){
    bluescreen.render(ctx,true)
    sA.render(ctx,true);
    sAs.render(ctx);
    sA.updateImage();
    sAs.updateImage();
}
window.setInterval(SpriteAnimLoop, 1);
/**/ 