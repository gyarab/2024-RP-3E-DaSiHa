// Autor: Bendl Šimon
import { vectorBetween } from "./LineSection.js";
import { SpriteAnim } from "./SpriteAnim.js";
import { SpriteDyna } from "./SpriteDyna.js";

export class SpriteStack extends Array {
    constructor() {
        super();
        this._farTop   ; 
        this._farLeft  ; 
        this._farRight ; 
        this._farBottom; 
    }

    /** /// render() ///
     ** renders the SpriteStack on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} rBox - whether to render the bounding box
     */
    render(ctx, rBox) {
        this.forEach(sprite => {
            sprite.render(ctx, rBox);
        });
        if (rBox) {

            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.setLineDash([10, 5]);
            ctx.strokeRect(this._farLeft, this._farTop, this._farRight - this._farLeft, this._farBottom - this._farTop);
            ctx.setLineDash([]);
        } 
    }

    /** /// moveTo() ///
     ** moves the whole SpriteStack to the new position
     * @param {number} x 
     * @param {number} y 
     * @returns itself for chaining
     */
    moveTo(x, y) {
        let v = vectorBetween({x: this._farLeft, y: this._farTop}, {x: x, y: y});
        this.forEach(sprite => {
            if (sprite?.moveTo) {
                sprite.moveTo(sprite._x + v.x, sprite._y + v.y);
            }
        });
        this.recalculateSize();
        return this;
    }

    /** /// updateImage() ///
     ** updates the images of all SpriteAnims in the SpriteStack
     ** @returns itself for chaining
     */
    updateImage() {
        this.forEach(sprite => {
            if (sprite instanceof SpriteAnim) sprite.updateImage();
        });
        return this;    
    }

    /** /// updatePos() ///
     ** updates the positions of all SpriteDynas in the SpriteStack
     ** @returns itself for chaining
     */
    updatePos() {
        this.forEach(sprite => {
            if (sprite instanceof SpriteDyna) sprite.updatePos();
        });
        return this;
    }

    /** /// recalculateSize() ///
     ** recalculates the farthest points of the SpriteStack
     * @returns itself for chaining
     */
    recalculateSize() {
        let farTop    = Infinity;
        let farLeft   = Infinity;
        let farRight  = -Infinity;
        let farBottom = -Infinity;
        this.forEach(sprite => {
            for(let point of sprite._points){
                farTop    = Math.min(farTop, point.y);
                farLeft   = Math.min(farLeft, point.x);
                farRight  = Math.max(farRight, point.x);
                farBottom = Math.max(farBottom, point.y);
            }
        });
        this._farTop    = farTop;
        this._farLeft   = farLeft;
        this._farRight  = farRight;
        this._farBottom = farBottom;

        return this;
    } 

    /** /// clone() ///
     ** clones the SpriteStack 
     * @param {*} takesMoreSpace 
     * @returns {SpriteStack} a clone of the SpriteStack
     */
    clone(takesMoreSpace = false){
        if (this.length === 0) return new SpriteStack();
        const clone = new SpriteStack();
        this.forEach(sprite => {
            clone.push(sprite.clone(takesMoreSpace));
        });
        clone.recalculateSize();
        return clone;
    }

    /** /// push() ///
     ** pushes items to the SpriteStack and flattens any arrays
     * @param  {...any} items 
     * @returns itself for chaining
     */
    push(...items) {
        for (let item of items) {          
            if (Array.isArray(item)) {
                super.push(...item);
            } else {
                super.push(item);
            }
        }
        this.recalculateSize();
        return this;
    }

    /*--------------------------Setters-------------------------------*/
    _applyTo(type, fn) {
    this.forEach(obj => {
        if (obj instanceof type) fn(obj);
    });
}
    /* non exclusive properties*/
    set x(newX) {
        console.warn("Sure you want to set x for the whole SpriteStack?");            
        this.forEach(obj => {
            obj.x = newX;
        });
    }   
    set y(newY) {
        console.warn("Sure you want to set y for the whole SpriteStack?");
        this.forEach(obj => {
            obj.y = newY;
        });
    }
    set color(newColor) {
        this._applyTo(Sprite, s => s.color = newColor);
    }
    /*  Rectangle properties*/ //? will have to be expanded if needed ?//
    set height(newHeight) {
        this._applyTo(Rectangle, s => s.height = newHeight);
    }
    set width(newWidth) {
        this._applyTo(Rectangle, s => s.width = newWidth);
    }
    /* SpriteAnim properties*/
    set animSlow(newAnimSlow) {
        this._applyTo(SpriteAnim, s => s._animSlow = newAnimSlow);
    }
    /*  SpriteDyna properties*/
    set isGoRight(newIsGoRight) {
        this._applyTo(SpriteDyna, s => s.isGoRight = newIsGoRight);
    }
    set isGoLeft(newIsGoLeft) {
        this._applyTo(SpriteDyna, s => s.isGoLeft = newIsGoLeft);
    }
    set isGoUp(newIsGoUp) {
        this._applyTo(SpriteDyna, s => s.isGoUp = newIsGoUp);
    }
    set isGoDown(newIsGoDown) {
        this._applyTo(SpriteDyna, s => s.isGoDown = newIsGoDown);
    }
    set xSpeed(newXSpeed) {
        this._applyTo(SpriteDyna, s => s.xSpeed = newXSpeed);
    }
    set ySpeed(newYSpeed) {
        this._applyTo(SpriteDyna, s => s.ySpeed = newYSpeed);
    }
}