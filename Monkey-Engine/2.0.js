// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { Entity } from './Entity.js';
import { _defaultValues } from './_defaultValues.js';
import { Sprite, renderImg,renderCollisionBox, isImgLoaded } from './Sprite.js';
import { Rectangle } from './Rectangle.js';
import { hasTetraEdgeIntersection, hasVertexInside, Tetragon, colidingPointsOfTetragons, centroidOfPolygon } from './Tetragon.js';
//@-----------------------------Graphic-Objects-----------------------------@//

//@---                           helpFunc                                ---@//

//@---                           CompClass                               ---@//

/// Mort ///

//// GraphicPrototype ////
export class GraphicPrototype extends Entity{
    constructor(spritePaths){
        super();

        this._frames;
        this._framePaths = spritePaths;
        this._onLoad;

        this._INIT("GraphicPrototype");
    }

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        const frPathts = this._framePaths;
        if( frPathts == null || frPathts == undefined || this._length === 0 ){
            this._errs(
                '! COPYING AN ANIMATOR WITHOUT FRAME PATHS! (-_- )···' + "\n" +
                " is being copied shallowly to " + target.constructor.name + 
                "(" + target._id + "), frames will be shared"
            );
        }

        if (target._isShallowClone){
            target._framePaths = this._framePaths;
            target._frames = this._frames;
            return;
        }
        if (target._isDeepClone){
            target._framePaths = structuredClone(this._framePaths);
            target.load(target._framePaths);
            
            return;
        }
    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        this._framePaths = this._framePaths ?? [];
        this._onLoad = false;

        if(this._isClone)return;

        this.load(this._framePaths);
    }

    /** /// load() ///
     * loads the frames from the given paths
     * @public
     * @param {String[]} framePaths
     */
    load(framePaths){
        this._frames = [];
        this._framePaths = framePaths;

        let loadedCount = 0;
        const fin = this._framePaths.length;
        framePaths.forEach((path, index) => {
            const img = new Image();
            img.src = path;
            img.addEventListener('load', () => {
                this._frames[index] = img;
                loadedCount++;

                if (fin === loadedCount){
                    this._onLoad = true;
                }
            }, { once: true });
        });
        return this;
    }

    update(){
        if(!this._onLoad)this._warns(
            "Trying to update an animator that has not finished loading its frames"
        )
    }

    /// _getters ///
    get _length(){
        return this._frames.length;
    }
    get _hasModes(){
        return ('_mode' in this);
    }
}

////    Anim    ////
export class Anim extends GraphicPrototype{
    constructor(spritePaths, slow){
        super(spritePaths);

        //* new properties
        this._tick;
        this._current;
        this._slow = slow;

        this._INIT("Anim");    
    }

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._current = this._current;

        if(target._isShallowClone){
            target._tick    = this._tick;
            target._slow    = this._slow;
            return;
        }

        target._tick    = structuredClone(this._tick);
        target._slow    = structuredClone(this._slow);

    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        this._slow = this._slow ?? 10;
        this._framePaths = this._framePaths ?? [];

        if (this._isClone)return;

        this._tick = 0;
        this._current = 0;
        return;
    }

    /** /// _resetCurr() ///
     * resets current animation indexes
     * @private
     * @returns {MixAnim} itself for chaining
     */
    _resetCurr(){
        this._current = 0;
        return this;
    }

    /** /// update() ///
     * turns the current frame of {@link Anim} based on the mode
     * @public
     * @returns {Anim} itself for chaining
     */
    update(){
        this._tick++;
        if (this._tick > (this._slow)){
            this._current = (this._current + 1) % this._length;
            this._tick = 0;
        }
        return this;
    }

    /// _getters ///
    get _currentFrame(){
        return this._onLoad ? this._frames[this._current] : null;
    }

    /// _setters ///
    set _currentFrame(value){
        this._current = value % this._length;
    }

}

////   MixAnim  ////
export class MixAnim extends Anim{
    constructor(spritePaths, slow, weights, mode){
        super(spritePaths, slow);
        
        // * new properties 
        // "loop", "linear", "linearEnd",
        // "pingpong", "pingpongBack"
        this._mode = mode;
        this._weights = weights;

        this._INIT("MixAnim");
    }

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._mode = this._mode ?? "loop";
        if(target._isShallowClone){target._weights = this._weights; return;}
        if(target._isDeepClone){target._weights=[...this._weights]; return;}
                 
    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        this._mode = this._mode ?? "loop";

        const wLength = this._weights.length;
        if (this._length - wLength === 0 )return;

        for (let i = wLength; i < this._framePaths.length; i++){
            this._weights[i] = 1;
        }
    }

    /** /// _resetCurr() ///
     * resets current animation indexes
     * @private
     * @returns {MixAnim} itself for chaining
     */
    _resetCurr(){
        this._current = 0;
        if (this._mode === "linearEnd") this._mode = "linear";
        return this;
    }

    /** /// update() ///
     * turns the current frame of {@link Anim} based on the mode and weights
     * @public
     * @returns {Anim} itself for chaining
     */
    update(){
        this._tick++;

        if (this._length === 0){ this._errs(
            "Trying to update an animation with no frames loaded"
        );return this;}

        if (this._tick > (this._slow * this._currentWeight)){
            this._tick = 0;

            if (this._mode === "loop"){
               this._current = (this._current + 1) % this._length;
               return this;
            }
            if (this._mode === "linear"){
                if (this._current < this._length - 1) this._current++;
                else this._mode = "linearEnd"; 
                return this;
            }
            if(this._mode === "pingpong"){
                this._current++;
                if (this._current == this._length - 1){
                    this._mode = "pingpongBack";
                }
                return this;
            }
            if(this._mode === "pingpongBack"){
                this._current--;
                if (this._current === 0) this._mode = "pingpong";
                return this;
            }
            this._errs("Unknown animation mode: " + this._mode);
        }
        return this;
    }

    /// _getters ///
     get _currentWeight(){
        return this._weights[this._current] ?? 1;
    }
      /// _setters ///
    set _currentWeight(value){
        this._weights[this._current] = value;
    }
    set _current(value){
        super._currentFrame = value;        this._warns(
            "Setting current frame manually on a MixAnim" +
            " may cause desynchronization of the modes"
        );
    }

}

/** ////    Anims   ////
 * ToDo List
 *  : reloading Anim by name
 *  : reloading all Anims
 *  : MixAnim reseting (not sure)
 */
export class Anims extends Entity{
    constructor(animators, fallBackAnimationName){
        super();

        //* new properties
        this._currentName;
        this._animators = animators;
        this._fallBackName = fallBackAnimationName;
        
        this._INIT("Anims");    
    }

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._currentName = this._currentName;
        target._fallBackName = this._fallBackName;

        if(this._isShallowClone) target._animators = {};
        
        if(this._isDeepClone){
            for (const [key, anim] of Object.entries(this._animators)){ 
                target._animators[key] = this.clone(target._isDeepClone);
            }      
        }
    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();
        this._animators = this._animators ?? { default: new Anim()};
        this._fallBackName = this._fallBackName ?? Object.keys(this._animators)[0] ?? null;

        if(this._isClone)return;
        this._setCurrentNamed(this._fallBackName);
    }
    
    /** /// _animationNamed() ///
     * returns {@link Anim} with the given name 
     * @param {name} name the animation to get
     * @returns {Anim || null} the animation
     */
    _animationNamed(name){
        if (!this._animators[name]){
            this._errs("No such animation: " + name);
            return null;
        }
        return this._animators[name];
    }

    /** /// _resetNamed() ///
     * resets set animation ticks and frame index
     * @private
     * @param {string} name of the animation to reset
     * @return {void}
     */ 
    _resetNamed(name){
        this._animationNamed(name)._tick = 0;
        this._animationNamed(name)._resetCurr();
    }

    /** /// _resetCurrentAnim() ///
     * resets current animation ticks and frame index
     * @private
     * @return {void}
     */
    _resetCurrentAnim(){
        this._resetNamed(this._currentName);
    }
    
    /** /// _setAnimation() ///
     * sets the current {@link Anim} by given name
     * when a change occurs, it resets the newly set
     * @private
     * @param {string} name 
     * @returns {Anims} itself for chaining
     */
    _setCurrentNamed(name){
        if(this._animationNamed(name) == null){
            this._warns(this._currentFrame);
            this._warns("Trying to set non-existing animation: " + name);
            name = this._fallBackName;
        }
        if (name === this._currentName) return this;

        this._currentName = name;
        this._resetCurrentAnim();

        return this;
    }

    /** /// update() ///
     * updates the current {@link Anim} based on the mode and weights
     * @public 
     * @returns {Anims} itself for chaining
     */
    update(){
        this._currentAnimator.update();
        return this;
    }
 
    /** finish this
     * ///reloadAnimNamed()///
     * loads frames from the given paths into the given animation
     * @deprecated not tested
     * @public
     * @param {string} newAnim -ed anim name to load frames into
     * @param {string[]} spritePaths
     * @returns {Anims} itself for chaining
     *
    reloadAnim(named, spritePath = []){
        if (typeof named !== "string"){this._errs(
            "reloadAnim() expects a string name for the animation"
        ); return this ;}

        if (!this._animationNamed(named)){this._errs(
            "failed to find and load animation: " + named
        );return this;}

        this._animators[named].load(spritePath);

        return this;
    }
    */

    /** finish this
     * /// loadAnims() ///
     ** loads all animations in the given object
     * @public
     * @param {Object} anims - an object of animation names and their paths
     * @returns {Anims} itself for chaining
    *
    load(anims){
        for (const [name, paths] of Object.entries(anims)){
            this.loadAnim(name, paths);
        }
        if (!this._animators[this._currentName]){
            this._currentName = Object.keys(this._animators)[0] ?? null;
        }

        return this;
    }
        */

    /// _getters ///
    get  _currentFrame  (){
        return this._currentAnimator?._currentFrame;
    }
    get _currentAnimator(){
        return this._animationNamed(this._currentName);
    }

    /// _setters ///
    set _currentFrame(value){
        this._currentAnimator._currentFrame = value;
    }  
    set _currentAnimation(value){
        this._setCurrentNamed(value)
    }

}

//@---                           ObjectClass                             ---@//


/// SpriteAnims ///
export class SpriteAnims extends Rectangle{
    constructor(x, y, width, height, Anims){
        super ( x, y, width, height);

        //* new properties
        this.Graphic = Anims;
        this._INIT("SpriteAnims");    
    }

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
    
        target.Graphic = this.Graphic.clone(target._isDeepClone);
    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        
        this.Graphic = this.Graphic ?? new Anims();
    }

    /** //proxiTo _animationNamed() ///
     * returns {@link Anim} with the given name 
     * @param {name} name the animation to get
     * @returns {Anim || null} the animation
     */
    _animNamed(name){
        return this.Graphic._animationNamed(name);
    }

    /** ///proxiTo Anim update() ///
     * updates the current {@link Anim} based on the mode and weights
     * @public 
     * @returns {Anims} itself for chaining
     */
    updateImage(){
        this.Graphic.update();
    }

    /** /// render() ///
     ** renders the SpriteAnims on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     * @returns {SpriteAnims} itself for chaining
     */
    render(ctx, rColBox = false){
        ctx.save();
        if (rColBox) renderCollisionBox( this, ctx);
        const img = this.Graphic._currentAnimator._currentFrame;
        renderImg( img, ctx, this._points, this._blur);
        ctx.restore(); 
        return this;
    }

    /** /// loadImg() ///
     ** loads frames from the given paths into the given animation
     * @deprecated not tested
     * @public
     * @param {string} target -ed anim name to load frames into
     * @param {string[]} spritePaths
     * @returns {SpriteAnims} itself for chaining
     */
    loadImg(target, spritePath){
        if (!this._animNamed(target)){
            this._errs("No such animation: " + target);
            return this;
        }
        this._animNamed(target).load(spritePath);
        return this;
    }

    /// _getters ///
        
    get _currentAnimation(){
        return this._animNamed(this._currentName);
    }
    get _defaultAnimName(){
        return this.Graphic._defAnimName; 
    ;}

    /// _setters ///
    set _currentAnimation(name){
        this.Graphic._currentAnimation = name;
    }
}

/// SpriteAnimCaracter ///
export class SpriteAnimCaracter extends SpriteAnims{
    constructor(

    ){
        super();
        this._pathToSKIN = "../../Game_01_Ledvadva/sprites/SKIN-00/";
        this._skins = ["SKIN-00"];
        this._current = 0;    

        this._INIT("SpriteAnimCaracter");    
    }
    _initializeFunc(){
        this._width  = this._width ?? 90;
        this._height = this._height ?? 160;
        this.Graphic
    }



}


//@-----------------------------Dynamic-Objects-----------------------------@//

//@---                           CompClass                               ---@//
/** /// Materials ///
 * @this self: the material of the object itself, how much of the velocity it keeps
 * @this other: the material of the other object, how much of the velocity it takes from the other object
 * @this loss: how much of the velocity is lost in the collision
 */
export class Material extends Entity{
    constructor(self, other, loss, limit = 1){
        super();
        //* new properties
        this.self = self;
        this.loss = loss;
        this.other = other;
        this._limit = limit;

        this._INIT("Material");
    }

    _checksLimit(){
        return((
                this.self + this.other + this.loss
            ) ===  this._limit
        )
    }

    _initializeFunc(){
        super._initializeFunc();
        this.self = this.self   ?? 0;
        this.other = this.other ?? 0;
        this.loss = this.loss   ?? 0;
        this._limit = this._limit ?? 1;
        this._checksLimit();
    }

    _copyPropsTo(target){
        super._copyPropsTo(target);
        target.self = this.self;
        target.other = this.other;
        target.loss = this.loss;
        target._limit = this._limit;
    }
}
export class RealMate extends Material{
    constructor(self, other, loss){
        super(self, other, loss);

        this._INIT("RealMate");
    }
}
export class MasivMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0;
        this.other = 0;
        this.loss  = 1;

        this._INIT("MasivMate");
    }
}
export class AlphaMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0.6;
        this.other = 0.3;
        this.loss  = 0.1;

        this._INIT("AlphaMate");
    }
}
export class DeffMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0.2;
        this.other = 0.4;
        this.loss  = 0.8;

        this._INIT("DeffMate");
    }
}
export class BounceMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0;
        this.other = 0.2;
        this.loss  = 0;

        this._INIT("BounceMate");
    }
}
export class SoftMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0.3;
        this.other = 0.3;
        this.loss  = 0.4;

        this._INIT("SoftMate");
    }
}
export class BetaMate extends RealMate{
    constructor(){
        super();
        //* old properties
        this.self  = 0.7;
        this.other = 0;
        this.loss  = 0.3;

        this._INIT("BetaMate");
    }
}

//@---                           helpFunc                                ---@//

function isCollision(ptsOfPoly1, pthsOfPoly2){
    return hasVertexInside(ptsOfPoly1, pthsOfPoly2) || hasTetraEdgeIntersection(ptsOfPoly1, pthsOfPoly2);
}
export function stepingOfCollison(ptsOfPoly1, velo1, ptsOfPoly2, velo2, dt){
    const dv1 = {x: velo1.x * dt, y: velo1.y * dt};
    const dv2 = {x: velo2.x * dt, y: velo2.y * dt};

    const MAX_STEP = 2;
    const theBiggerVeloDis = Math.max(
        Math.hypot(dv1.x, dv1.y),
        Math.hypot(dv2.x, dv2.y)
    );
    if (theBiggerVeloDis <= 0){return null;}
    const steps = Math.max(1, Math.ceil(theBiggerVeloDis / MAX_STEP));

    for (let s = 0 ; s <= steps; s++){
        const t = s / steps;  

        const sweptP1 = ptsOfPoly1.map((pt, i) => ({
            x: pt.x + dv1.x * t,
            y: pt.y + dv1.y * t 
        }));

        const sweptP2 = ptsOfPoly2.map((pt, i) => ({
            x: pt.x + dv2.x * t,
            y: pt.y + dv2.y * t 
        }));

        if (isCollision(sweptP1, sweptP2)){
            return {timeOfCollision: t};
        }
    }
    return null;
}
function transfearVelo(v1, m1, v2, m2) {
    const v2_out = -(v1 * m1.self + v2 * m1.other) * (1 - m1.loss);
    const v1_out = -(v2 * m2.self + v1 * m2.other) * (1 - m2.loss);
    return [v1_out, v2_out];
}
function BounceVelo(vx, vy, m1, m2) {
    const vx_out = -(vx * m1.self * m2.other) * (1 - m1.loss);
    const vy_out = -(vy * m1.self + m2.other) * (1 - m2.loss);
    return [vx_out, vy_out];
}
function getAABB(points) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const p of points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    }

    return { minX, maxX, minY, maxY };
}
export function CollisionResponse(obj1, obj2, dt) {
    if (!(obj1 instanceof Tetragon) || !(obj2 instanceof Tetragon)) {
        obj1._errs("CollisionResponse called with non-Tetragon objects.");
        return;
    }
    if(!obj1 || !obj2){return}
    const imm1 = obj1.Mate instanceof MasivMate;
    const imm2 = obj2.Mate instanceof MasivMate;

    if(imm1) obj1.Dyna._velocity = {x: 0, y: 0};
    if(imm2) obj2.Dyna._velocity = {x: 0, y: 0};

    // --- get AABBs ---
    const a = getAABB(obj1._points);
    const b = getAABB(obj2._points);

    // --- compute penetration per axis ---
    const penetrationX = Math.min(a.maxX - b.minX, b.maxX - a.minX);
    const penetrationY = Math.min(a.maxY - b.minY, b.maxY - a.minY);

    // --- pick the shortest axis ---
    const axis = penetrationX < penetrationY ? 'x' : 'y';

    // --- determine direction: obj1 relative to obj2 ---
    const centroid1 = centroidOfPolygon(obj1._points);
    const centroid2 = centroidOfPolygon(obj2._points);
    const EPSILON = 0.05;

    if (axis === 'x') {
        const dir = centroid1.x < centroid2.x ? -1 : 1;

        if (!imm1 && !imm2) {
            obj1.moveBy((penetrationX / 2 + EPSILON) * dir, 0);
            obj2.moveBy(-(penetrationX / 2 + EPSILON) * dir, 0);
        } else if (!imm1 && imm2) {
            obj1.moveBy((penetrationX + EPSILON) * dir, 0);
        } else if (imm1 && !imm2) {
            obj2.moveBy(-(penetrationX + EPSILON) * dir, 0);
        }
        // --- simple velocity transfer along X ---
        const v1x = obj1.Dyna._velocity.x;
        const v2x = obj2.Dyna._velocity.x;


        if (!imm1 && !imm2) {
            let avg = (v1x + v2x) / 2;
            obj1.Dyna._velocity.x = avg;
            obj2.Dyna._velocity.x = avg;
        } else if (!imm1 && imm2) {
            obj1.Dyna._velocity.x = v2x; 
        } else if (imm1 && !imm2) {
            obj2.Dyna._velocity.x = v1x;
        }
    } else {
        const dir = centroid1.y < centroid2.y ? -1 : 1;
        // grounded check
        if (dir === -1) obj1.Dyna._isGrounded = true;
        if (dir === 1)  obj2.Dyna._isGrounded = true;
        

        if (!imm1 && !imm2) {
            obj1.moveBy(0, (penetrationY / 2 + EPSILON) * dir);
            obj2.moveBy(0, -(penetrationY / 2 + EPSILON) * dir);
        } else if (!imm1 && imm2) {
            obj1.moveBy(0, (penetrationY + EPSILON) * dir);
        } else if (imm1 && !imm2) {
            obj2.moveBy(0, -(penetrationY + EPSILON) * dir);
        }
        if(obj1.doesColideWith(obj2))return
        // --- simple velocity transfer along Y ---
        const v1y = obj1.Dyna._velocity.y;
        const v2y = obj2.Dyna._velocity.y;
        if (!imm1 && !imm2 ) {
            const avgY = (v1y + v2y) / 2;
            if(true){ 
                let c = (centroid1.y - centroid2.y)
                if(c > 0 ){
                    let cycle = false;
                    for(let i = 0; i < obj2._hasOnTop.length; i++){
                        if(obj2._hasOnTop[i] === obj1)cycle = true
                        if(obj2._hasOnTop[i] === obj2)cycle = true
                    }
                    if(!cycle){
                        obj1._hasOnTop.push(obj2);
                    } else console.warn("cycle detected in _hasOnTop, skipping push");
                }
                if(c < 0){
                    let cycle = false;
                    for(let i = 0; i < obj1._hasOnTop.length; i++){
                        if(obj1._hasOnTop[i] === obj2)cycle = true
                        if(obj1._hasOnTop[i] === obj1)cycle = true
                    }
                    if(!cycle){
                        obj2._hasOnTop.push(obj1);
                    }
                    else{
                        console.warn("cycle detected in _hasOnTop, skipping push");
                    }
                }
            }
            obj1.Dyna._velocity.y = avgY;
            obj2.Dyna._velocity.y = avgY;
        } else if (!imm1 && imm2) {
            obj1.Dyna._velocity.y = v2y;
        } else if (imm1 && !imm2) {
            obj2.Dyna._velocity.y = v1y;
        }
            if(imm1) obj1.Dyna._velocity = {x: 0, y: 0};
        if(imm2) obj2.Dyna._velocity = {x: 0, y: 0};
    }

    /* --- optional sanity check ---
    if (obj1.doesColideWith(obj2)) {
        obj1._warns("Objects still colliding after CollisionResponse.");
        obj2._warns("Objects still colliding after CollisionResponse.");
    }
    /*-----------------------------------*/
}



/// Ace related ///
function sumOfAces(acelerations){
    fieldingAce(acelerations);
    let totalAce = {
        x:0, 
        y:0,
        i:false
    };
    for ( const ace of acelerations ){
        if(!isValidAce(ace)){
            console.error("invalid or instant aceleration, skipping: " + ace);
            break;
        }
        totalAce.x += ace.x;
        totalAce.y += ace.y;
    }
    return totalAce;
}
function sumOfRealAces(acelerations){
    fieldingAce(acelerations);
    let totalAce = {
        x:0, 
        y:0, 
        i:false
    };
    for ( const ace of acelerations ){
        if(!isValidAce(ace)){
            console.error("invalid aceleration, skipping: " + ace);
            break;
        }
        if(ace.i)continue
        totalAce.x += ace.x;
        totalAce.y += ace.y;
    }
    return totalAce;
}
function isValidAce(ace){
    return (   ace && typeof ace   === 'object' &&
        'x' in ace && typeof ace.x === 'number' &&  // power on x axis
        'y' in ace && typeof ace.y === 'number' &&  // power on y axis
        'i' in ace && typeof ace.i === 'boolean'    // instant | not
    );

}
function fieldingAce(ace){
    if (!isValidFieldOrAce(ace)){return;}
    if (!Array.isArray(ace)){
        if (!isValidAce(ace)){console.warn(
            "Passed field of non-Aces"
        ); return;}
        //console.warn("Ace turned into single lenght field");
        return [ace]; 
    }
    return ace;
}
function isValidFieldOrAce(field){
    if (field instanceof Array){
        for (const ace of field){
            if (!isValidAce(ace)){
                console.error("invalid aceleration in field: " + ace);
                return false;
            }
        }
        return true;
    }
    return isValidAce(field);
}
    

//@---                           CompClass                               ---@//
/** ///    Dyna    ///
 * dynamics for simple movemnt without accelerations, used for everything moving,
 * it's the base for every "dynamicComponent". "DynamicObjects" don't have shared
 * ancestors other than Entity<>, so this isthe only Dynamic related pacient zero
 */
export class Dyna extends Entity{
    constructor(velocityVector){
        super();
        //* new properties
        this._velocity = { ...velocityVector};
        this._MAX_X_VELOCITY = 10000;                                  // CONSTANT
        this._MAX_Y_VELOCITY = 10000;                                  // CONSTANT

        this._INIT("Dyna");    
    }

    /** 
     ** all new properties of Dyna to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._MAX_X_VELOCITY = this._MAX_X_VELOCITY;
        target._MAX_Y_VELOCITY = this._MAX_Y_VELOCITY;
        if ( target._isDeepClone) target._velocity = {...this._velocity};
        if (!target._isDeepClone) target._velocity = this._velocity;
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();
        this._velocity.x = this._velocity.x ?? 0;
        this._velocity.y = this._velocity.y ?? 0;
    }

    _updateAces(){
        return this;
    }

    /** /// update() ///
     ** updates the velocity based on the current velocity and the max velocity
     * @public
     * @return {Dyna} itself for chaining
     */
    updateVelo(dt){
        if (!dt)this._errs("Dyna update called without dt, velocity will not be updated");

        this._velocity.x = Math.max(-this._MAX_X_VELOCITY, Math.min(this._velocity.x, this._MAX_X_VELOCITY));
        this._velocity.y = Math.max(-this._MAX_Y_VELOCITY, Math.min(this._velocity.y, this._MAX_Y_VELOCITY));
        return this;
    }

    /** /// push() ///
     ** pushes an Ace or an array of Aces to the velocity
     * @public
     * @param {Object} velocityVector - the velocity vector to push
     * @return {Dyna} itself for chaining
     */
    push(velocityVector){
        //this._logs(" is unsucessfully affected by others");
    }
}

/** ///   DynaAce   ///
 * dynamics for movemnt with one acceleration force, used for nonlinear moving stuff,
 * it's awkward middle child between having no acceleration and having multiple,
 * could be used for dropping items (supply-drop) that are affected only by gravity 
 * 
 */
export class DynaAce extends Dyna{
    constructor( velocityVector, aceleration){
        super(velocityVector);
        //* new properties
        this._aceleration = aceleration;

        this._INIT("DynaAce");
    }

    /** 
     ** all new properties of DynaAce to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        
        if (target._isDeepClone)target._aceleration = {...this._aceleration};
        if (!target._isDeepClone)target._aceleration = this._aceleration;
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();
        this._aceleration = this._aceleration ?? {};
        this._aceleration.x = this._aceleration.x ?? 0;
        this._aceleration.y = this._aceleration.y ?? 0;
        this._aceleration.p = this._aceleration.p ?? true;
        
    }

    _updateAces(){
        return this;
    }

    /** /// update() ///    
     ** updates the velocity based on the current velocity, max velocity and aceleration    
     * @public
     * @return {DynaAces} itself for chaining
     */
    updateVelo(dt){
        this._velocity.x += this._aceleration.x * dt;
        this._velocity.y += this._aceleration.y * dt;

        super.updateVelo(dt);
        // update _aceleration
        if (this._aceleration.p === false){
            this._aceleration.x = 0;
            this._aceleration.y = 0;
        }
            
        return this;
    }

    /// _getters ///
    get wantGoUp()    { return this._aceleration.y < 0; }
    get wantGoDown()  { return this._aceleration.y > 0; }
    get wantGoLeft()  { return this._aceleration.x < 0; }
    get wantGoRight(){ return this._aceleration.x > 0; }
}

/** ///  DynaAces  ///
 * Todo:
 */
export class DynaAces extends DynaAce{
    constructor( velocityVector, acelerationVectors){
        super(velocityVector);

        //* new properties
        this._acelerations = acelerationVectors;
        this._isGrounded = false;

        this._INIT("DynaAces");
    }

    _updateAces(){
        if(!this._acelerations || this._acelerations.length === 0)return this;

        const sumReal = sumOfAces(
            this._acelerations.filter(a => a.i === false)
        );

        this._aceleration = { 
            x: sumReal.x,
            y: sumReal.y,
            i: false 
        };
        return this;
    }

    /** 
     ** all new properties of DynaProjectile to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        if (!target._isDeepClone){
            target._acelerations = this._acelerations;
            return;
        }

        target._acelerations = [];
        for(const ace of this._acelerations){
            target._acelerations.push({x: ace.x, y: ace.y, p : ace.p, i: ace.i});
        }
    }
    
    /**
     ** all operation called in constructor, used for cloning
    * @private
    * @return {void}
    */
    _initializeFunc(){
        super._initializeFunc();

        this._acelerations = this._acelerations ?? [];
        this._aceleration.p = false;
        this._updateAces();
    }

    /** /// push() ///
     ** pushes new {x:,y:} or [{x:,y:}, ..] to the this [{x:,y:}, ..]
     ** riskes memory leak but DynaProjetile should regulary flaten acelerations to aceleration
     * @public 
     * @param {Array<DynaAces> | DynaAces} DynaAces
     * @return {DynaAces} itself for chaining
     */
    push(dynacAces){
        if (dynacAces === undefined){
            this._errs("Trying to push undefined aces, skipping");
            return this;
        }

        const fieldOfAces = fieldingAce(dynacAces);

        for (const ace of fieldOfAces){ 
            if (ace instanceof Array){         //Array
                this.push(ace);
                continue;
            }
            if (ace instanceof DynaAces){    // DynaProjectile
                const validAces = ace._acelerations.filter(isValidAce);
                if (validAces.length !== ace._acelerations.length){
                    this._errs(
                        "DynaProjectile"+ ace._id +" has "+
                        (ace._acelerations.length - validAces.length)+
                        " invalid aceleration, objects skipped "
                    );
                }
                this.push(validAces);
                continue;
            }
            if (ace instanceof DynaAce){       // DynaAce
                if (isValidAce(ace._aceleration)){
                    this._acelerations.push(ace._aceleration);
                } else {                        // something else
                    this._errs("DynaAce has invalid aceleration: " + ace);
                }
                continue;
            }
            if (!isValidAce(ace)){              // something else
                this._errs("invalid aceleration, skipping: " + ace);
                continue;
            }
                                                // {x:,y:}
            this._acelerations.push(ace);
        }
        this._updateAces();
    }

    /** /// update() ///    
     ** updates the velocity based on the current velocity, max velocity and aceleration    
     * @public
     * @return {DynaAces} itself for chaining
     */
    updateVelo(dt){
        if (!dt)this._errs("Dyna update called without dt, velocity will not be updated");
        this._updateAces(true);
        const sumOfInst = sumOfAces(this._acelerations.filter(a => a.i === true));



        this._velocity.x =  Math.max(
            -this._MAX_X_VELOCITY, Math.min((
                this._velocity.x + (this._aceleration.x * dt) + sumOfInst.x), this._MAX_X_VELOCITY
            )
        );
        this._velocity.y =  Math.max(
            -this._MAX_Y_VELOCITY, Math.min((
                this._velocity.y + (this._aceleration.y * dt) + sumOfInst.y), this._MAX_Y_VELOCITY
            )
        );
                
        this._velocity.x = Math.max(-this._MAX_X_VELOCITY, Math.min(this._velocity.x, this._MAX_X_VELOCITY));
        this._velocity.y = Math.max(-this._MAX_Y_VELOCITY, Math.min(this._velocity.y, this._MAX_Y_VELOCITY));

        this._acelerations = this._acelerations.filter(a => a.i === false);
        return this;

    }
}

/** /// DynaBisc ///
 * 
 */
export class DynaBisc extends DynaAces{
    constructor(velocityVector, acelerationVectors){
        super(velocityVector, acelerationVectors);

        // * new properties
        this._wantGoRight = false;
        this._wantGoLeft  = false;
        this._wantGoDown  = false;
        this._wantGoUp    = false;
        this._wantJump    = false;

        this._isGoBothWays = false;
        this._isJumping = false;

        this._isGoRight = false; 
        this._isGoLeft  = false;
        this._isGoDown  = false;
        this._isGoUp    = false;

        this._isPushRight = false;
        this._isPushLeft = false;

        this._wasGrounded = false;
        this._isOnTop = false;


        // * old properties
        this._MAX_X_VELOCITY = 1000;
        this._MAX_Y_VELOCITY = 10000;

        this._RUN_POWER = 300;
        this._JUMP_POWER = 1500;
        this._JUMP_CTRL = 100;

        this._INIT("DynaBisc");
    }

    updateVelo(dt){
        /*----------------------je-nohama-na-zemi--------------------- */
        //if(this._isGrounded && !this._isJumping && !this._wantJump  && !this.isOnTop)this._velocity.x = 0  
        if(this._isGrounded && !this._wantJump )this._isJumping = false;
        /*-----------------------pokud chce doleva-------------------- */
        if (this._wantGoLeft && !  this._wantGoRight){
            if (this._isGrounded){
                this.isGoLeft = true;
                this._velocity.x -= this._RUN_POWER;
                console.log("go left");
                
            }else{
                this._velocity.x += -this._JUMP_CTRL;
            }     
        }
        /*-----------------------pokud chce doprava------------------ */
        if(this._wantGoRight && !this._wantGoLeft){
            if(this._isGrounded){
                this.isGoRight = true;
                this._velocity.x += this._RUN_POWER;
                console.log("go right");
            }else{
                this._velocity.x += this._JUMP_CTRL;
            }
        }
        /*-------------pokud nechci ani doleva ani doprava------------ */
        if( this._wantGoLeft &&  this._wantGoRight && !this._isJumping){
            this.isGoLeft = false;
            this.isGoRight = false;
            this.isGoBothWays = true;
            console.log("go nowhere");
        }
        /*------------------pokud chci doleva a doprava--------------- */
        if(!this._wantGoLeft && !this._wantGoRight && !this._isJumping){
            this.isGoLeft = false;
            this.isGoRight = false;
            this.isGoBothWays = true;
            console.log("go nowhere" + this._isGrounded);
        }
        /*---------------------pokud chce skočit---------------------- */
        if((!this._isJumping && this._isGrounded) && this._wantJump){
            console.log("jumping");
            this._isJumping = true;
            this._velocity.y = -this._JUMP_POWER;
            if (this._isGoLeft && !this._isGoRight) this._velocity.x += -this._RUN_POWER;
            if (!this._isGoLeft && this._isGoRight) this._velocity.x +=  this._RUN_POWER; 
        }
        this._wasGrounded = false;
        if(this._isGrounded)this._wasGrounded = true;
        this._isGrounded = false;
        super.updateVelo(dt);
    }
}







//@---                           ObjectClass                             ---@//

/** /// RectangleDynaPrototype ///
 * - base structure for dynamic rectangles with velocity and material
 */
export class RectangleDynaPrototype extends Rectangle{
    constructor(x, y, width, height){
        super(x, y, width, height);

        //* new properties
        this.Dyna;
        this.Mate;
        this._states = {};

        //* old properties
        this._strike = [10, 5];
        this._color = "black";

        this._INIT("RectDyna");
    }

    /** 
     ** all new properties of RectangleDynaPrototype to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        
        target.Dyna;
        target.Mate;
        if (!target._isClone) return;
        if (target._isDeepClone){
            target.Dyna = this.Dyna.clone(true);
            target.Mate = this.Mate.clone(true);
            target._states = JSON.parse(JSON.stringify(this._states));
            return;
        }else {
            target.Dyna    = this.Dyna;
            target.Mate    = this.Mate;
            target._states = this._states;
        }
    }

    updateVelo(dt){
        this.Dyna._updateAces();
        this.Dyna.updateVelo(dt);

    }

    /** /// updatePos() ///
     * updates the position of the RectangleDynaPrototype based on its Dyna
     * @public
     * @param {number} dt - delta time
     * @return {RectangleDynaPrototype} itself for chaining
     */
    updatePos(dt){
        this.Dyna.updateVelo(dt);
        this.moveBy(
            this.Dyna._velocity.x * dt,
            this.Dyna._velocity.y * dt
        );
        return this;
    };


}

/** ///  RectDyna  ///
 * - base strucutre for dynamic rectangles without aceleration
 */
export class RectDyna extends RectangleDynaPrototype{
    constructor(x, y, width, height){              
        super(x, y, width, height);

        this._INIT("RectDyna");
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        this.Dyna = this.Dyna ?? new Dyna();
    }


    
}

/** /// RectDynaAces  ///
 * - base structure for dynamic rectangles with acelerations
 */
export class RectDynaAces extends RectangleDynaPrototype{
    constructor(x, y, width, height){
        super(x, y, width, height);

        this._INIT("RectDynaAces");
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        if( this._isClone) return;

        this.Dyna = this.Dyna ?? new DynaAces();

    }
}

/** ///  RectMasiv  ///
 * - base structure for dynamic rectangles with acelerations and :
 *      - solid material (so they can collide and affect others)
 *      - immovable properties (affecting only others velocity)
 */
export class RectMasiv extends RectDyna{
    constructor(x, y, width, height){
        super(x, y, width, height, new MasivMate());

        //* old properties
        this._color = "red";
        
        this._INIT("RectMasiv");
    }

    /** 
     ** all new properties of RectMasiv to copy, used for cloning
     * @private 
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._color = this._color;
        target.Mate = this.Mate.clone(target._isDeepClone);
        if (target._isDeepClone)target.Dyna = new Dyna({x:0, y:0});
        
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        this.Mate = this.Mate ??  new MasivMate();
        this.Dyna._MAX_X_VELOCITY = 0;
        this.Dyna._MAX_Y_VELOCITY = 0;
    }

    moveBy(dx, dy){
        // override moveBy to prevent movement
    }
    
}

/** ///  RectSolid  ///
 * - base structure for dynamic rectangles with acelerations and :
 *      - solid material (so they can collide and affect others)
 *      - movable properties (affecting also their own velocity)
 */
export class RectSolid extends RectDynaAces{
    constructor(x, y, width, height){
        super(x, y, width, height, new DeffMate());
        //* new properties
        this._hasOnTop = [];

        //* old properties
        this._color = "red";
        
        this._INIT("RectSolid");
    }

    /** 
     ** all new properties of RectSolid to copy, used for cloning
     * @private 
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);

        target._color = this._color;
        target.Mate = this.Mate.clone(target._isDeepClone);
        if (target._isDeepClone)target.Dyna = new Dyna({x:0, y:0});
        
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();

        this.Mate = this.Mate ??  new MasivMate();
    }

    
}

/**
 * 
 */
export class CharRect extends RectSolid{
    constructor(x, y, width, height){
        super(x, y, width, height);

        this._INIT("CharRect");
    }

}
//@--------------------------Visual-Decorator-For--------------------------@//

export class VisualsFor extends Entity{
    constructor(objectDyna, objectAnim){
        super();
        //* new properties
        this.GraphicPart = objectAnim;
        this.DynamicPart = objectDyna;

        if (!(this._ignoreInitOf["VisualsFor"]))this._initializeFunc();
    }
    /** 
     * ** all new properties of VisualsFor to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        target.Graphic = this.GraphicPart.clone(target._isDeepClone);
        target.Dynamic = this.DynamicPart.clone(target._isDeepClone);
    }

    /**
     ** all operation called in constructor, used for cloning
     * @private
     * @return {void}
     */
    _initializeFunc(){
        super._initializeFunc();
    }

    /** /// _checksForState() ///
     ** checks if the current state of the Dynamic has a corresponding animation in the Graphic
     * @private
     * @param {string} state to check for 
     * @returns {boolean} whether Graphic has the state
     */
    _checksForState(state){
        if(typeof this.DynamicPart._states     !== "object") return false;
        if(typeof this.GraphicPart._animations !== "object") return false;
        if (this.DynamicPart._states[state]){
            if (this.GraphicPart._animNamed(state)) return true;
            else{
                this._warns(
                    "State " + state + " exists in Dynamic but has no corresponding animation in Graphic"
                );
                return false;
            }
        }else this._warns( "Dynamic has no such state: " + state);
        return false;
    }

    /** /// updatePos() ///
     ** updates the position of the Graphic based on the Dynamic, 
     ** also checks for state changes and updates the animation accordingly
     * @public 
     * @returns {VisualsFor} itself for chaining
     */
    updatePos(){
        msgErr = " cannot update position for "
        if (!isDynamic(this.DynamicPart)){
            this._errs(msgErr + "Dynamic is not a valid dynamic object");
            return this;
        }

        this.DynamicPart.updatePos();
        this.GraphicPart.moveTo(this.DynamicPart._x, this.DynamicPart._y);
        return this;
    }

    /** /// render() ///
     ** renders the Graphic on the given context, 
     ** optionally rendering the Physics state
     * @public
     * @param {*} ctx 
     * @param {*} rColBox 
     * @returns 
     */
    render(ctx, rColBox = false){
        this.GraphicPart.render(ctx, rColBox);

        if (!rColBox) return this;
        this.DynamicPart.render(ctx);
    }

    updateImage(){
        const msgErr = " cannot update image for "
        const DynaState = this.DynamicPart._state;
        const AnimState = this.GraphicPart._currentAnimation;

        if(!isGraphic(this.GraphicPart)){
            this._errs(msgErr + "Graphic is not a valid graphic object");
            return;
        }
        if(isObjSpriteGraphic(this.GraphicPart)){
            this._warns("Graphic is a Sprite, it has no animation to update");
            return;
        }
        if (isObjAnimGraphic(this.GraphicPart)){
            this.GraphicPart.updateImg();
            return;
        }
        if(isObjAnimsGraphic(this.GraphicPart) && isObjDynaDynamic(this.DynamicPart)){
            this.GraphicPart.updateImg();
            return;
        }
        if(isObjAnimsGraphic(this.GraphicPart) && isObjDynasDynamic(this.DynamicPart)){
            if(this._checksForState(DynaState) && AnimState !== DynaState){
                AnimState = DynaState;
            }else{
                AnimState = this.GraphicPart._defaultAnimName;
                this.GraphicPart.updateImg();
            }
        }
        this._errs(msgErr +"Unhandled Graphic object type or Graphic-Dynamic combination");

    }

}

//@---                           helpFunc                                ---@//

export function isGraphic(obj){
    return(
        isObjSpriteGraphic(obj)||
        isObjAnimsGraphic(obj) ||
        isObjAnimGraphic(obj) 
    );
}
export function isDynamic(obj){
    return(
        isObjDynasDynamic(obj) ||
        isObjDynaDynamic(obj)
    )
}
export function isObjSpriteGraphic(obj){
    if ( isObjAnimGraphic(obj)) return false;
    if (isObjAnimsGraphic(obj)) return false;
    return ( obj instanceof Sprite);
}
export function isObjAnimGraphic(obj){
    return ( obj.Anim instanceof Anim);
}
export function isObjAnimsGraphic(obj){
    return ( obj.Anim instanceof Anims);
}
export function isObjDynaDynamic(obj){
    return ( obj.Dyna instanceof Dyna);
}
export function isObjDynasDynamic(obj){
    return ( obj.Dyna instanceof DynaAces);
}