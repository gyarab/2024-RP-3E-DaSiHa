export class Sprite {
    constructor(x, y, width, height, spritePath = null, color = null, id = null) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._spritePath = spritePath;
        this._color = color;
        this._sprite   = null;

        this._ctxCache = null; 
        this._isLoaded = false; 
        this._id       = Math.floor(Math.random() * 9000) + 1000;
        
        if (spritePath) {this.loadImg(spritePath);}
    }

    render(ctx) {
        this._ctxCache = ctx;
        if (this._sprite) {
            if(this._isLoaded){
                ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
            }else{
          //    console.log("Sprite " + this._id + " nebyl načten");
            }
            
        }else {
            if(this._color){
                ctx.fillStyle = this._color;
            }else{
                ctx.fillStyle = 'purple';
            }
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }
    }
    loadImg(spritePath) {
        this._sprite = new Image();
        this._sprite.src = spritePath;
        this._sprite.onload = () => {
            this._isLoaded = true;
            if (this._ctxCache) {
          //    console.log("Sprite " + this._id + " byl donačten");
                this.render(this._ctxCache);
            }
        };
    }
}