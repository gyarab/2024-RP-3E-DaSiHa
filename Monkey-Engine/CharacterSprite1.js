import { SpriteDyna } from "./SpriteDyna.js";
export class CharacterSprite1 extends SpriteDyna{
    constructor(x, y, width, height, spritePaths = null) {
        super(x, y, width, height, spritePaths);

        this._yVelocity = 0;
        this._wantJump  = false;
        this._isJumping = false;

        this._framesRunning = [];

        this._floor = y;

    }    
    render(ctx, Rbox){ 
    if (Rbox  != null){super.render_Hitbox(ctx, Rbox)}
    let img = new Image();
    img.src = this._framesRunning[(this._timeOfAction) % this._framesRunning.length];
    ctx.drawImage(img, this._x, this._y, this._width, this._height);
            
    }
    updatePos(){
        const gravity = 0.2;
        const jumpVelocity = -10;

        this._y += this._yVelocity;

        if ((this._y <  this._floor) && this._isJumping){
            this._yVelocity += gravity;
            
        }
        if ((this._y > this._floor) && this._isJumping){
            this._yVelocity = 0;
            this._y = this._floor;
            this._isJumping = false;
        }
        if(this._wantJump  && !this._isJumping){
            this._yVelocity = jumpVelocity;
            this._isJumping = true;
        }
        
        this._counterAnim +=  1;
        if (this._counterAnim > 9){
            this._counterAnim   = 0;
            this._timeOfAction +=  1;
        }
    }
}
/*---------------------------CharacterSprite1-------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

window.addEventListener('keydown', event => handleKey(event, true));
window.addEventListener('keyup', event => handleKey(event, false));

const EX = new CharacterSprite1(100, 500, 85, 155);
EX._framesRunning = [
    "/Game_01_Ledvadva/sprites/runRight_0.png",
    "/Game_01_Ledvadva/sprites/runRight_1.png",
    "/Game_01_Ledvadva/sprites/runRight_2.png",
    "/Game_01_Ledvadva/sprites/runRight_3.png"
]
const CA = new SpriteDyna(1000,555,100,100,null,'green');
CA._isGoLeft = true;
CA._xSpeed = 2;
function Mainloop(){
    EX.updatePos();
    CA.updatePos();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    CA.render(ctx , true);
    EX.render(ctx , true); 
        
    if(CA._x < (0 - CA._width)){
        CA._x = 1000;
    }
      
}
window.setInterval(Mainloop, 5 , true);

function handleKey(event, isDown) {
    const { key } = event;
    const actions = {
        ' ': () => EX._wantJump = isDown
    };
    if (actions[key]) actions[key]();
}
/**/
