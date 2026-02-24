/** ////  RectDyna  ////
 * @final
 * base dynamic object with simgle vector movement does not handle collisions,
 * used for pass-through objects like projectiles, or if an animated element
 * needs delta time for background or other non-colliding visuals
 */

/** ////  RectSolid  ////
 * basic solid rectangle with collision handling, every wall, floor, and others
 * immovable "dynamic" obj. like your lovely mom's fat ASSssss. Does use func():
 * updateColl() - stoping other objs. and updatePos() - moving (Woopsie °o°)
 */


/** /// _initializeFunc() ///
 ** initializes default-values/ fallbacks
 ** calls important setup operations
 * @private
 * @return {void}
*/

    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */

/** /// update() ///
 ** updates the current frame of the animation
    * @public
    * @returns {Anim} itself for chaining
    */

    /** /// update() ///
     * turns the current frame of {@link Anim} based on the mode and weights
     * @public
     * @returns {Anim} itself for chaining
     */


/**  /// SpriteAnim ///
 * takes both {@link Anim} and {@link AnimMix} as a component and gives them form
 * ToDo List
 *  : MixAnim reseting (not sure)
 *  : check updateImage + getters/setters
 * if its given
 */

export class SpriteAnim extends Rectangle{
    constructor(x, y, width, height, Anim){
        super  (x, y, width, height);

        //* new properties
        this.Anim = Anim;

        this._INIT("SpriteAnim");    
    }
 
    /**  /// _copyPropsTo() ///
     * copies all of this {@link Entity}s properties
     * @private
     * @param {Object} target -ed object to copy into
     * @return {void}   
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        target.Anim = this.Anim.clone(target._isDeepClone);
    }

    /** /// _initializeFunc() ///
     * initializes default-values/ fallbacks
     * calls important setup operations
     * @private
     * @return {void}
     */
    _initializeFunc(){
        this.Anim = this.Anim ?? new Anim();

    }
    /**
     ** renders the SpriteAnim on the given context
     * @public
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rColBox - whether to render the collision box
     * @returns {SpriteAnim} itself for chaining
     */
    render(ctx, rColBox = false){
        ctx.save();
        if (this.Anim._frames.length === 0){
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

    /** //proxiTo Anim load() ///
     ** loads the frames from the given paths
     * @public
     * @param {string[]} framePaths
     * @return {SpriteAnim} itself for chaining
     */
    loadImg(spritePaths = []){
        this.Anim.load(spritePaths);
        return this;
    }

    /** //proxiTo Anim update()///
     ** updates the current frame of the animation
     * @public
     * @returns {SpriteAnim} itself for chaining
     */
    updateImage(){
        this.Anim.update();
        return this;
    }

    /// _getters ///
    get _currentFrame(){
        return this.Anim._currentFrame;
    }
    get _mode(){
        if (!(this.Anim instanceof MixAnim)){this._errs(
                "Trying to get mode of a non-MixAnim Animator"
            ); return undefined;
        }
        return this.Anim._mode;
    }

    /// _setters ///
    set _currentFrame(value){
        this.Anim._currentFrame = value;
    }
    set _mode(value){
        if (this.Anim instanceof MixAnim)this.Anim._mode = value;
        else this._errs("Trying to set mode of a non-MixAnim Animator");
    }
}
