// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { Entity } from './Entity.js';
import { _defaultValues } from './_defaultValues.js';
import { Sprite, renderImg,renderCollisionBox, isImgLoaded } from './Sprite.js';
//@-------------------------------SpriteAnim--------------------------------@//
//: De
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height, spritePaths  =  [], animSlow){
        super  (x, y, width, height, _defaultValues._sA_spritePath);
        //* new properties
        this.Anim = new Animator(spritePaths, animSlow);
        if (this._ignoreInitOf[this.constructor.name]) this._initializeFunc();

        if (!(this._ignoreInitOf["SpriteAnim"]))this._initializeFunc();
    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of SpriteAnim to copy, used for cloning
     * @private 
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        target.Anim = this.Anim.clone(target._isDeepClone);
    }

    //@---publicFunctions---@//
    /** /// render() ///
     ** renders the SpriteAnim on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {SpriteAnim} itself for chaining
     */
    render(ctx, rColBox = false) {
        ctx.save();
        if (this.Anim._frames.length === 0) {
            this._errs("Animator has no frames to render => skipping render");
            if (rColBox) renderCollisionBox( this, ctx);
            ctx.restore();
            return this;
        }
        if (rColBox) renderCollisionBox( this, ctx);
        const img = this.Anim._currentFrame;
        renderImg( img, ctx, this._points, this._blur);
        ctx.restore(); 
        return this;
    }

    //: proxi to Animator function
    loadImg(spritePaths = []) {
        this.Anim.loadFrame(spritePaths);
        return this;
        //or
        return this.Anim.loadFrame(spritePaths);
    }

    //: proxi to Animator functions
    updateImage(){
        this.Anim.updateImage();
        return this;
        //or
        return this.Anim.updateImage();
    }



}

class Animator extends Entity{
    constructor(spritePaths = [], animSlow = 10){
        super();

        //* new properties
        this._tick = 0;
        this._frames = [];
        this._slow = animSlow;
        this._currentFrameIndex = 0;
        this._framePaths = spritePaths;
        
        if (!(this._ignoreInitOf["Animator"]))this._initializeFunc(); 
    }

    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     * ** all new properties of Animator to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        target._frames = [];
        target._tick = this._tick;
        target._slow = this._slow;
        target._currentFrameIndex = this._currentFrameIndex;
        target._framePaths = this._framePaths;
        if(target._framePaths == null){
            target._isDeepClone = false;
            this._errs(
                '! COPYING AN ANIMATOR WITHOUT FRAME PATHS! (-_- )···' + "\n" +
                "is being copied shallowly to " + target.constructor.name + 
                "(" + target._id + "), frames will be shared"
            );
        }
        if(!target._isDeepClone){
            this._frames.forEach((frame, index) => {
                frame.addEventListener('load', () => {
                    target._frames[index] = frame;
                });
            });

        }
    }

    /** /// _initializeFunc() ///
     * ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        if (this._cloneState)return;
        
        if (this._frames.length === 0){Animator.prototype.loadImg.call(this, this._framePaths);}
        else this._errs("Animator already has frames in _initializeFunc");

    }

    //@---publicFunctions---@//
    /** /// loadImg() ///
     * ** loads the frames from the given paths
     * @param {string[]} framePaths
     * @return {Animator} itself for chaining
     */
    loadImg(framePaths = []) {
        this._frames = [];
        this._framePaths = framePaths;
        framePaths.forEach((path, index) => {
            this._logs("Loading frame from path: " + path);
            const img = new Image();
            img.src = path;
            img.addEventListener('load', () => {
                this._frames[index] = img;
            });
        });
        return this;
    }

    updateImage() {
        this._tick++;
        if (this._tick > this._slow) {
            this._currentFrameIndex =
                (this._currentFrameIndex + 1) % this._frames.length;
            this._tick = 0;
        }
        return this;
    }

    //@---getters---@//
    get _currentFrame(){
        return this._frames[this._currentFrameIndex];
    }
}

class Animators extends Animator{

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
const sA = new SpriteAnim(
    10,150,90,160, [ 
        pathToImgs + "stand.png",
        pathToImgs + "rR/5.png"
    ], 
    4
)

const sAs = sA.clone().moveBy(800);
console.log(sA._spritePath)
console.log(sAs);


function SpriteAnimLoop (){
    bluescreen.render(ctx,true)
    sA.render(ctx,true);
    sAs.render(ctx,true);
    sA.updateImage();
    sAs.updateImage();
}
window.setInterval(SpriteAnimLoop, 100);
/**/ 