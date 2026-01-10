// @Autor: Bendl Šimon
import { _defaultValues } from './_defaultValues.js';
import {intersectionOfLineSegments, vectorBetween} from './LineSection.js';
import { Point } from './Point.js';

export class Tetragon extends Point{
    constructor(p1, p2, p3, p4, color = _defaultValues.bS_color){
        super(p1.x, p1.y, color);
        this._points = [p1, p2, p3, p4];
    }

    /** /// render() ///
     ** renders the Tetragon on the given context 
     *?     rendering without fill ...  ?
     *?    will distort actual size ..  ?
     *?   by half of the strokeWidth    ?
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} fill - whether to fill the Tetragon
     * @returns {Tetragon} itself for chaining
     */
    /** /// render() ///
     ** renders the Tetragon on the given context
    * @param {CanvasRenderingContext2D} ctx - the context 
    * @param {boolean} fill - whether to fill the Tetragon
    * @returns {Tetragon} itself for chaining
    */
    render(ctx, fill) {
        ctx.beginPath();

        if (!fill) {
            // Use points directly if filling
            ctx.moveTo(this._points[0].x, this._points[0].y);
            for (let i = 1; i < this._points.length; i++) {
                ctx.lineTo(this._points[i].x, this._points[i].y);
            }
        } else {
            offset = this._strokeWidth / 2;
            // Offset each point inward along edges
            // Simple approximation: shrink polygon toward centroid
            const centroid = this._points.reduce((c, p) => {
                return { x: c.x + p.x / this._points.length, y: c.y + p.y / this._points.length };
            }, { x: 0, y: 0 });

            ctx.moveTo(
                this._points[0].x + (centroid.x - this._points[0].x) * offset / this._approxMaxDist(),
                this._points[0].y + (centroid.y - this._points[0].y) * offset / this._approxMaxDist()
            );

            for (let i = 1; i < this._points.length; i++) {
                ctx.lineTo(
                    this._points[i].x + (centroid.x - this._points[i].x) * offset / this._approxMaxDist(),
                    this._points[i].y + (centroid.y - this._points[i].y) * offset / this._approxMaxDist()
                );
            }
        }

        ctx.closePath();

        if (fill) {
            ctx.fillStyle = this._color;
            ctx.fill();
        } else {
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._strokeWidth;
            ctx.stroke();
        }

        return this;
    }

    /** Helper to estimate maximum distance from centroid to a vertex */
    _approxMaxDist() {
        const centroid = this._points.reduce((c, p) => {
            return { x: c.x + p.x / this._points.length, y: c.y + p.y / this._points.length };
        }, { x: 0, y: 0 });

        return Math.max(...this._points.map(p => Math.hypot(p.x - centroid.x, p.y - centroid.y)));
    }
    render(ctx, fill) {
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);
        for(let i = 1; i < this._points.length; i++){
            ctx.lineTo(this._points[i].x, this._points[i].y);
        }
        ctx.lineWidth = this._strokeWidth;
        ctx.closePath();
        if(fill){
            ctx.fillStyle = this._color;
            ctx.fill();
        }
        if(!fill){
            ctx.strokeStyle = this._color;
            ctx.lineWidth = this._strokeWidth;
            ctx.stroke();
        }
        return this;
    }

    /** /// moveTo() ///
     ** moves the Tetragon to the new position
     * @param {number} x 
     * @param {number} y 
     * @returns {Tetragon} itself for chaining
     */
    moveTo(newX, newY) {
        let v1 = vectorBetween(this._points[0],this._points[1]) 
        let v2 = vectorBetween(this._points[0],this._points[2])
        let v3 = vectorBetween(this._points[0],this._points[3])
        this.points = [ 
            {x: newX       , y: newY       },
            {x: newX + v1.x, y: newY + v1.y},
            {x: newX + v2.x, y: newY + v2.y},
            {x: newX + v3.x, y: newY + v3.y}
        ]
        return this;
    }

    /** /// rotateAround() ///
     * rotates the Tetragon by the given angle in degrees
     * @param {number} angleInDegrees - angle in degrees
     * @returns {Tetragon} itself for chaining 
     */
    rotateAround(angleInDegrees, pivotX, pivotY){
        return this;
    }

    /** /// rotateBy() ///
     * rotates the Tetragon by the given angle in degrees
     * @param {number} angleInDegrees - angle in degrees
     * @returns {Tetragon} itself for chaining 
     */
    rotateBy(angleInDegrees){
        return this;
    }

    /** /// doesColideWith() ///
     ** checks if the Tetragon colides with other (Tetragon,...) 
     * TODO: other shapes
     * @param {Tetragon, ...} other - the other shape
     * @returns {boolean} true if they colide
     */
    doesColideWith(other) {
        //other = Tetragon
        if (other instanceof Tetragon) {
            for (let j = 0; j < other._points.length; j++) {
                for (let i = 0; i < this._points.length; i++) {
                    let A = this._points[i]; 
                    let B = this._points[(i + 1) % this._points.length];
                    let C = other._points[j]; 
                    let D = other._points[(j + 1) % other._points.length];

                    if (colidesAnyPoints(this, other)){return true;}
                    const intersection = intersectionOfLineSegments(A, B, C, D);
                    if (intersection) {
                        if (intersection === null) {
                            throw new Error("intersectionOfLineSegments() returned null.")
                        }
                        return true;
                    }  
                }
            }
        //TODO: other != Tetragon
        }else{
            throw new Error("Argument is not instance of Tetragon.")
        }
        return false;
    }

    /** /// clone() ///
     ** creates a clone of the Tetragon 
     *? color might not be cloned properly ?
     * @returns {Tetragon} cloned Tetragon
     */
    clone(){
        const points = this._points.map(p => ({ ...p }));
        const clone = new Tetragon(...points, this._color); 
        clone._strokeWidth = this._strokeWidth;
        return clone
    }

    //*------------------Setters--------------------*//
    set points (newPoints){ this._points = newPoints;}
}

///                 colidesAnyPoints                ///
/**
 ** calculates if two Tetragons share any point
 * @param   {Tetragon} {tetragon1}{tetragon2} 
 * @returns {boolean} true if they share even one point
 */
export function colidesAnyPoints(tetragon1, tetragon2){
    for (let point of tetragon1._points) {
        if (pointInPolygon(point, tetragon2._points)) {return true;}
    }
    for (let point of tetragon2._points) {
        if (pointInPolygon(point, tetragon1._points)) {return true;}
    }
    return false;
}

///                 pointInPolygon                 ///
/**
 ** calculates if the point is part of the polygon
 * @param  {{x: number, y: number}} point 
 * @param  {Polygon} polygon 
 * @returns {boolean} true if the point is in the polygon
 */
export function pointInPolygon(point, polygon) {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].x, yi = polygon[i].y;
        let xj = polygon[j].x, yj = polygon[j].y;
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}


/*---------------Tetragon-EXAMPLE-------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const t1 = new Tetragon(
    {x:   0, y:   0},
    {x: 100, y:   0},
    {x: 400, y: 200},
    {x:   0, y: 200}, 
    'red'
);
const t2 = new Tetragon(
    {x:   0, y:   0},
    {x: 200, y:   0},
    {x: 200, y: 175},
    {x:   0, y: 175},
     'blue'
);    
const t3 = new Tetragon(
    {x:   0, y:   0},
    {x: 100, y:   0},
    {x: 100, y: 300},
    {x:   0, y: 300},
    'green'
);
const t4 = new Tetragon(
    {x:   0, y:  0},
    {x: 400, y:  0},
    {x: 300, y: 75},
    {x:   0, y: 75},
    'yellow'
);

t1.moveTo(100,200)
t2.moveTo(300,100)
t3.moveTo(850,500)
t4.moveTo(700,650)

t2.render(ctx,true);
t1.render(ctx,true);
t3.render(ctx,true);
t4.render(ctx,true);

console.log(
    "ColidesAnyPoints pro \n" +
    "   t1 a t2: " + colidesAnyPoints(t1, t2) + "\n" +
    "   t3 a t4: " + colidesAnyPoints(t3, t4) + "\n" +
    "   t1 a t3: " + colidesAnyPoints(t1, t3) + "\n" +
    "doesColideWith pro \n" +
    "   t1 a t2: " + t1.doesColideWith(t2) + "\n" +
    "   t3 a t4: " + t3.doesColideWith(t4) + "\n" +
    "   t1 a t3: " + t1.doesColideWith(t3)
);
/**/