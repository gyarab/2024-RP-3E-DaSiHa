// Autor: Bendl Šimon
import { Sprite } from './Sprite.js';
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height,spritePaths = []){
        super  (x, y, width, height,null); 
        
        this._frames = [];
        this._animTick = 0;
        this._animSlow = 100;
        this._currentFrame = 0;
        

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
        if (Rbox){super.render_Hitbox(ctx)}
        if (this._frames.length > 0){
                const img = this._frames[this._currentFrame];
                if (img.complete) {
                    ctx.drawImage(img, this._x, this._y, this._width, this._height);
                }
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
}
/*---------------------------SpriteAnim-------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');


const bluescreen = new Tetragon(
    {x:0,y:0},
    {x:800,y:0},
    {x:800,y:400},
    {x:0,y:150}
)
const sA = new SpriteAnim(10,10,90,160)
sA.id = "sA"
//sA.y = 300;
sA._animSlow = 40;
sA.loadImgs([ 
    "/Game_01_Ledvadva/sprites/BLU/stand.png",
    "/Game_01_Ledvadva/sprites/RED/stand.png"
])
function SpriteAnimLoop (){
    bluescreen.render(ctx,true)
    sA.render(ctx,true);
    sA.updateImage();
    if (colides(sA,bluescreen)){console.log("šahaj na sebe")}
}
window.setInterval(SpriteAnimLoop, 1);
/**/ 