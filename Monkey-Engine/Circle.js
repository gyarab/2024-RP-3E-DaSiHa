//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { Point } from "./Point.js";
import { _defaultValues } from "./_defaultValues.js";

//@-------------------------------Circle-----------------------------------@//
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
        renderCircle(
            this._x, this._y, this._radius, this._color, ctx,fill , this._strokeWidth
        );
        return this;
    }

    //*------------------Setters--------------------*//
    set radius(newRadius){ this._radius = newRadius; }
}
//@-------------------------------Iris-------------------------------------@//

export class Iris extends Circle{
    constructor(x, y, radius){
        super(x, y, radius);
        this._color = _defaultValues.i_color;
        // dangerous to change so treat accordingly !!!
        this._MAX_RADIUS = Math.hypot(1920, 1080);
        this._MIN_RADIUS = 0;
        // zoomDir = -1 for zooming out
        //   -//-  =  1 for zooming in
        this._zoomDir = 0;
        this._isZoomin = false
        this._zoomSpeed = _defaultValues.i_zoomSpeed;
        //iris can be locked on the obj for auto position update
        this._lockedOn = null
    }

    /** /// render() ///
     ** renders the iris effect on the given context ,
     ** !! should be called first in the render loop !!
     * @param {CanvasRenderingContext2D} ctx - the context
     * @returns {Iris} itself for chaining
     */
    render(ctx){
        ctx.fillStyle = this._color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
        ctx.clip();

        return this;
    }

    /** /// updatePos() ///
     * updates the position and focus of iris based on flags and speeds
     * @returns {Iris} itself for chaining
     */
    updatePos(){
        this._lockedOn && this.moveTo(this._lockedOn._x, this._lockedOn._y);        
        if (this._isZoomin && this._zoomDir ===  1 && this._radius < this._MAX_RADIUS){
            this._radius += this._zoomSpeed;
        }
        if(!this._isZoomin && this._zoomDir === -1 && this._radius > this._MIN_RADIUS){
            this._radius -= this._zoomSpeed;
        }
        return this;
    }

    //*------------------Setters--------------------*//
    set isZoomin (value){
        this._isZoomin = value;
    }
     set zoomDir (value){
        this._zoomDir = value;
        if (     value ===  0){ this._isZoomin = false; this._zoomDir = 0;}
        else if (value ===  1){ this._isZoomin =  true; this._zoomDir = 1;}
        else if (value === -1){ this._isZoomin =  true; this._zoomDir =-1;}
    }
    set zoomSpeed (value){
        this._zoomSpeed = value;
    }
    set lockedOn (value){
        this._lockedOn = value;
    }
}
//@------------------------------helpFunc----------------------------------@//

/** /// renderCircle() ///
 ** renders an imaginary circle on the given context
 * @private
 * @param {number} x - x coordinate of center
 * @param {number} y - y coordinate of center
 * @param {number} radius - radius
 * @param {string} color - color of line/fill
 * @param {CanvasRenderingContext2D} ctx - context
 * @param {boolean} fill - whether to fill in the circle
 * @param {number} strokeWidth - stroke width (only for non-filled)
 * @returns {void}
 */
function renderCircle(
    x, y, radius, color, ctx, fill = false, 
    strokeWidth = _defaultValues.bS_strokeWidth
){
    ctx.lineWidth = strokeWidth;
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
//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------
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
