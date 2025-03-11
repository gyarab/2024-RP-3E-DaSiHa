// Autor: Bendl Šimon
import {Tetragon} from './Tetragon.js';
export class Rectangle extends Tetragon{
    constructor(x, y, width, height,color = 'grey'){
        super(
            {x: x , y: y},              //p1
            {x: x + width, y: y},          //p2
            {x: x + width, y: y + height},    //p3
            {x: x, y: y + height},               //p4 
            color  //color for fill/stroke Style
        );
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    render(ctx,fill){
        if (fill){
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }else{
            ctx.strokeStyle = this._color;
            ctx.lineWidth = 4;
            const offset = ctx.lineWidth / 2;
            ctx.strokeRect(this._x + offset, this._y + offset, this._width - ctx.lineWidth, this._height - ctx.lineWidth);
        }
    }
    moveTo(x, y){   
        this.x = x;
        this.y = y;
    }
    /*--------------------------Setters-------------------------------*/
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

/*-----------------------------Rectangle----------------------------------- 
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