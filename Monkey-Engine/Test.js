import { Entity } from "./Entity.js";
import { Tetragon } from "./Tetragon.js";
import { Rectangle } from "./Rectangle.js";
import { Sprite } from "./Sprite.js";
import { 
    SpriteAnims, RectSolid, Dyna, Material, DeffMate, RealMate, BetaMate, RectDynaAces, VisualsFor,
        Anims, SoftMate,
        BounceMate,
        RectDyna,
        MasivMate,
        RectMasiv,
        SpriteAnimCaracter,
        Anim
} from "./2.0.js";

const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');
const pathToImgs = "/Game_01_Ledvadva/sprites/Player/SKIN-00/";

////---------------------------------------------------------------------------------------------////
/*
let elements = [1, 2, 3, 4];

while (elements.length > 0) {
  let e = elements[0]; // peek at first
  process(e);           // your <element(elements)> logic
  elements.shift();     // remove first
}
*/
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

await wait(100)
const floor = new RectMasiv(0, 800, 1900, 50);
const block = new RectSolid(900, 200, 200, 200);
floor.Mate  = new BounceMate();
block.Mate  = new SoftMate(); 


//const player = new VisualsFor(block, p);

let graphicObjects = [
    s //player
]

function collisionPhase(dt){ /// COLLISION PHASE ///
    block.Dyna._velocity.y += 1200 * dt;
    let elements = [floor, block];

    while (elements.length > 1) {
        let e = elements[0];
            for (let i = 1; i < elements.length; i++) {
                e.updateColl(elements[i], dt);
            }
        elements.shift();             
    }


}

function updatingPhase(dt){ /// UPDATING PHASE ///
    floor.updatePos(dt);
    block.updatePos(dt);
    
}

function renderPhase(){ ///  RENDERING PHASE  ///
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let obj of graphicObjects){
        console.log(obj.GraphicPart);
        obj.render(ctx);
        obj.updateImage();

    }
}




let lastTime = performance.now();
function Mainloop(time) {
    let dt = (time - lastTime) / 1000;
    lastTime = time;

    dt = Math.min(dt, 0.05);
    collisionPhase(dt);
    updatingPhase(dt);
    renderPhase();

    requestAnimationFrame(Mainloop);
}

requestAnimationFrame(Mainloop);