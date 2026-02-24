//@Autor: Bendl Šimon
//@-------------------------------imports-----------------------------------@//
import { _defaultValues } from './_defaultValues.js';
import {intersectionOfLineSegments, vectorBetween} from './LineSection.js';
import { Point, isPointInPolygon, rotatePointAround} from './Point.js';

//@------------------------------Tetragon-----------------------------------@//
export class Tetragon extends Point{
    constructor(p1, p2, p3, p4, color = _defaultValues.bS_color){
        super(p1.x, p1.y, color);
        //* new properties
        this._points = [p1, p2, p3, p4];
        this._strike = false;
        //* old properties
        this._strokeWidth = _defaultValues.bS_strokeWidth;

        if (!(this._ignoreInitOf["Tetragon"]))this._initializeFunc();
    }
    //@---privateFunctions---@//
    /** /// _copyPropsTo() ///
     ** all new properties of Tetragon to copy, used for cloning
     * @private
     * @param {Object} target -ed object to copy into
     * @returns {void} 
     */
    _copyPropsTo(target){
        super._copyPropsTo(target);
        
        target._strike = this._strike;
        //? shalow copy of points need further testing ?//
        if ( target._isDeepClone) target._points = this._points.map(p => ({ x: p.x, y: p.y }));
        if (!target._isDeepClone) target._points = this._points;
    }

    /** /// _centroid() ///
     ** calculates the centroid of an Tetragon
     * @private
     * @returns {{x: number, y: number}} centroid
     */
    _centroid(){
        return centroidOfPolygon(this._points);
    }

    //@---publicFunctions---@//
    /** /// render() ///
     ** renders the Tetragon on the given context
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @param {boolean} fill - whether to fill the Tetragon
     * @returns {Tetragon} itself for chaining
     */
    render(ctx, fill = true) {
        renderPolygon(this._points, ctx, this._color, this._strokeWidth, fill, this._strike);
        return this;
    }

    /** /// moveTo() ///
     ** moves the Tetragon to the new position
     * @param {number} newX 
     * @param {number} newY
     * @returns {Tetragon} itself for chaining
     */
    moveTo(newX = this._points[0].x, newY = this._points[0].y) {
        this._points = movePolygonTo(this._points,{x: newX, y: newY});
        return this;
    }
    
    /** /// moveBy() ///
     ** moves the Tetragon by 
     @param {number} byX
     @param {number} byY
     @returns {Tetragon} itself for chaining 
     */
    moveBy(byX = 0, byY = 0){
        this._points = movePolygonBy(this._points,{x: byX, y: byY})
        return this;
    }

    /** /// rotateAround() ///
     ** rotates the Tetragon by the given angle in radians
     * @param {number} pivotX - x coordinate of the pivot point
     * @param {number} pivotY - y coordinate of the pivot point
     * @param {number} angleInRadians - angle in radians
     * @returns {Tetragon} itself for chaining 
     */
    rotateAround(pivotX, pivotY, angleInRadians){
        this._points = rotatePolygonAround(this._points, {x: pivotX, y: pivotY}, angleInRadians);
        return this;
    }

    /** /// rotateBy() ///
     * rotates the Tetragon around it's centroid
     * @param {number} angleInRadians - angle in radians
     * @returns {Tetragon} itself for chaining 
     */
    rotateBy(angleInRadians){
        const centroid = this._centroid();
        this.rotateAround(centroid.x, centroid.y, angleInRadians)
        return this;
    }

    /** /// doesColideWith() ///
     ** checks if the Tetragon colides with other (Tetragon,...)
     *! Polygon unsave !
     * TODO: other shapes
     * @param {Tetragon, ...} other - the other shape
     * @returns {boolean} true if they colide
     */
    doesColideWith(other) {
        if (!(other instanceof Tetragon)) {
            throw new Error("Argument is not instance of Tetragon.");
        }
        if ( hasVertexInside(this._points, other._points)) { return true;}
        if (hasEdgeIntersection(this, other)) { return true;}
        return false;
    }
    
    //@---setters---@//
    set points (newPoints){
        this.x = newPoints[0].x;
        this.y = newPoints[0].y;
        this._points = newPoints;
    }
}
//@------------------------------helpFunc-----------------------------------@//
/** /// rotatePolygonAround() ///
 ** rotates a polygon around a pivot by the given angle in radians
 * @private
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @param  {{x: number, y: number}} pivot     
 * @param  {number} angleInRadians 
 * @returns {Array<{x: number, y: number}>} points of the rotated polygon
 */
function rotatePolygonAround(ptsOfPoly, pivot, angleInRadians){
    return ptsOfPoly.map(point => rotatePointAround(point, pivot, angleInRadians));
}

/** /// movePolygonBy() ///
 * ** moves a polygon by the given vector
 * @private
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @param  {{x: number, y: number}} vector set vector to move the polygon by
 * @returns {Array<{x: number, y: number}>} points of the moved polygon
 */
function movePolygonBy(ptsOfPoly, vector){
    return ptsOfPoly.map(point => ({
        x: point.x + vector.x,
        y: point.y + vector.y
    }));
}

/** /// movePolygonTo() ///
 ** moves a polygon to the new position by the given vector
 * @private
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @param  {{x: number, y: number}} destPoint point to move the polygon to
 * @returns {Array<{x: number, y: number}>} points of the moved polygon
 */
function movePolygonTo(ptsOfPoly, destPoint){
    let vectors = [];
    for (let i = 0; i < ptsOfPoly.length; i++) {
        vectors[i] = vectorBetween(ptsOfPoly[0], ptsOfPoly[i]);
    }
    return ptsOfPoly.map((_, index) => ({
        x: destPoint.x + vectors[index].x,
        y: destPoint.y + vectors[index].y
    }));
}

/** /// centroidOfPolygon() ///
 ** calculates the centroid of a homogeneous polygon
 * @public
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @returns {{x: number, y: number}} centroid (center of mass) of the polygon
 */
export function centroidOfPolygon(ptsOfPoly){
    let x = 0;  let y = 0;
    for (const point of ptsOfPoly) {
        x += point.x;  y += point.y;
    }
    return {
        x: x / ptsOfPoly.length,
        y: y / ptsOfPoly.length
    };
}

/** /// renderPolygon() ///
 ** renders a polygon on the given context
 * @public
 * @param  {Array<{x: number, y: number}>} ptsOfPoly points of set polygon
 * @param  {CanvasRenderingContext2D} ctx the context
 * @param  {string} color color of the polygon
 * @param  {number} strokeWidth width of the stroke
 * @param  {boolean} fill whether to fill the polygon
 * @param  {[number, number]} strike whether to render the stroke as dashed line with given pattern
 * @returns {void}
 */
export function renderPolygon(
    ptsOfPoly, ctx, color, strokeWidth = 1,
     fill = false, strike = false // optional parameters
    ){
    ctx.beginPath();

    const center = centroidOfPolygon(ptsOfPoly);
    const offset = fill ? 0 : strokeWidth / 2;
    for (let i = 0; i < ptsOfPoly.length; i++) {
        const p = ptsOfPoly[i];
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
        ctx.fillStyle = color;
        ctx.fill();
    } else {
        ctx.strokeStyle = color;
        if(strike)ctx.setLineDash(strike);
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
        if(strike)ctx.setLineDash([]);
    }
}

/** /// hasVertexInside() ///
 ** calculates if two polygons pierce each other by any vertex
 * @private
 *: Polygon save
 * @param   {Array<{x: number, y: number}>} ptsOfPoly1 points of set first polygon
 * @param   {Array<{x: number, y: number}>} ptsOfPoly2 points of set second polygon
 * @returns {boolean} true if they share even one point, false otherwise
 */
export function hasVertexInside(ptsOfPoly1, ptsOfPoly2){
    for (let point of ptsOfPoly1) {
        if (isPointInPolygon(point, ptsOfPoly2)) {return true;}
    }
    for (let point of ptsOfPoly2) {
        if (isPointInPolygon(point, ptsOfPoly1)) {return true;}
    }
    return false;
}

export function hasTetraEdgeIntersection(ptsOfPoly1, ptsOfPoly2){
    for (let j = 0; j < ptsOfPoly2.length; j++) {
        for (let i = 0; i < ptsOfPoly1.length; i++) {
            let A = ptsOfPoly1[i]; 
            let B = ptsOfPoly1[(i + 1) % ptsOfPoly1.length];
            let C = ptsOfPoly2[j]; 
            let D = ptsOfPoly2[(j + 1) % ptsOfPoly2.length];

            const intersection = intersectionOfLineSegments(A, B, C, D);
            if (intersection) return true; 
        }
    }
    return false;
}

/** /// hasEdgeIntersection() ///
 ** calculates if two Tetragons pierce each other by any edge
 * @private
 *! Polygon unsave !
 * TODO: fix colision detection for edge cases (pun intended) 
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

/** /// colidingPointsOfTetragons() ///
 ** calculates and returns the coliding points of two Tetragons
 ** shares code with hasEdgeIntersection but returns after checking all
 * @private
 *! Polygon unsave !
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
    {x:   0, y:   0}, {x: 100, y:   0},
    {x: 400, y: 200}, {x:   0, y: 200}, 
    'red'
);
const t2 = new Tetragon(
    {x:   0, y:   0}, {x: 200, y:   0},
    {x: 200, y: 175}, {x:   0, y: 175},
     'blue'
);    
const t3 = new Tetragon(
    {x:   0, y:   0}, {x: 100, y:   0},
    {x: 100, y: 300}, {x:   0, y: 300},
    'green'
);
const t4 = new Tetragon(
    {x:   0, y:  0}, {x: 400, y:  0},
    {x: 300, y: 75}, {x:   0, y: 75},
    'yellow'
);


t1.moveTo(300,275).render(ctx,true);
t2.moveTo(300,100).render(ctx,true);
t3.moveTo(850,500).render(ctx,true);
t4.moveTo(700,650).render(ctx,true);


const t5 = t3.clone().moveBy(500).render(ctx, true);
const t6 = t4.clone().moveBy(500).render(ctx, true);

console.log(
    "ColidesAnyPoints pro \n" +
    "   t1 a t2: " + hasVertexInside(t1._points , t2._points) + "\n" +
    "   t3 a t4: " + hasVertexInside(t3._points , t4._points) + "\n" +
    "   t1 a t3: " + hasVertexInside(t1._points , t3._points) + "\n" +
    "doesColideWith pro \n" +
    "   t1 a t2: " + t1.doesColideWith(t2) + "\n" +
    "   t3 a t4: " + t3.doesColideWith(t4) + "\n" +
    "   t1 a t3: " + t1.doesColideWith(t3)  + "\n" +
    "   t1 type: " + t1.constructor.name + "\n" +
    "   t5 type: " + t5.constructor.name
);
/*
function TetragonLoop (){
    t2.rotateAround(t2._x, t2._y, 0.02).render(ctx,true);
    t4.rotateBy(0.01).render(ctx,true);
}
window.setInterval(TetragonLoop, 8);
/**/