// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from "./_defaultValues.js";

//@--------------------------------Point------------------------------------@//
//: not point as in simple coordinate it is more of a base class
//: for renderable entities with position, color and id 

//TODO: doesColideWith()
export class Point{
    static IdCounter = 0;
    constructor(x, y, color = _defaultValues.bS_color){
        //* new properties
        this._x = x; this._color = color;
        this._y = y; this._id = undefined;
        this._strokeWidth = _defaultValues.bS_strokeWidth;

        /**
         ** switches to prevent:
         *  - using outdated functions,
         *  - spam in console
         *  - calling the initializeFunc more than once
         */
        this._ignoreInitOf = {};
        this._ignoreLogsOf = {};
        this._ignoreWarnOf = {};
        this._ignoreErrOf = {};


        let proto = this;
        while (proto) {
            const name = proto.constructor.name;
            if (!(name in this._ignoreInitOf)) {
                this._ignoreLogsOf[name] = false;
                this._ignoreWarnOf[name] = false;
                this._ignoreErrOf[name]  = false;
                this._ignoreInitOf[name] = true;
            }
           proto = Object.getPrototypeOf(proto);
        }
        this._ignoreInitOf[this.constructor.name] = false;
        if (!this._ignoreInitOf[this.constructor.name]) this._initializeFunc();

    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of Point to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @returns {void} 
     */
    _copyPropsTo(target){
        target._x = this._x; target._color = this._color;
        target._y = this._y; target._id = "TEMP_UNINITIALIZED_CLONE_OF_" + this._id;
        target._strokeWidth = this._strokeWidth;
    }

    /** /// _initializeFunc() ///
     ** all operation called in constructor, used for cloning 
     * @private
     * @return {void}
     */
    _initializeFunc(){
        if (this._id === undefined || this._id?.startsWith("TEMP")) {
            this._id =  Point.IdCounter.toString().padStart(4, '0');
            Point.IdCounter++;
        }
    }

    _logOf(message){
        if (!this._ignoreLogsOf[this.constructor.name]){
            console.log(this.constructor.name + "(" + this._id + "): " + message);
            console.log("crrrrrrrr")
        }
    }
    _warnOf(message){
        if (!this._ignoreWarnOf[this.constructor.name]){
            console.warn(this.constructor.name + "(" + this._id + "): " + message);
        }
    }
    _errOf(message){
        if (!this._ignoreErrOf[this.constructor.name]){
            console.error(this.constructor.name + "(" + this._id + "): " + message);
        }
    }

    //@---publicFunctions---@//
    /** /// render() ///
     ** renders the Point on the given context
     * @param {CanvasRenderingContext2D} ctx 
     * @returns {Point} itself for chaining
     */
    render(ctx){
        renderPoint(this._x, this._y, ctx, this._color, this._strokeWidth);
        return this;
    }

    /** /// moveTo() ///
     ** moves the Point to the new position
     * @param {number} newX
     * @param {number} newY 
     * @returns {Point} itself for chaining
     */
    moveTo(newX = this._x, newY = this._y){
        this.x = newX;
        this.y = newY;
        return this;
    }

    /** /// moveBy() ///
     ** moves the Point by 
     @param {number} byX
     @param {number} byY
     @returns {Point} itself for chaining 
     */
    moveBy(byX = 0, byY = 0){
        this.x += byX;
        this.y += byY;
        return this;
    }

    /** /// rotateAround() ///
     ** rotates the Point by the given angle in radians
     * @param {number} pivotX - x coordinate of the pivot point
     * @param {number} pivotY - y coordinate of the pivot point
     * @param {number} angleInRadians - angle in radians
     * @returns {Point} itself for chaining 
     */
    rotateAround(pivotX, pivotY, angleInRadians){
        const p = rotatePointAround(
            {x: this._x, y: this._y},
            {x: pivotX , y: pivotY },
            angleInRadians
        )
        this.moveTo(p.x, p.y)
        return this;
    }

    /** /// clone() ///
     ** creates a clone of this without using constructor so _copyParamsTo() needed
     * @final
     * @param {boolean} deep - shared media
     * @returns {ThisParameterType} cloned entity
     */
    clone(deep = false){
        const clone = Object.create(this.constructor.prototype);
        clone._isDeepClone = deep;
        clone._progenitor = true; // to prevent infinite loop in _copyPropsTo when cloning circular references

        this._copyPropsTo(clone);
        clone._initializeFunc();

        clone.constructor = this.constructor; // is this needed
        return clone;
    }

    cloneDeep(){
        return this.clone(true);
    }

    /** /// doesColideWith() ///
     * 
    */
    //TODO: doesColideWith(){}


    //@---setters---@//
    set x (value){ this._x = value; }
    set y (value){ this._y = value; }
    set id(value){ this._id= value; } 
    set color(value){ this._color = value; }
    set strokeWidth(value){ this._strokeWidth = value; }
}

//@------------------------------helpFunc-----------------------------------@//
/** /// renderPoint() ///
 ** renders an imaginary point as a cross on the given context
 * @public
 * @param {number} arg1 - x coordinate
 * @param {number} arg2 - y coordinate
 * @param {number} arg3 - color for the point
 * @param {CanvasRenderingContext2D} arg4 - context
 */
export function renderPoint(
    x, y, ctx,
    color       = _defaultValues.bS_color,
    strokeWidth = _defaultValues.bS_strokeWidth,
    diagonal    = _defaultValues.p_diagonalLength
){
    const d = diagonal * strokeWidth;
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x - d, y - d);
    ctx.lineTo(x + d, y + d);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - d, y + d);
    ctx.lineTo(x + d, y - d);
    ctx.stroke();
}

/** /// rotatePointAround() ///
 ** rotates a point around a pivot by the given angle in radians
 * @public
 * @param  {{x: number, y: number}} point
 * @param  {{x: number, y: number}} pivot
 * @param  {number} angleInRadians 
 * @returns {{x: number, y: number}} rotated point
 */
export function rotatePointAround(point, pivot, angleInRadians){
    const polar = xyToPolar(point.x - pivot.x, point.y - pivot.y);
    const newAngle = polar.theta + angleInRadians;
    return {
        x: pivot.x + xFromPolar(polar.radius, newAngle),
        y: pivot.y + yFromPolar(polar.radius, newAngle)
    };
}

/** /// isPointInPolygon() ///
 ** calculates if a point is part of a polygon
 * @public
 * @param  {{x: number, y: number}} point
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @returns {boolean} true if the point is part of the polygon, false otherwise
 */
export function isPointInPolygon(point, ptsOfPoly) {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = ptsOfPoly.length - 1; i < ptsOfPoly.length; j = i++) {
        let xi = ptsOfPoly[i].x, yi = ptsOfPoly[i].y;
        let xj = ptsOfPoly[j].x, yj = ptsOfPoly[j].y;
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

//* converts cartesian coordinates to polar coordinates
export function xyToPolar(x, y) {
    const radius = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    return { radius, theta };
}

//* finds x coordinate from polar coordinates
export function xFromPolar(r, theta) {
    return r * Math.cos(theta);
}

//* finds y coordinate from polar coordinates
export function yFromPolar(r, theta) {
    return r * Math.sin(theta);
}

//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const p = new Point(100, 100);
p.strokeWidth = 40;
p.render(ctx);
p.moveBy(800, 100).render(ctx);
p.moveTo(500, 100).render(ctx);
p.rotateAround(150, 150, Math.PI / 4).render(ctx);

const p2 = new Point(200, 200, "red").render(ctx);
const p3 = new Point(300, 200, "blue").render(ctx);
const p4 = p2.clone().moveBy(100, 0).render(ctx);

console.log(p.constructor.name, p._id);
console.log(p2._id);
console.log(p3._id);
console.log(p4._id);
/** */