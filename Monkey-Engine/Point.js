// @Autor: Bendl Šimon
import { _defaultValues } from "./_defaultValues.js";

export class Point{
    static IdCounter = 0;
    constructor(x, y, color = _defaultValues.bS_color){
        this._strokeWidth = _defaultValues.bS_strokeWidth;
        this.x = x; this.y = y;
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
        renderPoint(this, ctx);
        return this;
    }
}   

/** /// renderPoint() ///
 ** renders a point as a cross on the given context
 *
 ** rendering existing Point object
 * @param {Point} arg1 - Point object
 * @param {CanvasRenderingContext2D} arg2 - context
 * 
 ** rendering imaginary Point
 * @param {number} arg1 - x coordinate
 * @param {number} arg2 - y coordinate
 * @param {number} arg3 - color for the point
 * @param {CanvasRenderingContext2D} arg4 - context
 */
export function renderPoint(arg1, arg2, arg3, arg4) {
    let x, y, color, ctx, d;
    const defWidth = _defaultValues.bS_strokeWidth;
    const diagonal = _defaultValues.p_diagonalLength;

    if (typeof arg1 === 'object') {
        x = arg1._x;        
        y = arg1._y;
        color = arg1._color;
        ctx = arg2;

        d = arg1._strokeWidth * diagonal;
        ctx.lineWidth = arg1._strokeWidth;
    } else {
        x     = arg1;   
        y     = arg2;
        color = arg3  ?? _defaultValues.bS_color;
        ctx   = arg4;

        d = diagonal * defWidth;
        ctx.lineWidth = defWidth;
    }
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