// Autor: Šimon Bendl
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';
import { LevelSelect, Platform, SemiSolid, Solid} from '../../Monkey-Engine/PlatformerLib.js';

/*-----------------------------barriers----------------------------------- */
//const _1001 = new Rectangle(1624,  480,  128,  240,"red"); _1001._id = "pc" 
const _1002 = new Solid( 920,  276,  604,   52); _1002._id = "shelf"  
const _1003 = new Solid(   0, 1072, 1920,   16); _1003._id = "floor"
const _1004 = new SemiSolid( 112,  124,   16,  924,"yellow"); _1004._id = "library-wall-1"
const _1005 = new SemiSolid( 836,  124,   16,  924,"yellow"); _1005._id = "library-wall-2"
const _1006 = new Solid(1292,  720,  516,   36); _1006._id = "desk-1" 
const _1007 = new Solid(1080,  720,   24,   36); _1007._id = "desk-2"
const _1008 = new SemiSolid(1092,  720,   12,  180,"yellow"); _1008._id = "drawer-1"
const _1009 = new SemiSolid(1292,  720,   12,  180,"yellow"); _1009._id = "drawer-2"
const _1010 = new Rectangle(1092,  896,  212,   16,"grey"); _1010._id = "drawer-3"

/*-----------------------------interactable-----------------------------------*/

/*--------------------------yellow-baririers------------------------------ */
const _2001 = new SemiSolid(1092, 912, 12, 140, "yellow") // drawers
const _2002 = new SemiSolid(1292, 912, 12, 140, "yellow") // -//-
/*-----------------------------platforms-----------------------------------*/
const _3001 = new Platform( 112,  112, 740,   12) // library
const _3002 = new Platform( 128,  268, 708,   20) // -//-
const _3003 = new Platform( 128,  424, 708,   20) // -//-
const _3004 = new Platform( 128,  580, 708,   20) // -//-
const _3005 = new Platform( 128,  736, 708,   20) // -//-
const _3006 = new Platform( 128,  892, 708,   20) // -//-
const _3007 = new Platform( 128, 1048, 708,   24) // -//-
const _3008 = new Platform(1104,  720, 188,   36) // drawers
const _3013 = new Platform(1104,  784, 188,    8) // -//-
const _3009 = new Platform(1104,  836, 188,    8) // -//-
const _3010 = new Platform(1104, 1044, 188,   28) // -//-
const _3014 = new LevelSelect( 704,  972, 128,   76); _3014._id = "3014";//nike
const _3016 = new LevelSelect( 240,  816, 156,   76); _3016._id = "3016"//games
const _3012 = new Rectangle     ( 142,  856,  92,   36, "grey");//contoler
const _3011 = new LevelSelect( 488,  516, 100,   64, "grey");_3011._id = "3011"//fairytalebook
const _3015 = new Rectangle     ( 364,  704, 104,   32, "grey"); //study
const _3017 = new LevelSelect( 384,  676,  76,   28, "grey"); _3017._id = "3017"//study
const _3018 = new Rectangle     ( 324,  396, 144,   28, "grey");//dark
const _3019 = new LevelSelect( 356,  364, 104,  32, "grey"); _3019._id = "3019"//dark

//const _3011 = new Rectangle( 132,  920, 392,  128, "orange");//folders
//const _3015 = new Rectangle( 396,  764, 428,  128, "orange");//folders

export const barriers = [
    _1002, _1003, _1004,_1005,_1006,_1007,_1008,_1009,_1010,
    _2001, _2002,
    _3001, _3002, _3003,_3004,_3005,_3006,_3007,_3008,_3009,_3010,_3013,_3014,_3016,_3012,_3011,_3015,_3017, _3018,_3019
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