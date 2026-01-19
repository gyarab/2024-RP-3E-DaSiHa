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
     * renders the iris effect on the given context
     * ! should be called first in the render loop !
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
     */
    updatePos(){
        this._lockedOn && this.moveTo(this._lockedOn._x, this._lockedOn._y);        
        if (this._isZoomin && this._zoomDir ===  1 && this._radius < this._MAX_RADIUS){
            this._radius += this._zoomSpeed;
        }
        if(!this._isZoomin && this._zoomDir === -1 && this._radius > this._MIN_RADIUS){
            this._radius -= this._zoomSpeed;
        }
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
*****/
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
