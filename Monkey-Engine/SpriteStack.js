import { vectorBetween } from "./LineSection.js";
import { SpriteAnim } from "./SpriteAnim.js";
import { pointInPolygon } from "./Tetragon.js";
        //ctx.save();
        //ctx.clip();
export class SpriteStack extends Array {
    constructor() {
        super();
        this._farTop   ; 
        this._farLeft  ; 
        this._farRight ; 
        this._farBottom; 
    }

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

    moveTo(x, y) {
        let v = vectorBetween({x: this._farLeft, y: this._farTop}, {x: x, y: y});
        this.forEach(sprite => {
            if (sprite?.moveTo) {
                sprite.moveTo(sprite._x + v.x, sprite._y + v.y);
            }
        });
        this.calculateSize();
        return this;
    }

    updateImage() {
        this.forEach(sprite => {
            if (sprite instanceof SpriteAnim) sprite.updateImage();
        });
    }

    calculateSize() {
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
    }

    clone(takesMoreSpace = false){
        if (this.length === 0) return new SpriteStack();
        const clone = new SpriteStack();
        this.forEach(sprite => {
            clone.push(sprite.clone(takesMoreSpace));
        });-
        clone.calculateSize();
        return clone;
    }

    push(...items) {
        for (let item of items) {          
            if (Array.isArray(item)) {
                super.push(...item);
            } else {
                super.push(item);
            }
        }
    this.calculateSize();
    return this.length;
    }
}
