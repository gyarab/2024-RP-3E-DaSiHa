import { Sprite } from './Sprite.js';
export class SpriteAnim extends Sprite{
    constructor(x, y, width, height,spritePaths = [], color = null){
        super  (x, y, width, height,null, color); 
        
        this._frames = [];
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
        this._currentFrame = (this._currentFrame + 1) % this._frames.length;
    }
    render(ctx) {
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