// TODO: fixnout a vypořítat

export class LinSectione{
    constructor(A,B){
        this._A = A;
        this._B = B;
        this._vector = vectorBetween(this._A,this._B); 
    }
    render(ctx){
        ctx.beginPath();
        ctx.moveTo(this._A.x, this._A.y);
        ctx.lineTo(this._B.x, this._B.y);
        ctx.stroke();
    }
    moveTo(point){
        this._A =  {x: point.x, y: point.y};
        this._B = {x: point.x + this._vector.x, y: point.y + this._vector.y};
    }  
}

function vectorBetween(A,B){
    return {x: B.x - A.x, y: B.y - A.y}
}

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
export function intersectionOfLineSegments(A,B,C,D){
    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = a1*A.x + b1*A.y;
    const a2 = D.y - C.y;
    const b2 = C.x - D.x;
    const c2 = a2*C.x + b2*C.y;
    const delta = a1*b2 - a2*b1;
    if(delta === 0) return null;

    const x = (b2*c1 - b1*c2) / delta;
    const y = (a1*c2 - a2*c1) / delta;
    if(x < Math.min(A.x,B.x) || x > Math.max(A.x,B.x) || x < Math.min(C.x,D.x) || x > Math.max(C.x,D.x)) return null;
    if(y < Math.min(A.y,B.y) || y > Math.max(A.y,B.y) || y < Math.min(C.y,D.y) || y > Math.max(C.y,D.y)) return null;
    return {x, y}
}

/*

function intersectionOfLines(line1,line2){
    const A = {x: line1._A.x, y: line1._A.y};
    const B = {x: line1._B.x, y: line1._B.y};
    const C = {x: line2._A.x, y: line2._A.y};
    const D = {x: line2._B.x, y: line2._B.y};

    const BLA1 = (D.y - C.y) * C.x + (C.x - D.x) * C.y;
    const BLA2 = (B.y + A.y) * A.x * (D.x - C.x) + (B.x - A.x ) * A.y * (D.x - C.x);

    const TLA1 = (C.y - D.y) ;
    const TLA2 = (D.x - C.x) * (B.y -A.y);
    
    const returnX = (-BLA1 - BLA2) / (TLA1 + TLA2);
    const returnY = (A.x*B.y - A.y*B.x)*(C.y - D.y) - (A.y - B.y)*(C.x*D.y - C.y*D.x);

    return {x: returnX, y:returnY};
}
*/
