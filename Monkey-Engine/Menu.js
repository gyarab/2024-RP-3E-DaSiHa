import {MenuBox} from './MenuBox.js';
import { Sprite } from './Sprite.js';
export class Menu {
    constructor(x,y,width,height,rows){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._rows  = rows;
        this._style  = "plane";
        this._boxes = [];
        this._fontSize = 30;

        for (let i = 0; i < rows + 1; i++){
            this._boxes.push(new MenuBox(x,y + i * height,width,height));
        }
    }
    rearange(style){
        this._style = style;

        if (style == "plain" ) {        
            for (let i = 1; i < this._boxes.length; i++){
                this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu_mid.png");
            }
            this._boxes[0].loadImg("../Monkey-Engine/defaultTextures/menu_top.png");
            this._boxes[this._boxes.length - 1].loadImg("../Monkey-Engine/defaultTextures/menu_bot.png");
            this._boxes[this._boxes.length - 1].height = this._height/10;
        }
        else if (style == "socket") {
            for (let i = 0; i < this._boxes.length; i++){
                this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu_top.png");
            }
            this._boxes[this._boxes.length - 1].loadImg("../Monkey-Engine/defaultTextures/menu_bot.png");
            this._boxes[this._boxes.length - 1].height = this._height/10;       
        }
        else {
            return;
        }
    }
    render(ctx){
        const end = new Sprite(this._x,this.y + (this._y * this.rows),this.width,this.height/10,"../Monkey-Engine/defaultTextures/menu_bot.png");
        end.render(ctx);
        for (let i = 0; i < this._boxes.length; i++){
            this._boxes[i].render(ctx);
        }
    
    }
    set fontSize(newFontSize){
        this._fontSize = newFontSize;
        for (let i = 0; i < this._boxes.length; i++){
            this._boxes[i].fontSize = newFontSize
        }
    }
}
/*-----------------------------------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const menu = new Menu(500, 300, 360, 80, 5);
menu.rearange("plain");
menu.fontSize = 40;
menu._boxes[0].text = "new";
menu._boxes[0].foldable = true;
menu._boxes[0].fill = true;
menu._boxes[1].text = "select";
menu._boxes[2].text = "info";
menu._boxes[2].fill = true;
menu._boxes[3].text = "refactor";
menu._boxes[3].foldable = true;
menu._boxes[4].text = "delete";
menu.render(ctx);
*/
