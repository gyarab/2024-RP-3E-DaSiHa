// @Autor: Bendl Šimon
import { _defaultValues } from './_defaultValues.js';
import {Tetragon} from './Tetragon.js';

export class Rectangle extends Tetragon{
    constructor(x, y, width, height,color = _defaultValues.bS_color){
        super(
            {x: x , y: y},              //p1
            {x: x + width, y: y},          //p2
            {x: x + width, y: y + height},    //p3
            {x: x, y: y + height},               //p4 
            color  //color for fill or stroke style
        );
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    /** /// render() ///
     * renders the Rectangle on the given context
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} fill - whether to fill the Rectangle
     * @returns {Rectangle} itself for chaining
     */
    render(ctx, fill){
        if (fill){
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }else{
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._lineWidth;
            const offset = ctx.lineWidth / 2;
            ctx.strokeRect(this._x + offset, this._y + offset, this._width - ctx.lineWidth, this._height - ctx.lineWidth);
        }
        return this;
    } 
    
    /** /// moveTo() ///
     ** moves the Rectangle to the new position
     * @param {number} x 
     * @param {number} y 
     * @returns {Rectangle} itself for chaining
     */
    moveTo(x, y){   
        this.x = x;
        this.y = y;
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
    
    //*------------------Setters--------------------*//
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
}


/*-------------------------Rectangle-EXAMPLE------------------------ 
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