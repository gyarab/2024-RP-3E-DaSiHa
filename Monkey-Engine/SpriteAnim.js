// Autor: Bendl Šimon
import { Sprite } from './Sprite.js';
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height,spritePaths = [], color = null){
        super  (x, y, width, height,null, color); 
        
        this._frames = [];
        this._currentFrame = 0;
        this._animTick = 0;

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
        const animSlow = 100;
        this._animTick += 1;
        if (this._animTick > animSlow){
            this._currentFrame = (this._currentFrame + 1) % this._frames.length;
            this._animTick = 0;
        }
    }
    render(ctx,Rbox) {
        if (Rbox  != null){super.render_Hitbox(ctx, Rbox)}
        if (this._frames.length > 0){
                const img = this._frames[this._currentFrame];
                if (img.complete) {
                    ctx.drawImage(img, this._x, this._y, this._width, this._height);
                }
        }else{
            super.render(ctx);
        }
        
    }
}
/*---------------------------SpriteAnim-------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const bluescreen = new Sprite (10,200,750,500,null,'blue');
const sA1 = new SpriteAnim(20,250,150,150,[
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png",
])
const sA2 = new SpriteAnim(250,250,150,150,["/Game_01_Ledvadva/sprites/runLeft_0.png"])

const sA3 = new SpriteAnim(500,250,150,150,null,'red');

// "opravit" sA3  
//sA3.loadImg([
//    "/Game_01_Ledvadva/sprites/runLeft_0.png",
//    "/Game_01_Ledvadva/sprites/runLeft_1.png",
//    "/Game_01_Ledvadva/sprites/runLeft_2.png",
//    "/Game_01_Ledvadva/sprites/runLeft_3.png"
//])

function SpriteAnimLoop (){
    bluescreen.render(ctx);
    sA1.render(ctx);
    sA1.updateImage();

    sA2.render(ctx,true);
    sA2.updateImage();

    sA3.render(ctx);
    sA3.updateImage();

    if(sA1.colides(bluescreen)){
        console.log("bazíruju si to na bluescreenu");
    }
}
window.setInterval(SpriteAnimLoop, 1);

/**/ 