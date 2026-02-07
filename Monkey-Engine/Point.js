// @Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from "./_defaultValues.js";

//@--------------------------------Point------------------------------------@//
export class Point{
    static IdCounter = 0;
    constructor(x, y, color = _defaultValues.bS_color){
        this._strokeWidth = _defaultValues.bS_strokeWidth;
        this._x = x; this._y = y;
        this._color = color;

        this._id =  Point.IdCounter.toString().padStart(4, '0');
        Point.IdCounter++;
    }

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
     * @param {number} x 
     * @param {number} y 
     * @returns {Point} itself for chaining
     */
    moveTo(x, y){
        this.x = x;
        this.y = y;
        return this;
    }
    //*------------------Setters--------------------*//
    set x( newX ){ this._x = newX; }
    set y( newY ){ this._y = newY; }
    set id(newId){ this._id= newId;} 
    set color(newColor){ this._color = newColor; }
}

//@------------------------------helpFunc-----------------------------------@//
/** /// renderPoint() ///
 ** renders an imaginary point as a cross on the given context
 * @public
 *
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

/**
 * 
 */
export function xyToPolar(x, y) {
    const radius = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    return { radius, theta };
}
export function xFromPolar(r, theta) {
    return r * Math.cos(theta);
}
export function yFromPolar(r, theta) {
    return r * Math.sin(theta);
}

