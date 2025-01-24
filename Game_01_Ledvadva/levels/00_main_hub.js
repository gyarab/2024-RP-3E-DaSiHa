import { Sprite } from '../../Monkey-Engine/Sprite.js';
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';

const path = "../../Game_01_Ledvadva/sprites/Hub/"


/*-----------------------------barriers----------------------------------- */
const _1001 = new Rectangle(1624,  480,  128,  240,"red"); _1001._id = "pc" 
const _1002 = new Rectangle( 920,  276,  604,   52,"red"); _1002._id = "shelf"  
const _1003 = new Rectangle(   0, 1072, 1920,   16,"red"); _1003._id = "floor"
const _1004 = new Rectangle( 112,  124,   12,  948,"red"); _1004._id = "library-wall-1"
const _1005 = new Rectangle( 840,  124,   12,  788,"red"); _1005._id = "library-wall-2"
const _1006 = new Rectangle(1292,  720,  516,   36,"red"); _1006._id = "desk-1" 
const _1007 = new Rectangle(1080,  720,   24,   36,"red"); _1007._id = "desk-2"
const _1008 = new Rectangle(1092,  720,   12,  180,"red"); _1008._id = "drawer-1"
const _1009 = new Rectangle(1292,  720,   12,  180,"red"); _1009._id = "drawer-2"
const _1010 = new Rectangle(1092,  896,  212,   16,"red"); _1010._id = "drawer-3"

/*-----------------------------forground-----------------------------------*/
const _0001 = new Rectangle(1724, 752,  36, 320,"green") //noha od stolu
// TODO: recycle bin
/*--------------------------yellow-baririers------------------------------ */
const _2001 = new Rectangle(1092, 912, 12, 140, "yellow") // drawers
const _2002 = new Rectangle(1292, 912, 12, 140, "yellow") // -//-
const _2003 = new Rectangle(840, 912, 12, 136, "yellow")  // library
/*-----------------------------platforms-----------------------------------*/
const _3001 = new Rectangle( 112,  112, 740,   12, "orange") // library
const _3002 = new Rectangle( 124,  268, 720,   20, "orange") // -//-
const _3003 = new Rectangle( 124,  424, 720,   20, "orange") // -//-
const _3004 = new Rectangle( 124,  580, 720,   20, "orange") // -//-
const _3005 = new Rectangle( 124,  736, 720,   20, "orange") // -//-
const _3006 = new Rectangle( 124,  892, 720,   20, "orange") // -//-
const _3007 = new Rectangle( 124, 1048, 720,   24, "orange") // -//-
const _3008 = new Rectangle(1104,  720, 188,   36, "orange") // drawers
const _3013 = new Rectangle(1104,  784, 188,   8, "orange") // -//-
const _3009 = new Rectangle(1104,  836, 188,   8, "orange") // -//-
const _3010 = new Rectangle(1104, 1044, 188,   28, "orange") // -//-
const _3011 = new Rectangle( 132,  920, 392,  128, "orange");//folders
const _3014 = new Rectangle( 10,  10, 8,  128, "orange");
const _3015 = new Rectangle( 704, 968, 128,  80, "orange");
const _3016 = new Rectangle( 10,  10, 64,  8, "orange");
export const barriers = [
    _0001,
    _1001,_1002,_1003,_1004,_1005,_1006,_1007,_1008,_1009,_1010,
    _2001,_2002,_2003,
    _3001,_3002,_3003,_3004,_3005,_3006,_3007,_3008,_3009,_3010,_3011,_3013,_3014,_3015,_3016,
];
/*-----------------------------Blue Print--------------------------------
const canvas = document.getElementById('herniRozhraní');
const ctx = canvas.getContext('2d');

const Blue = new Rectangle(0,0,1920,1080,"blue")
const Print = new Sprite(0,0,1920,1080,path + "hub01.png")

/*-----------------------------Render-----------------------------------
function RenderAll() {
    Blue.render(ctx,true)
    Print.render(ctx)
    barriers.forEach(barriers => barriers.render(ctx));
    
}
window.setInterval(RenderAll, 10);
/* */