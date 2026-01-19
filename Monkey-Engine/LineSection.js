// @Autor: Bendl Šimon

export class LineSection{
    constructor(A,B, color = _defaultValues.bS_color){
        this._A = A;
        this._B = B;
        this._color  = color;
        this._vector = vectorBetween(this._A,this._B); 
        this._strokeWidth = _defaultValues.bS_strokeWidth;
    }

    /** /// render() ///
     ** renders the LineSection on the given context 
     * @param {CanvasRenderingContext2D} ctx - the context 
     * @returns {LineSection} itself for chaining
     */
    render(ctx){
        ctx.beginPath();
        ctx.moveTo(this._A.x, this._A.y);
        ctx.lineTo(this._B.x, this._B.y);
        ctx.stroke();
        return this;
    }

    /** /// moveTo() ///
     ** moves the LineSection to the new position
     * @param {{x: number, y: number}} point - new position of point A
     * @returns {LineSection} itself for chaining
     */
    moveTo(point){
        this._A = { x: point.x, y: point.y};
        this._B = {
            x: point.x + this._vector.x,
            y: point.y + this._vector.y
        };
    }  
}

///              vectorBetween              ///
/**
 ** calaculates the vector between two points A and B
 *@param {{x: number, y: number}} {A}- x, y coordinates of point A
 *@param {{x: number, y: number}} {B}- x, y coordinates of point B
 *@returns {{x: number, y: number}} vector from A to B
 */
export function vectorBetween(A,B){
    return {x: B.x - A.x, y: B.y - A.y}
}

///              intersectionOfLines           ///
/**
 ** calculates the intersection point of two lines <-> AB  and <-> CD
 *@param   {{x: number, y: number}} {A}{B}{C}{D} - points of |AB| and |CD|
 *@returns {{x: number, y: number} || null} intersection point or null
 */
export function intersectionOfLines(A,B,C,D){
    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = a1*A.x + b1*A.y;
    const a2 = D.y - C.y;
    const b2 = C.x - D.x;
    const c2 = a2*C.x + b2*C.y;
    const delta = a1*b2 - a2*b1;
    if(delta === 0) return null;

    return {x: (b2*c1 - b1*c2) / delta, y: (a1*c2 - a2*c1) / delta}
}

///      intersectionOfLineSegments         ///
/**
 ** calculates the intersection point of two line segments |AB| and |CD|
 *@param   {{x: number, y: number}} {A}{B}{C}{D} - end points of |AB| and |CD|
 *@returns {{x: number, y: number} | null} intersection point or null
 */
export function intersectionOfLineSegments(A, B, C, D) {
    const epsilon = 1e-9; // tolerance pro ztrátu přesnosti

    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = a1 * A.x + b1 * A.y;

    const a2 = D.y - C.y;
    const b2 = C.x - D.x;
    const c2 = a2 * C.x + b2 * C.y;

    const delta = a1 * b2 - a2 * b1;

    if (Math.abs(delta) < epsilon) return null;

    const x = (b2 * c1 - b1 * c2) / delta;
    const y = (a1 * c2 - a2 * c1) / delta;
    
    // Kontrola, zda průsečík leží na obou úsečkách (s tolerancí)
    const isOnSegment = (p, q, r) => Math.min(p, q) - epsilon <= r && r <= Math.max(p, q) + epsilon;

    if (
        !isOnSegment(A.x, B.x, x) ||
        !isOnSegment(A.y, B.y, y) ||
        !isOnSegment(C.x, D.x, x) ||
        !isOnSegment(C.y, D.y, y)
    ) {
        return null;
    }

    return { x, y };
}
