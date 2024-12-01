// Autor: Bendl Šimon
export class Tetragon{
    constructor(p1, p2, p3, p4, color){
        this._points = [p1, p2, p3, p4];
        this._color = color;
        
        if (this._color == null){
            this._color = 'magenta';
        }
    }
    render(ctx, fill) {
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);
        ctx.lineTo(this._points[1].x, this._points[1].y);
        ctx.lineTo(this._points[2].x, this._points[2].y);
        ctx.lineTo(this._points[3].x, this._points[3].y);
        ctx.closePath();
        ctx.stroke();
        if (fill){
            ctx.fillStyle = this._color;
            ctx.fill();
        }
    }
    //funguje tak na půl
    colides(tetragon2){
        const tetragon1 = this;
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
        for (let point of tetragon1._points) {
            if (pointInPolygon(point, tetragon2._points)) {
                return true;
            }
        }
        for (let point of tetragon2._points) {
            if (pointInPolygon(point, tetragon1._points)) {
                return true;
            }
        }
        return false;
    }
}
/*-----------------------------Tetragon----------------------------------- *
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const t1 = new Tetragon({x: 10, y: 10}, {x: 200, y: 200}, {x: 300, y: 350}, {x: 10, y: 300}, 'red');
t1.render(ctx,true);

const t2 = new Tetragon({x: 250, y: 40}, {x: 350, y: 40}, {x: 350, y: 140}, {x: 250, y: 290}, 'blue');    
t2.render(ctx,true);

console.log(t1.colides(t2));
console.log(t2.colides(t1));
/**/