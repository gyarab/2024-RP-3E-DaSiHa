//autor: Šimon Bendl 
import { Sprite } from "./Sprite.js";

export class MenuBox extends Sprite {
    constructor(x = 0, y = 0, width, height, texture = "") {
        super(x, y, width, height, texture);
        this._text      = "";
        this._font      = "Arial";
        this._fontSize  = 30;
        this._fontColor   = "black";
        this._textAlign   = "left";//zatim k hovnu
        this._textBaseline  = "middle"; //zatim k hovnu
        this._fill = false; 
        this._foldable = false;
    }
    render(ctx) {
        const AlignWidthRatio = 1/9;
        const BackgroundColor = "pink";

        if (this._fill){
            ctx.fillStyle = BackgroundColor;
            ctx.fillRect(this._x,this._y,this._width,this._height);
        }

        super.render(ctx);
        ctx.font = `${this._fontSize}px ${this._font}`;
        ctx.fillStyle = this._fontColor;
        ctx.textAlign = "start";
        ctx.fillText(this._text, this._x + this._width * AlignWidthRatio, this._y + this._height / 2 + this._fontSize / 2);
        if (this._foldable){
            ctx.textAlign = "end"
            ctx.fillText(">",
                this._x + this._width - (this._width  *  AlignWidthRatio),
                this._y + this._height / 2+ this._fontSize / 2
            )
            ctx.textAlign = "end"

        }
    }

    /*---------------------------Setters-----------------------------*/
    set text(newText) {this._text = newText;}
    set font(newFont) {this._font = newFont;}
    set fontSize(newFontSize) {this._fontSize = newFontSize;}
    set fontColor(newFontColor) {this._fontColor = newFontColor;}
    set foldable(newFoldable){this._foldable = newFoldable}
    set fill(newFill){this._fill = newFill;}
    
}
