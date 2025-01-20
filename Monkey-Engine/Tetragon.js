// Autor: Bendl Šimon
export class Tetragon{
    constructor(p1, p2, p3, p4, color = 'magenta'){
        this._points = [p1, p2, p3, p4]
        this._color  = color
    }
    render(ctx, fill) {
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);
        ctx.lineTo(this._points[1].x, this._points[1].y);
        ctx.lineTo(this._points[2].x, this._points[2].y);
        ctx.lineTo(this._points[3].x, this._points[3].y);
        ctx.closePath();
        //ctx.stroke();
        //if (fill){
            ctx.fillStyle = this._color;ctx.fill();
        //}
    }
    moveTo(newX, newY) {
        let v1 = vectorBetween(this._points[0],this._points[1]) 
        let v2 = vectorBetween(this._points[0],this._points[2])
        let v3 = vectorBetween(this._points[0],this._points[3])
        this.points = [ 
            {x: newX       , y: newY},
            {x: newX + v1.x, y: newY + v1.y},
            {x: newX + v2.x, y: newY + v2.y},
            {x: newX + v3.x, y: newY + v3.y}
        ]
    }
    /*----------------------------Setters------------------------- */
    set color  (newColor ){ this._color  = newColor }
    set points (newPoints){ this._points = newPoints}
}
// TODO: Sakum pikum předělat
export function colides(tetragon1, tetragon2){
    for (let point of tetragon1._points) {
        if (pointInPolygon(point, tetragon2._points)) {return true;}
    }
    for (let point of tetragon2._points) {
        if (pointInPolygon(point, tetragon1._points)) {return true;}
    }
    return false;
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BULLSHIT JE TO VŠECHNO CHYBNÝ A NEFUNGUJE TO
export function colidesTop(tetragonCollider, tetragon, vicinity){
    const v = vectorBetween(tetragonCollider._points[0], tetragonCollider._points[1])
    const pointA = {
        x: tetragonCollider._points[0].x + (v.x / 2) + vicinity,
        y: tetragonCollider._points[0].y 
    }
    const pointB = {
        x: tetragonCollider._points[0].x + (v.x / 2) - vicinity,
        y: tetragonCollider._points[0].y 
    }
    if (pointInPolygon(pointA, tetragon._points)){return true;}
    if (pointInPolygon(pointB, tetragon._points)){return true;}
    return false;
}
export function colidesRight(tetragonCollider, tetragon, vicinity = 0){
    const v = vectorBetween(tetragonCollider._points[1], tetragonCollider._points[2])
    const pointA = {
        x: tetragonCollider._points[1].x ,
        y: tetragonCollider._points[1].y + (v.y / 2) + vicinity
    }
    const pointB = {
        x: tetragonCollider._points[1].x ,
        y: tetragonCollider._points[1].y + (v.y / 2) - vicinity
    }
    if (pointInPolygon(pointA, tetragon._points)){return true;}
    if (pointInPolygon(pointB, tetragon._points)){return true;}
    return false;
}
export function colidesBottom(tetragonCollider, tetragon, vicinity = 0){
    const v = vectorBetween(tetragonCollider._points[2], tetragonCollider._points[3])
    const pointA = {
        x: tetragonCollider._points[2].x + (v.x / 2) + vicinity,
        y: tetragonCollider._points[2].y 
    }
    const pointB = {
        x: tetragonCollider._points[2].x + (v.x / 2) - vicinity,
        y: tetragonCollider._points[2].y 
    }
    if (pointInPolygon(pointA, tetragon._points)){return true;}
    if (pointInPolygon(pointB, tetragon._points)){return true;}
    return false;
}
export function colidesLeft(tetragonCollider, tetragon, vicinity){
    const v = vectorBetween(tetragonCollider._points[0],tetragonCollider._points[3])
    const pointA = {
        x: tetragonCollider._points[0].x ,
        y: tetragonCollider._points[0].y + (v.y / 2) + vicinity
    }
    const pointB = {
        x: tetragonCollider._points[0].x ,
        y: tetragonCollider._points[0].y + (v.y / 2) - vicinity
    }
    if (pointInPolygon(pointA, tetragon._points)){return true;}
    if (pointInPolygon(pointB, tetragon._points)){return true;}
    return false;
}
function vectorBetween(p1 , p2){
    let vectorX = p2.x - p1.x;
    let vectorY = p2.y - p1.y;
    return {x: vectorX, y: vectorY}

}
function pointInPolygon(point, polygon) {
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

/*-----------------------------Tetragon-----------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const t1 = new Tetragon(
    {x:  50, y: 200},
    {x: 100, y: 200},
    {x: 100, y: 300},
    {x:  50, y: 300}, 
    'red'
);

const t2 = new Tetragon(
    {x: 250, y: 40},
    {x: 350, y: 40},
    {x: 350, y: 240},
    {x: 250, y: 240},
     'blue'
);    

t2.moveTo(500,400)
t1.moveTo(475,599)

t2.render(ctx,true);
t1.render(ctx,true);
console.log(t1._points[0])
console.log(colidesTop(t1,t2))
/**/