//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import {intersectionOfLineSegments, vectorBetween} from './LineSection.js';
import { Point, xFromPolar, xyToPolar, yFromPolar } from './Point.js';

//@------------------------------Tetragon-----------------------------------@//
export class Tetragon extends Point{
    constructor(p1, p2, p3, p4, color = _defaultValues.bS_color){
        super(p1.x, p1.y, color);
        this._points = [p1, p2, p3, p4];
        this._strokeWidth = _defaultValues.bS_strokeWidth;
    }

    /** /// render() ///
     ** renders the Tetragon on the given context
    * @param {CanvasRenderingContext2D} ctx - the context 
    * @param {boolean} fill - whether to fill the Tetragon
    * @returns {Tetragon} itself for chaining
    */
    render(ctx, fill) {
        ctx.beginPath();

        const center = this._centroid();
        const offset = fill ? 0 : this._strokeWidth / 2;

        for (let i = 0; i < this._points.length; i++) {
            const p = this._points[i];
            const vecToCenter = {
                x: center.x - p.x, 
                y: center.y - p.y
            };

            const vecLength = Math.hypot(vecToCenter.x, vecToCenter.y) || 1;

            const x = p.x + vecToCenter.x / vecLength * offset;
            const y = p.y + vecToCenter.y / vecLength * offset;

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
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

    /** /// _centroid() ///
     ** calculates the centroid of an polygon
     * @private
     * @returns {{x: number, y: number}} centroid
     */
    _centroid(){
        let x = 0;  let y = 0;

        for (const point of this._points) {
            x += point.x;  y += point.y;
        }
 
        return {
            x: x / this._points.length,
            y: y / this._points.length
        };
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
    
    /** /// rotateAround() ///
     * rotates the Tetragon by the given angle in radians
     * @param {number} pivotX - x coordinate of the pivot point
     * @param {number} pivotY - y coordinate of the pivot point
     * @param {number} angleInRadians - angle in radians
     * @returns {Tetragon} itself for chaining 
     */
    rotateAround(pivotX, pivotY, angleInRadians){
;        this._points = this._points.map(point => {
            const polar = xyToPolar(point.x - pivotX, point.y - pivotY);
            const newAngle = polar.theta + angleInRadians;
            return {
                x: pivotX + xFromPolar(polar.radius, newAngle),
                y: pivotY + yFromPolar(polar.radius, newAngle)
            };
        });
        return this;
    }

    /** /// rotateBy() ///
     * rotates the Tetragon by the given angle in radians
     * @param {number} angleInRadians - angle in radians
     * @returns {Tetragon} itself for chaining 
     */
    rotateBy(angleInRadians){
        return this;
    }

    /** /// doesColideWith() ///
     ** checks if the Tetragon colides with other (Tetragon,...) 
     * TODO: other shapes
     * @param {Tetragon, ...} other - the other shape
     * @returns {boolean} true if they colide
     */
    doesColideWith(other) {
        if (!other instanceof Tetragon) {
            throw new Error("Argument is not instance of Tetragon.");
        }
        if (    hasVertexInside(this, other)) { return true;}
        if (hasEdgeIntersection(this, other)) { return true;}
        return false;
    }

    //*------------------Setters--------------------*//
    set points (newPoints){ this._points = newPoints;}
}
//@------------------------------helpFunc-----------------------------------@//
/** /// hasVertexInside() ///
 ** calculates if two Tetragons pierce each other by any vertex
 * @private
 * @param   {Tetragon} {tetragon1}{tetragon2} 
 * @returns {boolean} true if they share even one point
 */
function hasVertexInside(tetragon1, tetragon2){
    for (let point of tetragon1._points) {
        if (isPointInPolygon(point, tetragon2._points)) {return true;}
    }
    for (let point of tetragon2._points) {
        if (isPointInPolygon(point, tetragon1._points)) {return true;}
    }
    return false;
}

/** /// hasEdgeIntersection() ///
 ** calculates if two Tetragons pierce each other by any edge
 * @private
 * @param   {Tetragon} {tetragon1}{tetragon2} 
 * @returns {boolean} true if they share even one edge intersection
 */
function hasEdgeIntersection(tetragon1, tetragon2){
    for (let j = 0; j < tetragon2._points.length; j++) {
        for (let i = 0; i < tetragon1._points.length; i++) {
            let A = tetragon1._points[i]; 
            let B = tetragon1._points[(i + 1) % tetragon1._points.length];
            let C = tetragon2._points[j]; 
            let D = tetragon2._points[(j + 1) % tetragon2._points.length];

            const intersection = intersectionOfLineSegments(A, B, C, D);
            if (intersection) return true; 
        }
    }
    return false;
}

/** /// isPointInPolygon() ///
 ** calculates if a point is part of the polygon
 * @private
 * @param  {{x: number, y: number}} point 
 * @param  {Polygon} polygon 
 * @returns {boolean} true if the point is in the polygon
 */
function isPointInPolygon(point, polygon) {
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

/** /// colidingPointsOfTetragons() ///
 ** calculates and returnsthe coliding points of two Tetragons
 ** shaeres code with hasEdgeIntersection but returns after chceking all
 * @private
 * @param {Tetragon} tetragon1 
 * @param {Tetragon} tetragon2 
 * @returns {Array<{x: number, y: number}>} array of colision points
 */
function colidingPointsOfTetragons(tetragon1, tetragon2){
    let colidingPointsArray = [];

    // Check not vertexes but edges intersections
    // shares code with hasEdgeIntersection but
    for (let j = 0; j < tetragon2._points.length; j++) {
        for (let i = 0; i < tetragon1._points.length; i++) {
            let A = tetragon1._points[i];
            let B = tetragon1._points[(i + 1) % tetragon1._points.length];
            let C = tetragon2._points[j];
            let D = tetragon2._points[(j + 1) % tetragon2._points.length];
            const intersection = intersectionOfLineSegments(A, B, C, D);
            if (intersection) colidingPointsArray.push(intersection);
        }
    }

    return colidingPointsArray;
}

//@------------------------------examples----------------------------------@// 
/*--------------------------------------------------------------------------
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

t1.moveTo(300,275)

t2.moveTo(300,100)
t2.rotateAround(300,100,0);

t3.moveTo(850,500)
t4.moveTo(700,650)

t2.render(ctx,true);
t1.render(ctx,true);
t3.render(ctx,true);
t4.render(ctx,true);

console.log(
    "ColidesAnyPoints pro \n" +
    "   t1 a t2: " + hasVertexInside(t1, t2) + "\n" +
    "   t3 a t4: " + hasVertexInside(t3, t4) + "\n" +
    "   t1 a t3: " + hasVertexInside(t1, t3) + "\n" +
    "doesColideWith pro \n" +
    "   t1 a t2: " + t1.doesColideWith(t2) + "\n" +
    "   t3 a t4: " + t3.doesColideWith(t4) + "\n" +
    "   t1 a t3: " + t1.doesColideWith(t3)
);
/**/