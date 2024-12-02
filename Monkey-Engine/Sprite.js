// Autor: Bendl Šimon
import {Rectangle} from './Rectangle.js'; 
export class Sprite extends Rectangle{
    constructor(x, y, width, height, spritePath = "texture.png") {
        super  (x, y, width, height,null);
        this._sprite   = null;

        this._ctxCache = null; 
        this._isLoaded = false;

        this._id = Math.floor(Math.random() * 9000) + 1000;
        this.loadImg(spritePath);
    }
    
    
    loadImg(spritePath) {
        this._sprite = new Image();
        this._sprite.src = spritePath;
        this._sprite.onload = () => {
            this._isLoaded = true;
            if (this._ctxCache) {
                //console.log("Sprite " + this._id + " byl donačten");
                this.render(this._ctxCache);
            }
        };
    }
    render(ctx , Rbox = null) {
        this._ctxCache = ctx;

        if(Rbox  != null){this.render_Hitbox(ctx)}
            if(this._isLoaded){
                ctx.drawImage(this._sprite, this._x, this._y, this._width, this._height);
            }else{
                //console.log("Sprite " + this._id + " nebyl načten");
            } 
    }
    render_Hitbox(ctx){
        ctx.strokeRect(this._x, this._y, this._width, this._height);
    }
    /*---------------------------Setters-----------------------------*/
    set id (newId){
        console.log('id changed from ' + this._id + ' to ' + newId);
        this._id= newId;
}     
}

/*-----------------------------Sprite-----------------------------------

import { colides } from './Tetragon.js';
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

//správné vytvoření instance Spritu
const s1 = new Sprite(10,10,100,100,
    "/Game_01_Ledvadva/sprites/stand.png"
);
s1.render(ctx);

//v případě absence obrázku se vykreslí obdélník
const s2 = new Sprite(150,10,100,100);
s2.render(ctx);

//Sprite se načte i v případě donačtení obrázku
const s3 = new Sprite(290,10,100,100);
s3.render(ctx);
s3.loadImg("/Game_01_Ledvadva/sprites/stand.png")

const s4 = new Sprite(430,10,100,100);
s4.loadImg("/Game_01_Ledvadva/sprites/stand.png")
s4.render(ctx)


//jde i vykreslit hitbox
const s5 = new Sprite(570,10,100,100);
s5.loadImg("/Game_01_Ledvadva/sprites/RED/rR/6.png");
s5.render(ctx,true);

const s6 = new Sprite(670,10,100,100);
s6.loadImg("/Game_01_Ledvadva/sprites/BLU/rL/6.png");
console.log(colides(s5,s6))
if(colides(s5,s6)){s6.render(ctx,true);}

/**/
