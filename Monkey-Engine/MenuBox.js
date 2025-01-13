//autor: Šimon Bendl 
import { Sprite } from "./Sprite.js";

export class MenuBox extends Sprite {
    constructor(x = 0, y = 0, width, height, texture = "./defaultTextures/infobox.png") {
        super(x, y, width, height, texture);
        this._text = "";
        this._font = "Arial";
        this._fontSize = 20;
        this._fontColor = "black";
        this._textAlign = "left";
        this._textBaseline = "middle";
        this._backgroundColor = "magenta";
    }
    render(ctx, Rbox = null) {
        const AlignWidthRatio = 1/6
        super.render(ctx, Rbox);
        ctx.font = `${this._fontSize}px ${this._font}`;
        ctx.fillStyle = this._fontColor;
        ctx.textAlign = this._textAlign;
        ctx.textBaseline = this._textBaseline;
        ctx.fillText(this._text, this._x + this._width *  AlignWidthRatio, this._y + this._height / 2);
    }

    /*---------------------------Setters-----------------------------*/
    set text(newText) {
        this._text = newText;
    }

    set font(newFont) {
        this._font = newFont;
    }

    set fontSize(newFontSize) {
        this._fontSize = newFontSize;
    }

    set fontColor(newFontColor) {
        this._fontColor = newFontColor;
    }

    set textAlign(newTextAlign) {
        this._textAlign = newTextAlign;
    }

    set textBaseline(newTextBaseline) {
        this._textBaseline = newTextBaseline;
    }
}
