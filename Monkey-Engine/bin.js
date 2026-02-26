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
function oldColl(){
    if (!(obj1 instanceof Tetragon) || !(obj2 instanceof Tetragon)) {
            obj1._errs("Trying to updateColl with non-Tetragos (" + obj2 + ", " + obj1 + ")");
            return;
        }

        const v1 = obj1.Dyna._velocity;
        const v2 = obj2.Dyna._velocity;
        const p1 = obj1._points;
        const p2 = obj2._points;

        const coll = stepingOfCollison(p1, v1, p2, v2, dt);
        if (!coll) return;

        // Move to collision point
        obj1.moveBy(v1.x * dt * coll.timeOfCollision, v1.y * dt * coll.timeOfCollision);
        obj2.moveBy(v2.x * dt * coll.timeOfCollision, v2.y * dt * coll.timeOfCollision);

        // Get colliding points
        const colPoints = colidingPointsOfTetragons(obj1._points, obj2._points);
        if (!colPoints.length) return;

        // Compute overlap relative to centroids
        const centroid1 = centroidOfPolygon(obj1._points);
        const centroid2 = centroidOfPolygon(obj2._points);

        let overlapX = 0, overlapY = 0;
        colPoints.forEach(pt => {
            const dx = (centroid1.x - pt.x) + (centroid2.x - pt.x);
            const dy = (centroid1.y - pt.y) + (centroid2.y - pt.y);
            overlapX += Math.abs(dx);
            overlapY += Math.abs(dy);
        });

        // Determine collision axis and normal
        const vertical = overlapY < overlapX;
        const nx = Math.sign(centroid1.x - centroid2.x);
        const ny = Math.sign(centroid1.y - centroid2.y);

        let dv1 = { x: 0, y: 0 };
        let dv2 = { x: 0, y: 0 };

        if (vertical) {
            // Floor / ceiling collision: cancel only penetrating Y
            if (v1.y * ny < 0) dv1.y = -v1.y;
            if (v2.y * -ny < 0) dv2.y = -v2.y;
        } else {
            // Wall collision: cancel only penetrating X
            if (v1.x * nx < 0) dv1.x = -v1.x;
            if (v2.x * -nx < 0) dv2.x = -v2.x;
        }

        // Apply minimal impulse
        obj1.Dyna.push([{ x: dv1.x, y: dv1.y, i: true }]);
        obj2.Dyna.push([{ x: dv2.x, y: dv2.y, i: true }]);


        if (vertical) {
            // Only cancel penetrating Y
            if (v1.y * ny < 0 || v2.y * -ny < 0) {
                // Use transfearVelo on the Y component
                const [v1yOut, v2yOut] = transfearVelo(v1.y, obj1.Mate, v2.y, obj2.Mate);
                if (v1.y * ny < 0) dv1.y = v1yOut - v1.y;
                if (v2.y * -ny < 0) dv2.y = v2yOut - v2.y;
            }
        } else {
            // Only cancel penetrating X
            if (v1.x * nx < 0 || v2.x * -nx < 0) {
                const [v1xOut, v2xOut] = transfearVelo(v1.x, obj1.Mate, v2.x, obj2.Mate);
                if (v1.x * nx < 0) dv1.x = v1xOut - v1.x;
                if (v2.x * -nx < 0) dv2.x = v2xOut - v2.x;
            }
        }

        // Apply impulses
        obj1.Dyna.push([{ x: dv1.x, y: dv1.y, i: true }]);
        obj2.Dyna.push([{ x: dv2.x, y: dv2.y, i: true }]);
}  
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
function CollisionResponse(obj1, obj2, dt){
        if (!(obj1 instanceof Tetragon) || !(obj2 instanceof Tetragon)) {
        obj1._errs("Trying to updateColl with non-Tetragos (" + obj2 + ", " + obj1 + ")");
    return; }
    const v1 = obj1.Dyna._velocity;
    const v2 = obj2.Dyna._velocity;
    const p1 = obj1._points;
    const p2 = obj2._points;
    const coll = stepingOfCollison(p1, v1, p2, v2, dt);
    if (!coll) return;
    //baby steps => colision point
    obj1.moveBy( v1.x * dt * coll.timeOfCollision, v1.y * dt * coll.timeOfCollision );
    obj2.moveBy( v2.x * dt * coll.timeOfCollision, v2.y * dt * coll.timeOfCollision, );
    //colliding points 
    const colPoints = colidingPointsOfTetragons(obj1._points, obj2._points); 
    if (!colPoints.length) return; 
    //todo: roations 
    //rest of force = avrage length of the vectors from the centroids to the colliding points 
    const centroid1 = centroidOfPolygon(obj1._points); 
    const centroid2 = centroidOfPolygon(obj2._points);
    let overlapX = 0, overlapY = 0;
    colPoints.forEach(pt => {
        const dx = (centroid1.x - pt.x) + (centroid2.x - pt.x);
        const dy = (centroid1.y - pt.y) + (centroid2.y - pt.y);
        overlapX += Math.abs(dx); 
        overlapY += Math.abs(dy);
    });
    // average overlap 
    overlapX /= colPoints.length; 
    // determine collision axis and normal
    const vertical = overlapY < overlapX;
    const nx = Math.sign(centroid1.x - centroid2.x);
    const ny = Math.sign(centroid1.y - centroid2.y); 
    // minimal contra impulse frce
    let minimalV1 = { x: 0, y: 0 };
    let minimalV2 = { x: 0, y: 0 };
    if (overlapY < overlapX) { 
        if (v1.y * ny < 0) minimalV1.y = -v1.y;
        if (v2.y * -ny < 0) minimalV2.y = -v2.y;
    } if(overlapY > overlapX){
        if (v1.x * nx < 0) minimalV1.x = -v1.x;
        if (v2.x * -nx < 0) minimalV2.x = -v2.x; 
    } 
    // minimal contra impulse frce 
    obj1.Dyna.push([{ x: minimalV1.x, y: minimalV1.y, i: true }]);
    obj2.Dyna.push([{ x: minimalV2.x, y: minimalV2.y, i: true }]); 


let optionlV1 = { x: v1.x + minimalV1.x, y: v1.y + minimalV1.y };
let optionlV2 = { x: v2.x + minimalV2.x, y: v2.y + minimalV2.y };
let optV1X = optionlV1.x;
let optV2X = optionlV2.x; 
// If moving left, reverse so the bounce distributes like moving right 
if (optV1X < 0 || optV2X < 0) { optV1X = -optV1X; optV2X = -optV2X; }
const bX = transfearVelo(optV1X, obj1.Mate, optV2X, obj2.Mate); 
const bY = transfearVelo(optionlV1.y, obj1.Mate, optionlV2.y, obj2.Mate); 
// Apply correctly 
obj1.Dyna.push([{ x: bX[0], y: bY[0], i: true }]);
obj2.Dyna.push([{ x: bX[1], y: bY[1], i: true }]); 
}
// --- X-axis resolution ---
if (penetrationX > 0) {
    const moveX = penetrationX * CORRECTION_FACTOR;
    if (!imm1 && !imm2) {
        obj1.moveBy( dirX * moveX /2, 0); obj1.Dyna._velocity.x = 0;
        obj2.moveBy( dirX * moveX /2, 0); obj2.Dyna._velocity.x = 0;
    } else if (!imm1 && imm2) {
        obj1.moveBy( dirX * moveX, 0); obj1.Dyna._velocity.x = 0;
    } else if (imm1 && !imm2) {
        obj2.moveBy( dirX * moveX, 0); obj2.Dyna._velocity.x = 0;
    }
}

// --- Y-axis resolution ---
if (penetrationY > 0) {
    const moveY = penetrationY * CORRECTION_FACTOR;
    if (!imm1 && !imm2) {
        obj1.moveBy(0, moveY * dirY/2); obj1.Dyna._velocity.y = 0;
        obj2.moveBy(0, moveY * dirY/2); obj2.Dyna._velocity.y = 0;
    } else if (!imm1 && imm2) {
        obj1.moveBy(0, moveY * dirY); obj1.Dyna._velocity.y = 0;
    } else if (imm1 && !imm2) {
        obj2.moveBy(0, moveY * dirY); obj2.Dyna._velocity.y = 0;
    }
}
/* --- tiny nudge along direction to prevent sticking ---
const dx = (b.minX + b.maxX) * 0.5 - (a.minX + a.maxX) * 0.5;
const dy = (b.minY + b.maxY) * 0.5 - (a.minY + a.maxY) * 0.5;
const len = Math.hypot(dx, dy);

if (len > 0) {
    const nx = dx / len;
    const ny = dy / len;

    if (!imm1 && !imm2) {
        obj1.moveBy(-nx * EPSILON * 0.5, -ny * EPSILON * 0.5);
        obj2.moveBy(nx * EPSILON * 0.5, ny * EPSILON * 0.5);
    } else if (!imm1 && imm2) {
        obj1.moveBy(-nx * EPSILON, -ny * EPSILON);
    } else if (imm1 && !imm2) {
        obj2.moveBy(nx * EPSILON, ny * EPSILON);
    }
}
// Threshold for small velocities to prevent shaking
const VELOCITY_THRESHOLD = 100000; // tweak as needed
if (Math.abs(vn1_new) < VELOCITY_THRESHOLD) vn1_new = 0;
if (Math.abs(vn2_new) < VELOCITY_THRESHOLD) vn2_new = 0;

if (normal.x !== 0) {
    obj1.Dyna._velocity.x = 0;
    obj2.Dyna._velocity.x = 0;
}
if (normal.y !== 0) {
    obj1.Dyna._velocity.y = 0;
    obj2.Dyna._velocity.y = 0;
}

v1.x += (vn1_new - vn1) * normal.x;
v1.y += (vn1_new - vn1) * normal.y;
v2.x += (vn2_new - vn2) * normal.x;
v2.y += (vn2_new - vn2) * normal.y;
