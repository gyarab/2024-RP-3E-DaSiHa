//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { Sprite } from '../../Monkey-Engine/Sprite.js';
//@--------------------------------Clock------------------------------------@//
const pathToHub = "../Game_01_Ledvadva/sprites/Hub/";
const cSize = 4;
export class Clock extends Sprite {
    constructor(x, y) {

        super(x, y, 45 * cSize, 45 * cSize, pathToHub + "dial.png");

        this.size = cSize;
        this.lastUpdate = 0;
        this.animSlow = 10;

        this._radius = 20 * cSize;
        this._armPos = {
            _hour:   0,
            _minute: 0,
            _second: 0
        }
    }

    /** /// updatePos() ///
     ** updates the clock based on the actual time
     ** checks every this.animSlow-tick
     * @returns {Clock} itself for chaining
     */
    updatePos(){
       this.lastUpdate += 1;
        if (this.lastUpdate <  this.animSlow) return;
        else this.lastUpdate = 0;

        const now = new Date();
                
        const seconds = now.getSeconds();
        const minutes = now.getMinutes() + seconds / 60;
        const hours   = (now.getHours() % 12) + minutes / 60;
        
        this._armPos._second  = seconds * (Math.PI * 2 / 60);
        this._armPos._minute  = minutes * (Math.PI * 2 / 60);
        this._armPos._hour    = hours   * (Math.PI * 2 / 12);
    
        return this;
    }

    /** /// render() ///
     * renders the Clock {Sprite; proceduarl gen. hands} on the given context
     * @param {CanvasRenderingContext2D} ctx -the context
     * @param {boolean} rBox - whether to render the bounding box
     * @return {Clock} itself for chaining
     */
    render(ctx, rBox) {
        super.render(ctx, rBox);
        const centerX = this._x + (this._width / 2) - (cSize / 2);
        const centerY = this._y + (this._height / 2) - (cSize / 2);

        ctx.fillStyle = "#2f2f2f"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius,   'hour',   this._armPos._hour, this.size);
        ctx.fillStyle = "#515151"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius, 'minute', this._armPos._minute, this.size);
        ctx.fillStyle = "#717171"
        drawClockHand(ctx, {x: centerX, y: centerY}, this._radius, 'second', this._armPos._second, this.size);
        return this;
        
    }
}

/** /// drawClockHand() ///
 ** draws a clock hand based on the given parameters 
 * @param {CanvasRenderingContext2D} ctx - the context
 * @param {{x: number, y: number}} cPoint - center point
 * @param {number} radius - length of the clock hand
 * @param {'hour' | 'minute' | 'second'} type - type of hand to draw 
 * @param {number} angle - (0 to 2pi) clockwise from 12 o'clock
 * @return {void}
 */
function drawClockHand(ctx, cPoint, radius, type, angle) {
    const styles = {
        hour:   { length: 0.5, width: 2 },
        minute: { length: 0.7, width: 2 },
        second: { length: 0.8, width: 2 }
    };

    const a = angle - Math.PI / 2;
    const s = styles[type].length;

    const ex = cPoint.x + Math.cos(a) * radius * s;
    const ey = cPoint.y + Math.sin(a) * radius * s;

    drawPixelLine(ctx, { x: cPoint.x, y: cPoint.y}, { x: ex , y: ey  }, styles[type].width * cSize);
}

/** /// drawPixelLine() ///
 ** draws pixelated  line using Bresenham's algorithm
 * @param {CanvasRenderingContext2D} ctx - the context
 * @param {{x: number, y: number}} start - starting point
 * @param {{x: number, y: number}} end - ending point
 * @param {number} size - size of the line (thickness)
 * @returns {void}
 */
function drawPixelLine(ctx, start, end, size) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

        const steps = Math.max(Math.abs(dx), Math.abs(dy))/ (size * 0.5);

    if (steps === 0) return;

    const xInc = dx / steps;
    const yInc = dy / steps;

    let x = start.x;
    let y = start.y;

    for (let i = 0; i <= steps; i++) {
        ctx.fillRect(
            Math.round(x),
            Math.round(y),
            cSize,
            cSize
        );
        x += xInc;
        y += yInc;
    }
}
