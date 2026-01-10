// @Autor: Bendl Šimon
import { Point } from "./Point.js";
import { _defaultValues } from "./_defaultValues.js";

export class Circle extends Point {
    constructor(x, y, radius, color= _defaultValues.bS_color){
        super(x, y, color);
        this._radius = radius;
    }

    /** /// render() ///
     ** renders the Circle on the given context
     * @param {CanvasRenderingContext2D} ctx - context
     * @param {boolean} fill - whether to fill in the circle
     * @returns {Circle} itself for chaining
     */
    render(ctx, fill = false){
        renderCircle(this, ctx, fill);
        return this;
    }

    //*------------------Setters--------------------*//
    set radius(newRadius){ this._radius = newRadius; }
}
///                 renderCircle                 ///
/**
 ** renders a circle on the given context
 *
 ** rendering existing Circle object    
    * @param {Circle} arg1 - Circle object
    * @param {CanvasRenderingContext2D} arg2 - context
    * @param {boolean} arg3 - whether to fill in the circle
 ****  
 ** rendering imaginary Circle
    * @param {number} arg1 - x coordinate of center
    * @param {number} arg2 - y coordinate of center
    * @param {number} arg3 - radius
    * @param {string} arg4 - color of line/fill
    * @param {CanvasRenderingContext2D} arg5 - context
    * @param {boolean} arg6 - whether to fill in the circle
    */
export function renderCircle(arg1, arg2, arg3, arg4, arg5, arg6){
    let x, y, radius, color, ctx, fill;
    const defWidth = _defaultValues.bS_strokeWidth;

    //? perhapstypeOf Point instead of object ?//
    if(typeof arg1 === 'object'){
        x      = arg1._x;        
        y      = arg1._y;
        radius = arg1._radius;
        color  = arg1._color;
        ctx    = arg2;
        fill   = arg3;
        ctx.lineWidth = arg1._strokeWidth;
    } else {
        x      = arg1;   
        y      = arg2;
        radius = arg3;
        color  = arg4;
        ctx    = arg5;
        fill   = arg6;
        ctx.lineWidth = defWidth;
    }
    const adjustedRadius = fill ? radius : radius - ctx.lineWidth / 2;

    ctx.beginPath();
    ctx.arc(x, y, adjustedRadius, 0, 2 * Math.PI);

    if(fill){
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        ctx.stroke();
    }   
}

/*-----------------Circle-EXAMPLE-------------------
import { Rectangle } from "./Rectangle.js";
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const rectangle = new Rectangle(50, 50, 100, 100, 'green');
rectangle.render(ctx, true);
const circle1 = new Circle(100, 100, 50, 'red');
circle1.render(ctx, false);

const circle2 = new Circle(300, 100, 75, 'blue');
circle2.render(ctx, false);


/*---*/
