import { Sprite } from '../../Monkey-Engine/Sprite.js';
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';

const path = "../../Game_01_Ledvadva/sprites/Hub/"


/*-----------------------------barriers----------------------------------- */
const _1001 = new Rectangle(1624,  480,  128,  240,"red"); _1001._id = "pc" 
const _1002 = new Rectangle( 920,  276,  604,   52,"red"); _1002._id = "shelf"  
const _1003 = new Rectangle(   0, 1072, 1920,   16,"red"); _1003._id = "floor"
const _1004 = new Rectangle( 112,  124,   20,  948,"red"); _1004._id = "library-wall-1"
const _1005 = new Rectangle( 832,  124,   20,  732,"red"); _1005._id = "library-wall-2"
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
const _2003 = new Rectangle(836, 856, 16, 192, "yellow")  // library
/*-----------------------------platforms-----------------------------------*/
const _3001 = new Rectangle( 112,  112, 740,   12, "orange") // library
const _3002 = new Rectangle( 128,  268, 708,   20, "orange") // -//-
const _3003 = new Rectangle( 128,  424, 708,   20, "orange") // -//-
const _3004 = new Rectangle( 128,  580, 708,   20, "orange") // -//-
const _3005 = new Rectangle( 128,  736, 708,   20, "orange") // -//-
const _3006 = new Rectangle( 128,  892, 708,   20, "orange") // -//-
const _3007 = new Rectangle( 128, 1048, 708,   24, "orange") // -//-
const _3008 = new Rectangle(1104,  720, 188,   36, "orange") // drawers
const _3013 = new Rectangle(1104,  784, 188,    8, "orange") // -//-
const _3009 = new Rectangle(1104,  836, 188,    8, "orange") // -//-
const _3010 = new Rectangle(1104, 1044, 188,   28, "orange") // -//-
const _3014 = new Rectangle( 704,  972, 128,   76, "orange");//nike
const _3016 = new Rectangle( 240,  816, 156,   76, "orange");//games
const _3012 = new Rectangle( 142,  856,  92,   36, "orange");//contoler
const _3011 = new Rectangle( 488,  516, 100,   64, "orange");//fairytalebook
const _3015 = new Rectangle( 364,  704, 104,   32, "orange");//study
const _3017 = new Rectangle( 384,  676, 76,   28, "orange");//study

//const _3011 = new Rectangle( 132,  920, 392,  128, "orange");//folders
//const _3015 = new Rectangle( 396,  764, 428,  128, "orange");//folders

export const barriers = [
    _0001,
    _1001,_1002,_1003,_1004,_1005,_1006,_1007,_1008,_1009,_1010,
    _2001,_2002,_2003,
    _3001,_3002,_3003,_3004,_3005,_3006,_3007,_3008,_3009,_3010,_3013,_3014,_3016,_3012,_3011,_3015,_3017
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