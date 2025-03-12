// Autor: Šimon Bendl
import { Rectangle } from '../../Monkey-Engine/Rectangle.js';
import { LevelSelect, Platform, SemiSolid, Solid, Selector} from '../../Monkey-Engine/PlatformerLib.js';

/*-----------------------------barriers----------------------------------- */
//const _1001 = new Rectangle(1624,  480,  128,  240,"red"); _1001._id = "pc" 
const _1002 = new Solid( 920,  276,  604,   52); _1002._id = "shelf"  
const _1003 = new Solid(   0, 1072, 1920,   16); _1003._id = "floor"
const _1004 = new SemiSolid( 112,  124,   16,  924,"yellow"); _1004._id = "library-wall-1"
const _1005 = new SemiSolid( 836,  124,   16,  924,"yellow"); _1005._id = "library-wall-2"
const _1006 = new Solid(1292,  720,  516,   36); _1006._id = "desk-1" 
const _1007 = new Solid(1080,  720,   24,   36); _1007._id = "desk-2"
const _1008 = new SemiSolid(1092,  720,   12,  180,"yellow");
const _1009 = new SemiSolid(1292,  720,   12,  180,"yellow");
const _1010 = new Rectangle(1092,  896,  212,   16);//drawer-3

/*-----------------------------interactable-----------------------------------*/
//* level_01  -nike
const _5000 = new LevelSelect( 704,  972, 128,  76); _5000._id = "i001";
//* level_02  -games
const _5001 = new LevelSelect( 240,  816, 156,  76); _5001._id = "i002";
const _5700 = new Rectangle  ( 142,  856,  92,  36); _5700._id = "i003"; 
_5001._addPlatform(_5700);
//* level_03  -fairytale
const _5002 = new LevelSelect( 488,  516, 100,  64); _5002._id = "i004"; 
//* level_04  -study
const _5003 = new LevelSelect( 384,  676,  76,  28); _5003._id = "i006"; 
const _5701 = new Rectangle  ( 364,  704, 104,  32); _5701._id = "i005"; 
_5003._addPlatform(_5701);
//* level_05  -horors
const _5004 = new LevelSelect( 356,  364, 104,  32); _5004._id = "i008";
const _5702 = new Rectangle  ( 324,  396, 144,  28); _5702._id = "i007";
_5004._addPlatform(_5702);

//* Closet
const _5005 = new Selector( 512,  712,  200,  24); 

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


//const _3011 = new Rectangle( 132,  920, 392,  128, "orange");//folders
//const _3015 = new Rectangle( 396,  764, 428,  128, "orange");//folders

export const barriers = [
    _1002, _1003, _1004,_1005,_1006,_1007,_1008,_1009,_1010,
    _2001, _2002,
    _3001, _3002, _3003,_3004,_3005,_3006,_3007,_3008,_3009,_3010,_3013,
    _5000, _5001, _5002,_5003,_5004,_5005,
    _5700, _5701, _5702

];
