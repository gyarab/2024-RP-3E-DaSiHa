//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import {Tetragon} from './Tetragon.js';
//@------------------------------Rectangle----------------------------------@//
export class Rectangle extends Tetragon{
    constructor(x, y, width, height, color = _defaultValues.bS_color){
        super(
            {x: x        , y: y         }, //p1
            {x: x + width, y: y         }, //p2
            {x: x + width, y: y + height}, //p3
            {x: x        , y: y + height}, //p4 
            color  //color for fill or stroke style
        );
        this._width = width;
        this._height = height;
    }

    //@---getters---@//
    /** /// _rotation() ///
     ** calculates the rotation angle of the Rectangle in radians based on its points 
     * @private
     * @returns {number}angle in radians
     */
    _rotation(){
        const p0 = this._points[0];
        const p1 = this._points[1];

        return Math.atan2(
            p1.y - p0.y,
            p1.x - p0.x
        );
    }

    /** /// _isRotated() ///
     ** checks if the axis are aligned
     * @private
     * @return {boolean}
     */
    _isRotated(){
        return Math.abs(this._rotation()) > 0.00001;
    }

    //@---functions---@//
    //: kinda useless @override 
    /** /// render() ///
     ** renders the Rectangle on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} fill - whether to fill the Rectangle
     * @returns {Rectangle} itself for chaining
     */
    render(ctx, fill){
        super.render(ctx, fill);
        return this;
    } 
    
    /** /// moveTo() ///
     ** moves the Rectangle to the new position
     * @param {number} x 
     * @param {number} y 
     * @returns {Rectangle} itself for chaining
     */
    moveTo(x = this._x, y = this._y){
        super.moveTo(x, y); 
        this._x = x;
        this._y = y;
        return this;
    }

    /** /// moveBy() ///
     ** moves the Rectangle by the given offsets
     * @param {number} byX - offset in x direction
     * @param {number} byY - offset in y direction 
     * @returns {Rectangle} itself for chaining
     */
    moveBy(byX = 0, byY = 0){
        super.moveBy(byX, byY);
        this._x += byX;
        this._y += byY;
        return this;
    }

    /** /// rotateAround() ///
     ** rotates the Rectangle around the given pivot point by the given angle in radians
      * @param {number} pivotX - x coordinate of the pivot point
      * @param {number} pivotY - y coordinate of the pivot point
      * @param {number} angleInRadians - angle to rotate in radians
      * @returns {Rectangle} itself for chaining 
     */
    rotateAround(pivotX, pivotY, angleInRadians) {
        super.rotateAround(pivotX, pivotY, angleInRadians);
        this._x = this._points[0].x;
        this._y = this._points[0].y;
        return this;
    }

    /** /// rotateBy() ///
     ** rotates the Rectangle by the given angle in radians around its center
      * @param {number} angleInRadians - angle to rotate in radians
      * @returns {Rectangle} itself for chaining 
     */
    rotateBy(angleInRadians) {
        super.rotateBy(angleInRadians);
        this._x = this._points[0].x;
        this._y = this._points[0].y;
        return this;
    }

    /** /// clone() ///
     ** creates a clone of the Rectangle 
     *? color might not be cloned properly ?
     * @returns {Rectangle} cloned Rectangle
     */
    clone(){
        const clone = new Rectangle(this._x, this._y, this._width, this._height, this._color);
        clone._strokeWidth = this._strokeWidth;
        return clone;
    }

    //@---setters---@//
    set x(newX){
        this._x = newX,
        this._points[0].x = newX
        this._points[1].x = newX + this._width
        this._points[2].x = newX + this._width
        this._points[3].x = newX 
    }
    set y(newY){
        this._y = newY 
        this._points[0].y = newY
        this._points[1].y = newY
        this._points[2].y = newY + this._height
        this._points[3].y = newY + this._height
    }
    set width(newWidth){
        this._width = newWidth
        this._points[1].x = this._x + newWidth  
        this._points[2].x = this._x + newWidth
    }
    set height(newHeight){
        this._height = newHeight
        this._points[2].y = this._y + newHeight
        this._points[3].y = this._y + newHeight
    }
    set points(newPoints){
        console.error(
            "Cannot set points of Rectangle directly,"+
            "risk of breaking the shape."+ "\n" +
            "Use setters for x, y, width and height instead."
        );
    }

}

//@------------------------------examples----------------------------------@// 
/*---------------------------------------------------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const r1 = new Rectangle(40, 25, 100, 100);
const r2 = new Rectangle(50, 20, 60, 50);
r1.render(ctx);
r2.render(ctx);

if(r1.colides(r2)){
    r2.render(ctx, true);
}
/**/