import { SpriteAnims, Anim, MixAnim, Anims } from "../../Monkey-Engine/2.0.js";
////--------                      Walls                      --------////


////--------                      Walls                      --------////
const pathToImgs = "../../Game_00/sprites/players/";
const size = 4;
export class Player extends SpriteAnims{
    constructor(x,y, skin){
        super(x,y,17*size, 31*size,new Anims({
            stand   : new Anim([
                pathToImgs +skin + "/s/1.png"
            ], ),
            runLeft : new MixAnim([
                pathToImgs +skin +  "/rL/1.png", pathToImgs +skin +  "/rL/2.png", pathToImgs +skin +  "/rL/3.png",
                pathToImgs +skin +  "/rL/4.png", pathToImgs +skin +  "/rL/5.png", pathToImgs +skin +  "/rL/6.png",
                pathToImgs +skin +  "/rL/7.png", pathToImgs +skin +  "/rL/8.png",
            ],1, [3,2], 3),
            runRight : new MixAnim([
                pathToImgs +skin +  "/rR/1.png", pathToImgs +skin +  "/rR/2.png", pathToImgs +skin +  "/rR/3.png",
                pathToImgs +skin +  "/rR/4.png", pathToImgs +skin +  "/rR/5.png", pathToImgs +skin +  "/rR/6.png",
                pathToImgs +skin +  "/rR/7.png", pathToImgs +skin +  "/rR/8.png",
            ],1,  [3,2], 3),
            jumpUp   : new MixAnim([
                pathToImgs +skin +  "/jU/1.png", pathToImgs +skin +  "/jU/2.png", pathToImgs +skin +  "/jU/3.png",
            ], 2, undefined, 2),
            jumpUPLeft  : new MixAnim([
                pathToImgs +skin + "/jUL/1.png", pathToImgs +skin + "/jUL/2.png", pathToImgs +skin + "/jUL/3.png",
            ], 2, undefined, 2),
            jumpUpRight : new MixAnim([
                pathToImgs +skin + "/jUR/1.png", pathToImgs +skin + "/jUR/2.png", pathToImgs +skin + "/jUR/3.png",
            ], 2, undefined, 2),
            fallDown    : new MixAnim([
                pathToImgs +skin +  "/fD/1.png", pathToImgs +skin +  "/fD/2.png", pathToImgs +skin +  "/fD/3.png",
            ], 2, undefined, 2),
            fallDownLeft  : new MixAnim([
                pathToImgs +skin + "/fDL/1.png", pathToImgs +skin + "/fDL/2.png", pathToImgs +skin + "/fDL/3.png",
            ], 2, undefined, 2),
            fallDownRight : new MixAnim([
                pathToImgs +skin + "/fDR/1.png", pathToImgs +skin + "/fDR/2.png", pathToImgs +skin + "/fDR/3.png",
            ], 2, undefined, 2),
            climb         : new Anim([
                pathToImgs +skin + "/c/1.png", pathToImgs +skin + "/c/2.png"
            ], ),
            jumpLeft : new Anim([
                pathToImgs +skin + "/jL/1.png"
            ], ),
            jumpLeftFar : new Anim([
                pathToImgs +skin + "/jL/2.png"
            ], ),
            jumpLeftClose : new Anim([
                pathToImgs +skin + "/jL/3.png", pathToImgs +skin + "/jL/4.png"
            ], ),
            jumpRight : new Anim([
                pathToImgs +skin + "/jR/1.png"
            ], ),
            jumpRightFar : new Anim([
                pathToImgs +skin + "/jR/2.png"
            ], ),
            jumpRightClose : new Anim([
                pathToImgs +skin + "/jR/3.png", pathToImgs +skin + "/jR/4.png"
            ], ),
            pushLeft : new Anim([
                pathToImgs +skin + "/pL/1.png"
            ], ),
            pushRight : new Anim([
                pathToImgs +skin + "/pR/1.png"
            ],)}
        ))
        this._INIT("Player");
    }
    _inicializeFunc(){
        super._initializeFunc();
    }
}
const pathToProjectiles = "../../Game_00/sprites/Projectiles/";
export class Scissors extends SpriteAnims{
    constructor(x,y){
        super(x,y,29*size, 29*size,new Anims({
            idle : new Anim([
                pathToProjectiles + "Scissors/LEFT/1.png",
                pathToProjectiles + "Scissors/LEFT/2.png",
                pathToProjectiles + "Scissors/LEFT/3.png",
                pathToProjectiles + "Scissors/LEFT/4.png",
                pathToProjectiles + "Scissors/LEFT/5.png",
                pathToProjectiles + "Scissors/LEFT/1.png",
            ], 3)
        }))
        this._INIT("Scissors");
    }  
}