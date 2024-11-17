export class Sprite {
    constructor(x, y, width, height, spritePath = null, color = null) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._spritePath = spritePath;
        this._color = color;

        this._sprite = null;
        this._ctxCache = null; 
        this._isLoaded = false; 
          

        if (spritePath) {
            this.loadImg(spritePath);
        }
    }

    render(ctx) {
        this._ctxCache = ctx;  // Uložíme ctx pro případ, že obrázek není načten

        // Pokud je obrázek načten, vykreslíme ho
        if (this._sprite && this._isLoaded) {
            ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
        }    
        // Pokud není načten, vykreslíme náhradní obdélník    
        else if (this._color) {
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }
    }

    loadImg(spritePath) {
        this._sprite = new Image();
        this._sprite.src = spritePath;

        // Po načtení obrázku vykreslíme sprite automaticky, pokud máme ctx
        this._sprite.onload = () => {
            this._isLoaded = true;
            if (this._ctxCache) {
                this.render(this._ctxCache);
            }
        };
    }
}