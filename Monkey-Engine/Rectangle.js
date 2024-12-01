// Autor: Bendl Šimon
import {Tetragon} from './Tetragon.js';
export class Rectangle extends Tetragon{
    constructor(x, y, width, height,color){
        super({x: x, y: y}, {x: x + width, y: y}, {x: x + width, y: y + height}, {x: x, y: y + height}, color);
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
    }
    render(ctx,fill){
        if (fill){
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }else{
            ctx.strokeRect(this._x, this._y, this._width, this._height);
        }
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