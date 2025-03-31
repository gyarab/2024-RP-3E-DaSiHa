// Autor: Bendl Šimon
import {intersectionOfLineSegments} from './LineSection.js';
export class Tetragon{
    static IdCounter = 0;
    constructor(p1, p2, p3, p4, color = 'magenta'){
        this._points = [p1, p2, p3, p4];
        this._color  = color;
        this._strokeWidth = 10;
        this._id =  Tetragon.IdCounter.toString().padStart(4, '0');
        Tetragon.IdCounter++;
    }

    //! rendering without fill = true will distort actual size by half of the strokeWidth
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
    }
    ///*Moves the Tetragon to the new position
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
    
    // * controls if the Tetragon colides with other (Tetragon,...)
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

    //*------------------Setters--------------------
    set color  (newColor ){ this._color  = newColor; }
    set points (newPoints){ this._points = newPoints;}
    set id     (newId    ){ this._id= newId;}   
}
// * contols if any of the points of the Tetragon intersects the other Tetragon and vice versa
export function colidesAnyPoints(tetragon1, tetragon2){
    for (let point of tetragon1._points) {
        if (pointInPolygon(point, tetragon2._points)) {return true;}
    }
    for (let point of tetragon2._points) {
        if (pointInPolygon(point, tetragon1._points)) {return true;}
    }
    return false;
}
// * controls if the point intersects the Polygon
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
function vectorBetween(p1 , p2){
    let vectorX = p2.x - p1.x;
    let vectorY = p2.y - p1.y;
    return {x: vectorX, y: vectorY}

}

/*//*---------------Tetragon-EXAMPLE-------------------
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