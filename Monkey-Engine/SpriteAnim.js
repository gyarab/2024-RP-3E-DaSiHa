// Autor: Bendl Šimon
import { Sprite } from './Sprite.js';
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height,spritePaths = []){
        super  (x, y, width, height,null); 
        
        this._frames = [];
        this._animTick = 0;
        this._animSlow = 100;
        this._currentFrame = 0;
        
        this._renderWidth = width;
        this._renderHeight = height;
        this._renderDir = null;

        if (spritePaths){
            this.loadImg(spritePaths);
        }
    }
    loadImg(spritePaths) {
        spritePaths.forEach(path => {
            const img = new Image();
            img.src = path;
            this._frames.push(img);
        });
    }
    updateImage(){
        this._animTick += 1;
        if (this._animTick > this._animSlow){
            this._currentFrame = (this._currentFrame + 1) % this._frames.length;
            this._animTick = 0;
        }
    }
    render(ctx,Rbox) {
        if (this._frames.length > 0){
                const img = this._frames[this._currentFrame];
                if (img.complete) {
                    let renderX;
                    let renderY;
                    switch (this._renderDir){
                        case "top":
                            renderX = this._x - ((this._renderWidth - this._width) / 2);
                            renderY = this._y - this._renderHeight;
                        break;
                        case "bottom":
                            renderX = this._x - ((this._renderWidth - this._width) / 2);
                            renderY = this._y + this._height;
                        break;
                        case "left":
                            renderX = this._x - this._renderWidth;
                            renderY = this._y - ((this._renderHeight - this._height) / 2);
                        break;
                        case "right":
                            renderX = this._x + this._width;
                            renderY = this._y - ((this._renderHeight - this._height) / 2);
                        break;
                        default:
                            renderX = this._x - ((this._renderWidth - this._width) / 2);
                            renderY = this._y - ((this._renderHeight - this._height) / 2);
                    }
                    ctx.drawImage(img, renderX, renderY, this._renderWidth, this._renderHeight);
                }
                const ofset = ctx.lineWidth / 2;
                if (Rbox){ctx.strokeRect(this._x + ofset, this._y + ofset, this._width - ctx.lineWidth, this._height - ctx.lineWidth);}
        }else{
            super.render(ctx);
        }
    }
    /*---------------------------Setters------------------------------*/
    set frames(newFrames){
        console.error("použij loadImg() degeši")
    }
    set animSlow(newAnimSlow){
        this._animSlow = newAnimSlow;
    }
    set width(newWidth){
        if (this._renderWidth == this._width){
            this._renderWidth = newWidth;
        }
        this._width = newWidth;
    }
    set height(newHeight){
        if (this._renderHeight == this._height){
            this._renderHeight = newHeight;
        }
        this._height = newHeight;
    }
}
/*---------------------------SpriteAnim-------------------------------
import { Tetragon, colides } from '../Monkey-Engine/Tetragon.js';
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');


const bluescreen = new Tetragon(
    {x:0,y:0},
    {x:800,y:0},
    {x:800,y:400},
    {x:0,y:400}
)
const sA = new SpriteAnim(10,150,90,160, [ 
    "/Game_01_Ledvadva/sprites/BLU/stand.png",
    "/Game_01_Ledvadva/sprites/BLU/rR/5.png"
])

sA.id = "spriteAnim"
sA.animSlow = 40;
function SpriteAnimLoop (){
    bluescreen.render(ctx,true)
    sA.render(ctx,true);
    sA.updateImage();
}
window.setInterval(SpriteAnimLoop, 1);
/**/ 