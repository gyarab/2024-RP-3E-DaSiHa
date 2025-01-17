import {MenuBox} from './MenuBox.js';

export class Menu {
    // TODO: make new styles, create new textures if need be ("socket-long", ...)
    // TODO: creates variables for shortaning of the last "MenuBox"
    constructor(x,y,width,height,rows){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._rows  = rows;
        this._style  = "plane";
        this._boxes = [];
        this._fontSize = 30;
        this._isVisable = false;

        for (let i = 0; i < rows + 1; i++){
            this._boxes.push(new MenuBox(x,y + i * height,width,height));
        }
    }
    rearange(style){
        this._style = style;
        let numOfRows = this._rows;
        let areRowOdd = (!(numOfRows % 2 ==0 ));
        let numOfLastBox = this._boxes.length - 1
        switch (style) {
            //* DONE
            case "plain":
                for (let i = 1; i < numOfRows; i++) {
                    this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/m_mid.png");
                }
                this._boxes[0].loadImg("../Monkey-Engine/defaultTextures/menu/m_top.png");
                this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/m_bot_1.png");
                this._boxes[numOfLastBox].height = this._height / 10;
                break;
            //* DONE
            case "plain-small":
                
                for (let i = 1; i < numOfRows ;i++) {
                    if (  i % 2 ==0 ){this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/s_mid_1.png");}
                    if (!(i % 2 ==0)){this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/s_mid_2.png");}
                }
                this._boxes[0].loadImg("../Monkey-Engine/defaultTextures/menu/s_top_1.png");
                if ( areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/s_bot_1.png");}
                if (!areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/s_bot_2.png");}
                this._boxes[numOfLastBox].height = this._height / 5;
                break;
            // * DONE
            case "plain-long":
                for (let i = 1; i < numOfRows; i++ ){
                    if (  i % 2 ==0 ){this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/l_mid_2.png");}
                    if (!(i % 2 ==0)){this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/l_mid_1.png");}
                }
                if ( areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/m_bot_1.png");}
                if (!areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/m_bot_2.png");}
                this._boxes[0].loadImg("../Monkey-Engine/defaultTextures/menu/l_top_1.png")              
                this._boxes[this._boxes.length - 1].height = this._height / 5;
                break;
            //* DONE
            case "socket":
                for (let i = 0; i < numOfRows; i++) {
                    this._boxes[i].loadImg("../Monkey-Engine/defaultTextures/menu/m_top.png");
                }
                this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/m_bot_1.png");
                this._boxes[numOfLastBox].height = this._height / 10;
                break;
            //* DONE
            case "socket-small":
                for (let i = 1; i < this._boxes.length; i++) {
                    if (  i % 2 ==0 ){this._boxes[i-1].loadImg("../Monkey-Engine/defaultTextures/menu/s_top_2.png");}
                    if (!(i % 2 ==0)){this._boxes[i-1].loadImg("../Monkey-Engine/defaultTextures/menu/s_top_1.png");}
                }
                if ( areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/s_bot_1.png");}
                if (!areRowOdd){this._boxes[numOfLastBox].loadImg("../Monkey-Engine/defaultTextures/menu/s_bot_2.png");}
                this._boxes[numOfLastBox].height = this._height / 5;

            default:
                return;
        }
    }
    render(ctx){
        for (let i = 0; i < this._boxes.length; i++){
            this._boxes[i].render(ctx);
        }
    
    }
    moveTo(x,y){
        this._x = x;
        this._y = y;
        for (let i = 0; i < this._boxes.length; i++){
            this._boxes[i].x = x;
            this._boxes[i].y = y + i * this._height;
        }
    }
    
    set isVisable(newIsVisable){
        this._isVisable = newIsVisable;
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
