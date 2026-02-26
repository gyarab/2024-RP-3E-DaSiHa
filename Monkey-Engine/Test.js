import { Entity } from "./Entity.js";
import { Tetragon } from "./Tetragon.js";
import { Rectangle } from "./Rectangle.js";
import { Sprite } from "./Sprite.js";
import { 
    SpriteAnims, RectSolid, Dyna, Material, DeffMate, RealMate, BetaMate, RectDynaAces, VisualsFor,
        Anims, SoftMate, RectangleDynaPrototype, stepingOfCollison, CollisionResponse,
        BounceMate,
        MasivMate,
        RectMasiv,
        Anim,
        AlphaMate,
        DynaBisc
} from "./2.0.js";

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const pathToImgs = "/Game_01_Ledvadva/sprites/Player/SKIN-00/";

const s = new SpriteAnims(
    600,150,90,160, new Anims({
        stand: new Anim([
            pathToImgs + "s/1.png"
        ]),
        climb: new Anim([
            pathToImgs + "c/1.png", pathToImgs + "c/2.png"
        ]),
        jumpUp: new Anim([
            pathToImgs + "jU/1.png", pathToImgs + "jU/2.png", pathToImgs + "jU/3.png",
        ]),
        //jumpUpLeft: new Anim([
        //    pathToImgs + ".png"
        //]),
        //jumpUpRight: new Anim([
        //    pathToImgs + ".png"
        //]),
        jumpLeft: new Anim([
            pathToImgs + "jL/1.png"
        ]),
        jumpLeftFar: new Anim([
            pathToImgs + "jL/2.png"
        ]),
        jumpLeftClose: new Anim([
            pathToImgs + "jL/3.png", pathToImgs + "jL/4.png"
        ]),
        jumpRight: new Anim([
            pathToImgs + "jR/1.png"
        ]),
        jumpRightFar: new Anim([
            pathToImgs + "jR/2.png"
        ]),
        jumpRightClose: new Anim([
            pathToImgs + "jR/3.png", pathToImgs + "jR/4.png"
        ]),
        //fallDown: new Anim([
        //    pathToImgs + ".png"
        //]),
        //fallDownLeft: new Anim([
        //    pathToImgs + ".png"
        //]),
        //fallDownRight: new Anim([
        //    pathToImgs + ".png"
        //]),
        pushLeft: new Anim([
            pathToImgs + "pL/1.png"
        ]),
        pushRight: new Anim([
            pathToImgs + "pR/1.png"
        ]),
        runLeft : new Anim([
            pathToImgs + "rR/1.png", pathToImgs + "rR/2.png", pathToImgs + "rR/3.png", 
            pathToImgs + "rR/4.png", pathToImgs + "rR/5.png", pathToImgs + "rR/6.png",
            pathToImgs + "rR/7.png", pathToImgs + "rR/8.png",
        ]),
        runRight : new Anim([
            pathToImgs + "rR/1.png", pathToImgs + "rR/2.png", pathToImgs + "rR/3.png", 
            pathToImgs + "rR/4.png", pathToImgs + "rR/5.png", pathToImgs + "rR/6.png",
            pathToImgs + "rR/7.png", pathToImgs + "rR/8.png",
        ])
    }, "stand")

)
////---------------------------------------------------------------------------------------------////
function movementPhase(dt){ /// MOVEMENT PHASE ///
    let elements = [floor, box, body,  rody];


    for (const el of elements) {
        if (el._hasOnTop?.length > 0) {
                for (const top of el._hasOnTop) {
                    console.error(top._color);
                    if (!(top instanceof RectSolid)) console.error(top.constructor.name );
                    top.Dyna._velocity.x += el.Dyna._velocity.x;
                    top.updateVelo(dt)
                    break
                }
            }
        el._hasOnTop = []; 
        if (el instanceof RectSolid) el.updateVelo(dt);
    }

    //gravity
        for(const el of elements){
        const GRAVITY = 100 ;
        if (!el.Dyna_isGrounded){
            el.Dyna._velocity.y += GRAVITY ;
        }
    }
    //steping
    let maxDisplacement = 0;
    for (const el of elements) {
        maxDisplacement = Math.max(maxDisplacement, Math.hypot(
            el.Dyna._velocity.x * dt, 
            el.Dyna._velocity.y * dt
        ));
    }

    const MAX_STEP = 2;
    const steps = Math.max(1, Math.ceil(maxDisplacement / MAX_STEP));
    const dtStep = dt / steps;

    for (let s = 0; s < steps; s++) {
        for (const el of elements) {

        } 
        // moven
        for (const el of elements) {
            const dis = {
                x: el.Dyna._velocity.x * dtStep ,
                y: el.Dyna._velocity.y * dtStep
            }
            el.moveBy(dis.x, dis.y);
        }

        // collisions
        for (let i = 0; i < elements.length; i++) {
            for (let j = i + 1; j < elements.length; j++) {
                const a = elements[i];
                const b = elements[j];

                if (a.doesColideWith(b)) {
                    CollisionResponse(a, b, dtStep);
                }
            }
        }
    }

    //adding friction
    for(const el of elements){
        if(!el._frictioned){
            if(el.Dyna._isGrounded)el.Dyna._velocity.x *= 0.5 //friction
            el.Dyna._velocity.y *= 0.99; //air resistance
        
        }
    }
}


function renderPhase(){ ///  RENDERING PHASE  ///
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let obj of graphicObjects){

        obj.render(ctx);
        if (!(Dyna in obj) && !(obj instanceof RectangleDynaPrototype)) obj.updateImage();
        
    }
}

const body  = new RectSolid(900, 200, 17*4, 31*4);
const rody = new RectSolid(800, 200, 17*4, 31*4);rody._color = "blue";

const box   = new RectSolid(400, 200, 200, 200);box._color = "brown";
const floor = new RectMasiv(0, 800, 1500, 50);

body.Dyna = new DynaBisc();
body.Mate = new SoftMate();
rody.Dyna = new DynaBisc();
rody.Mate = new SoftMate(); // for collision

box.Mate  = new SoftMate(); // for collision

let graphicObjects = [
    floor, box, body, rody
];


////------------------------>  Keyboard Binds  <--------------------////
window.addEventListener('load', () => {
    const pressedKeys = new Set();
    window.addEventListener('keydown' , event => { handleKeyDown(event,  true); });
    window.addEventListener('keyup', event => { handleKeyUp(event, true);});
    let lastTime = performance.now();

    function Mainloop(time) {
        let dt = (time - lastTime) / 1000;
        lastTime = time;
        dt = Math.min(dt, 0.05);

        movementPhase(dt);
        renderPhase();

        requestAnimationFrame(Mainloop);
    }
    
requestAnimationFrame(Mainloop);
});

////----------------------- Pressed keys -----------------------////
function handleKeyUp (event){
    const key = event.key//.toLowerCase();  // normalize to lowercase
    const actions = {
        w: () => { body.Dyna._wantJump     = false;},
        s: () => { body.Dyna._wantGoDown   = false;},
        a: () => { body.Dyna._wantGoLeft   = false;},
        d: () => { body.Dyna._wantGoRight  = false;},
        'ArrowUp'   : () => {rody.Dyna._wantJump     = false;},
        'ArrowLeft' : () =>{ rody.Dyna._wantGoLeft   = false;},
        'ArrowRight': () => {rody.Dyna._wantGoRight  = false;},
        'ArrowDown' : () => {rody.Dyna._wantGoDown   = false;}
    };
     if (actions[key]) {
        event.preventDefault();
        actions[key]();
    }
}
function handleKeyDown (event){
    const key = event.key//.toLowerCase();  // normalize to lowercase
    const actions = {
        w: () => {  body.Dyna._wantJump     = true;},
        s: () => {  body.Dyna._wantGoDown   = true;},
        a: () => {  body.Dyna._wantGoLeft   = true;},
        d: () => {  body.Dyna._wantGoRight  = true;},
        'ArrowUp'   : () => {rody.Dyna._wantJump     = true;},
        'ArrowLeft' : () => {rody.Dyna._wantGoLeft   = true;},
        'ArrowRight': () => {rody.Dyna._wantGoRight  = true;},
        'ArrowDown' : () => {rody.Dyna._wantGoDown   = true;}
    };
    if (actions[key]) {
        event.preventDefault();
        actions[key]();
    }
}





